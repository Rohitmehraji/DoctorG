from pydantic import BaseModel, Field
from datetime import datetime


class LeadCreate(BaseModel):
    clinic_id: int
    full_name: str
    phone: str
    source: str = Field(pattern="^(meta_ads|website|whatsapp)$")
    treatment_interest: str | None = None
    budget_range: str | None = None
    urgency_level: str | None = None


class LeadOut(BaseModel):
    id: int
    clinic_id: int
    full_name: str
    phone: str
    status: str
    score: float
    created_at: datetime
