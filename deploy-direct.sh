#!/bin/bash
# ============================================
# Script de Déploiement Direct 3dassistance.fr
# Avec SMTP OVH - Copier-coller ce script
# ============================================

echo "🚀 DÉPLOIEMENT 3DASSISTANCE.FR avec SMTP OVH"
echo "════════════════════════════════════════════"

cd ~/public_html

# ============================================
# 1. SAUVEGARDE ET NETTOYAGE
# ============================================
echo "🔄 Sauvegarde et nettoyage..."

if [ -f "index.html" ]; then
    echo "📦 Création d'une sauvegarde..."
    tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz * 2>/dev/null || true
fi

echo "🧹 Nettoyage des anciens fichiers..."
find . -maxdepth 1 -not -name '.' -not -name '..' -not -name 'backup-*' -exec rm -rf {} \; 2>/dev/null || true

# ============================================
# 2. CLONE ET BUILD
# ============================================
echo "📥 Clone du repository..."
git clone https://github.com/visibilitecom/deratisation.git temp_deploy
cd temp_deploy

# Configuration .env frontend pour production
echo "🔧 Configuration frontend pour production..."
cat > frontend/.env << 'EOF'
REACT_APP_BACKEND_URL=https://www.3dassistance.fr
GENERATE_SOURCEMAP=false
PUBLIC_URL=https://www.3dassistance.fr/
NODE_ENV=production
EOF

