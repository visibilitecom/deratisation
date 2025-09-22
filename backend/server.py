from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import HTTPException


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Modèle pour le formulaire de contact
class ContactForm(BaseModel):
    nom: str
    telephone: str
    codePostal: str = ""
    typeProbleme: str
    message: str = ""

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Backend simplifié - pas de gestion des formulaires de contact
# Les formulaires utilisent directement mailto:

# Endpoint pour l'envoi d'emails de contact
@api_router.post("/send-contact")
async def send_contact_email(contact: ContactForm):
    """
    Envoie un email de contact depuis le formulaire 3dassistance.fr
    """
    try:
        # Validation des champs obligatoires
        if not contact.nom or not contact.telephone or not contact.typeProbleme:
            raise HTTPException(status_code=400, detail="Nom, téléphone et type de problème sont obligatoires")
        
        # Configuration email
        to_email = "contact@3dassistance.fr"
        subject = f"🎯 Nouvelle demande - {contact.typeProbleme}"
        
        # Corps du message HTML
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }}
                .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; }}
                .header {{ background: #1FA77D; color: white; padding: 25px; text-align: center; }}
                .header h1 {{ margin: 0; font-size: 24px; }}
                .content {{ padding: 30px; background: #f9f9f9; }}
                .field {{ margin-bottom: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #1FA77D; }}
                .label {{ font-weight: bold; color: #1FA77D; font-size: 14px; }}
                .value {{ margin-top: 5px; font-size: 16px; color: #333; }}
                .message-box {{ background: white; padding: 20px; margin-top: 10px; border-radius: 5px; border: 1px solid #ddd; }}
                .footer {{ padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f0f0f0; }}
                .urgent {{ background: #fff3cd; border-left: 4px solid #ffc107; }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>🎯 Nouvelle demande de devis</h1>
                    <p>3dassistance.fr - Dératisation Paris</p>
                </div>
                <div class='content'>
                    <div class='field'>
                        <div class='label'>👤 CLIENT</div>
                        <div class='value'>{contact.nom}</div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>📞 TÉLÉPHONE</div>
                        <div class='value'><a href='tel:{contact.telephone}'>{contact.telephone}</a></div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>📍 ZONE D'INTERVENTION</div>
                        <div class='value'>{contact.codePostal or 'Non précisé'}</div>
                    </div>
                    
                    <div class='field urgent'>
                        <div class='label'>🐭 TYPE DE PROBLÈME</div>
                        <div class='value'><strong>{contact.typeProbleme}</strong></div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>💬 DÉTAILS CLIENT</div>
                        <div class='message-box'>{contact.message or 'Aucun message supplémentaire'}</div>
                    </div>
                </div>
                <div class='footer'>
                    <p><strong>📅 Reçu le {datetime.now().strftime('%d/%m/%Y à %H:%M:%S')}</strong></p>
                    <p>🌐 Depuis le formulaire contact de www.3dassistance.fr</p>
                    <p>⚡ <strong>Action requise :</strong> Recontacter sous 2h selon engagement</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Version texte pour clients email anciens
        text_body = f"""
NOUVELLE DEMANDE DE DEVIS - 3DASSISTANCE.FR

👤 Client : {contact.nom}
📞 Téléphone : {contact.telephone}  
📍 Code postal : {contact.codePostal or 'Non précisé'}
🐭 Problème : {contact.typeProbleme}

💬 Message client :
{contact.message or 'Aucun message supplémentaire'}

---
📅 Reçu le {datetime.now().strftime('%d/%m/%Y à %H:%M:%S')}
🌐 Depuis www.3dassistance.fr
⚡ Action : Recontacter sous 2h
        """
        
        # Création du message email
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = "3D Assistance <noreply@3dassistance.fr>"
        msg['To'] = to_email
        msg['Reply-To'] = f"{contact.nom} <contact@3dassistance.fr>"
        
        # Ajout des parties texte et HTML
        part1 = MIMEText(text_body, 'plain', 'utf-8')
        part2 = MIMEText(html_body, 'html', 'utf-8')
        
        msg.attach(part1)
        msg.attach(part2)
        
        # Tentative d'envoi via SMTP local (pour développement)
        try:
            # Configuration SMTP (à adapter selon votre serveur)
            smtp_server = os.environ.get('SMTP_SERVER', 'localhost')
            smtp_port = int(os.environ.get('SMTP_PORT', '25'))
            smtp_user = os.environ.get('SMTP_USER', '')
            smtp_password = os.environ.get('SMTP_PASSWORD', '')
            
            server = smtplib.SMTP(smtp_server, smtp_port)
            
            if smtp_user and smtp_password:
                server.starttls()
                server.login(smtp_user, smtp_password)
            
            server.send_message(msg)
            server.quit()
            
            # Log de succès
            logger.info(f"CONTACT EMAIL ENVOYÉ: {contact.nom} ({contact.telephone}) - {contact.typeProbleme}")
            
            # Sauvegarde en base de données
            contact_data = contact.dict()
            contact_data['id'] = str(uuid.uuid4())
            contact_data['timestamp'] = datetime.utcnow()
            contact_data['status'] = 'email_sent'
            
            await db.contacts.insert_one(contact_data)
            
            return {
                "success": True,
                "message": "Votre demande a été envoyée avec succès ! Nous vous recontactons sous 2h.",
                "contact_id": contact_data['id']
            }
            
        except Exception as smtp_error:
            logger.error(f"ERREUR SMTP: {str(smtp_error)}")
            
            # Fallback : sauvegarde en base avec statut "email_failed"
            contact_data = contact.dict()
            contact_data['id'] = str(uuid.uuid4())
            contact_data['timestamp'] = datetime.utcnow()
            contact_data['status'] = 'email_failed'
            contact_data['error'] = str(smtp_error)
            
            await db.contacts.insert_one(contact_data)
            
            logger.warning(f"CONTACT SAUVÉ SANS EMAIL: {contact.nom} ({contact.telephone})")
            
            return {
                "success": True,
                "message": "Votre demande a été enregistrée. Nous vous recontactons sous 2h.",
                "contact_id": contact_data['id'],
                "note": "Email en attente d'envoi"
            }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"ERREUR CONTACT FORM: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

# Endpoint pour récupérer les contacts (admin)
@api_router.get("/contacts")
async def get_contacts():
    """
    Récupère tous les contacts enregistrés (pour admin)
    """
    try:
        contacts = await db.contacts.find().sort('timestamp', -1).to_list(100)
        # Convert MongoDB ObjectId to string for JSON serialization
        for contact in contacts:
            if '_id' in contact:
                contact['_id'] = str(contact['_id'])
        return {"contacts": contacts}
    except Exception as e:
        logger.error(f"ERREUR GET CONTACTS: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des contacts")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
