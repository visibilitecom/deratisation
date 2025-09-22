#!/bin/bash
echo "🚀 Déploiement 3dassistance.fr avec système d'email..."

cd ~/public_html

# Nettoyage
rm -rf * .* 2>/dev/null || true

# Clone
git clone https://github.com/visibilitecom/deratisation.git .

# Build React
if [ -f "frontend/package.json" ]; then
    cd frontend
    npm install --production
    npm run build
    mv build/* ../
    cd ..
    rm -rf frontend backend node_modules
fi

# Copie des scripts email depuis ce repository
echo "📧 Installation des scripts d'envoi d'email..."

# Script send-email.php sera déjà dans le repo après ce commit

# Configuration .htaccess
echo "🔧 Configuration .htaccess..."
# Le .htaccess sera aussi dans le repo

# Test de la fonction mail
echo "🧪 Test de la fonction mail()..."
php -r "
if (function_exists('mail')) {
    echo '✅ Fonction mail() disponible\n';
    \$result = mail('contact@3dassistance.fr', 'Test Deploy', 'Test depuis script de déploiement');
    echo \$result ? '✅ Test envoi OK\n' : '❌ Test envoi ÉCHEC\n';
} else {
    echo '❌ Fonction mail() non disponible\n';
}
"

# Permissions
chmod -R 755 .
chmod 644 .htaccess
chmod 644 *.php

echo "✅ Déploiement terminé avec système d'email!"
echo "🌐 Site: https://www.3dassistance.fr"
echo "📧 Test email: https://www.3dassistance.fr/test-email.php"