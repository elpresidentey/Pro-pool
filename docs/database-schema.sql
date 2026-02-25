-- Pro Pool Database Schema
-- Initialize tables, RLS policies, and indexes

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== AUTH & USERS =====

-- Users table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'professional')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===== PROFESSIONALS =====

-- Professionals table
CREATE TABLE IF NOT EXISTS public.professionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('beautician', 'writer', 'plumber', 'electrician', 'tailor')),
  location TEXT NOT NULL CHECK (location IN ('lekki', 'yaba', 'ikeja', 'surulere', 'VI', 'agege')),
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  bio TEXT NOT NULL,
  profile_image_url TEXT,
  instagram_link TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Portfolio images
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== REVIEWS & RATINGS =====

-- Reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(professional_id, user_id) -- One review per user per professional
);

-- ===== INDEXES =====

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_professionals_category ON professionals(category);
CREATE INDEX IF NOT EXISTS idx_professionals_location ON professionals(location);
CREATE INDEX IF NOT EXISTS idx_professionals_is_approved ON professionals(is_approved);
CREATE INDEX IF NOT EXISTS idx_portfolio_professional_id ON portfolio(professional_id);
CREATE INDEX IF NOT EXISTS idx_reviews_professional_id ON reviews(professional_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);

-- ===== ROW LEVEL SECURITY =====

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- USERS table policies
CREATE POLICY "Users can read own record"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own record"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "New users can insert their record"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- PROFESSIONALS table policies
CREATE POLICY "Anyone can read approved professionals"
  ON public.professionals FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Professionals can read own profile"
  ON public.professionals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Professionals can create own profile"
  ON public.professionals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Professionals can update own profile"
  ON public.professionals FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- PORTFOLIO table policies
CREATE POLICY "Anyone can read portfolio images"
  ON public.portfolio FOR SELECT
  USING (true);

CREATE POLICY "Professionals can upload portfolio images"
  ON public.portfolio FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM professionals p
      WHERE p.id = portfolio.professional_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Professionals can delete own portfolio images"
  ON public.portfolio FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM professionals p
      WHERE p.id = professional_id AND p.user_id = auth.uid()
    )
  );

-- REVIEWS table policies
CREATE POLICY "Anyone can read reviews"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON public.reviews FOR DELETE
  USING (auth.uid() = user_id);

-- ===== TRIGGERS =====

-- Auto-create user record when auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')::TEXT
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to automatically handle new auth user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_professionals_updated_at
  BEFORE UPDATE ON professionals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ===== VIEWS & FUNCTIONS =====

-- View: Professionals with average rating
CREATE OR REPLACE VIEW professional_ratings AS
SELECT 
  p.id,
  p.name,
  p.profile_image_url,
  p.category,
  p.location,
  ROUND(AVG(r.rating)::numeric, 1) as avg_rating,
  COUNT(r.id) as review_count
FROM professionals p
LEFT JOIN reviews r ON p.id = r.professional_id
WHERE p.is_approved = true
GROUP BY p.id, p.name, p.profile_image_url, p.category, p.location;

-- Function: Search professionals
CREATE OR REPLACE FUNCTION search_professionals(
  search_query TEXT DEFAULT '',
  category_filter TEXT DEFAULT NULL,
  location_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  category TEXT,
  location TEXT,
  profile_image_url TEXT,
  avg_rating NUMERIC,
  review_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.category,
    p.location,
    p.profile_image_url,
    pr.avg_rating,
    pr.review_count
  FROM professionals p
  LEFT JOIN professional_ratings pr ON p.id = pr.id
  WHERE 
    p.is_approved = true
    AND (search_query = '' OR p.name ILIKE '%' || search_query || '%')
    AND (category_filter IS NULL OR p.category = category_filter)
    AND (location_filter IS NULL OR p.location = location_filter)
  ORDER BY pr.avg_rating DESC NULLS LAST, pr.review_count DESC;
END;
$$ LANGUAGE plpgsql;

-- ===== SAMPLE DATA (Optional) =====

-- Uncomment below to add sample professionals for testing

-- INSERT INTO public.users (id, email, role) VALUES
-- ('00000000-0000-0000-0000-000000000001'::uuid, 'chioma@example.com', 'professional'),
-- ('00000000-0000-0000-0000-000000000002'::uuid, 'tunde@example.com', 'professional');

-- INSERT INTO public.professionals (user_id, name, category, location, phone, whatsapp, bio, is_approved) VALUES
-- ('00000000-0000-0000-0000-000000000001'::uuid, 'Chioma Okonkwo', 'beautician', 'lekki', '+2348012345678', '+2348012345678', 'Professional makeup and hair beautician with 5 years experience', true),
-- ('00000000-0000-0000-0000-000000000002'::uuid, 'Tunde Adeleke', 'plumber', 'yaba', '+2348098765432', '+2348098765432', 'Expert plumber with certified training', true);