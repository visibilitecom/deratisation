# Dockerfile pour FastAPI Backend
FROM python:3.9-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier et installer les dépendences
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 8001

# Variables d'environnement par défaut
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Commande de démarrage
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]