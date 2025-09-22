# ============================================
# Script PowerShell de Déploiement Complet
# 3dassistance.fr - Dératisation Paris
# ============================================

param(
    [Parameter(Mandatory=$true)]
    [string]$ServerHost,
    
    [Parameter(Mandatory=$true)]
    [string]$Username,
    
    [Parameter(Mandatory=$true)]
    [string]$Password,
    
    [string]$RepoUrl = "https://github.com/visibilitecom/deratisation.git",
    [string]$LocalTempPath = "$env:TEMP\3dassistance-deploy",
    [string]$RemotePath = "/public_html"
)

# Fonction pour afficher les messages colorés
function Write-ColoredOutput {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

Write-ColoredOutput "🚀 DÉPLOIEMENT AUTOMATIQUE 3DASSISTANCE.FR" "Green"
Write-ColoredOutput "═══════════════════════════════════════════" "Green"

try {
    # ============================================
    # 1. PRÉPARATION ET NETTOYAGE
    # ============================================
    Write-ColoredOutput "🧹 Nettoyage et préparation..." "Yellow"
    
    if (Test-Path $LocalTempPath) {
        Remove-Item -Path $LocalTempPath -Recurse -Force
        Write-ColoredOutput "✅ Ancien dossier supprimé" "Green"
    }

    # ============================================
    # 2. INSTALLATION DES MODULES NÉCESSAIRES
    # ============================================
    Write-ColoredOutput "📦 Vérification des modules PowerShell..." "Yellow"
    
    $requiredModules = @("Posh-SSH")
    foreach ($module in $requiredModules) {
        if (-not (Get-Module -ListAvailable -Name $module)) {
            Write-ColoredOutput "📦 Installation du module $module..." "Yellow"
            Install-Module -Name $module -Force -Scope CurrentUser -AllowClobber
        }
        Import-Module $module
    }

    # ============================================
    # 3. CLONE DU REPOSITORY
    # ============================================
    Write-ColoredOutput "📥 Clonage du repository..." "Yellow"
    Write-ColoredOutput "Repository: $RepoUrl" "Cyan"
    
    $parentPath = Split-Path $LocalTempPath -Parent
    if (-not (Test-Path $parentPath)) {
        New-Item -ItemType Directory -Path $parentPath -Force | Out-Null
    }
    
    $gitResult = Start-Process -FilePath "git" -ArgumentList "clone", $RepoUrl, $LocalTempPath -Wait -PassThru -NoNewWindow
    
    if ($gitResult.ExitCode -ne 0) {
        throw "Échec du clonage Git (Code: $($gitResult.ExitCode))"
    }
    Write-ColoredOutput "✅ Repository cloné avec succès!" "Green"

    # ============================================
    # 4. BUILD DU PROJET REACT
    # ============================================
    Set-Location $LocalTempPath
    
    if (Test-Path "frontend/package.json") {
        Write-ColoredOutput "📦 Build du projet React..." "Yellow"
        
        Set-Location "frontend"
        
        # Configuration .env pour production
        Write-ColoredOutput "🔧 Configuration .env production..." "Cyan"
        @"
REACT_APP_BACKEND_URL=https://www.3dassistance.fr
GENERATE_SOURCEMAP=false
PUBLIC_URL=https://www.3dassistance.fr/
NODE_ENV=production
"@ | Out-File -FilePath ".env" -Encoding UTF8
        
        # Installation et build
        Write-ColoredOutput "📦 Installation des dépendances..." "Yellow"
        $npmInstall = Start-Process -FilePath "npm" -ArgumentList "install" -Wait -PassThru -NoNewWindow
        if ($npmInstall.ExitCode -ne 0) {
            throw "Erreur lors de npm install"
        }
        
        Write-ColoredOutput "🔨 Build de production..." "Yellow"
        $npmBuild = Start-Process -FilePath "npm" -ArgumentList "run", "build" -Wait -PassThru -NoNewWindow
        if ($npmBuild.ExitCode -ne 0) {
            throw "Erreur lors du build"
        }
        
        # Déplacement des fichiers build
        if (Test-Path "build") {
            Write-ColoredOutput "📁 Déplacement des fichiers build..." "Cyan"
            Move-Item "build/*" "../" -Force
            Set-Location ".."
            Remove-Item "frontend" -Recurse -Force
            Remove-Item "backend" -Recurse -Force -ErrorAction SilentlyContinue
        }
        
        Write-ColoredOutput "✅ Build React terminé!" "Green"
    }

    # ============================================
    # 5. CRÉATION DES SCRIPTS PHP D'ENVOI D'EMAIL
    # ============================================
    Write-ColoredOutput "📧 Création des scripts PHP d'envoi d'email..." "Yellow"
    
    # Script principal send-contact.php
    $sendContactPHP = @'
<?php
// Script d'envoi pour formulaire contact 3dassistance.fr
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

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: "3D Assistance" <noreply@3dassistance.fr>',
    'Reply-To: contact@3dassistance.fr',
    'X-Priority: 1'
];

$mail_sent = mail($to, $subject, $html_body, implode("\r\n", $headers));

if ($mail_sent) {
    error_log("CONTACT OK: $nom ($telephone) - $typeProbleme");
    echo json_encode(['success' => true, 'message' => 'Email envoyé! Nous vous recontactons sous 2h.']);
} else {
    error_log("CONTACT ÉCHEC: $nom ($telephone)");
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur. Appelez le 01 42 01 07 07']);
}
?>
'@

    # Script de test
    $testContactPHP = @'
<?php
echo "<h2>🧪 Test Email - 3dassistance.fr</h2>";

$result = mail(
    'contact@3dassistance.fr',
    '🧪 Test depuis PowerShell Deploy - ' . date('H:i'),
    'Test automatique depuis le script PowerShell de déploiement.' . "\n\n" . 'Envoyé le: ' . date('Y-m-d H:i:s'),
    'From: "Test Deploy" <noreply@3dassistance.fr>'
);

if ($result) {
    echo "<p style='color: green;'>✅ <strong>Test envoyé avec succès!</strong></p>";
} else {
    echo "<p style='color: red;'>❌ <strong>Échec du test</strong></p>";
}

echo "<p>📧 Fonction mail: " . (function_exists('mail') ? '✅ Disponible' : '❌ Non disponible') . "</p>";
echo "<p>🕒 Test effectué le: " . date('Y-m-d H:i:s') . "</p>";
?>
'@

    # Sauvegarde des scripts PHP
    $sendContactPHP | Out-File -FilePath "send-contact.php" -Encoding UTF8
    $testContactPHP | Out-File -FilePath "test-contact.php" -Encoding UTF8
    
    Write-ColoredOutput "✅ Scripts PHP créés!" "Green"

    # ============================================
    # 6. CRÉATION DU .HTACCESS
    # ============================================
    Write-ColoredOutput "🔧 Création du .htaccess..." "Yellow"
    
    $htaccessContent = @'
# Configuration React Router pour 3dassistance.fr
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Autoriser les scripts PHP
    RewriteRule ^send-contact\.php$ - [L]
    RewriteRule ^test-contact\.php$ - [L]
    
    # Gestion des routes React Router
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    
    # Redirection HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
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
</IfModule>

# Headers de sécurité
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options SAMEORIGIN
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
'@

    $htaccessContent | Out-File -FilePath ".htaccess" -Encoding UTF8
    Write-ColoredOutput "✅ .htaccess créé!" "Green"

    # ============================================
    # 7. CONNEXION ET UPLOAD SFTP
    # ============================================
    Write-ColoredOutput "🔗 Connexion SFTP au serveur..." "Yellow"
    Write-ColoredOutput "Serveur: $ServerHost" "Cyan"
    
    $securePassword = ConvertTo-SecureString $Password -AsPlainText -Force
    $credential = New-Object System.Management.Automation.PSCredential ($Username, $securePassword)
    
    $sftpSession = New-SFTPSession -ComputerName $ServerHost -Credential $credential -AcceptKey
    
    if (-not $sftpSession) {
        throw "Impossible de se connecter au serveur SFTP"
    }
    
    Write-ColoredOutput "✅ Connexion SFTP établie!" "Green"

    # ============================================
    # 8. NETTOYAGE DU SERVEUR DISTANT
    # ============================================
    Write-ColoredOutput "🧹 Nettoyage du serveur distant..." "Yellow"
    
    # Commandes de nettoyage
    $cleanupCommands = @(
        "cd $RemotePath",
        "find . -maxdepth 1 -not -name '.' -not -name '..' -exec rm -rf {} \;"
    )
    
    foreach ($cmd in $cleanupCommands) {
        try {
            Invoke-SSHCommand -SessionId $sftpSession.SessionId -Command $cmd | Out-Null
        } catch {
            Write-ColoredOutput "⚠️  Commande ignorée: $cmd" "Yellow"
        }
    }

    # ============================================
    # 9. UPLOAD DES FICHIERS
    # ============================================
    Write-ColoredOutput "📤 Upload des fichiers..." "Yellow"
    
    $filesToUpload = Get-ChildItem -Path "." -File
    $totalFiles = $filesToUpload.Count
    $uploadedFiles = 0
    
    foreach ($file in $filesToUpload) {
        $uploadedFiles++
        $progress = [math]::Round(($uploadedFiles / $totalFiles) * 100)
        
        Write-ColoredOutput "📤 [$progress%] Upload: $($file.Name)" "Cyan"
        
        try {
            Set-SFTPFile -SessionId $sftpSession.SessionId -LocalFile $file.FullName -RemotePath "$RemotePath/$($file.Name)" -Overwrite
        } catch {
            Write-ColoredOutput "❌ Erreur upload: $($file.Name) - $($_.Exception.Message)" "Red"
        }
    }

    # ============================================
    # 10. CONFIGURATION DES PERMISSIONS
    # ============================================
    Write-ColoredOutput "🔐 Configuration des permissions..." "Yellow"
    
    $permissionCommands = @(
        "cd $RemotePath",
        "find . -type d -exec chmod 755 {} \;",
        "find . -type f -exec chmod 644 {} \;",
        "chmod 644 .htaccess",
        "chmod 644 *.php"
    )
    
    foreach ($cmd in $permissionCommands) {
        try {
            Invoke-SSHCommand -SessionId $sftpSession.SessionId -Command $cmd | Out-Null
            Write-ColoredOutput "✅ $cmd" "Green"
        } catch {
            Write-ColoredOutput "⚠️  Permissions: $cmd" "Yellow"
        }
    }

    # ============================================
    # 11. TEST AUTOMATIQUE
    # ============================================
    Write-ColoredOutput "🧪 Test de l'installation..." "Yellow"
    
    try {
        # Test de la fonction mail via SSH
        $testResult = Invoke-SSHCommand -SessionId $sftpSession.SessionId -Command "cd $RemotePath && php test-contact.php"
        Write-ColoredOutput "📧 Résultat du test email:" "Cyan"
        Write-ColoredOutput $testResult.Output "Gray"
        
        if ($testResult.Output -match "envoyé avec succès") {
            Write-ColoredOutput "✅ Test email: SUCCÈS!" "Green"
        } else {
            Write-ColoredOutput "⚠️  Test email: Vérification manuelle nécessaire" "Yellow"
        }
    } catch {
        Write-ColoredOutput "⚠️  Test automatique échoué - Test manuel requis" "Yellow"
    }

    # Fermeture de la session SFTP
    Remove-SFTPSession -SessionId $sftpSession.SessionId

    # ============================================
    # 12. RÉSUMÉ FINAL
    # ============================================
    Write-ColoredOutput "🎉 DÉPLOIEMENT TERMINÉ AVEC SUCCÈS!" "Green"
    Write-ColoredOutput "═══════════════════════════════════════" "Green"
    
    Write-ColoredOutput "🌐 URLs importantes:" "Cyan"
    Write-ColoredOutput "   • Site principal: https://www.3dassistance.fr" "White"
    Write-ColoredOutput "   • Page contact: https://www.3dassistance.fr/contact" "White"
    Write-ColoredOutput "   • Test email: https://www.3dassistance.fr/test-contact.php" "White"
    
    Write-ColoredOutput "📊 Statistiques:" "Cyan"
    Write-ColoredOutput "   • Fichiers uploadés: $uploadedFiles" "White"
    Write-ColoredOutput "   • Durée totale: $((Get-Date) - $startTime)" "White"
    
    Write-ColoredOutput "📧 Actions suivantes:" "Yellow"
    Write-ColoredOutput "   1. Tester le formulaire contact" "White"
    Write-ColoredOutput "   2. Vérifier la réception des emails" "White"
    Write-ColoredOutput "   3. Tester sur mobile et desktop" "White"

} catch {
    Write-ColoredOutput "❌ ERREUR DURANT LE DÉPLOIEMENT:" "Red"
    Write-ColoredOutput $_.Exception.Message "Red"
    Write-ColoredOutput "📋 Stack trace:" "Yellow"
    Write-ColoredOutput $_.ScriptStackTrace "Gray"
    
    # Nettoyage en cas d'erreur
    if ($sftpSession) {
        Remove-SFTPSession -SessionId $sftpSession.SessionId
    }
    
    exit 1
} finally {
    # Nettoyage final
    if (Test-Path $LocalTempPath) {
        Set-Location $env:TEMP
        Remove-Item -Path $LocalTempPath -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Write-ColoredOutput "🏁 Script terminé." "Green"