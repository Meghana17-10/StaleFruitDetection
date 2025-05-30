from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
from pymongo import MongoClient
import io
from predict import predict_all_models
import certifi
import os
from dotenv import load_dotenv
from datetime import datetime
from argon2 import PasswordHasher
import torch
from swin_model import load_swin_model
from vit_model import load_vit_model
from hybrid_model import load_hybrid_model
from transformers import AutoImageProcessor, AutoModelForImageClassification, ViTForImageClassification, ViTImageProcessor
import torch.nn.functional as F

load_dotenv()

app = FastAPI()
ph = PasswordHasher()
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Atlas connection with SSL
uri = os.getenv("MONGO_URI", "mongodb+srv://meghanajala07:8xfoAY2re2lxeB56@stalefruit.bydap9i.mongodb.net/?retryWrites=true&w=majority&appName=StaleFruit&tls=true")
client = MongoClient(uri, tlsCAFile=certifi.where())
db = client["StaleFruit"]
users_collection = db["users"]
history_collection = db["history"]

# Device (GPU or CPU)
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# Models (initialized in startup event)
swin_model = None
vit_model = None
hybrid_model = None
classifier_model = None
classifier_processor = None

# Valid classes for freshness detection
VALID_CLASSES = ['orange', 'banana', 'apple', 'tomato', 'bitter gourd', 'capsicum']

@app.on_event("startup")
def load_models():
    global swin_model, vit_model, hybrid_model, classifier_model, classifier_processor

    try:
        # Try loading fruits-specific model first
        classifier_processor = AutoImageProcessor.from_pretrained("nateraw/vit-base-patch16-224-fruits")
        classifier_model = AutoModelForImageClassification.from_pretrained("nateraw/vit-base-patch16-224-fruits")
        classifier_model.to(DEVICE)
        classifier_model.eval()
        print("Fruit classification model loaded")
    except Exception as e:
        print("Error loading fruits-specific model:", e)
        try:
            # Fallback to generic model
            classifier_processor = ViTImageProcessor.from_pretrained("google/vit-base-patch16-224")
            classifier_model = ViTForImageClassification.from_pretrained("google/vit-base-patch16-224")
            classifier_model.to(DEVICE)
            classifier_model.eval()
            print("Fallback classification model loaded")
        except Exception as e:
            print("Error loading fallback classification model:", e)

    try:
        swin_model = load_swin_model().to(DEVICE)
        swin_model.eval()
        print("Swin model loaded")
    except Exception as e:
        print("Error loading Swin model:", e)

    try:
        vit_model = load_vit_model().to(DEVICE)
        vit_model.eval()
        print("ViT model loaded")
    except Exception as e:
        print("Error loading ViT model:", e)

    try:
        hybrid_model = load_hybrid_model().to(DEVICE)
        hybrid_model.eval()
        print("Hybrid model loaded")
    except Exception as e:
        print("Error loading Hybrid model:", e)

def classify_fruit_type(image: Image.Image) -> str:
    """Classify the fruit/vegetable type using Hugging Face model"""
    try:
        # Preprocess image
        inputs = classifier_processor(images=image, return_tensors="pt").to(DEVICE)
        
        # Get model predictions
        with torch.no_grad():
            outputs = classifier_model(**inputs)
        
        # Calculate probabilities
        probabilities = F.softmax(outputs.logits, dim=-1)
        confidence, predicted_class_idx = torch.max(probabilities, dim=-1)
        confidence = confidence.item()
        predicted_class = classifier_model.config.id2label[predicted_class_idx.item()].lower()
        
        print(f"Classification result: {predicted_class} (confidence: {confidence:.2f})")
        
        # Only accept predictions with high confidence
        if confidence < 0.7:
            return "unknown"
        
        # Enhanced class mapping
        class_mapping = {
            'apple': 'apple',
            'banana': 'banana',
            'orange': 'orange',
            'tomato': 'tomato',
            'bitter gourd': 'bitter gourd',
            'bitter melon': 'bitter gourd',
            'bell pepper': 'capsicum',
            'pepper': 'capsicum',
            'capsicum': 'capsicum',
            'green pepper': 'capsicum',
            'red pepper': 'capsicum',
            'yellow pepper': 'capsicum',
            'granny smith': 'apple',
            'fuji apple': 'apple',
            'gala apple': 'apple',
            'navel orange': 'orange',
            'valencia orange': 'orange'
        }
        
        # Return mapped class or check for partial matches
        mapped_class = class_mapping.get(predicted_class, None)
        if mapped_class:
            return mapped_class
        
        # Check if any valid class is contained in the prediction
        for valid_class in VALID_CLASSES:
            if valid_class in predicted_class:
                return valid_class
                
        return "unknown"
            
    except Exception as e:
        print(f"Error during classification: {str(e)}")
        return "unknown"

