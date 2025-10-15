# backend/main.py

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
import os
import crud, schemas
from typing import List

# Use direct imports since we run from the backend folder
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


# Get all farms for logged-in user
@app.post("/api/v1/farms/", response_model=schemas.Farm)
def create_farm_for_user(farm: schemas.FarmCreate, user_id: int, db: Session = Depends(get_db)):
    # In a real production app, you'd get user_id from the auth token.
    # For the hackathon, passing it as a query parameter is simpler and faster.
    return crud.create_user_farm(db=db, farm=farm, user_id=user_id)


@app.get("/api/v1/farms/{user_id}", response_model=List[schemas.Farm])
def read_farms_for_user(user_id: int, db: Session = Depends(get_db)):
    farms = crud.get_farms_by_user(db, user_id=user_id)
    return farms


# --- Authentication Endpoints ---
@app.post("/api/v1/users/", response_model=schemas.User)
def create_user_endpoint(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_dict = {
        "email": user.email,
        "name": user.name,          # <-- include name
        "password": user.password
    }
    return crud.create_user(db=db, user_data=user_dict)



@app.post("/api/v1/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = security.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# --- Root Endpoint for testing ---
@app.get("/")
async def read_root():
    return {"message": "Ceres AI Backend is running!"}


# --- REAL Analysis Endpoint ---
@app.post("/api/v1/analyze")
async def analyze_image(request: AnalysisRequest, db: Session = Depends(get_db)):
    """
    This is the DYNAMIC endpoint. It fetches real farm data to provide
    a context-aware analysis.
    """
    # --- Step 1: Fetch the real farm details from the database ---
    try:
        farm_id_int = int(request.farmId)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Farm ID format. Must be an integer.")

    db_farm = crud.get_farm_by_id(db, farm_id=farm_id_int)
    if db_farm is None:
        raise HTTPException(status_code=404, detail=f"Farm with ID {farm_id_int} not found.")

    # Convert the SQLAlchemy model to a dictionary for the agent
    farm_details = {
        "location": db_farm.location,
        "crop_type": db_farm.crop_type,
        "name": db_farm.name
    }
    
    # --- Step 2: Call the agentic function from agent.py ---
    online_result = agent.run_analysis_agent(
        image_base64=request.image,
        user_query=request.userQuery,
        farm_details=farm_details
    )

    # --- Step 3: Construct and return the final response ---
    final_response = {
        "analysisId": f"real-analysis-{os.urandom(4).hex()}",
        "status": "ONLINE_COMPLETE",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "imageUrl": "URL_will_be_added_later", # TODO: Implement image storage
        "offlineResult": { # This would come from the client, but we mock it here for now
            "diseaseName": "Unknown",
            "confidenceScore": 0.0
        },
        "onlineResult": online_result
    }
    
    return final_response