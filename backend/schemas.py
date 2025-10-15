# backend/schemas.py

from pydantic import BaseModel
from typing import List, Optional
import datetime
from typing import Dict

# --- User Schemas ---
class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    class Config:
        from_attributes = True

# --- Farm Schemas ---
class Location(BaseModel):
    lat: float
    lon: float
    
class FarmBase(BaseModel):
    name: str
    location: Location
    crop_type: str

class FarmCreate(FarmBase):
    pass

class Farm(FarmBase):
    id: int
    owner_id: int
    class Config:
        from_attributes = True

# --- Analysis Schemas ---
class AnalysisResultBase(BaseModel):
    user_query: Optional[str] = None
    offline_disease_name: Optional[str] = None
    offline_confidence_score: Optional[float] = None
    online_disease_name: str
    online_severity: str
    online_summary: str
    online_recommended_actions: List[str]
    online_scientific_reason: str
    online_preventative_measures: List[str]

class AnalysisResultCreate(AnalysisResultBase):
    pass

class AnalysisResult(AnalysisResultBase):
    id: int
    timestamp: datetime.datetime
    image_url: Optional[str] = None
    owner_id: int
    farm_id: int
    class Config:
        from_attributes = True