# Training Scripts for Model Comparison (Journal)

## Folder Structure
```
training_for_comparison/
├── swin/
│   └── train_swin.py
├── vit/
│   └── train_vit.py
├── hybrid_cnn_swin/
│   └── train_hybrid.py
├── requirements.txt
└── README.md
```

---

## Running on Google Colab

### Step 1 — Upload the script
Open a new Colab notebook and in the first cell run:
```python
from google.colab import files
files.upload()   # upload train_swin.py  (or vit / hybrid)
```

### Step 2 — Upload the dataset
**Option A – Upload directly (small files):**
```python
from google.colab import files
files.upload()   # upload archive.zip
```

**Option B – Mount Google Drive (recommended for large files):**
```python
from google.colab import drive
drive.mount('/content/drive')
```
Then in the script change:
```python
zip_path = "/content/drive/MyDrive/archive.zip"
```

### Step 3 — Run the script
```python
exec(open("train_swin.py").read())
# or
%run train_swin.py
```

### Step 4 — Download the saved weights
```python
from google.colab import files
files.download("swin_weights.pt")
```

---

## What Each Script Collects (for Journal Table)

| Metric | Collected |
|--------|-----------|
| Total Parameters (M) | ✅ |
| Model Size (MB) | ✅ |
| FLOPs (G) | ✅ |
| Avg Training Time / epoch (s) | ✅ |
| Test Loss | ✅ |
| Test Accuracy (%) | ✅ |
| Macro Precision | ✅ |
| Macro Recall | ✅ |
| Macro F1-Score | ✅ |
| Avg Inference Time (ms/batch) | ✅ |
| Per-class Classification Report | ✅ |
| Confusion Matrix | ✅ |

---

## Important Notes
- All 3 models use **same settings**: 15 epochs, batch_size=8, lr=0.0001, seed=42, 80/20 split
- Make sure **GPU is enabled** in Colab: Runtime → Change runtime type → T4 GPU
- Each script auto-installs `torchinfo` and `timm` at the top
- Results summary is printed as a clean block — easy to copy into journal table
