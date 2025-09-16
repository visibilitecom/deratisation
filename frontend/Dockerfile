# Dockerfile pour React Frontend
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et yarn.lock
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=development

# Commande de démarrage
CMD ["yarn", "start"]