# backend/main.py

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import json

import models, schemas, crud, security, agent
from database import engine, get_db

# Create tables
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


# --- Optional Auth Helper ---
def get_optional_user(token: str = Depends(security.oauth2_scheme), db: Session = Depends(get_db)):
    """Returns user if JWT is valid, else returns None (guest access)."""
    if not token:
        return None
    try:
        payload = security.jwt.decode(token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            return None
        user = crud.get_user_by_email(db, email=email)
        return user
    except Exception:
        return None


# --- Pydantic Request Model ---
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
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = security.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


# --- Farm Endpoints ---
@app.post("/api/v1/farms/", response_model=schemas.Farm)
def create_farm_for_user(farm: schemas.FarmCreate, db: Session = Depends(get_db)):
    """
    Public endpoint: Create a farm (no login required)
    """
    db_farm = crud.create_farm(db=db, farm=farm)

    # Convert stringified JSON location
    if isinstance(db_farm.location, str):
        try:
            location_dict = json.loads(db_farm.location)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid location format")
    else:
        location_dict = db_farm.location

    db_farm.location = schemas.Location.model_validate(location_dict)
    return db_farm


@app.get("/api/v1/farms/me", response_model=List[schemas.Farm])
def read_my_farms(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    farms = crud.get_farms_by_user(db, user_id=current_user.id)
    for farm in farms:
        farm.location = schemas.Location(**farm.location)
    return farms


# --- Root Endpoint ---
@app.get("/")
async def read_root():
    return {"message": "Ceres AI Backend is running!"}


# --- Analysis Endpoint (open + optional auth) ---
@app.post("/api/v1/analyze")
async def analyze_image(
    request: AnalysisRequest,
    db: Session = Depends(get_db),
    current_user: Optional[models.User] = Depends(get_optional_user)
):
    """
    Analyze plant image — works for both logged-in and guest users.
    """

    # If user logged in, use their farm data
    if current_user:
        db_farm = crud.get_farm_by_owner(db, owner_id=current_user.id)
        if not db_farm:
            raise HTTPException(status_code=404, detail="No farm found for this user.")
        farm_details = {
            "location": db_farm.location,
            "crop_type": db_farm.crop_type,
            "name": db_farm.name,
        }
    else:
        # For guests, use request.location directly
        farm_details = {
            "location": request.location,
            "crop_type": "Unknown",
            "name": "Guest Farm",
        }

    # Run AI analysis
    online_result = agent.run_analysis_agent(
        image_base64=request.image,
        user_query=request.userQuery,
        farm_details=farm_details,
        language_code=request.languageCode,
    )

    if "error" in online_result:
        raise HTTPException(status_code=500, detail=online_result["error"])

    # If user is logged in, save results
    if current_user:
        result_to_save = schemas.AnalysisResultCreate(
            user_query=request.userQuery,
            offline_disease_name="Unknown",
            offline_confidence_score=0.0,
            online_disease_name=online_result.get("diseaseName"),
            online_severity=online_result.get("severity"),
            online_summary=online_result.get("summary"),
            online_recommended_actions=online_result.get("recommendedActions"),
            online_scientific_reason=online_result.get("scientificReason"),
            online_preventative_measures=online_result.get("preventativeMeasures"),
        )
        crud.create_analysis_result(db=db, result=result_to_save, user_id=current_user.id, farm_id=db_farm.id)

    return {"onlineResult": online_result}


@app.get("/api/v1/history/me", response_model=List[schemas.AnalysisResult])
def read_my_analysis_history(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    history = crud.get_analysis_history_for_user(db, user_id=current_user.id)
    return history
