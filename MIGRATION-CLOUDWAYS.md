# 🚀 Guide de Migration - Acces Services vers Cloudways

## 📋 Pré-requis

- Compte Cloudways actif
- Serveur configuré (recommandé: DigitalOcean, 2GB RAM minimum)
- Domaine pointant vers votre serveur Cloudways
- Accès SSH au serveur

## 🔄 Processus de Migration

### Étape 1: Export depuis Emergent

1. **Sauvegarder le code sur GitHub**
   - Cliquez sur "Save to GitHub" dans l'interface Emergent
   - Sélectionnez votre repository
   - Validez l'export

2. **Noter les variables d'environnement actuelles**
   ```bash
   # Frontend
   REACT_APP_BACKEND_URL=https://deratisation-pro.preview.emergentagent.com
   
   # Backend  
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=test_database
   ```

### Étape 2: Préparation sur Cloudways

3. **Connexion SSH à votre serveur**
   ```bash
   ssh master@your-server-ip
   ```

4. **Cloner le repository**
   ```bash
   cd /var/www/html
   git clone https://github.com/your-username/your-repo.git acces-services
   cd acces-services
   ```

5. **Copier et configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   nano .env  # Adapter les valeurs
   ```

### Étape 3: Installation et déploiement

6. **Installer Docker et Docker Compose** (si pas déjà fait)
   ```bash
   # Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   
   # Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

7. **Lancer le déploiement**
   ```bash
   ./deploy-cloudways.sh production
   ```

### Étape 4: Configuration Nginx

8. **Adapter la configuration Nginx**
   ```bash
   # Modifier nginx.conf avec votre domaine
   sed -i 's/your-domain.com/votre-domaine-reel.com/g' nginx.conf
   
   # Copier la configuration
   sudo cp nginx.conf /etc/nginx/sites-available/acces-services
   sudo ln -sf /etc/nginx/sites-available/acces-services /etc/nginx/sites-enabled/
   
   # Tester et redémarrer
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Étape 5: Configuration SSL

9. **Installer Let's Encrypt SSL**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
   ```

## 🔧 Configuration Post-Migration

### Variables d'environnement importantes

```bash
# Frontend (.env)
REACT_APP_BACKEND_URL=https://votre-domaine.com

# Backend 
MONGO_URL=mongodb://admin:password123@localhost:27017/acces_services_db
CORS_ORIGINS=https://votre-domaine.com
```

### Services à vérifier

- [ ] ✅ Frontend accessible sur https://votre-domaine.com
- [ ] ✅ API backend répond sur https://votre-domaine.com/api
- [ ] ✅ MongoDB connecté et fonctionnel
- [ ] ✅ Formulaire de contact opérationnel
- [ ] ✅ Navigation entre pages fluide
- [ ] ✅ SEO optimisé (titres, meta-descriptions)
- [ ] ✅ Responsive design mobile/desktop

## 🛠️ Commandes utiles

### Gestion des services
```bash
# Démarrer tous les services
docker-compose up -d

# Arrêter tous les services  
docker-compose down

# Voir les logs
docker-compose logs -f

# Redémarrer un service spécifique
docker-compose restart frontend
```

### Monitoring
```bash
# Status des services
docker-compose ps

# Utilisation des ressources
docker stats

# Logs nginx
sudo tail -f /var/log/nginx/acces_services_access.log
```

## 🆘 Dépannage

### Problèmes courants

1. **Frontend ne se charge pas**
   - Vérifier les variables d'environnement
   - S'assurer que le build React est correct
   - Vérifier la configuration Nginx

2. **API non accessible**
   - Vérifier les CORS origins
   - S'assurer que le backend démarre correctement
   - Vérifier les logs: `docker-compose logs backend`

3. **Base de données non connectée**
   - Vérifier la chaîne de connexion MongoDB
   - S'assurer que MongoDB démarre: `docker-compose logs mongodb`

### Contacts et support

- **Documentation React**: https://reactjs.org/docs
- **Documentation FastAPI**: https://fastapi.tiangolo.com
- **Support Cloudways**: https://support.cloudways.com

## 📊 Performance

### Recommandations post-migration

1. **Optimisation images**: Compresser les images de fond
2. **CDN**: Configurer un CDN pour les assets statiques
3. **Monitoring**: Mettre en place des alertes de monitoring
4. **Sauvegardes**: Programmer des sauvegardes automatiques
5. **Mise à jour**: Planifier les mises à jour de sécurité

---

**🎉 Félicitations ! Votre site Acces Services est maintenant migré sur Cloudways !**