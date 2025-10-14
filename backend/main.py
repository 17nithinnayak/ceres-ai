from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from. import models
from.database import engine
from. import models, schemas, crud, security
from.database import engine, get_db
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],    
)

@app.post("/api/v1/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_dict = {"email": user.email, "password": user.password}
    return crud.create_user(db=db, user_data=user_dict)

@app.post("/api/v1/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username) # OAuth2 form uses 'username' for the email field
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = security.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

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