from app.services.ai.openai_client import client
from app.core.config import settings


class ContentGeneratorService:
    async def generate(self, clinic_type: str, content_type: str, objective: str) -> str:
        system_prompt = "You create high-converting clinic marketing and follow-up content."
        user_prompt = (
            f"Clinic type: {clinic_type}\n"
            f"Content type: {content_type}\n"
            f"Objective: {objective}\n"
            "Tone: trustworthy, premium, and concise."
        )
        response = await client.chat.completions.create(
            model=settings.openai_model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
        )
        return response.choices[0].message.content or ""
