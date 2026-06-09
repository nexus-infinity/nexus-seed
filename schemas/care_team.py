from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr, field_validator


class CareRole(str, Enum):
    GP = "gp"
    SPECIALIST = "specialist"
    ALLIED_HEALTH = "allied_health"
    CARER = "carer"
    LEGAL = "legal"
    FINANCIAL = "financial"
    EMERGENCY_CONTACT = "emergency_contact"
    OTHER = "other"


class CareTeamMember(BaseModel):
    name: str
    role: CareRole
    organisation: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    notes: Optional[str] = None
    is_primary: bool = False

    @field_validator("phone")
    @classmethod
    def normalise_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        return "".join(c for c in v if c.isdigit() or c in "+-()")


class CareTeam(BaseModel):
    client_id: str
    members: list[CareTeamMember] = []

    def primary(self) -> Optional[CareTeamMember]:
        return next((m for m in self.members if m.is_primary), None)

    def by_role(self, role: CareRole) -> list[CareTeamMember]:
        return [m for m in self.members if m.role == role]
