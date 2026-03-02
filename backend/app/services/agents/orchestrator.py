from app.services.ai.openai_client import client
from app.core.config import settings


class AgentOrchestrator:
    async def qualify_lead(self, lead_input: dict) -> dict:
        prompt = (
            "You are a clinical sales qualification agent. Return JSON with "
            "intent_score, budget_detected, urgency_detected, next_step."
        )
        response = await client.chat.completions.create(
            model=settings.openai_model,
            temperature=0.2,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": str(lead_input)},
            ],
        )
        return {"raw": response.choices[0].message.content}

    async def followup_decision(self, context: dict) -> dict:
        rules = (
            "If no response send reminder. If high intent escalate_human=true. "
            "If medium intent nurture=true."
        )
        response = await client.chat.completions.create(
            model=settings.openai_model,
            messages=[
                {"role": "system", "content": rules},
                {"role": "user", "content": str(context)},
            ],
        )
        return {"decision": response.choices[0].message.content}
