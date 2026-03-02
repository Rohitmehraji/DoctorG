from pydantic import BaseModel, Field


class ContentRequest(BaseModel):
    clinic_type: str
    content_type: str = Field(pattern="^(ad_copy|whatsapp_script|follow_up|treatment_explainer)$")
    objective: str


class ContentResponse(BaseModel):
    content: str
