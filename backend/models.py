from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)  # <-- Add this line
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    farms = relationship("Farm", back_populates="owner")


class Farm(Base):
    __tablename__ = "farms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(JSON, nullable=False)
    crop_type = Column(String) # e.g., "Robusta", "Arabica"
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="farms")

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    image_url = Column(String, nullable=True) # We'll store the image URL here later
    user_query = Column(String, nullable=True)

    # Store the simple offline result
    offline_disease_name = Column(String)
    offline_confidence_score = Column(Float)

    # Store the detailed online result from Gemini
    online_disease_name = Column(String)
    online_severity = Column(String)
    online_summary = Column(String)
    online_recommended_actions = Column(JSON) # Use JSON to store the list
    online_scientific_reason = Column(String)
    online_preventative_measures = Column(JSON) # Use JSON to store the list

    # Relationships
    owner_id = Column(Integer, ForeignKey("users.id"))
    farm_id = Column(Integer, ForeignKey("farms.id"))