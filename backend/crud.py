from sqlalchemy.orm import Session
import models, schemas
import security

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user_data: dict):
    hashed_password = security.get_password_hash(user_data['password'])
    db_user = models.User(
        email=user_data['email'],
        name=user_data['name'],           # <-- include name
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_user_farm(db: Session, farm: schemas.FarmCreate, user_id: int):
    db_farm = models.Farm(**farm.model_dump(), owner_id=user_id)
    db.add(db_farm)
    db.commit()
    db.refresh(db_farm)
    return db_farm

def get_farms_by_user(db: Session, user_id: int):
    return db.query(models.Farm).filter(models.Farm.owner_id == user_id).all()

def get_farm_by_id(db: Session, farm_id: int):
    """
    Retrieves a single farm by its unique ID.
    """
    return db.query(models.Farm).filter(models.Farm.id == farm_id).first()