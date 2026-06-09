from datetime import date
from enum import Enum
from typing import Optional
from pydantic import BaseModel


class DocumentType(str, Enum):
    LEGAL = "legal"
    MEDICAL = "medical"
    FINANCIAL = "financial"
    IDENTITY = "identity"
    CARE_PLAN = "care_plan"
    CORRESPONDENCE = "correspondence"
    OTHER = "other"


class DocumentStatus(str, Enum):
    ACTIVE = "active"
    SUPERSEDED = "superseded"
    ARCHIVED = "archived"
    PENDING_REVIEW = "pending_review"


class Document(BaseModel):
    id: str
    title: str
    doc_type: DocumentType
    status: DocumentStatus = DocumentStatus.ACTIVE
    date_created: Optional[date] = None
    date_expires: Optional[date] = None
    issuer: Optional[str] = None
    drive_file_id: Optional[str] = None  # Google Drive file ID in sovereign instance
    notes: Optional[str] = None

    def is_expired(self) -> bool:
        if self.date_expires is None:
            return False
        return date.today() > self.date_expires
