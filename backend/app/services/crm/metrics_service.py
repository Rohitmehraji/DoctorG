from app.schemas.metrics import MetricsSummaryResponse


class MetricsService:
    async def summary(self, clinic_id: int) -> MetricsSummaryResponse:
        # Placeholder implementation: replace with SQL aggregation over leads,
        # ai_scores, followups, and booked revenue events for clinic_id.
        return MetricsSummaryResponse(
            leads_this_week=84,
            conversion_rate=0.314,
            booked_revenue=42300,
            followup_sla_minutes=9,
        )
