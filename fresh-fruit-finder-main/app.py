# app.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from vit_model import load_model
from utils import preprocess_image
import torch
import uvicorn

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = load_model("model/swin_fruit_freshness_model.pt")

@app.get("/")
def read_root():
    return {"message": "Fresh Fruit Finder API is live!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = await file.read()
    image_tensor = preprocess_image(image_file=bytes(image))
    with torch.no_grad():
        output = model(image_tensor)
        predicted = torch.argmax(output, dim=1).item()

    label = "Fresh" if predicted == 0 else "Stale"
    return {"prediction": label}
