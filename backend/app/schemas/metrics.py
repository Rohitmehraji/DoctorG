from pydantic import BaseModel


class MetricsSummaryResponse(BaseModel):
    leads_this_week: int
    conversion_rate: float
    booked_revenue: int
    followup_sla_minutes: int
