from pydantic import BaseModel


class AssistantMessage(BaseModel):
    clinic_id: int
    prompt: str
    context: dict | None = None


class AssistantResponse(BaseModel):
    reply: str
    suggestions: list[str]
