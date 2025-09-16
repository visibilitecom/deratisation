#!/bin/bash

# Script de déploiement spécifique pour Cloudways
# URL: https://phpstack-804496-5861124.cloudwaysapps.com/

echo "🚀 Déploiement Acces Services sur Cloudways..."

# Variables spécifiques
APP_PATH="/home/master/applications/phpstack-804496/public_html"
DOMAIN="phpstack-804496-5861124.cloudwaysapps.com"

echo "📍 Répertoire de travail: $APP_PATH"
echo "🌐 Domaine: $DOMAIN"

# Étape 1: Installation des dépendances système
echo "📦 Vérification des prérequis..."

# Installer Node.js et npm si nécessaire
if ! command -v node &> /dev/null; then
    echo "⬇️ Installation de Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Installer yarn
if ! command -v yarn &> /dev/null; then
    echo "⬇️ Installation de Yarn..."
    npm install -g yarn
fi

# Installer Python 3.9+ et pip
if ! command -v python3.9 &> /dev/null; then
    echo "⬇️ Installation de Python 3.9..."
    sudo apt update
    sudo apt install -y python3.9 python3.9-pip python3.9-venv
fi

# Étape 2: Installation MongoDB
echo "🗄️ Configuration MongoDB..."
if ! command -v mongod &> /dev/null; then
    echo "⬇️ Installation de MongoDB..."
    wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    sudo systemctl start mongod
    sudo systemctl enable mongod
fi

# Étape 3: Build du Frontend
echo "🏗️ Build du frontend React..."
cd $APP_PATH/frontend

# Installation des dépendances
yarn install --frozen-lockfile

# Build de production
yarn build

echo "✅ Frontend buildé avec succès"

# Étape 4: Configuration du Backend
echo "⚙️ Configuration du backend FastAPI..."
cd $APP_PATH/backend

# Créer un environnement virtuel
python3.9 -m venv venv
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt

echo "✅ Backend configuré avec succès"

# Étape 5: Démarrage des services
echo "🚀 Démarrage des services..."

# Démarrer le backend en arrière-plan
cd $APP_PATH/backend
source venv/bin/activate
nohup uvicorn server:app --host 0.0.0.0 --port 8001 > backend.log 2>&1 &
echo $! > backend.pid

echo "✅ Backend démarré sur le port 8001"

# Étape 6: Configuration Nginx
echo "🌐 Configuration Nginx..."
sudo cp $APP_PATH/nginx-cloudways.conf /etc/nginx/sites-available/acces-services
sudo ln -sf /etc/nginx/sites-available/acces-services /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Étape 7: Vérifications finales
echo "🏥 Vérifications finales..."

sleep 10

# Vérifier le backend
if curl -f http://localhost:8001/api/ >/dev/null 2>&1; then
    echo "✅ Backend FastAPI opérationnel"
else
    echo "⚠️ Backend pourrait avoir des problèmes, vérifiez les logs"
fi

# Vérifier MongoDB
if pgrep mongod > /dev/null; then
    echo "✅ MongoDB opérationnel"
else
    echo "⚠️ MongoDB non démarré"
fi

echo ""
echo "🎉 Déploiement terminé !"
echo "📍 Site web: https://$DOMAIN"
echo "📍 API: https://$DOMAIN/api"
echo ""
echo "📝 Commandes utiles:"
echo "Logs backend: tail -f $APP_PATH/backend/backend.log"
echo "Redémarrer backend: kill \$(cat $APP_PATH/backend/backend.pid) && cd $APP_PATH/backend && source venv/bin/activate && nohup uvicorn server:app --host 0.0.0.0 --port 8001 > backend.log 2>&1 & echo \$! > backend.pid"
echo "Logs Nginx: tail -f /var/log/nginx/acces_services_error.log"