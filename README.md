# Pro Pool – MVP

**Find Trusted Professionals Near You**

A modern, tech-enabled directory platform connecting Nigerians with local professionals. Built for speed, reliability, and simplicity.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Supabase account ([free tier available](https://supabase.com))

### Installation

1. **Clone and install:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Add Supabase credentials:**
   Edit `.env.local`:
   ```
   VITE_SUPABASE_URL=https://[your-project-id].supabase.co
   VITE_SUPABASE_ANON_KEY=[your-anon-key]
   ```

   Get these from your Supabase dashboard: **Settings** > **API**

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173)

## 📖 Supabase Setup

For detailed Supabase setup instructions, see [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)

**Quick steps:**
1. Create a Supabase project
2. Run SQL schema from `docs/database-schema.sql`
3. Copy credentials to `.env.local`
4. Enable email authentication
5. Configure Storage buckets

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ProfessionalCard.tsx
│   ├── ImageUpload.tsx
│   ├── States.tsx         # Loading, Error, Success states
│   └── ErrorBoundary.tsx  # Error handling
├── pages/               # Page components
│   ├── HomePage.tsx          # Hero + Categories + Featured
│   ├── SearchPage.tsx        # Search with filters
│   ├── LoginPage.tsx         # Email login
│   ├── SignupPage.tsx        # Sign up with role selection
│   ├── ProfessionalDetailPage.tsx  # Profile + Portfolio + Reviews
│   └── DashboardPage.tsx     # User dashboard
├── utils/
│   ├── supabase.ts        # Supabase client & queries
│   ├── auth.ts            # Auth hooks & functions
│   └── validation.ts      # Form validation utilities
├── types/
│   └── index.ts           # TypeScript definitions
├── constants/
│   └── index.ts           # App constants
├── styles/
│   └── index.css          # Tailwind + Custom CSS
└── App.tsx                # Main app with routing
```

## 🎨 Design System

### Colors
- **Charcoal** `#1E1E1E` - Primary dark (navbar, headings)
- **Electric Blue** `#2979FF` - Primary accent (buttons, links)
- **Light Gray** `#F4F6F8` - Secondary background

### Components
- Button (primary/secondary)
- Card (with hover effects)
- Input fields
- Error/Success messages
- Loading spinners
- Image upload with drag-and-drop

### Responsive
- Mobile-first design
- Tailwind breakpoints (sm, md, lg)
- Touch-friendly UI

## 🛠️ Available Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## 📡 API/Supabase Integration

### Authentication
```typescript
import { signUp, signIn, signOut, useCurrentUser } from '@/utils/auth';

// Sign up
const { success, error } = await signUp(email, password, 'professional');

// Sign in
const { success, data } = await signIn(email, password);

// Use in components
const { user, loading } = useCurrentUser();
```

### Database Queries
```typescript
import { professionals, reviews, portfolio } from '@/utils/supabase';

// Get all approved professionals
const { data } = await professionals.getAll();

// Search professionals
const { data } = await professionals.search(query, category, location);

// Get professional by ID
const { data } = await professionals.getById(id);

// Add review
const { data } = await reviews.create({ professional_id, user_id, rating, comment });
```

### Form Validation
```typescript
import { validateEmail, validatePhoneNumber, validateProfileForm } from '@/utils/validation';

const errors = validateProfileForm(formData);
if (Object.keys(errors).length > 0) {
  // Show errors
}
```

## 📋 Features (MVP)

### ✅ Implemented
- [x] Professional profiles with portfolio
- [x] Search and filtering by category/location
- [x] Profile viewing with portfolio gallery
- [x] Direct contact (phone/WhatsApp buttons)
- [x] 5-star rating system (UI ready)
- [x] User authentication flow
- [x] Responsive mobile design
- [x] Error boundaries
- [x] Form validation
- [x] Loading states
- [x] All core pages

### 🔄 Ready to Integrate
- Supabase authentication (auth hooks ready)
- Professional profile creation/editing form
- Image upload to Supabase Storage
- Admin approval workflow
- Reviews submission
- Search backend implementation

### ❌ Excluded from MVP
- Booking system
- Escrow payments
- In-app messaging
- Subscription billing
- Mobile app

## 🔐 Authentication

Uses Supabase Auth with email/password. Two roles:
- **Professional** - Can create profile, upload portfolio, receive reviews
- **Client** - Can browse, search, and leave reviews

## 📱 Performance

- Mobile-first responsive design
- Optimized for 4G and mid-range devices
- Images optimized (via Unsplash in demo)
- Fast load times (<3s target)
- Lazy loaded components

## 🚢 Deployment

### Deploy to Vercel
```bash
vercel deploy
```

### GitHub Integration
1. Push to GitHub
2. Connect repo to Vercel
3. Vercel auto-deploys on push

### Environment Variables (Vercel)
Add to project settings:
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## 🧪 Development

### Component Development
Components use React hooks and Tailwind CSS:
```tsx
import { useState } from 'react';
import Button from '@/components/Button';

export default function MyComponent() {
  const [loading, setLoading] = useState(false);
  
  return (
    <div>
      <Button onClick={() => setLoading(!loading)}>
        {loading ? 'Loading...' : 'Click me'}
      </Button>
    </div>
  );
}
```

### Error Handling
App uses Error Boundary for global error catching:
```tsx
import ErrorBoundary from '@/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### State Management
Currently using React local state + Supabase client. For larger app, consider:
- React Context API
- Zustand
- TanStack Query (for server state)

## 📚 Documentation

- [Supabase Setup Guide](docs/SUPABASE_SETUP.md)
- [Database Schema](docs/database-schema.sql)
- [TypeScript Types](src/types/index.ts)

## 🐛 Troubleshooting

### Dev server won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Supabase connection error
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`
- Check URL starts with `https://`
- Restart dev server

### Tailwind CSS not working
```bash
npm run build  # Check for errors
npm run dev    # Restart
```

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test locally: `npm run build`
4. Submit PR

## 📊 Success Metrics (First 60 Days MVP)

- ✅ 50–100 professionals onboarded
- ✅ 500+ monthly visitors
- ✅ 100+ contact clicks
- ✅ 30+ reviews submitted

## 💡 Next Steps

1. **Supabase Integration**: Copy credentials to `.env.local` and run database schema
2. **Authentication**: Test signup/login with Supabase Auth
3. **Professional Profiles**: Build profile creation form with image upload
4. **Search Implementation**: Connect search to database queries
5. **Admin Dashboard**: Create admin panel for profile approval
6. **Notifications**: Set up email notifications for reviews

## 📞 Support

For issues or feature requests, open an issue on GitHub.

---

**Built with ❤️ for Nigerian professionals**

Last updated: February 2026
