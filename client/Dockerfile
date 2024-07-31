# Utiliser une image Node.js plus récente
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Installer un serveur HTTP simple pour servir les fichiers statiques
RUN npm install -g serve

# Exposer le port sur lequel l'application va tourner
EXPOSE 5173

# Démarrer l'application
CMD [ "serve", "-s", "build", "-l", "5173" ]
