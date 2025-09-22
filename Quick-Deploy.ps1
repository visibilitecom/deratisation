# ============================================
# Script de Déploiement Rapide - 3dassistance.fr
# ============================================

# 🔧 CONFIGURATION - Modifiez ces valeurs
$CONFIG = @{
    ServerHost = "server.cloudways.com"  # Votre serveur Cloudways
    Username = "detjqhufme"              # Votre nom d'utilisateur
    Password = "votre_mot_de_passe"      # Votre mot de passe
    RepoUrl = "https://github.com/visibilitecom/deratisation.git"
}

Write-Host "🚀 DÉPLOIEMENT RAPIDE 3DASSISTANCE.FR" -ForegroundColor Green
Write-Host "════════════════════════════════════════" -ForegroundColor Green

# Validation de la configuration
if ($CONFIG.Password -eq "votre_mot_de_passe") {
    Write-Host "❌ ERREUR: Veuillez configurer vos identifiants dans le script!" -ForegroundColor Red
    Write-Host "📝 Modifiez les variables dans la section CONFIG" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

# Confirmation avant déploiement
Write-Host "📋 Configuration:" -ForegroundColor Cyan
Write-Host "   • Serveur: $($CONFIG.ServerHost)" -ForegroundColor White
Write-Host "   • Utilisateur: $($CONFIG.Username)" -ForegroundColor White
Write-Host "   • Repository: $($CONFIG.RepoUrl)" -ForegroundColor White

$confirm = Read-Host "`n❓ Continuer le déploiement ? (o/N)"
if ($confirm -ne "o" -and $confirm -ne "O") {
    Write-Host "🚫 Déploiement annulé" -ForegroundColor Yellow
    exit 0
}

# Lancement du script principal
$scriptPath = Join-Path $PSScriptRoot "Deploy-3DAssistance.ps1"

if (Test-Path $scriptPath) {
    Write-Host "`n🎯 Lancement du déploiement..." -ForegroundColor Green
    
    & $scriptPath -ServerHost $CONFIG.ServerHost -Username $CONFIG.Username -Password $CONFIG.Password -RepoUrl $CONFIG.RepoUrl
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n🎉 Déploiement réussi!" -ForegroundColor Green
        Write-Host "🌐 Testez votre site: https://www.3dassistance.fr" -ForegroundColor Cyan
    } else {
        Write-Host "`n❌ Erreur durant le déploiement" -ForegroundColor Red
    }
} else {
    Write-Host "❌ ERREUR: Script Deploy-3DAssistance.ps1 non trouvé!" -ForegroundColor Red
    Write-Host "📁 Assurez-vous que les deux scripts sont dans le même dossier" -ForegroundColor Yellow
}

Read-Host "`nAppuyez sur Entrée pour quitter"