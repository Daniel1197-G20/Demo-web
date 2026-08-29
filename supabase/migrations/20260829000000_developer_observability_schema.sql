-- ==============================================================================
-- TORY'S TREATS — DEVELOPER CONSOLE & OBSERVABILITY SCHEMA MIGRATION
-- Migration: 20260829000000_developer_observability_schema.sql
-- Engine: PostgreSQL 15+ (Supabase)
-- Security: Row Level Security (RLS) enabled on all developer telemetry tables
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES FOR DEVELOPER OBSERVABILITY
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'security_severity') THEN
    CREATE TYPE security_severity AS ENUM ('INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'security_event_type') THEN
    CREATE TYPE security_event_type AS ENUM (
      'FAILED_LOGIN',
      'MULTIPLE_FAILED_LOGINS',
      'RATE_LIMIT_TRIGGERED',
      'SUSPICIOUS_REQUEST',
      'ENDPOINT_SCANNING',
      'WAF_EVENT',
      'ANOMALY_DETECTED',
      'ADMIN_LOGIN',
      'DEVELOPER_LOGIN',
      'UNAUTHORIZED_ACCESS',
      'BLOCKED_IP_ATTEMPT',
      'SQLI_PROBE_DETECTED',
      'XSS_PROBE_DETECTED'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'system_health_status') THEN
    CREATE TYPE system_health_status AS ENUM ('HEALTHY', 'DEGRADED', 'DOWN', 'UNKNOWN');
  END IF;
END $$;

-- 3. HELPER FUNCTION: is_developer()
CREATE OR REPLACE FUNCTION public.is_developer()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('DEVELOPER', 'SUPER_ADMIN')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. DEVELOPER SECURITY EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.developer_security_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type security_event_type NOT NULL,
    severity security_severity NOT NULL DEFAULT 'LOW',
    ip_address TEXT NOT NULL,
    ip_country TEXT DEFAULT 'Unknown',
    endpoint TEXT NOT NULL,
    http_method TEXT NOT NULL DEFAULT 'GET',
    http_status INT DEFAULT 200,
    risk_score INT NOT NULL DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
    user_agent TEXT,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    actor_email TEXT,
    request_id TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    environment TEXT NOT NULL DEFAULT 'production',
    resolved BOOLEAN NOT NULL DEFAULT FALSE,
    resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. DEVELOPER AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.developer_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    actor_email TEXT NOT NULL,
    actor_role TEXT NOT NULL DEFAULT 'DEVELOPER',
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_address TEXT,
    user_agent TEXT,
    request_id TEXT,
    status TEXT NOT NULL DEFAULT 'SUCCESS' CHECK (status IN ('SUCCESS', 'FAILURE', 'WARNING')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. DEVELOPER ERROR EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.developer_error_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    error_type TEXT NOT NULL,
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    route TEXT NOT NULL,
    endpoint TEXT,
    http_status INT,
    user_agent TEXT,
    environment TEXT NOT NULL DEFAULT 'production',
    app_version TEXT NOT NULL DEFAULT '1.0.0',
    occurrence_count INT NOT NULL DEFAULT 1,
    first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved BOOLEAN NOT NULL DEFAULT FALSE,
    sanitized_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. DEVELOPER IP REPUTATION & BEHAVIORAL ANOMALIES TABLE
CREATE TABLE IF NOT EXISTS public.developer_ip_reputation (
    ip_address TEXT PRIMARY KEY,
    ip_country TEXT DEFAULT 'Unknown',
    risk_score INT NOT NULL DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
    status TEXT NOT NULL DEFAULT 'MONITOR' CHECK (status IN ('MONITOR', 'ELEVATED', 'CHALLENGED', 'BLOCKED')),
    failed_login_count INT NOT NULL DEFAULT 0,
    scanning_count INT NOT NULL DEFAULT 0,
    unauthorized_count INT NOT NULL DEFAULT 0,
    total_requests INT NOT NULL DEFAULT 0,
    last_event_type TEXT,
    first_observed TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_observed TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    block_expires_at TIMESTAMPTZ,
    notes TEXT
);

-- 8. DEVELOPER SYSTEM HEALTH SNAPSHOTS
CREATE TABLE IF NOT EXISTS public.developer_system_health (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_name TEXT NOT NULL,
    status system_health_status NOT NULL DEFAULT 'HEALTHY',
    latency_ms NUMERIC(10,2),
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. DEVELOPER PERFORMANCE METRICS AGGREGATION
CREATE TABLE IF NOT EXISTS public.developer_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name TEXT NOT NULL, -- 'LCP', 'CLS', 'INP', 'TTFB', 'API_LATENCY'
    metric_value NUMERIC(10,3) NOT NULL,
    route TEXT NOT NULL,
    device_type TEXT DEFAULT 'desktop',
    connection_type TEXT,
    sample_size INT DEFAULT 1,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 10. INDEXES FOR HIGH-THROUGHPUT QUERYING & DASHBOARD FILTERS
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_dev_sec_created ON public.developer_security_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dev_sec_severity ON public.developer_security_events(severity);
CREATE INDEX IF NOT EXISTS idx_dev_sec_event_type ON public.developer_security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_dev_sec_ip ON public.developer_security_events(ip_address);
CREATE INDEX IF NOT EXISTS idx_dev_sec_resolved ON public.developer_security_events(resolved);

CREATE INDEX IF NOT EXISTS idx_dev_audit_created ON public.developer_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dev_audit_actor ON public.developer_audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_dev_audit_action ON public.developer_audit_logs(action);

CREATE INDEX IF NOT EXISTS idx_dev_errors_last_seen ON public.developer_error_events(last_seen DESC);
CREATE INDEX IF NOT EXISTS idx_dev_errors_type ON public.developer_error_events(error_type);
CREATE INDEX IF NOT EXISTS idx_dev_errors_resolved ON public.developer_error_events(resolved);

CREATE INDEX IF NOT EXISTS idx_dev_ip_risk ON public.developer_ip_reputation(risk_score DESC);
CREATE INDEX IF NOT EXISTS idx_dev_ip_status ON public.developer_ip_reputation(status);

CREATE INDEX IF NOT EXISTS idx_dev_metrics_name_recorded ON public.developer_metrics(metric_name, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_dev_health_service ON public.developer_system_health(service_name, checked_at DESC);

-- ==============================================================================
-- 11. ROW LEVEL SECURITY (RLS) POLICIES — ZERO-TRUST DEVELOPER ACCESS ONLY
-- ==============================================================================
ALTER TABLE public.developer_security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developer_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developer_error_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developer_ip_reputation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developer_system_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developer_metrics ENABLE ROW LEVEL SECURITY;

-- Security Events Policies: Developers & Super Admins full access; Public NO access
CREATE POLICY "Developer manage security events"
ON public.developer_security_events FOR ALL
USING (public.is_developer());

-- Audit Logs Policies: Developers read/insert; Public NO access
CREATE POLICY "Developer manage audit logs"
ON public.developer_audit_logs FOR ALL
USING (public.is_developer());

-- Error Events Policies: Public can INSERT sanitized errors (telemetry); Only developers can VIEW/UPDATE
CREATE POLICY "Public insert sanitized error telemetry"
ON public.developer_error_events FOR INSERT
WITH CHECK (TRUE);

CREATE POLICY "Developer view and manage errors"
ON public.developer_error_events FOR ALL
USING (public.is_developer());

-- IP Reputation Policies: Only developers can VIEW and UPDATE
CREATE POLICY "Developer manage IP reputation"
ON public.developer_ip_reputation FOR ALL
USING (public.is_developer());

-- System Health Policies: Only developers can VIEW and MANAGE
CREATE POLICY "Developer manage system health"
ON public.developer_system_health FOR ALL
USING (public.is_developer());

-- Performance Metrics Policies: Public can INSERT anonymous client web vitals; Only developers can VIEW
CREATE POLICY "Public insert performance telemetry"
ON public.developer_metrics FOR INSERT
WITH CHECK (TRUE);

CREATE POLICY "Developer view performance metrics"
ON public.developer_metrics FOR ALL
USING (public.is_developer());
