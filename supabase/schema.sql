-- ============================================================
-- AIVORA Event Management - Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- EVENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title                 TEXT NOT NULL,
  category              TEXT NOT NULL CHECK (category IN ('technical', 'non_technical', 'cultural')),
  poster_url            TEXT,
  venue                 TEXT NOT NULL DEFAULT '',
  event_date            DATE NOT NULL,
  start_time            TIME NOT NULL,
  end_time              TIME NOT NULL,
  short_description     TEXT NOT NULL DEFAULT '',
  full_description      TEXT NOT NULL DEFAULT '',
  rules                 TEXT,
  eligibility           TEXT,
  registration_link     TEXT,
  registration_deadline DATE,
  contact_name_1        TEXT,
  contact_phone_1       TEXT,
  contact_name_2        TEXT,
  contact_phone_2       TEXT,
  is_published          BOOLEAN NOT NULL DEFAULT FALSE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public can read published events only
CREATE POLICY "Public can view published events"
  ON events FOR SELECT
  USING (is_published = TRUE);

-- Admins (authenticated users) can do everything
CREATE POLICY "Admins can view all events"
  ON events FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admins can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "Admins can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Admins can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (TRUE);

-- ============================================================
-- STORAGE BUCKET: event-posters
-- ============================================================
-- Run in Supabase Dashboard > Storage > New Bucket
-- Bucket name: event-posters
-- Public: true

-- Storage policy: anyone can read, only authenticated can upload
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-posters', 'event-posters', TRUE)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view event posters"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-posters');

CREATE POLICY "Admins can upload event posters"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'event-posters');

CREATE POLICY "Admins can update event posters"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'event-posters');

CREATE POLICY "Admins can delete event posters"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'event-posters');
