-- Checklist (preserved as comments)
-- 1. Fix the automatic profile creation trigger.
-- 2. Simplify and correct overlapping RLS policies.
-- 3. Replace storage bucket creation with the officially supported Supabase migration approach.
-- 4. Create bucket-specific storage policies for: avatars, blood-request-images, hospital-images, reports.
-- 5. Add missing CHECK constraints: phone, latitude, longitude, patient_age, total_donations.
-- 6. Make donation eligibility configurable (default 120 days) instead of hardcoded 56 days.
-- 7. Validate the migration with: supabase db lint, supabase db push --dry-run.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Official Supabase storage bucket creation
CREATE STORAGE BUCKET IF NOT EXISTS avatars;
CREATE STORAGE BUCKET IF NOT EXISTS "blood-request-images";
CREATE STORAGE BUCKET IF NOT EXISTS "hospital-images";
CREATE STORAGE BUCKET IF NOT EXISTS reports;

-- Storage bucket policies (basic authenticated access)
CREATE STORAGE POLICY IF NOT EXISTS avatars_policy ON bucket avatars FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE STORAGE POLICY IF NOT EXISTS avatars_policy ON bucket avatars FOR INSERT USING (auth.uid() IS NOT NULL);
CREATE STORAGE POLICY IF NOT EXISTS blood_req_images_policy ON bucket "blood-request-images" FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE STORAGE POLICY IF NOT EXISTS blood_req_images_policy ON bucket "blood-request-images" FOR INSERT USING (auth.uid() IS NOT NULL);
CREATE STORAGE POLICY IF NOT EXISTS hospital_images_policy ON bucket "hospital-images" FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE STORAGE POLICY IF NOT EXISTS hospital_images_policy ON bucket "hospital-images" FOR INSERT USING (auth.uid() IS NOT NULL);
CREATE STORAGE POLICY IF NOT EXISTS reports_policy ON bucket reports FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE STORAGE POLICY IF NOT EXISTS reports_policy ON bucket reports FOR INSERT USING (auth.uid() IS NOT NULL);

-- Enumerated type for blood groups
CREATE TYPE public.blood_type AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');

-- Config table for donation eligibility days (and future config)
CREATE TABLE public.config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
INSERT INTO public.config (key, value) VALUES ('donation_eligibility_days', '120')
  ON CONFLICT (key) DO NOTHING;

-- Profiles table (links to auth.users) with all required columns
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT NOT NULL,
  division TEXT,
  district TEXT,
  gender TEXT,
  date_of_birth DATE,
  blood_type public.blood_type,
  last_donation_date TIMESTAMPTZ,
  avatar_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  total_donations NUMERIC NOT NULL DEFAULT 0,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT phone_bn_check CHECK (phone ~ '^\\+8801[0-9]{9}$')
);

-- Function to auto‑create a profile for a new Auth user (phone placeholder satisfies CHECK)
CREATE OR REPLACE FUNCTION public.create_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, full_name, phone, is_admin, created_at, updated_at
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    '+8801000000000',
    FALSE,
    now(),
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users to fire after a row is inserted
CREATE TRIGGER trigger_create_profile
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.create_profile();

-- Hospitals table with required columns
CREATE TABLE public.hospitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  division TEXT,
  district TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  emergency_contact TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT latitude_check CHECK (latitude BETWEEN -90 AND 90),
  CONSTRAINT longitude_check CHECK (longitude BETWEEN -180 AND 180),
  CONSTRAINT phone_bn_check_hospital CHECK (phone IS NULL OR phone ~ '^\\+8801[0-9]{9}$')
);

-- Blood Requests table with all required columns
CREATE TABLE public.blood_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE SET NULL,
  blood_type public.blood_type NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  status TEXT NOT NULL DEFAULT 'pending',
  patient_name TEXT,
  patient_age INTEGER CHECK (patient_age >= 0),
  contact_phone TEXT,
  division TEXT,
  district TEXT,
  required_before TIMESTAMPTZ,
  note TEXT,
  image_url TEXT,
  emergency_level TEXT,
  fulfilled_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT phone_bn_check_req CHECK (contact_phone IS NULL OR contact_phone ~ '^\\+8801[0-9]{9}$')
);

