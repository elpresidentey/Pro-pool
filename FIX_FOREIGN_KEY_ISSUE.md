# Fix for Foreign Key Constraint Issue - Complete Solution

## Problem
When creating a professional profile, users get: 
`Failed to create profile: insert or update on table "professionals" violates foreign key constraint "professionals_user_id_fkey"`

This happens because the `public.users` table is missing records for existing auth users.

## Solution - 3 Steps

### Step 1: Deploy Database Trigger (Required)
This ensures NEW signups automatically create user records in `public.users`.

1. Go to Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy and run the SQL from the **TRIGGERS** section in `docs/database-schema.sql` (lines showing `handle_new_user()` function and trigger)
4. This ensures all future signups work correctly

### Step 2: Fix Existing Users (If Needed)
If you have users who signed up before the trigger was deployed:

1. Go to Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy and run the contents of `fix-existing-users.sql` in the root directory
4. This creates missing `public.users` records for all existing auth users

### Step 3: Updated Code
The `src/utils/auth.ts` file has already been updated with:
- Manual user record creation in the `signUp` function as a fallback
- This provides double protection alongside the database trigger

## How It Works Now
1. **Database Trigger** (primary): When auth user is created, trigger automatically inserts into `public.users`
2. **SignUp Function** (fallback): Attempts to manually create user record 
3. **Foreign Key**: Now satisfied because user record exists before professional profile creation

## Testing
1. Create a new account
2. Go to setup profile page
3. Create a professional profile - should work without foreign key errors

## Need Help?
If the issue persists:
1. Check Supabase SQL Editor for any errors when running the migration
2. Verify the `public.users` table has records for all auth users
3. Confirm RLS policies are properly set on the `users` table
