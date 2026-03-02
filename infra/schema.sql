CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  role_id INT REFERENCES roles(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clinics (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  timezone VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff (
  id BIGSERIAL PRIMARY KEY,
  clinic_id BIGINT REFERENCES clinics(id),
  user_id BIGINT REFERENCES users(id),
  position VARCHAR(120) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS lead_status (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  clinic_id BIGINT NOT NULL REFERENCES clinics(id),
  assigned_staff_id BIGINT REFERENCES staff(id),
  status_id INT REFERENCES lead_status(id),
  source VARCHAR(50) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(255),
  treatment_interest VARCHAR(255),
  budget_range VARCHAR(100),
  urgency_level VARCHAR(40),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_scores (
  id BIGSERIAL PRIMARY KEY,
  lead_id BIGINT REFERENCES leads(id),
  intent_score NUMERIC(5,2),
  budget_score NUMERIC(5,2),
  urgency_score NUMERIC(5,2),
  total_score NUMERIC(5,2),
  rationale JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS interactions (
  id BIGSERIAL PRIMARY KEY,
  lead_id BIGINT REFERENCES leads(id),
  channel VARCHAR(50) NOT NULL,
  direction VARCHAR(20) NOT NULL,
  body TEXT,
  occurred_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  lead_id BIGINT REFERENCES leads(id),
  content TEXT NOT NULL,
  channel VARCHAR(50) NOT NULL,
  sent_at TIMESTAMPTZ,
  status VARCHAR(50) DEFAULT 'queued'
);

CREATE TABLE IF NOT EXISTS followups (
  id BIGSERIAL PRIMARY KEY,
  lead_id BIGINT REFERENCES leads(id),
  scheduled_for TIMESTAMPTZ NOT NULL,
  sequence_step INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  strategy VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS performance_metrics (
  id BIGSERIAL PRIMARY KEY,
  clinic_id BIGINT REFERENCES clinics(id),
  staff_id BIGINT REFERENCES staff(id),
  metric_date DATE NOT NULL,
  leads_contacted INT DEFAULT 0,
  leads_qualified INT DEFAULT 0,
  bookings INT DEFAULT 0,
  revenue NUMERIC(12,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS knowledge_base (
  id BIGSERIAL PRIMARY KEY,
  clinic_id BIGINT REFERENCES clinics(id),
  title VARCHAR(255) NOT NULL,
  source_type VARCHAR(30) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS embeddings (
  id BIGSERIAL PRIMARY KEY,
  kb_id BIGINT REFERENCES knowledge_base(id),
  chunk_text TEXT NOT NULL,
  embedding DOUBLE PRECISION[]
);

CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  clinic_id BIGINT REFERENCES clinics(id),
  category VARCHAR(60) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_clinic_status ON leads(clinic_id, status_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_scores_lead ON ai_scores(lead_id);
CREATE INDEX IF NOT EXISTS idx_followups_schedule ON followups(scheduled_for, status);
CREATE INDEX IF NOT EXISTS idx_interactions_lead_time ON interactions(lead_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_metrics_clinic_date ON performance_metrics(clinic_id, metric_date DESC);
