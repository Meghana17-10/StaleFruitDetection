import torch
import torch.nn as nn
from torchvision.models import resnet18
from timm.models.swin_transformer import swin_base_patch4_window7_224

# Define the same class used during training
class HybridModel(nn.Module):
    def __init__(self, cnn=None, swin=None, cnn_features=512, swin_features=1024, num_classes=12):
        super(HybridModel, self).__init__()
        self.cnn = cnn if cnn else resnet18(pretrained=False)
        self.cnn.fc = nn.Identity()

        self.swin = swin if swin else swin_base_patch4_window7_224(pretrained=False)
        self.swin.head = nn.Identity()

        self.fc = nn.Linear(cnn_features + swin_features, num_classes)

    def forward(self, x):
        cnn_features = self.cnn(x)
        swin_features = self.swin(x)
        swin_features = torch.flatten(swin_features, 1)
        combined = torch.cat((cnn_features, swin_features), dim=1)
        return self.fc(combined)

# 🔄 Load full model
def load_hybrid_model(model_path="hybrid_weights.pt", device='cpu'):
    import sys
    sys.modules['__main__'].HybridModel = HybridModel  # 👈 Trust your own HybridModel class
    model = torch.load(model_path, map_location=device, weights_only=False)
    return model