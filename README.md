# DOCTORG – AI Sales & Automation Agent for Clinics

Production-grade SaaS platform for clinic lead conversion, AI follow-up orchestration, CRM visibility, and marketing ROI optimization.

## Stack
- **Frontend**: Next.js 14 (App Router + TypeScript), TailwindCSS, Framer Motion, Recharts
- **Backend**: FastAPI (async), Pydantic, modular services, structured logging
- **Database**: PostgreSQL with indexed lead + CRM schema
- **Vector Layer**: FAISS for local semantic retrieval (MVP)
- **AI Layer**: OpenAI GPT-4 class model (tool/JSON-oriented orchestration)
- **Deployment**: Docker + docker-compose + `.env`

## Monorepo Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── api/routes/
│   │   │   ├── assistant.py
│   │   │   ├── content.py
│   │   │   ├── crm.py
│   │   │   ├── leads.py
│   │   │   ├── metrics.py
│   │   │   └── webhooks.py
│   │   ├── core/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── schemas/
│   │   └── services/
│   │       ├── agents/
│   │       ├── ai/
│   │       ├── content/
│   │       ├── crm/
│   │       ├── scoring/
│   │       └── webhooks/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── dashboard/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/chatbot/floating-chatbot.tsx
│   ├── lib/api/metrics.ts
│   └── types/dashboard.ts
├── infra/schema.sql
├── docker-compose.yml
└── .env.example
```

## Core Modules Implemented

1. **AI Lead Capture Engine**
   - Meta Ads webhook route
   - Website/WhatsApp-ready lead schema and intake endpoint
   - Lead scoring service

2. **AI Qualification Agent**
   - Orchestrator service calling GPT model
   - Structured qualification response contract

3. **AI Follow-up Agent Logic**
   - Rule-guided follow-up decision method (escalate / nurture / remind)
   - `followups` table for scheduled automation

4. **AI Calling Agent Logic (Structure Ready)**
   - Agent orchestrator foundation supports script-generation extensions

5. **CRM Dashboard**
   - Next.js dashboard with modern cards, charts, suggestions, and notification bell
   - Backend CRM endpoint for analytics payload
   - Centralized metrics loader (`frontend/lib/api/metrics.ts`) to avoid inline metric values

6. **AI Content Engine**
   - Content generation API for ad copy, scripts, follow-up messages, explainers

7. **Meta Ads Analytics Integration (Structure Ready)**
   - Webhook and source tracking in data model

8. **RAG Knowledge System**
   - `knowledge_base` + `embeddings` schema
   - FAISS service for local retrieval

9. **Floating AI Chatbot**
   - Persistent bottom-right assistant component across the app
   - Real backend integration via `/api/assistant/chat`

## Backend API Routes

- `GET /health`
- `POST /api/leads`
- `GET /api/crm/dashboard/{clinic_id}`
- `GET /api/metrics/summary?clinic_id=1`
- `POST /api/content/generate`
- `POST /api/webhooks/meta-ads`
- `POST /api/assistant/chat`

## AI Assistant API Integration

Frontend chatbot calls:
- `POST ${NEXT_PUBLIC_API_BASE_URL}/api/assistant/chat`

Request body:
```json
{
  "clinic_id": 1,
  "prompt": "Generate a follow-up for a high-intent whitening lead",
  "context": {}
}
```

Response body:
```json
{
  "reply": "Here is a concise follow-up script ...",
  "suggestions": ["Improve response time", "Prioritize high-intent leads"]
}
```

Example curl:
```bash
curl -X POST http://localhost:8000/api/assistant/chat \
  -H "Content-Type: application/json" \
  -d '{"clinic_id":1,"prompt":"How can we improve bookings this week?","context":{}}'
```

## Dashboard Metrics Source

Metric cards are resolved through one centralized loader:
- `frontend/lib/api/metrics.ts`

Primary source:
- `GET /api/metrics/summary?clinic_id=1`

Current backend implementation:
- Stubbed data in `backend/app/services/crm/metrics_service.py`
- Explicit placeholder comment marks where SQL aggregations should be added.

To replace with real SQL:
1. Query weekly leads by clinic.
2. Calculate conversion ratio from qualified/booked/closed lifecycle events.
3. Sum booked revenue from transactional records.
4. Compute follow-up SLA from interaction timestamps.

## Database
Run schema bootstrap from:
- `infra/schema.sql`

Includes required tables:
- users, roles, clinics, leads, lead_status, interactions, ai_scores, messages, followups, staff, performance_metrics, knowledge_base, embeddings, notifications

Includes indexing for lead lifecycle, follow-up scheduling, interaction timelines, and metrics access patterns.

## Environment Variables

Key variables:
- `DATABASE_URL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `EMBEDDING_MODEL`
- `NEXT_PUBLIC_API_BASE_URL` (frontend backend-base override; defaults to `http://localhost:8000`)

## Local Setup

1. Copy envs:
```bash
cp .env.example .env
```
2. Start services:
```bash
docker compose up --build
```
3. Access:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000/docs`

## Notes for Production Hardening
- Add Alembic migrations for schema evolution
- Wire Redis + worker queue for async follow-up execution
- Add OAuth + RBAC middleware
- Replace in-memory FAISS payload store with persistent vector pipeline
- Add full observability (OpenTelemetry, tracing IDs, dashboards)
