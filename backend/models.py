from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from.database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    farms = relationship("Farm", back_populates="owner")

class Farm(Base):
    __tablename__ = "farms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    crop_type = Column(String) # e.g., "Robusta", "Arabica"
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="farms")