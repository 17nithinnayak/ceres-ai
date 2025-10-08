from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],    
)

mock_analysis_response = {
    "analysisId": "mock-analysis-12345",
    "status": "ONLINE_COMPLETE",
    "timestamp": "2025-10-26T14:30:00Z",
    "imageUrl": "https://storage.googleapis.com/ceres-ai-mock-images/sample_leaf.jpg",
    "offlineResult": {
        "diseaseName": "Coffee Leaf Rust",
        "confidenceScore": 0.85
    },
    "onlineResult": {
        "diseaseName": "Coffee Leaf Rust (Hemileia vastatrix)",
        "severity": "Medium",
        "summary": "This is a moderate case of Coffee Leaf Rust, likely accelerated by recent high humidity. Immediate action is required to prevent it from spreading.",
        "recommendedActions":"",
        "scientificReason": "Coffee Leaf Rust is a fungus that thrives in humid conditions. The orange powdery spots are spores that spread easily through wind and rain, infecting nearby healthy plants.",
        "preventativeMeasures": [
            "Ensure balanced plant nutrition, especially with potassium, to improve plant resistance.",
            "Maintain proper shade (40-50%) to avoid stress on the plants.",
            "Improve air circulation by managing bush density and pruning."
        ]
    }
}

@app.post("/api/v1/analyze")
async def analyze_image():
    return mock_analysis_response 

@app.get("/")
async def root():
    return {"message": "Ceres AI Mock Server is running."}