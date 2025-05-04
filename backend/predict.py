import torch
from PIL import Image
import torchvision.transforms as transforms
from model import load_swin_model

# Define class names based on your dataset
CLASS_NAMES = [
    'fresh_apple', 'fresh_banana', 'fresh_bitter_gourd', 'fresh_capsicum', 'fresh_orange', 'fresh_tomato',
    'stale_apple', 'stale_banana', 'stale_bitter_gourd', 'stale_capsicum', 'stale_orange', 'stale_tomato'
]

# Preprocessing transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5]*3, [0.5]*3)
])

def predict_stalefruit(image: Image.Image, model=None):
    """
    Predict whether an image contains a stale fruit using the Swin Transformer model.
    Args:
        image (PIL.Image): Input image to classify.
        model: Preloaded Swin Transformer model (optional, will load if None).
    Returns:
        dict: Prediction result with label and confidence.
    """
    if model is None:
        model = load_swin_model()

    # Preprocess the image
    image = image.convert("RGB")
    image_tensor = transform(image).unsqueeze(0)  # Add batch dimension

    # Run inference
    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = torch.softmax(outputs, dim=1)
        confidence, predicted_idx = torch.max(probabilities, 1)
        predicted_label = CLASS_NAMES[predicted_idx.item()]
        confidence = confidence.item()

    return {"label": predicted_label, "confidence": confidence}