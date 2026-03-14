-- ═══════════════════════════════════════════
-- NewGen Finance Calculator — Supabase Migration
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- 1. Saved Analyses (replaces localStorage fh_history_v6)
CREATE TABLE IF NOT EXISTS calculator_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    company TEXT NOT NULL DEFAULT 'ללא שם',
    mode TEXT NOT NULL DEFAULT 'balanced' CHECK (mode IN ('growth', 'balanced', 'value')),
    notes TEXT DEFAULT '',
    is_advanced BOOLEAN DEFAULT false,
    custom_thresholds JSONB DEFAULT '{}',
    base_metrics JSONB DEFAULT '{}',
    custom_defs JSONB DEFAULT '[]',
    custom_vals JSONB DEFAULT '{}',
    total_score INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Custom Metrics (replaces localStorage fh_custom_v3)
CREATE TABLE IF NOT EXISTS calculator_custom_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    metric_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    threshold NUMERIC NOT NULL,
    compare TEXT NOT NULL DEFAULT 'above' CHECK (compare IN ('above', 'below')),
    optimal_value NUMERIC NOT NULL,
    worst_value NUMERIC NOT NULL,
    weights JSONB NOT NULL DEFAULT '{"growth":1,"balanced":1,"value":1}',
    unit TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. User Preferences
CREATE TABLE IF NOT EXISTS calculator_preferences (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    default_mode TEXT DEFAULT 'balanced' CHECK (default_mode IN ('growth', 'balanced', 'value')),
    is_advanced BOOLEAN DEFAULT false,
    custom_thresholds JSONB DEFAULT '{}',
    last_template TEXT DEFAULT 'tech',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ═══ ROW LEVEL SECURITY ═══

ALTER TABLE calculator_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_custom_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_preferences ENABLE ROW LEVEL SECURITY;

-- Analyses: users can only CRUD their own
CREATE POLICY "Users manage own analyses"
    ON calculator_analyses FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Custom Metrics: users can only CRUD their own
CREATE POLICY "Users manage own custom metrics"
    ON calculator_custom_metrics FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Preferences: users can only CRUD their own
CREATE POLICY "Users manage own preferences"
    ON calculator_preferences FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ═══ INDEXES ═══

CREATE INDEX IF NOT EXISTS idx_analyses_user ON calculator_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_updated ON calculator_analyses(user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_custom_metrics_user ON calculator_custom_metrics(user_id);

-- ═══ AUTO-UPDATE updated_at ═══

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_analyses_updated
    BEFORE UPDATE ON calculator_analyses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_preferences_updated
    BEFORE UPDATE ON calculator_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
