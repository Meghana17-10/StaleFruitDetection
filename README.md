STALE FRUIT DETECTION

Overview  
STALE FRUIT DETECTION is an AI-powered image classification system that leverages the **Swin Transformer**, a cutting-edge vision model, to determine the freshness of fruits. By analyzing visual features, the system classifies fruits as either **Fresh** or **Stale**, enabling:

-  Efficient and automated **inventory monitoring**
-  Reduction of **manual errors and food waste**
-  Support for **daily customers and local fruit vendors**

The Swin Transformer outperforms traditional CNNs by capturing both **local texture details** and **global visual context**, making it ideal for nuanced freshness classification tasks.

Problem Statement  
Daily customers and local vendors face significant challenges in quickly and accurately identifying stale or spoiled fruits in the supply chain. Manual inspection is subjective, time-consuming, and inefficient, causing economic losses and potential health risks. Current automated methods struggle to distinguish fresh fruits from those in early stages of spoilage due to subtle visual differences, highlighting the need for more effective detection techniques.

This project provides:
-  **Vision-based automatic fruit freshness detection**
-  **Real-time predictions with minimal latency**
-  **User-friendly interface for non-technical users**


Technology Stack  
### Machine Learning & Deep Learning  
- PyTorch – Primary ML framework  
- Swin Transformer – Main vision architecture  
- Vision Transformer (ViT) – Baseline transformer model  
- Hybrid CNN + Swin – Local & global feature synergy  
- PIL – Image pre-processing

### Backend  
- FastAPI – Lightweight, async model inference API  

### Frontend  
- React + TypeScript – Interactive and responsive user interface.
- Tailwind CSS – Styling and UI components.
- React Query – Data fetching and state management.

   **Deployment**:  
> - Frontend: [Vercel](https://vercel.com)  
> - Backend: Local/Render (FastAPI + Model)  
> - Database: MongoDB Atlas  


## Models Trained and Evaluated  

| Model                          | Description                                          | Status             |
|--------------------------------|------------------------------------------------------|--------------------|
| SWIN TRANSFORMER               | Hierarchical attention-based vision model            | ✅ Deployed        |
| VISION TRANSFORMER(vIt)        | Pure transformer-based vision model                  | ✅ Tested Locally  |
| HYBRID MODEL (CNN+SWIN)        | Combines CNN’s locality with Swin’s global context   | ✅ Tested Locally  | 

### Evaluation Metrics  
- Classification Accuracy  
- Model Inference Time  
- Confusion Matrix  
- Visual Predictions Output


## Live Demo  
✨ fIND IT HERE:-
🔗 [Stale Fruit Detection Web App]: https://stalefruitdetection.vercel.app/

  **Features:**  
- 🖼 Upload any fruit image  
- 🧠 Get a **Fresh / Stale** prediction  
- ⚡ Instant results using Swin Transformer  

## Key Features  
- Multi-Model Comparison: Results from ViT, Swin, and Hybrid models displayed side-by-side.
- History Tracking: Automatically logs predictions with timestamps for audit trails.
- Responsive Design: Works seamlessly on desktop and mobile devices.
- Secure API: FastAPI backend with Argon2 password hashing and CORS middleware.
