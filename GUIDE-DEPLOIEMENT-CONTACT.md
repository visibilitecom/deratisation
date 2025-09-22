# 🚀 GUIDE DE DÉPLOIEMENT - PAGE CONTACT 3DASSISTANCE.FR

## ✅ FICHIERS PRÊTS POUR LE DÉPLOIEMENT

Le fichier **`deploy-3dassistance.zip`** contient tous les fichiers nécessaires pour déployer votre site avec la fonctionnalité d'envoi d'emails.

## 📧 CONFIGURATION SMTP OVH INTÉGRÉE

- **Serveur** : ssl0.ovh.net:587
- **Email** : contact@3dassistance.fr  
- **Mot de passe** : Prowler2016
- **Configuration** : Intégrée dans `send-contact.php`

## 🔧 ÉTAPES DE DÉPLOIEMENT

### **Option 1 : Déploiement Direct (Recommandé)**

1. **Téléchargez** le fichier `deploy-3dassistance.zip`
2. **Connectez-vous** à votre panel Cloudways
3. **Accédez** au gestionnaire de fichiers
4. **Supprimez** tous les fichiers dans `/public_html`
5. **Uploadez** et **décompressez** `deploy-3dassistance.zip` dans `/public_html`
6. **Testez** : https://www.3dassistance.fr/test-contact.php

### **Option 2 : Déploiement SSH**

```bash
# Connexion SSH
ssh detjqhufme@votre-serveur.cloudways.com

# Navigation et nettoyage
cd ~/public_html
rm -rf * .*

# Upload du fichier zip (via SCP ou interface web)
unzip deploy-3dassistance.zip

# Configuration des permissions
chmod 644 *.php
chmod 644 .htaccess
chmod -R 755 static/
```

## 🧪 TESTS APRÈS DÉPLOIEMENT

### **1. Test Principal**
- **URL** : https://www.3dassistance.fr
- **Vérifier** : Site se charge correctement

### **2. Test Configuration Email**
- **URL** : https://www.3dassistance.fr/test-contact.php
- **Vérifier** : Configuration SMTP OVH

### **3. Test Formulaire Contact**
- **URL** : https://www.3dassistance.fr/contact
- **Actions** :
  1. Remplir le formulaire
  2. Cliquer "Demande devis dératisation Paris"
  3. Vérifier redirection vers `/merci`
  4. Vérifier réception email sur `contact@3dassistance.fr`

## 📁 FICHIERS DÉPLOYÉS

| Fichier | Description |
|---------|-------------|
| `index.html` | Page principale React |
| `send-contact.php` | Script d'envoi d'emails avec SMTP OVH |
| `test-contact.php` | Page de diagnostic email |
| `.htaccess` | Configuration Apache (React Router + Performance) |
| `static/` | Assets React (CSS, JS, images) |
| `manifest.json` | Manifest PWA |
| `robots.txt` | Configuration robots SEO |
| `sitemap.xml` | Plan du site SEO |

## 🔍 FONCTIONNALITÉS INTÉGRÉES

### ✅ **Envoi d'Emails**
- Script PHP optimisé avec SMTP OVH
- Headers anti-spam
- Email HTML professionnel
- Log des envois

### ✅ **Performance**
- Compression GZIP
- Cache des assets
- Headers de performance
- Build React optimisé

### ✅ **SEO & Sécurité**
- Force HTTPS
- Headers de sécurité
- React Router configuré
- Meta-tags optimisés

## 🐛 DÉPANNAGE

### **Site ne se charge pas**
1. Vérifier `.htaccess` présent
2. Vérifier permissions (644 pour .htaccess)
3. Vérifier `index.html` en racine

### **Formulaire ne fonctionne pas**
1. Tester : https://www.3dassistance.fr/test-contact.php
2. Vérifier `send-contact.php` présent
3. Vérifier logs PHP du serveur

### **Emails non reçus**
1. Vérifier configuration SMTP dans `test-contact.php`
2. Contrôler dossier spam
3. Vérifier logs contact dans `contact_form.log`

## 📞 SUPPORT

Si problème persistant :
- **Vérifier** les logs serveur
- **Tester** chaque composant individuellement
- **Contacter** le support Cloudways si nécessaire

---

## 🎉 RÉSUMÉ

Une fois déployé, votre site **https://www.3dassistance.fr** aura :

✅ **Site React** entièrement fonctionnel  
✅ **Formulaire de contact** avec envoi d'emails réels  
✅ **Configuration SMTP OVH** opérationnelle  
✅ **Performance** et SEO optimisés  
✅ **Sécurité** renforcée  

**Le formulaire de contact enverra désormais de vrais emails à `contact@3dassistance.fr` !** 📧