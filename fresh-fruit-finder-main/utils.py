# utils.py
from PIL import Image
from torchvision import transforms

def preprocess_image(image_file):
    image = Image.open(image_file).convert("RGB")
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5]*3, std=[0.5]*3),
    ])
    return transform(image).unsqueeze(0)  # shape: [1, 3, 224, 224]
