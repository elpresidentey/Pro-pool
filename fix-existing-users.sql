-- Migration: Fix existing auth users missing from public.users table
-- This script creates public.users records for any auth.users that don't have a matching record

-- Insert missing user records from auth.users
INSERT INTO public.users (id, email, role)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'role', 'client')::TEXT as role
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;

-- Verify the fix
SELECT COUNT(*) as total_auth_users FROM auth.users;
SELECT COUNT(*) as total_public_users FROM public.users;
SELECT COUNT(*) as missing_users FROM auth.users WHERE id NOT IN (SELECT id FROM public.users);
