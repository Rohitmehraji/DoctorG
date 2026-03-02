from fastapi import APIRouter
from app.services.crm.dashboard_service import DashboardService

router = APIRouter()
service = DashboardService()


@router.get("/dashboard/{clinic_id}")
async def clinic_dashboard(clinic_id: int) -> dict:
    return await service.metrics(clinic_id)