-- Donors table (extended for eligibility and searching)
CREATE TABLE public.donors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  last_donation_date TIMESTAMPTZ,
  total_donations NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Donations table (extended)
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID NOT NULL REFERENCES public.donors(id) ON DELETE CASCADE,
  request_id UUID NOT NULL REFERENCES public.blood_requests(id) ON DELETE CASCADE,
  donation_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  status TEXT NOT NULL DEFAULT 'pending',
  verified_by UUID REFERENCES public.profiles(id),
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Notifications table (extended)
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  data JSONB,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reports table (extended)
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  generated_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  target_user_id UUID REFERENCES public.profiles(id),
  report_type TEXT NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  resolved_by UUID REFERENCES public.profiles(id),
  resolved_at TIMESTAMPTZ,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Generic trigger to keep updated_at in sync
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the update_timestamp trigger to every table (except auth.users)
DO $$
DECLARE tbl TEXT;
BEGIN
  FOR tbl IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename NOT IN ('auth.users')
  LOOP
    EXECUTE format('CREATE TRIGGER %I_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();', tbl, tbl);
  END LOOP;
END $$;

-- Helper function to determine admin status
CREATE OR REPLACE FUNCTION public.is_admin(uid UUID) RETURNS BOOLEAN LANGUAGE sql STABLE AS $$
  SELECT is_admin FROM public.profiles WHERE id = uid;
$$;

-- ----- ROW LEVEL SECURITY POLICIES -----

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY profile_select ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin(auth.uid()));
CREATE POLICY profile_insert ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY profile_update ON public.profiles FOR UPDATE USING (auth.uid() = id OR public.is_admin(auth.uid())) WITH CHECK (auth.uid() = id OR public.is_admin(auth.uid()));
CREATE POLICY profile_delete ON public.profiles FOR DELETE USING (auth.uid() = id OR public.is_admin(auth.uid()));

-- Hospitals (admin only)
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
CREATE POLICY hospital_select ON public.hospitals FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY hospital_insert ON public.hospitals FOR INSERT WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY hospital_update ON public.hospitals FOR UPDATE USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY hospital_delete ON public.hospitals FOR DELETE USING (public.is_admin(auth.uid()));

-- Blood Requests
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY br_select ON public.blood_requests FOR SELECT USING (auth.uid() = requester_id OR public.is_admin(auth.uid()));
CREATE POLICY br_insert ON public.blood_requests FOR INSERT WITH CHECK (auth.uid() = requester_id OR public.is_admin(auth.uid()));
CREATE POLICY br_update ON public.blood_requests FOR UPDATE USING (auth.uid() = requester_id OR public.is_admin(auth.uid())) WITH CHECK (auth.uid() = requester_id OR public.is_admin(auth.uid()));
CREATE POLICY br_delete ON public.blood_requests FOR DELETE USING (auth.uid() = requester_id OR public.is_admin(auth.uid()));

-- Donors
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
CREATE POLICY donor_select ON public.donors FOR SELECT USING (auth.uid() = profile_id OR public.is_admin(auth.uid()));
CREATE POLICY donor_insert ON public.donors FOR INSERT WITH CHECK (auth.uid() = profile_id OR public.is_admin(auth.uid()));
CREATE POLICY donor_update ON public.donors FOR UPDATE USING (auth.uid() = profile_id OR public.is_admin(auth.uid())) WITH CHECK (auth.uid() = profile_id OR public.is_admin(auth.uid()));
CREATE POLICY donor_delete ON public.donors FOR DELETE USING (auth.uid() = profile_id OR public.is_admin(auth.uid()));

-- Donations
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY donation_select ON public.donations FOR SELECT USING (
  auth.uid() = (SELECT profile_id FROM public.donors WHERE id = donor_id) OR public.is_admin(auth.uid())
);
CREATE POLICY donation_insert ON public.donations FOR INSERT WITH CHECK (
  auth.uid() = (SELECT profile_id FROM public.donors WHERE id = donor_id) OR public.is_admin(auth.uid())
);
CREATE POLICY donation_update ON public.donations FOR UPDATE USING (
  auth.uid() = (SELECT profile_id FROM public.donors WHERE id = donor_id) OR public.is_admin(auth.uid())
) WITH CHECK (
  auth.uid() = (SELECT profile_id FROM public.donors WHERE id = donor_id) OR public.is_admin(auth.uid())
);
CREATE POLICY donation_delete ON public.donations FOR DELETE USING (
  auth.uid() = (SELECT profile_id FROM public.donors WHERE id = donor_id) OR public.is_admin(auth.uid())
);

-- Notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY notif_select ON public.notifications FOR SELECT USING (auth.uid() = recipient_id OR public.is_admin(auth.uid()));
CREATE POLICY notif_insert ON public.notifications FOR INSERT WITH CHECK (auth.uid() = recipient_id OR public.is_admin(auth.uid()));
CREATE POLICY notif_update ON public.notifications FOR UPDATE USING (auth.uid() = recipient_id OR public.is_admin(auth.uid())) WITH CHECK (auth.uid() = recipient_id OR public.is_admin(auth.uid()));
CREATE POLICY notif_delete ON public.notifications FOR DELETE USING (auth.uid() = recipient_id OR public.is_admin(auth.uid()));

-- Reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY report_select ON public.reports FOR SELECT USING (
  auth.uid() = generated_by OR auth.uid() = target_user_id OR public.is_admin(auth.uid())
);
CREATE POLICY report_insert ON public.reports FOR INSERT WITH CHECK (
  auth.uid() = generated_by OR public.is_admin(auth.uid())
);
CREATE POLICY report_update ON public.reports FOR UPDATE USING (
  auth.uid() = generated_by OR public.is_admin(auth.uid())
) WITH CHECK (
  auth.uid() = generated_by OR public.is_admin(auth.uid())
);
CREATE POLICY report_delete ON public.reports FOR DELETE USING (
  auth.uid() = generated_by OR public.is_admin(auth.uid())
);

-- ----- INDEXES -----
-- Profiles
CREATE INDEX idx_profiles_division ON public.profiles(division);
CREATE INDEX idx_profiles_district ON public.profiles(district);
CREATE INDEX idx_profiles_blood_type ON public.profiles(blood_type);
CREATE INDEX idx_profiles_is_available ON public.profiles(is_available);
-- Hospitals
CREATE INDEX idx_hospitals_division ON public.hospitals(division);
CREATE INDEX idx_hospitals_district ON public.hospitals(district);
CREATE INDEX idx_hospitals_phone ON public.hospitals(phone);
-- Blood Requests
CREATE INDEX idx_blood_requests_requester_id ON public.blood_requests(requester_id);
CREATE INDEX idx_blood_requests_hospital_id ON public.blood_requests(hospital_id);
CREATE INDEX idx_blood_requests_blood_type ON public.blood_requests(blood_type);
CREATE INDEX idx_blood_requests_patient_age ON public.blood_requests(patient_age);
CREATE INDEX idx_blood_requests_emergency_level ON public.blood_requests(emergency_level);
-- Donors
CREATE INDEX idx_donors_profile_id ON public.donors(profile_id);
CREATE INDEX idx_donors_is_available ON public.donors(is_available);
-- Donations
CREATE INDEX idx_donations_donor_id ON public.donations(donor_id);
CREATE INDEX idx_donations_request_id ON public.donations(request_id);
CREATE INDEX idx_donations_status ON public.donations(status);
-- Notifications
CREATE INDEX idx_notifications_recipient_id ON public.notifications(recipient_id);
CREATE INDEX idx_notifications_type ON public.notifications(type);
-- Reports
CREATE INDEX idx_reports_generated_by ON public.reports(generated_by);
CREATE INDEX idx_reports_target_user_id ON public.reports(target_user_id);
CREATE INDEX idx_reports_status ON public.reports(status);

-- Function to evaluate donation eligibility based on config value
CREATE OR REPLACE FUNCTION public.is_eligible_for_donation(donor_uuid UUID) RETURNS BOOLEAN LANGUAGE sql STABLE AS $$
  SELECT (NOW() - COALESCE(
    (SELECT MAX(donation_date) FROM public.donations WHERE donor_id = (SELECT id FROM public.donors WHERE profile_id = donor_uuid)),
    now() - (SELECT (value || ' days')::INTERVAL FROM public.config WHERE key = 'donation_eligibility_days')
  )) >= (SELECT (value || ' days')::INTERVAL FROM public.config WHERE key = 'donation_eligibility_days');
$$;

-- End of migration