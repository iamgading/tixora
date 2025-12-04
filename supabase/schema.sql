-- ============================================
-- ER Check-in Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (extends Supabase Auth)
-- ============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- EVENTS TABLE
-- ============================================
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  location TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  max_attendees INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster slug lookups
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_user_id ON events(user_id);

-- ============================================
-- REGISTRATIONS TABLE
-- ============================================
CREATE TABLE registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  qr_code TEXT UNIQUE NOT NULL,
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent duplicate registration for same event
  UNIQUE(event_id, email)
);

-- Index for faster QR code lookups
CREATE INDEX idx_registrations_qr_code ON registrations(qr_code);
CREATE INDEX idx_registrations_event_id ON registrations(event_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read/update their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Events: Owners can CRUD, public can read published events
CREATE POLICY "Anyone can view published events"
  ON events FOR SELECT
  USING (is_published = true);

CREATE POLICY "Owners can view own events"
  ON events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Owners can create events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owners can update own events"
  ON events FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Owners can delete own events"
  ON events FOR DELETE
  USING (auth.uid() = user_id);

-- Registrations: Public can register, owners can view their event registrations
CREATE POLICY "Anyone can register for published events"
  ON registrations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events 
      WHERE events.id = event_id 
      AND events.is_published = true
    )
  );

CREATE POLICY "Anyone can view own registration by QR"
  ON registrations FOR SELECT
  USING (true);

CREATE POLICY "Event owners can update registrations (check-in)"
  ON registrations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM events 
      WHERE events.id = event_id 
      AND events.user_id = auth.uid()
    )
  );

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to generate unique slug
CREATE OR REPLACE FUNCTION generate_unique_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  new_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Convert to lowercase, replace spaces with hyphens, remove special chars
  base_slug := LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]', '', 'g'));
  base_slug := REGEXP_REPLACE(base_slug, '\s+', '-', 'g');
  base_slug := TRIM(BOTH '-' FROM base_slug);
  
  new_slug := base_slug;
  
  -- Check if slug exists, if so add number suffix
  WHILE EXISTS (SELECT 1 FROM events WHERE slug = new_slug) LOOP
    counter := counter + 1;
    new_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN new_slug;
END;
$$ LANGUAGE plpgsql;

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
