import torch
from PIL import Image
import torchvision.transforms as transforms

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

def predict_from_model(image_tensor, model, device="cpu"):
    image_tensor = image_tensor.to(device)
    model = model.to(device)
    model.eval()

    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = torch.softmax(outputs, dim=1)
        confidence, predicted_idx = torch.max(probabilities, 1)
        label = CLASS_NAMES[predicted_idx.item()]
        return {"label": label, "confidence": confidence.item()}

def predict_all_models(image: Image.Image, models: dict, device="cpu"):
    image = image.convert("RGB")
    image_tensor = transform(image).unsqueeze(0)  # Add batch dimension

    results = {}
    for name, model in models.items():
        results[name] = predict_from_model(image_tensor, model, device=device)

    return results