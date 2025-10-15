from pydantic import BaseModel
from typing import List, Optional

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