def preprocess_image(image: Image.Image) -> Image.Image:
    """Basic image preprocessing"""
    # Resize and center crop
    image = image.resize((256, 256))
    width, height = image.size
    left = (width - 224)/2
    top = (height - 224)/2
    right = (width + 224)/2
    bottom = (height + 224)/2
    return image.crop((left, top, right, bottom))

@app.post("/predict")
async def detect_image(file: UploadFile = File(...)):
    try:
        if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
            raise HTTPException(status_code=400, detail="Unsupported file type. Use JPEG or PNG.")
        
        # Check if all required models are loaded
        if any(model is None for model in [swin_model, vit_model, hybrid_model, classifier_model, classifier_processor]):
            raise HTTPException(status_code=500, detail="Prediction failed: One or more models are not loaded.")

        # Read and prepare image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Preprocess image
        image = preprocess_image(image)

        # Classify the fruit/vegetable type
        fruit_type = classify_fruit_type(image)
        print(f"Detected fruit type: {fruit_type}")
        
        # Check if the detected type is valid
        if fruit_type.lower() not in [c.lower() for c in VALID_CLASSES]:
            return {
                "status": "invalid",
                "message": f"Invalid image. Detected: {fruit_type if fruit_type != 'unknown' else 'unrecognized item'}. Supported types: {', '.join(VALID_CLASSES)}"
            }

        # Get freshness predictions from all models
        results = predict_all_models(image, {
            "swin_prediction": swin_model,
            "vit_prediction": vit_model,
            "hybrid_prediction": hybrid_model
        }, device=DEVICE)
        
        # Add the detected fruit type to results
        results["fruit_class"] = fruit_type
        
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# Pydantic models
class User(BaseModel):
    username: str
    email: str
    password: str

class SignInRequest(BaseModel):
    email: str
    password: str

class PredictionHistory(BaseModel):
    user_email: str
    image_url: str
    prediction: str
    confidence: float
    timestamp: str

# Add root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Stale Fruit Detection API",
        "endpoints": {
            "health_check": "/health",
            "signup": "/signup",
            "signin": "/signin",
            "save_prediction": "/save_prediction",
            "get_history": "/get_history"
        }
    }

@app.get("/health")
async def health_check():
    try:
        # Test database connection
        db.command('ping')
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": "disconnected", "error": str(e)}

@app.post("/signup")
async def signup(user: User):
    try:
        # Case-insensitive email check
        existing_user = users_collection.find_one({"email": {"$regex": f"^{user.email}$", "$options": "i"}})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already in use")

        # Hash the password using Argon2id
        hashed_password = ph.hash(user.password)
        
        # Create user data
        user_data = {
            "username": user.username,
            "email": user.email,
            "password": hashed_password
        }

        # Insert new user
        result = users_collection.insert_one(user_data)
        
        return {
            "id": str(result.inserted_id),
            "username": user.username,
            "email": user.email,
            "message": "User created successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Signup failed: {str(e)}")

@app.post("/signin")
async def signin(request: SignInRequest):
    try:
        # Case-insensitive email search
        user = users_collection.find_one({"email": {"$regex": f"^{request.email}$", "$options": "i"}})

        if user:
            try:
                # Verify password
                ph.verify(user["password"], request.password)
                return {
                    "message": "Login successful",
                    "username": user["username"],
                    "email": user["email"],
                    "token": "mock-auth-token"
                }
            except Exception:
                raise HTTPException(status_code=401, detail="Invalid credentials")
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Signin failed: {str(e)}")

@app.post("/save_prediction")
async def save_prediction(history: PredictionHistory):
    try:
        # Insert prediction history
        result = history_collection.insert_one(history.dict())
        return {"status": "success", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save prediction: {str(e)}")

@app.get("/get_history")
async def get_history(email: str):
    try:
        # Get user's prediction history
        history = list(history_collection.find(
            {"user_email": email},
            {"_id": 0, "id": {"$toString": "$_id"}, "image_url": 1, "prediction": 1, "confidence": 1, "timestamp": 1}
        ).sort("timestamp", -1))
        return {"history": history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")