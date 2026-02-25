# Email Authentication Setup Guide

## Overview

Pro Pool uses Supabase for email-based authentication with custom email confirmation templates. This guide walks you through setting up email confirmations so users receive beautiful, branded emails when they sign up.

## Features

✅ Professional email template matching Pro Pool branding  
✅ Secure email confirmation flow  
✅ No 404 errors - dedicated confirmation page  
✅ Role-based redirect after confirmation  
✅ Mobile-responsive design  
✅ Security notices and best practices  

## Architecture

### Email Confirmation Flow

```
User Signs Up
    ↓
Supabase sends Confirmation Email
    ↓
User clicks "Confirm Email" button
    ↓
Link redirects to: /auth/callback?token_hash=xxx&type=email
    ↓
EmailConfirmationPage handles verification
    ↓
✓ Email Confirmed! Page shown
    ↓
Auto-redirect based on role:
  - Professionals → /setup-profile
  - Clients → /search
```

## Setup Instructions

### Step 1: Configure Supabase Email Settings

1. **Go to Supabase Dashboard**
   - Open your project at https://app.supabase.com
   - Navigate to: **Authentication** → **Email Templates**

2. **Set Redirect URL**
   - Click **Site URL** in the Email Templates section
   - Set it to your deployed app URL: `https://yourdomain.com`
   - For local development: `http://localhost:5173`

3. **Edit Confirmation Email Template**

   a. Find "Confirm signup" in the templates list

   b. Click the **Edit** button

   c. **Copy the entire content** from `/docs/EMAIL_TEMPLATE.html` into the template editor

   d. The template uses Supabase variables:
      - `{{ .ConfirmationURL }}` - Automatically replaced with verification link
      - `{{ .Data.email }}` - Optional: user's email (if needed)

4. **Save Template**
   - Click **Save**
   - You'll see a preview. Verify it looks correct.

### Step 2: Test Email Setup

**Method 1: Local Testing (Recommended)**
1. Start your app: `npm run dev`
2. Go to http://localhost:5173/signup
3. Sign up with a real email address
4. Check your email inbox
5. Click the confirmation link
6. You should see the confirmation page, not a 404!

**Method 2: Using Supabase Studio**
1. In Supabase Dashboard, go to **SQL Editor**
2. Create a test user to check email delivery
3. Verify emails are sent correctly

### Step 3: Verify Confirmation Flow

After clicking the confirmation link, you should see:

✅ **Success Page** showing:
   - Checkmark icon
   - "Email Confirmed!" message
   - Auto-redirect countdown
   - Continue button (backup option)

❌ **Error Page** (if link is invalid/expired):
   - Error icon
   - Clear error message
   - Options to try again or go home

**No 404 - This is guaranteed!**

## Email Template Details

### What's Included

- **Brand Header**: Pro Pool logo and messaging
- **Friendly Greeting**: Personalized tone
- **Clear CTA**: Large "Confirm My Email" button
- **Backup Link**: For email clients that don't support buttons
- **Security Notice**: "Didn't sign up?" disclaimer
- **Footer**: Links to Privacy, Terms, Help Center
- **Responsive Design**: Works on mobile, tablet, desktop

### Template Variables

```html
{{ .ConfirmationURL }}  → Complete confirmation URL
{{ .Data.email }}       → User's email address (optional)
```

Example generated URL:
```
https://yourdomain.com/auth/callback?token_hash=xxx&type=email
```

## Frontend Components

### EmailConfirmationPage.tsx
- **Location**: `/src/pages/EmailConfirmationPage.tsx`
- **Route**: `/auth/callback`
- **Handles**: Token verification, success/error states
- **Features**: 
  - Loading state with spinner
  - Success state with auto-redirect
  - Error state with helpful options

### Integration Points
1. **Auth Utils** (`src/utils/auth.ts`):
   - `signUp()` function sends email
   
2. **App Routes** (`src/App.tsx`):
   - `/auth/callback` route added
   
3. **Supabase Client** (`src/utils/supabase.ts`):
   - `supabase.auth.verifyOtp()` validates token

## Security Considerations

1. **Token Expiration**: Supabase expires tokens after 24 hours by default
   - User can request new confirmation email if expired
   
2. **One-Time Use**: Tokens can only be used once
   - Prevents replay attacks
   
