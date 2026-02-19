# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in with your account
3. Click "New Project"
4. Fill in the project details:
   - **Name:** Pro Pool
   - **Database Password:** (Create a strong password)
   - **Region:** Choose closest to Nigeria (EU West or Africa if available)
5. Wait for the project to initialize (2-3 minutes)

## Step 2: Get Your API Credentials

1. Go to **Settings** > **API**
2. Copy the following:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon (public)** key → `VITE_SUPABASE_ANON_KEY`
3. Paste them in your `.env.local` file

## Step 3: Create Database Tables

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy and paste the entire SQL schema from `docs/database-schema.sql`
4. Click **Run**
5. Tables will be created automatically

## Step 4: Enable Authentication

1. Go to **Authentication** > **Providers**
2. Enable **Email** provider (enabled by default)
3. Click **Save**
4. Go to **Email Templates** and customize if needed

## Step 5: Set Row Level Security (RLS) Policies

1. Go to **Authentication** > **Policies**
2. For each table, enable RLS and add policies:

### For `users` table:
- Users can read own record: `(SELECT auth.uid()) = id`
- Users can update own record: `(SELECT auth.uid()) = id`

### For `professionals` table:
- Anyone can read approved profiles: `is_approved = true`
- Professionals can update own profile: `(SELECT auth.uid()) = user_id`

### For `reviews` table:
- Anyone can read reviews
- Only logged-in users can create reviews
- Users can delete own reviews

3. Configure in **Authentication** > **Policies** tab for each table

## Step 6: Storage Setup

1. Go to **Storage** in the left sidebar
2. Click **New Bucket**
3. Create bucket named: `profiles`
   - Make it **Public** if you want direct image links
4. Create another bucket: `portfolio`
   - Make it **Public**

## Step 7: Test Connection

1. Run your app: `npm run dev`
2. Check browser console for any Supabase errors
3. Try signing up - should create an auth user
4. Check **Authentication** > **Users** to see your test account

## Step 8: Environment Variables

Create `.env.local` file (copy from `.env.example`):

```
VITE_SUPABASE_URL=https://[your-project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key-here]
VITE_ENV=development
```

**Never commit `.env.local` to Git!**

## Troubleshooting

### Connection Error
- Verify `VITE_SUPABASE_URL` starts with `https://`
- Check anon key is correct and not expired
- Restart dev server: `npm run dev`

### Auth Not Working
- Clear browser storage and cookies
- Check **Authentication** > **Policies** are enabled
- Verify email provider is enabled

### Image Upload Issues
- Check **Storage** > Bucket **Access Control**
- Verify RLS policies on storage

## Next Steps

1. After tables are created, run the app and test signup
2. Create a professional profile from the form
3. Try searching for professionals
4. Test the rating system

For full schema details, see `docs/database-schema.sql`
