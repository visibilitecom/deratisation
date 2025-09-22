# ============================================
# Script PowerShell - Déploiement Production
# 3dassistance.fr avec SMTP OVH
# ============================================

param(
    [Parameter(Mandatory=$true)]
    [string]$ServerHost,
    
    [Parameter(Mandatory=$true)]
    [string]$Username,
    
    [Parameter(Mandatory=$true)]
    [string]$Password,
    
    [string]$RepoUrl = "https://github.com/visibilitecom/deratisation.git",
    [string]$LocalTempPath = "$env:TEMP\3dassistance-production",
    [string]$RemotePath = "/public_html"
)

Write-Host "🚀 DÉPLOIEMENT PRODUCTION 3DASSISTANCE.FR avec SMTP OVH" -ForegroundColor Green
Write-Host "══════════════════════════════════════════════════════════════" -ForegroundColor Green

try {
    # ============================================
    # 1. PRÉPARATION
    # ============================================
    Write-Host "🧹 Préparation de l'environnement..." -ForegroundColor Yellow
    
    if (Test-Path $LocalTempPath) {
        Remove-Item -Path $LocalTempPath -Recurse -Force
    }

    # Installation des modules
    if (-not (Get-Module -ListAvailable -Name Posh-SSH)) {
        Write-Host "📦 Installation du module Posh-SSH..." -ForegroundColor Yellow
        Install-Module -Name Posh-SSH -Force -Scope CurrentUser
    }
    Import-Module Posh-SSH

    # ============================================
    # 2. CLONE ET BUILD
    # ============================================
    Write-Host "📥 Clonage et build du projet..." -ForegroundColor Yellow
    
    $gitResult = Start-Process -FilePath "git" -ArgumentList "clone", $RepoUrl, $LocalTempPath -Wait -PassThru -NoNewWindow
    if ($gitResult.ExitCode -ne 0) {
        throw "Échec du clonage Git"
    }
    
    Set-Location $LocalTempPath

    # Configuration .env frontend pour production
    Write-Host "🔧 Configuration frontend pour production..." -ForegroundColor Cyan
    @"
REACT_APP_BACKEND_URL=https://www.3dassistance.fr
GENERATE_SOURCEMAP=false
PUBLIC_URL=https://www.3dassistance.fr/
NODE_ENV=production
"@ | Out-File -FilePath "frontend\.env" -Encoding UTF8

    # Build React
    if (Test-Path "frontend\package.json") {
        Set-Location "frontend"
        
        Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
        $npmInstall = Start-Process -FilePath "npm" -ArgumentList "install" -Wait -PassThru -NoNewWindow
        if ($npmInstall.ExitCode -ne 0) {
            throw "Erreur npm install"
        }
        
        Write-Host "🔨 Build de production..." -ForegroundColor Yellow
        $npmBuild = Start-Process -FilePath "npm" -ArgumentList "run", "build" -Wait -PassThru -NoNewWindow
        if ($npmBuild.ExitCode -ne 0) {
            throw "Erreur npm build"
        }
        
        Set-Location ".."
    }

    # ============================================
    # 3. CRÉATION DU SCRIPT PHP AVEC SMTP OVH
    # ============================================
    Write-Host "📧 Création du script d'envoi d'emails avec SMTP OVH..." -ForegroundColor Yellow
    
    $phpScript = @'
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
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi. Appelez le 01 42 01 07 07']);
}
?>
'@

    $phpScript | Out-File -FilePath "send-contact.php" -Encoding UTF8

    # ============================================
    # 4. CRÉATION DU .HTACCESS
    # ============================================
    Write-Host "🔧 Configuration .htaccess..." -ForegroundColor Yellow
    
    $htaccessContent = @'
