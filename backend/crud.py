# backend/crud.py

from sqlalchemy.orm import Session
import models, schemas
import security
import json

# --- Users ---
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user_data: dict):
    hashed_password = security.get_password_hash(user_data['password'])
    db_user = models.User(
        email=user_data['email'],
        name=user_data['name'],
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# --- Farms ---
def create_user_farm(db: Session, farm: schemas.FarmCreate, user_id: int):
    # Store location as dict; SQLAlchemy JSON type will handle serialization
    db_farm = models.Farm(
    name=farm.name,
    location=farm.location.dict(),  # ✅ Pydantic Location -> dict
    crop_type=farm.crop_type,
    owner_id=user_id
)

    db.add(db_farm)
    db.commit()
    db.refresh(db_farm)
    return db_farm


def get_farms_by_user(db: Session, user_id: int):
    return db.query(models.Farm).filter(models.Farm.owner_id == user_id).all()

def get_farm_by_owner(db: Session, owner_id: int):
    return db.query(models.Farm).filter(models.Farm.owner_id == owner_id).first()


# --- Analysis Results ---
def create_analysis_result(db: Session, result: schemas.AnalysisResultCreate, user_id: int, farm_id: int):
    db_result = models.AnalysisResult(
        **result.model_dump(),  # Convert Pydantic model to dict
        owner_id=user_id,
        farm_id=farm_id
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result


def get_analysis_history_for_user(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return (
        db.query(models.AnalysisResult)
        .filter(models.AnalysisResult.owner_id == user_id)
        .order_by(models.AnalysisResult.timestamp.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
