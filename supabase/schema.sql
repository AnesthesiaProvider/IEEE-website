-- ==============================================================================
-- IEEE Women in Engineering (WIE), Bennett University - Database Schema
-- Table: junior_core_applications
-- Database: PostgreSQL / Supabase
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.junior_core_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    enrollment_number TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    gender TEXT,
    course TEXT NOT NULL,
    branch TEXT NOT NULL,
    year TEXT NOT NULL,
    semester TEXT NOT NULL,
    domain TEXT NOT NULL,
    why_join TEXT NOT NULL,
    previous_experience TEXT,
    skills TEXT NOT NULL,
    portfolio_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    additional_info TEXT,
    consent BOOLEAN NOT NULL DEFAULT true,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Shortlisted', 'Selected', 'Rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indices for rapid administrative lookup and filtering
CREATE INDEX IF NOT EXISTS idx_junior_core_enrollment ON public.junior_core_applications(enrollment_number);
CREATE INDEX IF NOT EXISTS idx_junior_core_domain ON public.junior_core_applications(domain);
CREATE INDEX IF NOT EXISTS idx_junior_core_status ON public.junior_core_applications(status);
CREATE INDEX IF NOT EXISTS idx_junior_core_created_at ON public.junior_core_applications(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.junior_core_applications ENABLE ROW LEVEL SECURITY;

-- Anonymous users can insert their own application
CREATE POLICY "Allow public insert for junior core application"
ON public.junior_core_applications
FOR INSERT
TO anon
WITH CHECK (true);

-- Only authenticated administrators or service role can select/update/delete
CREATE POLICY "Allow service role full access"
ON public.junior_core_applications
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_update_timestamp ON public.junior_core_applications;
CREATE TRIGGER tr_update_timestamp
BEFORE UPDATE ON public.junior_core_applications
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
