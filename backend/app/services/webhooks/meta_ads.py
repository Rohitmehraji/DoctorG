from app.schemas.lead import LeadCreate


class MetaAdsWebhookService:
    def normalize(self, payload: dict) -> LeadCreate:
        return LeadCreate(
            clinic_id=payload.get("clinic_id", 1),
            full_name=payload.get("full_name", "Unknown"),
            phone=payload.get("phone", ""),
            source="meta_ads",
            treatment_interest=payload.get("treatment_interest"),
            budget_range=payload.get("budget_range"),
            urgency_level=payload.get("urgency_level"),
        )
