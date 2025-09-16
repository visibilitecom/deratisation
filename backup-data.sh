#!/bin/bash

# Script de sauvegarde des données MongoDB
# Acces Services - Migration vers Cloudways

echo "💾 Début de la sauvegarde des données..."

# Variables
BACKUP_DIR="./backup-$(date +%Y%m%d-%H%M%S)"
DB_NAME="test_database"
MONGO_HOST="localhost"
MONGO_PORT="27017"

# Créer le dossier de sauvegarde
mkdir -p "$BACKUP_DIR"

echo "📁 Création du dossier de sauvegarde: $BACKUP_DIR"

# Sauvegarde MongoDB
echo "🗄️ Sauvegarde de la base de données MongoDB..."

if command -v mongodump >/dev/null 2>&1; then
    mongodump --host "$MONGO_HOST":"$MONGO_PORT" --db "$DB_NAME" --out "$BACKUP_DIR/mongodb"
    echo "✅ Sauvegarde MongoDB terminée"
else
    echo "⚠️ mongodump non disponible, tentative avec Docker..."
    
    if docker ps --format "table {{.Names}}" | grep -q mongodb; then
        docker exec mongodb mongodump --db "$DB_NAME" --out /tmp/backup
        docker cp mongodb:/tmp/backup "$BACKUP_DIR/mongodb"
        echo "✅ Sauvegarde MongoDB via Docker terminée"
    else
        echo "❌ Impossible de sauvegarder MongoDB"
    fi
fi

# Sauvegarde des fichiers de configuration
echo "⚙️ Sauvegarde des configurations..."

# Variables d'environnement
cp -r ./frontend/.env "$BACKUP_DIR/frontend.env" 2>/dev/null || echo "⚠️ Pas de .env frontend"
cp -r ./backend/.env "$BACKUP_DIR/backend.env" 2>/dev/null || echo "⚠️ Pas de .env backend"

# Fichiers de configuration
cp ./package.json "$BACKUP_DIR/" 2>/dev/null
cp ./frontend/package.json "$BACKUP_DIR/frontend-package.json" 2>/dev/null
cp ./backend/requirements.txt "$BACKUP_DIR/" 2>/dev/null

echo "✅ Sauvegarde des configurations terminée"

# Sauvegarde des assets et uploads (si ils existent)
echo "🖼️ Sauvegarde des assets..."

if [ -d "./frontend/public/uploads" ]; then
    cp -r ./frontend/public/uploads "$BACKUP_DIR/uploads"
    echo "✅ Assets frontend sauvegardés"
fi

if [ -d "./backend/uploads" ]; then
    cp -r ./backend/uploads "$BACKUP_DIR/backend-uploads"
    echo "✅ Uploads backend sauvegardés"
fi

# Créer un fichier de métadonnées
echo "📝 Création des métadonnées de sauvegarde..."

cat > "$BACKUP_DIR/metadata.txt" << EOF
# Métadonnées de sauvegarde - Acces Services
Date de sauvegarde: $(date)
Source: Emergent Platform
Destination: Cloudways
Database: $DB_NAME
Host: $MONGO_HOST:$MONGO_PORT

# Structure du projet
Frontend: React + Tailwind CSS + Shadcn UI
Backend: FastAPI + Python
Database: MongoDB
Reverse Proxy: Nginx

# Pages principales:
- Homepage (/)
- Dératisation Paris (/deratisation-paris)
- Punaises de lit (/punaises-de-lit-paris)
- Désinsectisation (/desinsectisation-paris)
- Secteurs Pro (/secteurs-pro)
- Particuliers (/particuliers)
- Zones d'intervention (/zones-intervention)
- Tarifs (/tarifs)
- À propos (/a-propos)
- FAQ (/faq)
- Contact (/contact)

# SEO et optimisations
- react-helmet-async pour les meta-tags
- Structured data (JSON-LD)
- OpenGraph et Twitter Cards
- Optimisation locale Paris/IDF

# Variables d'environnement importantes:
- REACT_APP_BACKEND_URL
- MONGO_URL
- CORS_ORIGINS
EOF

# Compression de la sauvegarde
echo "🗜️ Compression de la sauvegarde..."

if command -v tar >/dev/null 2>&1; then
    tar -czf "$BACKUP_DIR.tar.gz" "$BACKUP_DIR"
    rm -rf "$BACKUP_DIR"
    echo "✅ Sauvegarde compressée: $BACKUP_DIR.tar.gz"
else
    echo "⚠️ tar non disponible, sauvegarde non compressée: $BACKUP_DIR"
fi

echo ""
echo "🎉 Sauvegarde terminée avec succès !"
echo "📍 Localisation: $(pwd)/$BACKUP_DIR.tar.gz"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Téléchargez le fichier de sauvegarde"
echo "2. Transférez-le sur votre serveur Cloudways"  
echo "3. Restaurez les données après la migration"
echo ""
echo "💡 Commande de restauration sur Cloudways:"
echo "tar -xzf $BACKUP_DIR.tar.gz"
echo "mongorestore --db acces_services_db $BACKUP_DIR/mongodb/test_database"