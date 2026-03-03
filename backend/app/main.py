from fastapi import FastAPI
from app.api.routes import leads, crm, content, webhooks, assistant, metrics
from app.core.logging import configure_logging
from app.middleware.error_handler import register_error_handlers

configure_logging()

app = FastAPI(title="DOCTORG API", version="1.0.0")
register_error_handlers(app)

app.include_router(leads.router, prefix="/api/leads", tags=["leads"])
app.include_router(crm.router, prefix="/api/crm", tags=["crm"])
app.include_router(content.router, prefix="/api/content", tags=["content"])
app.include_router(webhooks.router, prefix="/api/webhooks", tags=["webhooks"])
app.include_router(assistant.router, prefix="/api/assistant", tags=["assistant"])
app.include_router(metrics.router, prefix="/api/metrics", tags=["metrics"])


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
