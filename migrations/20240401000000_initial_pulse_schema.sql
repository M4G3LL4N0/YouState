-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create pulse schema
CREATE SCHEMA IF NOT EXISTS pulse;

-- Grant permissions to Supabase roles
GRANT USAGE ON SCHEMA pulse TO authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA pulse GRANT ALL ON TABLES TO authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA pulse GRANT ALL ON ROUTINES TO authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA pulse GRANT ALL ON SEQUENCES TO authenticated, service_role;

-- Create enum types
CREATE TYPE pulse.metric_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE pulse.hunger_level AS ENUM ('low', 'rising', 'high');
CREATE TYPE pulse.hydration_level AS ENUM ('low', 'ok', 'good');
CREATE TYPE pulse.lifestyle_type AS ENUM (
  'office', 'remote', 'shift', 'freelance', 'student', 'parent', 'physical'
);
CREATE TYPE pulse.goal_type AS ENUM (
  'energy', 'focus', 'recovery', 'performance', 'balance'
);
CREATE TYPE pulse.caffeine_habits AS ENUM ('none', 'light', 'moderate', 'heavy');
CREATE TYPE pulse.caffeine_sensitivity AS ENUM ('low', 'medium', 'high');
CREATE TYPE pulse.meal_pattern AS ENUM ('strict', 'flexible', 'irregular');
CREATE TYPE pulse.log_entry_type AS ENUM ('state', 'action', 'event');

-- Profiles table
CREATE TABLE pulse.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INT CHECK (age >= 0),
  weight NUMERIC CHECK (weight > 0), -- kg
  height NUMERIC CHECK (height > 0), -- cm
  lifestyle pulse.lifestyle_type NOT NULL,
  goals pulse.goal_type[] NOT NULL DEFAULT '{}',
  caffeine_habits pulse.caffeine_habits NOT NULL,
  caffeine_sensitivity pulse.caffeine_sensitivity NOT NULL,
  meal_pattern pulse.meal_pattern NOT NULL,
  activity_level pulse.metric_level NOT NULL,
  stress_level pulse.metric_level NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE pulse.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own profiles" 
ON pulse.profiles
FOR ALL
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

CREATE INDEX idx_profiles_user_id ON pulse.profiles(user_id);

-- Daily states table
CREATE TABLE pulse.daily_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  energy pulse.metric_level NOT NULL,
  focus pulse.metric_level NOT NULL,
  hunger pulse.hunger_level NOT NULL,
  crash_risk pulse.metric_level NOT NULL,
  hydration pulse.hydration_level NOT NULL,
  sleep_debt pulse.metric_level NOT NULL,
  caffeine_load pulse.metric_level NOT NULL,
  physical_demand pulse.metric_level NOT NULL,
  cognitive_demand pulse.metric_level NOT NULL,
  stress_load pulse.metric_level NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE pulse.daily_states ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own daily states"
ON pulse.daily_states
FOR ALL
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

CREATE INDEX idx_daily_states_user_id ON pulse.daily_states(user_id);

-- Recommendations table
CREATE TABLE pulse.recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  priority INT NOT NULL CHECK (priority >= 0),
  message TEXT NOT NULL,
  reasoning TEXT NOT NULL,
  caution TEXT,
  duration INT CHECK (duration > 0),
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE pulse.recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own recommendations"
ON pulse.recommendations
FOR ALL
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

CREATE INDEX idx_recommendations_user_id ON pulse.recommendations(user_id);

-- Daily logs table
CREATE TABLE pulse.daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_type pulse.log_entry_type NOT NULL,
  description TEXT NOT NULL,
  details JSONB,
  logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE pulse.daily_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own daily logs"
ON pulse.daily_logs
FOR ALL
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

CREATE INDEX idx_daily_logs_user_id ON pulse.daily_logs(user_id);

-- User settings table
CREATE TABLE pulse.user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  push_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  sms_notifications BOOLEAN NOT NULL DEFAULT FALSE,
  apple_health_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  google_fit_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  wearables_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE pulse.user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own settings"
ON pulse.user_settings
FOR ALL
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

CREATE INDEX idx_user_settings_user_id ON pulse.user_settings(user_id);

-- Waitlist table (publicly writable)
CREATE TABLE pulse.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  role TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT
);

ALTER TABLE pulse.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public waitlist submissions"
ON pulse.waitlist
FOR INSERT
TO public
WITH CHECK (true);

CREATE INDEX idx_waitlist_email ON pulse.waitlist(email);

-- Timestamp update function
CREATE OR REPLACE FUNCTION pulse.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers after all tables exist
CREATE TRIGGER update_profile_timestamp
BEFORE UPDATE ON pulse.profiles
FOR EACH ROW EXECUTE FUNCTION pulse.update_timestamp();

CREATE TRIGGER update_user_settings_timestamp
BEFORE UPDATE ON pulse.user_settings
FOR EACH ROW EXECUTE FUNCTION pulse.update_timestamp();
