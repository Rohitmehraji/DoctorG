from fastapi import APIRouter
from app.schemas.assistant import AssistantMessage, AssistantResponse
from app.services.ai.openai_client import client
from app.core.config import settings

router = APIRouter()


@router.post("/chat", response_model=AssistantResponse)
async def assistant_chat(payload: AssistantMessage) -> AssistantResponse:
    system = "You are DOCTORG Copilot. Explain CRM data and suggest optimization actions."
    response = await client.chat.completions.create(
        model=settings.openai_model,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": payload.prompt},
        ],
    )
    text = response.choices[0].message.content or ""
    return AssistantResponse(reply=text, suggestions=["Improve response time", "Prioritize high-intent leads"])
