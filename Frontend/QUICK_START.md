# Quick Start Guide - Kisan Sahay

## Getting Started

### 1. **Run the App**
```bash
npm run dev
```
Open `http://localhost:3000`

---

## Test the Complete Flow (5 Minutes)

### Step 1: Login
- Navigate to app or `/login`
- Enter any 10-digit number (e.g., `9876543210`)
- Click "Send OTP"
- Enter demo OTP: `1234`
- Click "Verify OTP"

### Step 2: Profile Setup
Complete 6 questions one-by-one:
1. **State** - Select any state
2. **District** - Select matching district
3. **Land Ownership** - Choose ownership type and size
4. **Crop Type** - Pick a crop
5. **Farming Season** - Select season
6. **Farmer Category** - Choose category

Click "Start Exploring" to complete

### Step 3: Dashboard
- See 3 recommended schemes at top
- Browse 8 scheme categories
- Click any category to view schemes
- Click any scheme to see details

### Step 4: Settings
- Click menu icon (top right)
- Select "Settings"
- View/edit profile
- Toggle language and simple mode
- Logout from menu

---

## Key Files & Locations

### Core Auth System
```
lib/auth-context.tsx          ← Auth state & provider
lib/route-guard.tsx           ← Protected routes
components/route-guard-wrapper.tsx  ← Route protection wrapper
components/header.tsx         ← Navigation header
```

### Pages
```
app/login/page.tsx            ← Step 1: OTP login
app/profile/page.tsx          ← Step 2: Profile setup
app/dashboard/page.tsx        ← Step 3: Main dashboard
app/schemes/[category]        ← Scheme list by category
app/scheme/[id]               ← Scheme details
app/settings/page.tsx         ← User settings
```

### Data
```
lib/schemes-data.ts           ← Mock schemes & categories
```

---

## Important Hooks

### Use Authentication
```tsx
import { useAuth } from '@/lib/auth-context'

const { isAuthenticated, isProfileComplete, farmerProfile, logout } = useAuth()
```

### Use Navigation with Route Guard
```tsx
import { useRouter } from 'next/navigation'
import { useRouteGuard } from '@/lib/route-guard'

export default function Page() {
  useRouteGuard() // Automatic protection
  const router = useRouter()
  
  return <div>Protected Page</div>
}
```

---

## Adding a New Protected Page

### 1. Create page file
```tsx
// app/new-page/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Header } from '@/components/header'

export default function NewPage() {
  const router = useRouter()
  const { farmerProfile } = useAuth()
  
  return (
    <>
      <Header title="New Page" />
      <main>
        <p>Hello {farmerProfile.state}</p>
      </main>
    </>
  )
}
```

### 2. Route will automatically be protected
- No login → redirects to `/login`
- Incomplete profile → redirects to `/profile`
- Complete profile → shows page

---

## Modifying Auth Flow

### Change OTP Demo Number
```tsx
// app/login/page.tsx
const demoOtp = '1234' // ← Change here
```

### Require Additional Profile Fields
1. Update FarmerProfile interface in `lib/auth-context.tsx`
2. Add step to `/profile/page.tsx`
3. Update progress bar (currently 6 steps)
4. Update route guard validation

### Change Redirect After Login
```tsx
// lib/route-guard.tsx
// Line ~40 - Change redirect destination
if (isAuthenticated && pathname === '/login') {
  if (isProfileComplete) {
    router.push('/dashboard')  // ← Change here
  }
}
```

---

## Data Flow

### Login Flow
```
User enters phone → Send OTP → Verify OTP → setFarmerProfile()
→ isAuthenticated = true → Redirect to /profile
```

### Profile Setup Flow
```
Step 1-5 → Accumulate data in state → Step 6 → updateProfile()
→ completeProfile() → isProfileComplete = true → Redirect to /dashboard
```

### Logout Flow
```
Click logout → logout() → Clear all state & localStorage
→ Redirect to /login
```

---

## Testing Routes

### Force Route Tests
```tsx
// In browser console
localStorage.removeItem('farmerProfile') // Clear all data
localStorage.getItem('farmerProfile')     // Check stored profile
```

### Expected Redirects
- `/` (not authenticated) → `/login`
- `/profile` (profile complete) → `/dashboard`
- `/dashboard` (not authenticated) → `/login`
- `/dashboard` (incomplete profile) → `/profile`
- `/login` (authenticated) → `/dashboard` or `/profile`

---

## Common Tasks

### Task 1: Change Step Labels
```tsx
// app/login/page.tsx
<span className="text-xs text-muted-foreground">Step 1 of 3</span>
```

### Task 2: Add a New Scheme Category
```tsx
// lib/schemes-data.ts
export const categories = [
  // ... existing
  { id: 'new-category', name: 'New Category', icon: IconComponent }
]
```

### Task 3: Update Navigation Link
```tsx
// Any page
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/dashboard')
```

### Task 4: Access User Profile Info
```tsx
const { farmerProfile } = useAuth()
console.log(farmerProfile.state)
console.log(farmerProfile.district)
```

---

## Performance Tips

1. **LocalStorage is Limited**: If adding many users, migrate to database
2. **Large Scheme Lists**: Consider pagination after 20+ schemes
3. **Mobile**: Already mobile-first, but test on real devices
4. **Images**: Optimize all images < 100KB

---

## What's Ready

✅ Full OTP authentication (demo mode)
✅ Multi-step profile setup
✅ Protected routes
✅ Scheme discovery with filtering
✅ Responsive mobile design
✅ Settings page with logout
✅ Data persistence with localStorage
✅ Complete routing guide

---

## What Needs Backend Integration

For production, add:
- Real OTP via SMS gateway (Twilio, AWS SNS)
- Database for user profiles (PostgreSQL, Firebase)
- Real scheme data from government APIs
- Payment integration for applications
- File upload for documents
- Notification system

---

## Support

For issues or questions:
1. Check ROUTING_GUIDE.md for detailed flow
2. Review relevant page component
3. Check useAuth() hook in lib/auth-context.tsx
4. Clear localStorage and test from scratch

