from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
from predict import predict_stalefruit, load_swin_model

app = FastAPI()

# Enable CORS to allow React frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model once at startup
model = load_swin_model()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.post("/predict")
async def detect_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        prediction = predict_stalefruit(image, model)
        return {
            "label": prediction["label"],
            "confidence": float(prediction["confidence"])
        }
    except Exception as e:
        return {"error": str(e)}