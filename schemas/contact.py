from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr


class ContactType(str, Enum):
    PERSONAL = "personal"
    PROFESSIONAL = "professional"
    INSTITUTION = "institution"
    EMERGENCY = "emergency"


class Contact(BaseModel):
    id: str
    name: str
    contact_type: ContactType
    organisation: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    notes: Optional[str] = None
