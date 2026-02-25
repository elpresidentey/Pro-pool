# Email Template Customization Guide

## Quick Customization Reference

### 1. Change Brand Color

**Default**: `#2979FF` (Electric Blue)

**To change**:
1. Open `/docs/EMAIL_TEMPLATE.html`
2. Find and replace ALL instances of `#2979FF` with your color
3. Also update `#1e5ff1` (darker shade) to match

**Example**: For a teal brand (0099CC)
```css
/* Before */
background: linear-gradient(135deg, #2979FF 0%, #1e5ff1 100%);

/* After */
background: linear-gradient(135deg, #0099CC 0%, #007399 100%);
```

### 2. Change Company Name

**Find this**:
```html
<div class="header h1">Pro Pool</div>
```

**Replace with**:
```html
<div class="header h1">Your Company Name</div>
```

Also update:
- `<title>Confirm Your Email</title>` to `Confirm Your Email for Your Company Name`
- Footer tagline
- Subject line in Supabase

### 3. Add Your Logo

**Option A: Use existing logo circle**
```html
<div class="logo-icon">P</div>
```

Change the `P` to your initial or short text.

**Option B: Use image**
Replace the logo-icon div with:
```html
<div style="display: inline-block; margin-bottom: 16px;">
  <img src="https://your-domain.com/logo.png" alt="Logo" style="width: 44px; height: 44px; border-radius: 8px;">
</div>
```

### 4. Customize Greeting & Content

**Change welcome message**:
```html
<div class="greeting">Welcome to Pro Pool! 👋</div>
```

To:
```html
<div class="greeting">Welcome to Your Company! 🎉</div>
```

**Change main message**:
```html
<div class="message">
  Thank you for signing up! To get started with Pro Pool, you need to confirm your email address.
</div>
```

### 5. Change Button Text

**Current**:
```html
<a href="{{ .ConfirmationURL }}" class="cta-button">Confirm My Email</a>
```

**Change to**:
```html
<a href="{{ .ConfirmationURL }}" class="cta-button">Verify Your Account</a>
```

### 6. Customize Security Notice

**Current**:
```html
<div class="security-notice-title">⚠️ Didn't sign up for Pro Pool?</div>
<div class="security-notice-text">
  If you didn't create this account, you can safely ignore this email.
</div>
```

**Change to any custom warning**:
```html
<div class="security-notice-title">🔒 Security Tip</div>
<div class="security-notice-text">
  Never shared this email with anyone. Pro Pool will never ask for your password.
</div>
```

### 7. Update Footer Links

**Current**:
```html
<a href="https://propools.ng/privacy" style="color: #2979FF; text-decoration: none;">Privacy Policy</a>
```

**Change to**:
```html
<a href="https://your-domain.com/privacy" style="color: #2979FF; text-decoration: none;">Privacy Policy</a>
```

Update these links:
- Privacy Policy
- Terms of Service
- Help Center
- Social media

### 8. Update Copyright Year

**Find**:
```html
© 2026 Pro Pool. All rights reserved.
```

**Change to**:
```html
© 2026 Your Company. All rights reserved.
```

### 9. Change Social Media Links

**Current**:
```html
<a href="https://facebook.com" title="Facebook">f</a>
<a href="https://twitter.com" title="Twitter">𝕏</a>
<a href="https://instagram.com" title="Instagram">📷</a>
```

**Update to your social profiles**:
```html
<a href="https://facebook.com/yourcompany" title="Facebook">f</a>
<a href="https://twitter.com/yourcompany" title="Twitter">𝕏</a>
<a href="https://instagram.com/yourcompany" title="Instagram">📷</a>
```

## Complete Customization Example

### Before
```html
<h1 className="text-h2 text-charcoal mb-3 text-center">Join Pro Pool</h1>
<p>Pro Pool - Connecting you with trusted professionals</p>
© 2026 Pro Pool. All rights reserved.
<a href="https://propools.ng/privacy">Privacy Policy</a>
```

### After
```html
<h1 className="text-h2 text-charcoal mb-3 text-center">TechFlow Solutions</h1>
<p>TechFlow Solutions - Your IT Support Partner</p>
© 2026 TechFlow Solutions. All rights reserved.
<a href="https://techflow.com/privacy">Privacy Policy</a>
```

