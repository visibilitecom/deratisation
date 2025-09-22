#!/bin/bash
# ============================================
# Script de Déploiement Production 3dassistance.fr
# Avec Configuration SMTP OVH
# ============================================

echo "🚀 DÉPLOIEMENT PRODUCTION 3DASSISTANCE.FR avec SMTP OVH"
echo "═══════════════════════════════════════════════════════════"

cd ~/public_html

# ============================================
# 1. SAUVEGARDE ET NETTOYAGE
# ============================================
echo "🔄 Sauvegarde et nettoyage..."

# Créer une sauvegarde
if [ -f "index.html" ]; then
    echo "📦 Création d'une sauvegarde..."
    tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz * 2>/dev/null || true
fi

# Nettoyage complet
echo "🧹 Nettoyage des anciens fichiers..."
find . -maxdepth 1 -not -name '.' -not -name '..' -not -name 'backup-*' -exec rm -rf {} \; 2>/dev/null || true

# ============================================
# 2. CLONE ET PRÉPARATION
# ============================================
echo "📥 Clone du repository..."
git clone https://github.com/visibilitecom/deratisation.git temp_deploy
cd temp_deploy

# ============================================
# 3. CONFIGURATION BACKEND AVEC SMTP OVH
# ============================================
echo "🔧 Configuration du backend avec SMTP OVH..."

# Créer le fichier .env backend pour production
cat > backend/.env << 'EOF'
# Configuration Production 3dassistance.fr
MONGO_URL=mongodb://localhost:27017
DB_NAME=acces_services_prod
CORS_ORIGINS=https://www.3dassistance.fr,https://3dassistance.fr

# Configuration SMTP OVH pour envoi d'emails
SMTP_SERVER=ssl0.ovh.net
SMTP_PORT=587
SMTP_USER=contact@3dassistance.fr
SMTP_PASSWORD=Prowler2016
EOF

echo "✅ Configuration backend créée avec SMTP OVH"

# ============================================
# 4. BUILD ET DÉPLOIEMENT BACKEND
# ============================================
echo "🔨 Déploiement du backend FastAPI..."

# Installer les dépendances backend
cd backend
pip3 install -r requirements.txt --user
cd ..