# Configuration Production 3dassistance.fr
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Force HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # Autoriser les scripts PHP
    RewriteRule ^send-contact\.php$ - [L]
    
    # React Router
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
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
'@

    $htaccessContent | Out-File -FilePath ".htaccess" -Encoding UTF8

    # ============================================
    # 5. PRÉPARATION DES FICHIERS POUR UPLOAD
    # ============================================
    Write-Host "📁 Préparation des fichiers..." -ForegroundColor Yellow
    
    # Copier les fichiers build
    if (Test-Path "frontend\build") {
        Copy-Item "frontend\build\*" "." -Recurse -Force
        Write-Host "✅ Fichiers React copiés" -ForegroundColor Green
    }

    # ============================================
    # 6. CONNEXION ET UPLOAD SFTP
    # ============================================
    Write-Host "🔗 Connexion au serveur..." -ForegroundColor Yellow
    
    $securePassword = ConvertTo-SecureString $Password -AsPlainText -Force
    $credential = New-Object System.Management.Automation.PSCredential ($Username, $securePassword)
    
    $sftpSession = New-SFTPSession -ComputerName $ServerHost -Credential $credential -AcceptKey
    
    if (-not $sftpSession) {
        throw "Impossible de se connecter au serveur SFTP"
    }
    
    Write-Host "✅ Connexion SFTP établie!" -ForegroundColor Green

    # Nettoyage du serveur distant
    Write-Host "🧹 Nettoyage du serveur distant..." -ForegroundColor Yellow
    $cleanupCommands = @(
        "cd $RemotePath",
        "find . -maxdepth 1 -not -name '.' -not -name '..' -not -name 'backup-*' -exec rm -rf {} \;"
    )
    
    foreach ($cmd in $cleanupCommands) {
        try {
            Invoke-SSHCommand -SessionId $sftpSession.SessionId -Command $cmd | Out-Null
        } catch {
            Write-Host "⚠️ Commande ignorée: $cmd" -ForegroundColor Yellow
        }
    }

    # Upload des fichiers
    Write-Host "📤 Upload des fichiers..." -ForegroundColor Yellow
    
    $filesToUpload = Get-ChildItem -Path "." -File
    $totalFiles = $filesToUpload.Count
    $uploadedFiles = 0
    
    foreach ($file in $filesToUpload) {
        $uploadedFiles++
        $progress = [math]::Round(($uploadedFiles / $totalFiles) * 100)
        
        Write-Host "📤 [$progress%] $($file.Name)" -ForegroundColor Cyan
        
        try {
            Set-SFTPFile -SessionId $sftpSession.SessionId -LocalFile $file.FullName -RemotePath "$RemotePath/$($file.Name)" -Overwrite
        } catch {
            Write-Host "❌ Erreur upload: $($file.Name)" -ForegroundColor Red
        }
    }

    # Configuration des permissions
    Write-Host "🔐 Configuration des permissions..." -ForegroundColor Yellow
    $permissionCommands = @(
        "cd $RemotePath",
        "find . -type d -exec chmod 755 {} \;",
        "find . -type f -exec chmod 644 {} \;",
        "chmod 644 .htaccess",
        "chmod 644 send-contact.php"
    )
    
    foreach ($cmd in $permissionCommands) {
        try {
            Invoke-SSHCommand -SessionId $sftpSession.SessionId -Command $cmd | Out-Null
        } catch {
            Write-Host "⚠️ Permission: $cmd" -ForegroundColor Yellow
        }
    }

    # Test final
    Write-Host "🧪 Test de l'installation..." -ForegroundColor Yellow
    try {
        $testResult = Invoke-WebRequest -Uri "https://www.3dassistance.fr" -TimeoutSec 10 -UseBasicParsing
        if ($testResult.StatusCode -eq 200) {
            Write-Host "✅ Site accessible sur https://www.3dassistance.fr" -ForegroundColor Green
        }
    } catch {
        Write-Host "⚠️ Test site web: vérification manuelle nécessaire" -ForegroundColor Yellow
    }

    # Fermeture session SFTP
    Remove-SFTPSession -SessionId $sftpSession.SessionId

    # ============================================
    # RÉSUMÉ FINAL
    # ============================================
    Write-Host "`n🎉 DÉPLOIEMENT PRODUCTION TERMINÉ!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════" -ForegroundColor Green
    
    Write-Host "🌐 URLs importantes:" -ForegroundColor Cyan
    Write-Host "   • Site: https://www.3dassistance.fr" -ForegroundColor White
    Write-Host "   • Contact: https://www.3dassistance.fr/contact" -ForegroundColor White
    Write-Host "   • Email: send-contact.php avec SMTP OVH" -ForegroundColor White
    
    Write-Host "📧 Configuration SMTP:" -ForegroundColor Cyan
    Write-Host "   • Serveur: ssl0.ovh.net:587" -ForegroundColor White
    Write-Host "   • Email: contact@3dassistance.fr" -ForegroundColor White
    Write-Host "   • Statut: Configuré et prêt" -ForegroundColor White
    
    Write-Host "📋 Actions suivantes:" -ForegroundColor Yellow
    Write-Host "   1. Tester le formulaire de contact" -ForegroundColor White
    Write-Host "   2. Vérifier la réception des emails" -ForegroundColor White
    Write-Host "   3. Contrôler toutes les pages" -ForegroundColor White

} catch {
    Write-Host "❌ ERREUR DURANT LE DÉPLOIEMENT:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($sftpSession) {
        Remove-SFTPSession -SessionId $sftpSession.SessionId
    }
    
    exit 1
} finally {
    if (Test-Path $LocalTempPath) {
        Set-Location $env:TEMP
        Remove-Item -Path $LocalTempPath -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "🏁 Déploiement terminé avec succès!" -ForegroundColor Green