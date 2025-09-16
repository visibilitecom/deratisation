#!/bin/bash

# Script de déploiement pour Cloudways
# Acces Services - Pest Control Website

echo "🚀 Début du déploiement Acces Services sur Cloudways..."

# Variables de configuration
PROJECT_NAME="acces-services"
DOMAIN="your-domain.com"  # À remplacer par votre domaine

# Étape 1: Vérification des prérequis
echo "📋 Vérification des prérequis..."
command -v docker >/dev/null 2>&1 || { echo "❌ Docker requis mais non installé."; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "❌ Docker Compose requis mais non installé."; exit 1; }

# Étape 2: Arrêt des services existants (si ils existent)
echo "🛑 Arrêt des services existants..."
docker-compose down 2>/dev/null || true

# Étape 3: Construction des images
echo "🔨 Construction des images Docker..."
docker-compose build --no-cache

# Étape 4: Démarrage des services
echo "🚀 Démarrage des services..."
docker-compose up -d

# Étape 5: Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..."
sleep 30

# Étape 6: Vérification de la santé des services
echo "🏥 Vérification de la santé des services..."

# Vérifier MongoDB
if docker-compose exec -T mongodb mongosh --eval "db.runCommand('ping')" >/dev/null 2>&1; then
    echo "✅ MongoDB opérationnel"
else
    echo "❌ MongoDB non accessible"
fi

# Vérifier Backend
if curl -f http://localhost:8001/api/ >/dev/null 2>&1; then
    echo "✅ Backend FastAPI opérationnel"
else
    echo "❌ Backend non accessible"
fi

# Vérifier Frontend
if curl -f http://localhost:3000 >/dev/null 2>&1; then
    echo "✅ Frontend React opérationnel"
else
    echo "❌ Frontend non accessible"
fi

# Étape 7: Configuration production (si nécessaire)
if [ "$1" = "production" ]; then
    echo "🏭 Configuration pour production..."
    
    # Build de production du frontend
    echo "📦 Build de production React..."
    docker-compose exec frontend yarn build
    
    # Configuration Nginx
    echo "🌐 Configuration Nginx..."
    sudo cp nginx.conf /etc/nginx/sites-available/$PROJECT_NAME
    sudo ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
fi

echo "🎉 Déploiement terminé !"
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend API: http://localhost:8001/api"
echo "📍 MongoDB: mongodb://localhost:27017"

echo ""
echo "📝 Prochaines étapes:"
echo "1. Configurez votre domaine: $DOMAIN"
echo "2. Configurez SSL/HTTPS"
echo "3. Importez vos données MongoDB (si nécessaire)"
echo "4. Configurez les variables d'environnement de production"