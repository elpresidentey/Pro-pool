# Pro Pool - Authentication Setup Guide

## ✅ Environment Configuration

Your `.env.local` file is already configured with your Supabase credentials:
- **URL**: https://irfptgmnhcormzjhmzuh.supabase.co
- **Anon Key**: Configured ✓

## 🔐 Supabase Database Schema

Run these SQL queries in your Supabase SQL Editor to set up the database:

### 1. Create Users Table (Auto-created by Supabase Auth)
Supabase automatically creates an `auth.users` table when you use authentication.

### 2. Create Professionals Table
```sql
CREATE TABLE IF NOT EXISTS public.professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  location VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  bio TEXT,
  profile_image_url TEXT,
  instagram_link TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX idx_professionals_user_id ON public.professionals(user_id);
CREATE INDEX idx_professionals_category ON public.professionals(category);
CREATE INDEX idx_professionals_location ON public.professionals(location);
CREATE INDEX idx_professionals_approved ON public.professionals(is_approved);
```

### 3. Create Portfolio Table
```sql
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX idx_portfolio_professional_id ON public.portfolio(professional_id);
```

### 4. Create Reviews Table
```sql
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.professionals ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  rating NUMERIC(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX idx_reviews_professional_id ON public.reviews(professional_id);
CREATE INDEX idx_reviews_client_id ON public.reviews(client_id);
```

### 5. Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Professionals: Everyone can view approved professionals
CREATE POLICY "Anyone can view approved professionals" ON public.professionals
  FOR SELECT USING (is_approved = true);

-- Professionals: Professionals can view/edit their own profile
CREATE POLICY "Professionals can manage own profile" ON public.professionals
  FOR ALL USING (auth.uid() = user_id);

-- Portfolio: Everyone can view portfolio of approved professionals
CREATE POLICY "Anyone can view portfolio of approved professionals" ON public.portfolio
  FOR SELECT USING (
    (SELECT is_approved FROM public.professionals WHERE id = professional_id) = true
  );

-- Portfolio: Professionals can manage own portfolio
CREATE POLICY "Professionals can manage own portfolio" ON public.portfolio
  FOR ALL USING (
    (SELECT user_id FROM public.professionals WHERE id = professional_id) = auth.uid()
  );

-- Reviews: Everyone can view reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

-- Reviews: Authenticated users can create reviews
CREATE POLICY "Authenticated users can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Reviews: Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = client_id);
```

## 🔄 Authentication Flow

### Sign Up
1. User enters email, password, and selects role (client or professional)
2. Supabase creates auth user with role in user_metadata
3. If professional, user is redirected to profile setup page
4. If client, user is redirected to home page

### Sign In
- Email/password authentication via Supabase
- User session stored in browser localStorage
- Protected routes redirect to login if not authenticated

### Sign Out
- Clears session from Supabase
- Clears localStorage
- Redirects to home page

## 📱 Key Features Implemented

✅ **Email/Password Authentication**
- Sign up with role selection
- Login with email credentials
- Session persistence

✅ **Protected Routes**
- `useRequireAuth()` - Protects routes requiring authentication
- `useRequireProfessional()` - Protects professional-only routes

✅ **User State Management**
- `useCurrentUser()` - Get current user and auth status
- Real-time auth state changes

✅ **Password Management**
- `resetPassword()` - Send password reset email
- `updatePassword()` - Update password in account settings

## 🎯 Next Steps

1. **Verify RLS Policies** - Ensure all policies are set correctly in Supabase dashboard
2. **Test Authentication** - Try signing up and logging in
3. **Test Professional Flow** - Sign up as professional and complete profile setup
4. **Connect to Dashboard** - Dashboard should fetch user's professional profile
5. **Email Configuration** (Optional) - Configure SMTP for password reset emails

## 📝 Testing Credentials

Create a test account:
- Email: `test@example.com`
- Password: `Test@12345` (minimum 8 characters)
- Role: Professional or Client

## ⚠️ Security Notes

- ✅ Environment variables in `.env.local` (not committed to git)
- ✅ RLS policies enforce data access control
- ✅ Password reset requires email verification
- ✅ Session tokens auto-refresh
- ⚠️ Ensure `.env.local` is in `.gitignore` (critical!)

## 🆘 Troubleshooting

**"Missing Supabase environment variables"**
- Check `.env.local` file exists with correct variables
- Restart dev server after creating/modifying `.env.local`

**"Invalid login credentials"**
- Ensure email is correct and account exists
- Check email verification if required

**"RLS policy blocked database query"**
- Verify RLS policies are set correctly
- Check auth user ID matches

**"Professional profile not loading"**
- Ensure account is created as professional role
- Check if professional record exists in database

## 📚 Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase RLS Docs](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase React Setup](https://supabase.com/docs/guides/getting-started/quickstarts/react)
