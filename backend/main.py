# backend/main.py

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
import os
from typing import List

# Use direct imports
import models, schemas, crud, security, agent
from database import engine, get_db

# This command tells SQLAlchemy to create all the tables if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Request Body ---
class AnalysisRequest(BaseModel):
    userId: str
    farmId: str
    image: str
    userQuery: str
    location: dict
    languageCode: str

# --- Authentication & Farm Endpoints ---
# (Keep all your existing endpoints for users, token, and farms here)
@app.post("/api/v1/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_dict = {"email": user.email, "password": user.password}
    return crud.create_user(db=db, user_data=user_dict)

@app.post("/api/v1/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = security.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/v1/farms/", response_model=schemas.Farm)
def create_farm_for_user(farm: schemas.FarmCreate, user_id: int, db: Session = Depends(get_db)):
    return crud.create_user_farm(db=db, farm=farm, user_id=user_id)

@app.get("/api/v1/farms/{user_id}", response_model=List[schemas.Farm])
def read_farms_for_user(user_id: int, db: Session = Depends(get_db)):
    return crud.get_farms_by_user(db, user_id=user_id)

# --- Root Endpoint ---
@app.get("/")
async def read_root():
    return {"message": "Ceres AI Backend is running!"}

# --- Analysis & History Endpoints ---

@app.post("/api/v1/analyze")
async def analyze_image(request: AnalysisRequest, db: Session = Depends(get_db)):
    try:
        farm_id_int = int(request.farmId)
        user_id_int = int(request.userId)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Farm ID or User ID format.")

    db_farm = crud.get_farm_by_id(db, farm_id=farm_id_int)
    if db_farm is None:
        raise HTTPException(status_code=404, detail=f"Farm with ID {farm_id_int} not found.")

    farm_details = {"location": db_farm.location, "crop_type": db_farm.crop_type, "name": db_farm.name}
    
    online_result = agent.run_analysis_agent(
        image_base64=request.image,
        user_query=request.userQuery,
        farm_details=farm_details,
        language_code=request.languageCode
    )

    if "error" in online_result:
        raise HTTPException(status_code=500, detail=online_result["error"])

    # --- SAVE THE RESULT TO THE DATABASE ---
    result_to_save = schemas.AnalysisResultCreate(
        user_query=request.userQuery,
        offline_disease_name="Coffee Leaf Rust", # Placeholder from client
        offline_confidence_score=0.85, # Placeholder from client
        online_disease_name=online_result.get("diseaseName"),
        online_severity=online_result.get("severity"),
        online_summary=online_result.get("summary"),
        online_recommended_actions=online_result.get("recommendedActions"),
        online_scientific_reason=online_result.get("scientificReason"),
        online_preventative_measures=online_result.get("preventativeMeasures")
    )
    crud.create_analysis_result(db=db, result=result_to_save, user_id=user_id_int, farm_id=farm_id_int)
    
    return {"onlineResult": online_result}


@app.get("/api/v1/history/{user_id}", response_model=List[schemas.AnalysisResult])
def read_analysis_history(user_id: int, db: Session = Depends(get_db)):
    """
    Fetch all past analysis results for a specific user.
    """
    history = crud.get_analysis_history_for_user(db, user_id=user_id)
    if not history:
        raise HTTPException(status_code=404, detail="No analysis history found for this user.")
    return history