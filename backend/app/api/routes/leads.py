from datetime import datetime
from fastapi import APIRouter
from app.schemas.lead import LeadCreate, LeadOut
from app.services.scoring.lead_scoring import LeadScoringService
from app.services.agents.orchestrator import AgentOrchestrator

router = APIRouter()
scoring = LeadScoringService()
orchestrator = AgentOrchestrator()


@router.post("", response_model=LeadOut)
async def create_lead(payload: LeadCreate) -> LeadOut:
    score = scoring.score(payload)
    _qualification = await orchestrator.qualify_lead(payload.model_dump())
    return LeadOut(
        id=1,
        clinic_id=payload.clinic_id,
        full_name=payload.full_name,
        phone=payload.phone,
        status="new",
        score=score,
        created_at=datetime.utcnow(),
    )
