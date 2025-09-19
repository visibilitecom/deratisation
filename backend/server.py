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

# Endpoint pour recevoir les formulaires de contact
@api_router.post("/contact", response_model=dict)
async def submit_contact_form(form_data: ContactForm):
    """Recevoir et sauvegarder un formulaire de contact"""
    try:
        # Sauvegarder en base de données
        form_dict = form_data.dict(by_alias=True)
        result = await db.contact_forms.insert_one(form_dict)
        
        # Log pour debug
        print(f"Nouveau formulaire de contact reçu: {form_data.nom} - {form_data.typeProbleme}")
        
        return {
            "success": True, 
            "message": "Votre demande a été envoyée avec succès. Nous vous recontacterons rapidement.",
            "id": form_data.id
        }
    except Exception as e:
        print(f"Erreur lors de l'envoi du formulaire: {str(e)}")
        return {
            "success": False, 
            "message": "Une erreur est survenue. Veuillez réessayer ou nous appeler directement."
        }

# Endpoint pour récupérer les formulaires (admin)
@api_router.get("/contact", response_model=List[ContactForm])
async def get_contact_forms():
    """Récupérer tous les formulaires de contact"""
    forms = await db.contact_forms.find().sort("timestamp", -1).to_list(1000)
    return [ContactForm(**form) for form in forms]

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