## Testing Custom Email

1. **Update template** in `/docs/EMAIL_TEMPLATE.html`
2. **Paste into Supabase**
   - Go to: Authentication → Email Templates → Confirm signup
   - Click Edit
   - Paste new HTML
   - Save
3. **Test email**
   - Sign up with a test email
   - Check inbox
   - Verify appearance matches your brand
4. **Check multiple clients**
   - Test on Gmail, Outlook, Apple Mail
   - Check on mobile and desktop
   - Verify images load correctly

## Style Variables (CSS)

If you want to change more styling:

```css
/* Primary Color */
--primary: #2979FF;

/* Primary Dark */
--primary-dark: #1e5ff1;

/* Text Colors */
--text-primary: #1E1E1E;
--text-secondary: #555;
--text-light: #888;

/* Backgrounds */
--bg-light: #F5F7FB;
--bg-lighter: #F8FAFB;

/* Borders */
--border-color: #E8EBF0;

/* Shadows */
--shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
```

## Responsive Breakpoints

The email template is responsive for:
- **Desktop**: 600px+ (full width with padding)
- **Tablet**: 600px (optimized layout)
- **Mobile**: 320-480px (stacked layout)

**Test on**:
- iPhone (375px)
- Android (412px)
- iPad (768px)
- Desktop (1200px+)

## Email Client Compatibility

Template supports:
✅ Gmail / Gmail App  
✅ Outlook  
✅ Apple Mail  
✅ Yahoo Mail  
✅ AOL  
✅ Thunderbird  
✅ Mobile inbox apps  

**CSS Fallbacks**: 
- All styles have fallbacks for older clients
- Tables used minimally
- Inline styles for critical styling

## Common Issues & Fixes

### Images Not Loading
**Problem**: Images appear as broken links
**Solution**: Use absolute URLs (https://...), not relative paths

### Colors Look Different
**Problem**: Client interprets colors differently
**Solution**: Use hex codes (#2979FF), not RGB or named colors

### Button Not Clickable
**Problem**: Button appears but doesn't open link
**Solution**: Check CTA button link syntax in spam filters

### Layout Broken on Mobile
**Problem**: Email stretches or overlaps
**Solution**: Check `<meta name="viewport">` in header

## Accessibility

The template includes:
- ✅ Semantic HTML
- ✅ High contrast text (WCAG AA)
- ✅ Alt text suggestion for images
- ✅ Clear button contrast
- ✅ Readable font sizes
- ✅ Proper heading hierarchy

## A/B Testing

To test different templates:

1. Create variation of `/docs/EMAIL_TEMPLATE.html`
2. Name it: `EMAIL_TEMPLATE_VARIANT.html`
3. Upload to Supabase test environment
4. Send 50% with original, 50% with variant
5. Track click-through rates
6. Keep the winner

**Metrics to track**:
- Open rate
- Click-through rate
- Confirmation rate
- Spam complaints

## Advanced: Custom Font

To use a custom font:

```html
<style>
  @import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;600;700&display=swap');
  body {
    font-family: 'Your Font', sans-serif;
  }
</style>
```

## Upload to Supabase

1. Go to https://app.supabase.com
2. Select your project
3. Navigate: **Authentication** → **Email Templates**
4. Click **Confirm signup** → **Edit**
5. Switch to **HTML Editor**
6. Paste entire template
7. Click **Save**
8. Check preview
9. Test with real email

## Troubleshooting Template Edits

**Template won't save**
- Check for syntax errors
- Remove any &lt; or &gt; that aren't in HTML tags
- Ensure `{{ .ConfirmationURL }}` is intact

**Changes don't appear in emails**
- Clear browser cache
- Check Supabase isn't showing old template
- Wait 5 minutes for cache refresh
- Try incognito/private window

**Template shows raw HTML**
- Verify HTML Editor is selected (not Text)
- Email client may not support HTML (unlikely)
- Check email isn't from spam folder

---

**Email is now fully branded! 🎨 Customize as needed and test across email clients.**
