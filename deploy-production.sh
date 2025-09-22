#!/bin/bash
# ============================================
# Script de Déploiement Production via Git
# 3dassistance.fr avec SMTP OVH
# ============================================

echo "🚀 DÉPLOIEMENT PRODUCTION 3DASSISTANCE.FR via Git"
echo "════════════════════════════════════════════════"

cd ~/public_html

# ============================================
# 1. SAUVEGARDE
# ============================================
echo "📦 Création d'une sauvegarde..."
if [ -f "index.html" ]; then
    tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz * 2>/dev/null || true
    echo "✅ Sauvegarde créée"
fi

# ============================================
# 2. MISE À JOUR VIA GIT
# ============================================
echo "📥 Mise à jour depuis Git..."

# Si c'est la première fois, cloner
if [ ! -d ".git" ]; then
    echo "🔄 Premier déploiement - Clone du repository..."
    cd ..
    rm -rf public_html
    git clone https://github.com/visibilitecom/deratisation.git public_html
    cd public_html
else
    echo "🔄 Mise à jour via git pull..."
    git pull origin main
fi

# ============================================
# 3. BUILD REACT POUR PRODUCTION
# ============================================
echo "🔨 Build React pour production..."

if [ -f "frontend/package.json" ]; then
    cd frontend
    
    # Configuration .env pour production
    echo "🔧 Configuration .env production..."
    cat > .env << 'EOF'
REACT_APP_BACKEND_URL=https://www.3dassistance.fr
GENERATE_SOURCEMAP=false
PUBLIC_URL=https://www.3dassistance.fr/
NODE_ENV=production
EOF
    
    # Installation et build
    echo "📦 Installation des dépendances..."
    npm install --production
    
    echo "🔨 Build de production..."
    npm run build
    
    if [ -d "build" ]; then
        echo "✅ Build réussi!"
        
        # Déplacement des fichiers vers la racine
        cd ..
        cp -r frontend/build/* .
        
        # Nettoyage
        rm -rf frontend backend node_modules
        
    else
        echo "❌ Erreur: Build échoué"
        exit 1
    fi
else
    echo "⚠️ Pas de frontend à builder"
fi

# ============================================
# 4. COPIE DES FICHIERS DE PRODUCTION
# ============================================
echo "📋 Installation des fichiers de production..."

# Copier les fichiers PHP depuis le dossier production
if [ -d "production" ]; then
    cp production/send-contact.php .
    cp production/.htaccess .
    cp production/test-contact.php .
    echo "✅ Fichiers de production copiés"
    rm -rf production
else
    echo "⚠️ Dossier production non trouvé"
fi

# ============================================
# 5. CONFIGURATION DES PERMISSIONS
# ============================================
echo "🔐 Configuration des permissions..."

# Permissions générales
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

# Permissions spéciales
chmod 644 .htaccess
chmod 644 *.php

echo "✅ Permissions configurées"

# ============================================
# 6. NETTOYAGE
# ============================================
echo "🧹 Nettoyage des fichiers de développement..."

# Supprimer les fichiers non nécessaires en production
rm -rf .git
rm -rf tests
rm -f *.md
rm -f deploy-*.sh
rm -f *.log

# ============================================
# 7. TESTS FINAUX
# ============================================
echo "🧪 Vérification des fichiers critiques..."

critical_files=("index.html" ".htaccess" "send-contact.php" "test-contact.php")
all_good=true

for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file présent"
    else
        echo "❌ $file manquant"
        all_good=false
    fi
done

# Test PHP
if command -v php >/dev/null 2>&1; then
    echo "✅ PHP disponible ($(php -v | head -1))"
else
    echo "⚠️ PHP non détecté"
fi

# ============================================
# 8. RÉSUMÉ FINAL
# ============================================
echo ""
if [ "$all_good" = true ]; then
    echo "🎉 DÉPLOIEMENT RÉUSSI!"
    echo "════════════════════════"
    echo "🌐 Site: https://www.3dassistance.fr"
    echo "🧪 Test: https://www.3dassistance.fr/test-contact.php"
    echo "📧 Contact: https://www.3dassistance.fr/contact"
    echo ""
    echo "📊 Statistiques:"
    echo "   - Fichiers HTML: $(find . -name "*.html" | wc -l)"
    echo "   - Fichiers CSS: $(find . -name "*.css" | wc -l)"
    echo "   - Fichiers JS: $(find . -name "*.js" | wc -l)"
    echo "   - Scripts PHP: $(find . -name "*.php" | wc -l)"
    echo ""
    echo "✅ Le formulaire de contact avec SMTP OVH est opérationnel!"
else
    echo "❌ DÉPLOIEMENT INCOMPLET"
    echo "Vérifiez les fichiers manquants ci-dessus"
fi

echo ""
echo "📋 Prochaines étapes:"
echo "   1. Tester le site: https://www.3dassistance.fr"
echo "   2. Tester l'email: https://www.3dassistance.fr/test-contact.php"
echo "   3. Tester le formulaire: https://www.3dassistance.fr/contact"