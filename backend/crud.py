from sqlalchemy.orm import Session
import models, schemas
import security

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user_data: dict):
    hashed_password = security.get_password_hash(user_data['password'])
    db_user = models.User(email=user_data['email'], hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user