3. **HTTPS Only**: Confirmation links must be sent over HTTPS
   - Set in Supabase: **Authentication → Policies**
   
4. **No 404 Errors**: Invalid/expired links show helpful error page
   - Users can sign up again or contact support

## Customization

### Branding
You can customize the email template:
- **Colors**: Change `#2979FF` to your brand color
- **Logo**: Replace with your logo (add image URL)
- **Company Name**: Update "Pro Pool" text
- **Footer Links**: Update domain and links

### Content
- **Subject** (in Supabase): "Confirm your email for Pro Pool"
- **Greeting**: "Welcome to Pro Pool! 👋"
- **Call-to-Action**: "Confirm My Email"

## Troubleshooting

### Emails Not Sending

1. Check **Authentication → Providers** in Supabase
   - Verify "Email" is enabled
   
2. Check Project Settings → **Emails**
   - If using free tier, emails may be delayed
   - Use Auth Testing mode for instant delivery
   
3. Check **Logs** in Supabase
   - Go to: Home → Project → Logs
   - Filter for auth-related errors

### User Gets 404 After Clicking Link

✅ **Fixed!** The `/auth/callback` route now handles this properly

**If still occurring:**
1. Verify route exists in `App.tsx`
2. Check URL format: should be `/auth/callback?token_hash=...&type=email`
3. Ensure Site URL is set correctly in Supabase

### Confirmation Link Expired

- Link is valid for 24 hours
- After expiration, user should resend email
- Add resend email flow: Check `src/pages/LoginPage.tsx` for pattern

### Email Template Not Showing

1. Verify you're editing the correct template in Supabase
2. Check for syntax errors in HTML
3. Try saving again
4. Clear browser cache and retry

## User Experience Flow

### For Professionals

```
Signup (email + password + role)
    ↓
See success message: "Check your email..."
    ↓
[Email arrives with branded confirmation]
    ↓
Click "Confirm My Email"
    ↓
See success page: "Email Confirmed!"
    ↓
Auto-redirect to Profile Setup
    ↓
Fill in professional details
    ↓
Redirect to Dashboard
```

### For Clients

```
Signup (same as above)
    ↓
Email confirmation (same as above)
    ↓
See success page: "Email Confirmed!"
    ↓
Auto-redirect to Browse Professionals
    ↓
Start hiring!
```

## API Reference

### signUp Function
```typescript
const result = await signUp(email, password, role);
// Returns: { success: true, message: "Check your email..." }
```

### Email Verification
```typescript
const { data, error } = await supabase.auth.verifyOtp({
  token_hash: token,
  type: 'email',
});
```

### Check Confirmation Status
```typescript
const { data: { user } } = await supabase.auth.getUser();
console.log(user.email_confirmed_at); // Timestamp if confirmed
```

## Best Practices

1. **Clear Messaging**
   - Tell users to expect an email
   - Mention they should check spam folder
   
2. **Mobile Friendly**
   - Test emails on mobile devices
   - Buttons should be large and easy to tap
   
3. **Resend Option**
   - Let users request new confirmation email
   - Prevent spam with rate limiting
   
4. **Security**
   - Don't reveal token in URLs (already handled by Supabase)
   - Use HTTPS only
   - Monitor spam/phishing

## Files Modified/Created

### New Files
- `/src/pages/EmailConfirmationPage.tsx` - Confirmation handler
- `/docs/EMAIL_TEMPLATE.html` - Email template

### Modified Files
- `/src/App.tsx` - Added `/auth/callback` route
- `/src/utils/auth.ts` - signUp function (no changes needed)

## Next Steps

1. ✅ Copy email template to Supabase
2. ✅ Set Site URL in Supabase
3. ✅ Test with real email
4. ✅ Customize template colors/branding
5. ✅ Set up resend email functionality (optional)
6. ✅ Monitor email delivery metrics
7. ✅ Deploy to production

## Support

If issues occur:
- Check Supabase docs: https://supabase.com/docs/guides/auth/email
- View email logs in Supabase Dashboard
- Check browser console for JavaScript errors
- Verify CORS settings if using custom domain

---

**Email Authentication Now Live! 🚀**

Your users will receive beautiful, branded emails when they sign up, and confirmation will be seamless with no 404 errors.
