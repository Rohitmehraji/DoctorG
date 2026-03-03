from fastapi import APIRouter, Query
from app.schemas.metrics import MetricsSummaryResponse
from app.services.crm.metrics_service import MetricsService

router = APIRouter()
service = MetricsService()


@router.get("/summary", response_model=MetricsSummaryResponse)
async def metrics_summary(clinic_id: int = Query(..., ge=1)) -> MetricsSummaryResponse:
    return await service.summary(clinic_id)
