# vit_model.py

import torch
import timm  # Ensure this is in your requirements.txt

def load_model(model_path: str):
    # Define the model architecture (same as training)
    model = timm.create_model('swin_tiny_patch4_window7_224', pretrained=False, num_classes=2)

    # Load the trained weights
    state_dict = torch.load(model_path, map_location="cpu")
    model.load_state_dict(state_dict)
    model.eval()

    return model
