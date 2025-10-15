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

# --- Updated Pydantic Model for Request Body ---
# We REMOVE both userId and farmId because they will come from the token.
class AnalysisRequest(BaseModel):
    image: str
    userQuery: str
    location: dict
    languageCode: str

# --- Authentication Endpoints ---
@app.post("/api/v1/users/", response_model=schemas.User)
def create_user_endpoint(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_dict = {"email": user.email, "name": user.name, "password": user.password}
    return crud.create_user(db=db, user_data=user_dict)

@app.post("/api/v1/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = security.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# --- SECURE Farm Management Endpoints ---
@app.post("/api/v1/farms/", response_model=schemas.Farm)
def create_farm_for_user(
    farm: schemas.FarmCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    # farm.location is now a dict {"lat": float, "lon": float}
    return crud.create_user_farm(db=db, farm=farm, user_id=current_user.id)

@app.get("/api/v1/farms/me", response_model=List[schemas.Farm])
def read_my_farms(db: Session = Depends(get_db), current_user: models.User = Depends(security.get_current_user)):
    farms = crud.get_farms_by_user(db, user_id=current_user.id)
    return farms

# --- Root Endpoint ---
@app.get("/")
async def read_root():
    return {"message": "Ceres AI Backend is running!"}

# --- SECURE & DYNAMIC Analysis and History Endpoints ---
@app.post("/api/v1/analyze")
async def analyze_image(
    request: AnalysisRequest, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(security.get_current_user)
):
    # --- Step 1: Dynamically fetch the user's farm ---
    db_farm = crud.get_farm_by_owner(db, owner_id=current_user.id)
    if db_farm is None:
        raise HTTPException(status_code=404, detail="No farm found for the current user. Please create a farm first.")

    farm_details = {"location": db_farm.location, "crop_type": db_farm.crop_type, "name": db_farm.name}
    
    # --- Step 2: Call the agentic function ---
    online_result = agent.run_analysis_agent(
        image_base64=request.image,
        user_query=request.userQuery,
        farm_details=farm_details,
        language_code=request.languageCode
    )

    if "error" in online_result:
        raise HTTPException(status_code=500, detail=online_result["error"])

    # --- Step 3: Save the result to the database ---
    result_to_save = schemas.AnalysisResultCreate(
        user_query=request.userQuery,
        offline_disease_name="Unknown", # This should come from the client
        offline_confidence_score=0.0, # This should come from the client
        online_disease_name=online_result.get("diseaseName"),
        online_severity=online_result.get("severity"),
        online_summary=online_result.get("summary"),
        online_recommended_actions=online_result.get("recommendedActions"),
        online_scientific_reason=online_result.get("scientificReason"),
        online_preventative_measures=online_result.get("preventativeMeasures")
    )
    crud.create_analysis_result(db=db, result=result_to_save, user_id=current_user.id, farm_id=db_farm.id)
    
    return {"onlineResult": online_result}

@app.get("/api/v1/history/me", response_model=List)
def read_my_analysis_history(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    history = crud.get_analysis_history_for_user(db, user_id=current_user.id)
    return history