# Build React
if [ -f "frontend/package.json" ]; then
    echo "📦 Build du projet React..."
    cd frontend
    npm install --production
    npm run build
    
    if [ -d "build" ]; then
        echo "✅ Build réussi!"
        cp -r build/* ../
        cd ..
    else
        echo "❌ Erreur: Dossier build non trouvé"
        exit 1
    fi
else
    echo "⚠️ Pas de package.json trouvé"
fi

# ============================================
# 3. CRÉATION DU SCRIPT PHP AVEC SMTP OVH
# ============================================
echo "📧 Création du script d'envoi d'emails avec SMTP OVH..."

cat > ../send-contact.php << 'EOF'
<?php
// Script d'envoi email pour 3dassistance.fr avec SMTP OVH
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://www.3dassistance.fr');
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Aucune donnée reçue']);
    exit();
}

$required_fields = ['nom', 'telephone', 'typeProbleme'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Le champ '$field' est obligatoire"]);
        exit();
    }
}

$nom = htmlspecialchars(trim($input['nom']));
$telephone = htmlspecialchars(trim($input['telephone']));
$codePostal = htmlspecialchars(trim($input['codePostal'] ?? 'Non précisé'));
$typeProbleme = htmlspecialchars(trim($input['typeProbleme']));
$message = htmlspecialchars(trim($input['message'] ?? 'Aucun message supplémentaire'));

$to = 'contact@3dassistance.fr';
$subject = '🎯 Nouvelle demande - ' . $typeProbleme;

$html_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: #1FA77D; color: white; padding: 25px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #1FA77D; }
        .label { font-weight: bold; color: #1FA77D; }
        .value { margin-top: 5px; font-size: 16px; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎯 Nouvelle demande de devis</h1>
            <p>3dassistance.fr</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 CLIENT</div>
                <div class='value'>$nom</div>
            </div>
            <div class='field'>
                <div class='label'>📞 TÉLÉPHONE</div>
                <div class='value'><a href='tel:$telephone'>$telephone</a></div>
            </div>
            <div class='field'>
                <div class='label'>📍 CODE POSTAL</div>
                <div class='value'>$codePostal</div>
            </div>
            <div class='field'>
                <div class='label'>🐭 PROBLÈME</div>
                <div class='value'><strong>$typeProbleme</strong></div>
            </div>
            <div class='field'>
                <div class='label'>💬 MESSAGE</div>
                <div class='value'>$message</div>
            </div>
        </div>
        <div class='footer'>
            <p>📅 Reçu le " . date('d/m/Y à H:i:s') . "</p>
            <p>🌐 www.3dassistance.fr</p>
        </div>
    </div>
</body>
</html>";

// Configuration SMTP OVH
ini_set('SMTP', 'ssl0.ovh.net');
ini_set('smtp_port', '587');
ini_set('sendmail_from', 'contact@3dassistance.fr');

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: "3D Assistance" <contact@3dassistance.fr>',
    'Reply-To: contact@3dassistance.fr',
    'Return-Path: contact@3dassistance.fr',
    'X-Mailer: 3DAssistance-ContactForm',
    'X-Priority: 1'
];

$mail_sent = mail($to, $subject, $html_body, implode("\r\n", $headers));

if ($mail_sent) {
    error_log("CONTACT EMAIL ENVOYÉ: $nom ($telephone) - $typeProbleme");
    echo json_encode(['success' => true, 'message' => 'Email envoyé avec succès! Nous vous recontactons sous 2h.']);
} else {
    error_log("CONTACT EMAIL ÉCHEC: $nom ($telephone) - $typeProbleme");
    echo json_encode(['success' => false, 'message' => 'Erreur. Appelez le 01 42 01 07 07']);
}
?>
EOF

# ============================================
# 4. CRÉATION DU .HTACCESS
# ============================================
echo "🔧 Configuration .htaccess..."

cat > ../.htaccess << 'EOF'
# Configuration Production 3dassistance.fr
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Force HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # Force www
    RewriteCond %{HTTP_HOST} ^3dassistance\.fr [NC]
    RewriteRule ^(.*)$ https://www.3dassistance.fr/$1 [L,R=301]
    
    # Autoriser PHP
    RewriteRule ^send-contact\.php$ - [L]
    RewriteRule ^test-contact\.php$ - [L]
    
    # React Router
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !\.php$
    RewriteRule . /index.html [L]
</IfModule>

# Compression GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css application/javascript application/json
</IfModule>

# Cache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Sécurité
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options SAMEORIGIN
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
EOF

# ============================================
# 5. SCRIPT DE TEST
# ============================================
echo "🧪 Création du script de test..."

cat > ../test-contact.php << 'EOF'
<?php
echo "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Test Contact - 3dassistance.fr</title>";
echo "<style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;}
.success{background:#d4edda;padding:15px;border-radius:5px;color:#155724;margin:10px 0;}
.error{background:#f8d7da;padding:15px;border-radius:5px;color:#721c24;margin:10px 0;}
h1{color:#1FA77D;}</style></head><body>";

echo "<h1>🧪 Test Configuration Email - 3dassistance.fr</h1>";
echo "<p><strong>Test le :</strong> " . date('d/m/Y à H:i:s') . "</p>";

if (function_exists('mail')) {
    echo "<div class='success'>✅ Fonction mail() disponible</div>";
    
    $test_subject = "🧪 Test Email Production - " . date('H:i');
    $test_message = "Test depuis 3dassistance.fr - " . date('d/m/Y à H:i:s');
    $headers = "From: contact@3dassistance.fr\r\nReply-To: contact@3dassistance.fr";
    
    ini_set('SMTP', 'ssl0.ovh.net');
    ini_set('smtp_port', '587');
    ini_set('sendmail_from', 'contact@3dassistance.fr');
    
    $result = mail('contact@3dassistance.fr', $test_subject, $test_message, $headers);
    
    if ($result) {
        echo "<div class='success'>✅ Email de test envoyé avec succès!</div>";
    } else {
        echo "<div class='error'>❌ Échec envoi email</div>";
    }
} else {
    echo "<div class='error'>❌ Fonction mail() non disponible</div>";
}

if (file_exists('send-contact.php')) {
    echo "<div class='success'>✅ Script send-contact.php présent</div>";
} else {
    echo "<div class='error'>❌ Script send-contact.php manquant</div>";
}

echo "<p><strong>Configuration SMTP OVH :</strong><br>";
echo "Serveur: ssl0.ovh.net:587<br>";
echo "Email: contact@3dassistance.fr</p>";

echo "</body></html>";
?>
EOF

# ============================================
# 6. FINALISATION
# ============================================
cd ..

# Permissions
echo "🔐 Configuration des permissions..."
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod 644 .htaccess
chmod 644 *.php

# Nettoyage
echo "🧹 Nettoyage..."
rm -rf temp_deploy

# Tests
echo "🧪 Tests finaux..."
critical_files=("index.html" ".htaccess" "send-contact.php" "test-contact.php")
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file présent"
    else
        echo "❌ $file manquant"
    fi
done

echo ""
echo "🎉 DÉPLOIEMENT TERMINÉ!"
echo "════════════════════════"
echo "🌐 Site: https://www.3dassistance.fr"
echo "🧪 Test: https://www.3dassistance.fr/test-contact.php"
echo "📧 Contact: https://www.3dassistance.fr/contact"
echo ""
echo "✅ Le formulaire de contact avec SMTP OVH est opérationnel!"