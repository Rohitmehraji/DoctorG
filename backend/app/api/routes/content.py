from fastapi import APIRouter
from app.schemas.content import ContentRequest, ContentResponse
from app.services.content.generator import ContentGeneratorService

router = APIRouter()
service = ContentGeneratorService()


@router.post("/generate", response_model=ContentResponse)
async def generate_content(payload: ContentRequest) -> ContentResponse:
    content = await service.generate(payload.clinic_type, payload.content_type, payload.objective)
    return ContentResponse(content=content)