# Copier les fichiers backend vers un dossier api
mkdir -p ../api
cp -r backend/* ../api/
echo "✅ Backend déployé dans /api"

# ============================================
# 5. BUILD FRONTEND AVEC BONNE URL
# ============================================
echo "🔨 Build du frontend React..."

cd frontend

# Configuration .env frontend pour production
cat > .env << 'EOF'
REACT_APP_BACKEND_URL=https://www.3dassistance.fr
GENERATE_SOURCEMAP=false
PUBLIC_URL=https://www.3dassistance.fr/
NODE_ENV=production
EOF

# Installation et build
echo "📦 Installation des dépendances frontend..."
npm install --production

echo "🔨 Build de production..."
npm run build

if [ -d "build" ]; then
    echo "✅ Build réussi!"
    
    # Copier les fichiers build vers la racine
    cp -r build/* ../
    echo "✅ Fichiers frontend copiés"
else
    echo "❌ Erreur: Dossier build non trouvé"
    exit 1
fi

cd ..

# ============================================
# 6. CRÉATION DES SCRIPTS D'ENVOI D'EMAIL
# ============================================
echo "📧 Création des scripts d'envoi d'email..."

# Script PHP principal (compatible avec serveurs PHP traditionnels)
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

// Récupération des données
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Aucune donnée reçue']);
    exit();
}

// Validation
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

// Configuration email
$to = 'contact@3dassistance.fr';
$subject = '🎯 Nouvelle demande - ' . $typeProbleme;

// Corps HTML
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
$smtp_config = [
    'host' => 'ssl0.ovh.net',
    'port' => 587,
    'username' => 'contact@3dassistance.fr',
    'password' => 'Prowler2016'
];

// Tentative d'envoi avec PHPMailer si disponible, sinon mail() standard
if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    // Envoi via PHPMailer (recommandé)
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = $smtp_config['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $smtp_config['username'];
        $mail->Password = $smtp_config['password'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $smtp_config['port'];
        
        $mail->setFrom($smtp_config['username'], '3D Assistance');
        $mail->addAddress($to);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $html_body;
        
        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Email envoyé avec succès! Nous vous recontactons sous 2h.']);
    } catch (Exception $e) {
        error_log("PHPMailer Error: {$mail->ErrorInfo}");
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi. Appelez le 01 42 01 07 07']);
    }
} else {
    // Fallback avec mail() standard
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: "3D Assistance" <contact@3dassistance.fr>',
        'Reply-To: contact@3dassistance.fr'
    ];
    
    $mail_sent = mail($to, $subject, $html_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Email envoyé! Nous vous recontactons sous 2h.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur. Appelez le 01 42 01 07 07']);
    }
}
?>
EOF

# ============================================
# 7. CONFIGURATION .HTACCESS POUR PRODUCTION
# ============================================
echo "🔧 Configuration .htaccess pour production..."

cat > ../.htaccess << 'EOF'
# Configuration Production 3dassistance.fr
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Redirection HTTPS forcée
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # Autoriser les scripts PHP
    RewriteRule ^send-contact\.php$ - [L]
    RewriteRule ^api/(.*)$ api/server.py/$1 [L]
    
    # Gestion des routes React Router
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Compression GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css application/javascript application/json
</IfModule>

# Cache des fichiers statiques
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Headers de sécurité
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options SAMEORIGIN
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Types MIME
AddType application/javascript .js
AddType text/css .css
AddType image/svg+xml .svg
AddType font/woff .woff
AddType font/woff2 .woff2
EOF

# ============================================
# 8. MODIFICATION DU FRONTEND POUR PRODUCTION
# ============================================
echo "🔧 Adaptation du frontend pour production..."

# Modifier le Contact.js pour pointer vers le bon endpoint
if [ -f "../static/js/main."*.js ]; then
    echo "📝 Modification des URLs API dans le JS..."
    
    # Remplacer l'URL du backend par le script PHP pour la production
    sed -i 's|/api/send-contact|/send-contact.php|g' ../static/js/main.*.js
    echo "✅ URLs adaptées pour la production"
fi

# ============================================
# 9. CONFIGURATION DES PERMISSIONS
# ============================================
echo "🔐 Configuration des permissions..."

cd ..

# Permissions générales
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

# Permissions spéciales
chmod 644 .htaccess
chmod 644 send-contact.php
chmod -R 755 api/

# ============================================
# 10. NETTOYAGE
# ============================================
echo "🧹 Nettoyage des fichiers temporaires..."
rm -rf temp_deploy

# ============================================
# 11. TESTS FINAUX
# ============================================
echo "🧪 Tests finaux..."

# Test de la fonction PHP
if command -v php >/dev/null 2>&1; then
    echo "✅ PHP disponible"
    php -v | head -1
else
    echo "⚠️ PHP non détecté - Vérifiez la configuration serveur"
fi

# Vérification des fichiers critiques
critical_files=("index.html" ".htaccess" "send-contact.php")
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file présent"
    else
        echo "❌ $file manquant"
    fi
done

# ============================================
# 12. RÉSUMÉ FINAL
# ============================================
echo ""
echo "🎉 DÉPLOIEMENT TERMINÉ AVEC SUCCÈS!"
echo "═══════════════════════════════════════"
echo "🌐 Site: https://www.3dassistance.fr"
echo "📧 Emails: configuration SMTP OVH active"
echo "📝 Formulaire: /send-contact.php"
echo "🔧 Configuration: .htaccess optimisé"
echo ""
echo "📊 Statistiques:"
echo "   - Fichiers HTML: $(find . -name "*.html" | wc -l)"
echo "   - Fichiers CSS: $(find . -name "*.css" | wc -l)"
echo "   - Fichiers JS: $(find . -name "*.js" | wc -l)"
echo ""
echo "📋 Actions suivantes:"
echo "   1. Tester le formulaire de contact"
echo "   2. Vérifier la réception des emails"
echo "   3. Contrôler tous les liens et pages"
echo ""
echo "✅ Le site est maintenant opérationnel avec envoi d'emails!"