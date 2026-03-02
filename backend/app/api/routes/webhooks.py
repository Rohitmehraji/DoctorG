from fastapi import APIRouter
from app.services.webhooks.meta_ads import MetaAdsWebhookService
from app.services.scoring.lead_scoring import LeadScoringService

router = APIRouter()
meta_service = MetaAdsWebhookService()
scoring = LeadScoringService()


@router.post("/meta-ads")
async def meta_ads_webhook(payload: dict) -> dict:
    lead = meta_service.normalize(payload)
    return {"accepted": True, "score": scoring.score(lead), "source": "meta_ads"}
