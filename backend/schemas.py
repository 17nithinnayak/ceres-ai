from pydantic import BaseModel
from typing import List, Optional
import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
      # <-- new field

class User(BaseModel):
    id: int
    name: str
    email: str
      # <-- new field

    class Config:
        from_attributes = True

from pydantic import BaseModel

#... (keep the existing UserCreate and User classes)

class FarmBase(BaseModel):
    name: str
    location: str
    crop_type: str

class FarmCreate(FarmBase):
    pass

class Farm(FarmBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True
    
class AnalysisResultBase(BaseModel):
    user_query: Optional[str] = None
    offline_disease_name: str
    offline_confidence_score: float
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