from app.schemas.lead import LeadCreate


class LeadScoringService:
    def score(self, lead: LeadCreate) -> float:
        score = 45.0
        if lead.budget_range:
            score += 20
        if lead.urgency_level == "high":
            score += 25
        if lead.source == "meta_ads":
            score += 10
        return min(score, 100.0)
