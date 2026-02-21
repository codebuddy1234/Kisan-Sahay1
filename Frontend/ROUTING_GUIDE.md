# Kisan Sahay - Routing & User Flow Guide

## User Journey Overview

The app implements a 3-step process for farmers to discover and apply for government schemes:

```
Login (Step 1/3) → Profile Setup (Step 2/3) → Dashboard → Scheme Discovery
```

---

## Routing Structure

### 1. **Authentication Barrier**
All routes are protected. Unauthenticated users are redirected to `/login`.

### 2. **Profile Completion Gate**
After login, users must complete their profile on `/profile` before accessing `/dashboard` and beyond.

---

## User Flow Paths

### Path A: New User (Unauthenticated)
```
/ (redirects to /login)
  ↓
/login (OTP verification, Step 1/3)
  ↓ (after OTP verified)
/profile (multi-step setup, Step 2/3)
  ↓ (after all 6 steps)
/dashboard (main dashboard, Step 3/3)
```

### Path B: Returning User (Authenticated with Complete Profile)
```
/login (detects existing profile)
  ↓ (auto-redirect)
/dashboard
```

### Path C: User with Incomplete Profile
```
/login (OTP verified but no profile)
  ↓
/profile (resume profile setup)
  ↓
/dashboard
```

---

## Route Details

### Public Routes (No Auth Required)
- `/` - Home (redirects to /login if not authenticated)
- `/login` - OTP login page

**Behavior:**
- If authenticated with complete profile → redirects to `/dashboard`
- If authenticated without complete profile → redirects to `/profile`

---

### Auth-Required Routes (Login Only)
- `/profile` - Multi-step profile setup form
- `/settings` - User settings and profile management

**Behavior:**
- Requires `isAuthenticated = true`
- `/profile` redirects to `/dashboard` if profile already complete
- `/settings` accessible to all authenticated users

---

### Full-Auth Routes (Login + Complete Profile)
- `/dashboard` - Main dashboard with scheme categories
- `/schemes/[category]` - Filtered scheme list by category
- `/scheme/[id]` - Individual scheme detail page

**Behavior:**
- Requires `isAuthenticated = true` AND `isProfileComplete = true`
- Redirects incomplete profiles to `/profile`

---

## Auth Context State

The app uses React Context for auth state management with localStorage persistence.

### State Variables:
```typescript
isAuthenticated: boolean        // User has logged in
isProfileComplete: boolean      // Profile setup finished
farmerProfile: FarmerProfile    // User profile data
```

### Key Methods:
- `setFarmerProfile(profile)` - Set mobile number, auto-authenticate
- `updateProfile(updates)` - Update existing profile data
- `completeProfile()` - Mark profile as complete
- `logout()` - Clear all auth data

---

## Navigation Components

### Header Component
Located at: `/components/header.tsx`

**Features:**
- Auto-hides on `/login` and `/`
- Shows breadcrumb/back button on other pages
- Settings dropdown on authenticated pages
- Logout button in dropdown

**Usage:**
```tsx
import { Header } from '@/components/header'

export default function Page() {
  return (
    <>
      <Header title="Page Title" />
      {/* content */}
    </>
  )
}
```

---

## Route Guard System

Located at: `/lib/route-guard.tsx`

**How It Works:**
1. Watches pathname changes
2. Checks `isAuthenticated` and `isProfileComplete` states
3. Redirects users based on their state and target route
4. Runs client-side to ensure smooth transitions

**Protected Route Categories:**
```typescript
publicRoutes = ['/login', '/']                          // Public access
authRequiredRoutes = ['/profile', '/settings']          // Login required
fullAuthRequiredRoutes = ['/dashboard', '/schemes', '/scheme']  // Profile required
```

---

## Data Persistence

All user data is persisted in localStorage as JSON.

**Storage Key:** `farmerProfile`

**Stored Data:**
```typescript
{
  mobileNumber: string
  state?: string
  district?: string
  landOwnership?: string
  landSize?: string
  cropType?: string
  farmingseason?: string
  farmerCategory?: string
}
```

**Behavior:**
- Data loads on app startup
- Automatically saved on every update
- Cleared on logout

---

## Step Counter Display

Progress is shown as "Step X of 3":

| Route | Step | Label |
|-------|------|-------|
| `/login` | 1 | Authentication |
| `/profile` | 2 | Profile Setup |
| `/dashboard` | 3 | Scheme Discovery |

---

## Common Navigation Scenarios

### Scenario 1: User Clicks Back Button
- Uses router.back() to return to previous page
- Page state is preserved

### Scenario 2: User Navigates to Dashboard
```tsx
router.push('/dashboard')
```

### Scenario 3: User Wants to View Scheme Category
```tsx
router.push(`/schemes/${categoryId}`)
```

### Scenario 4: User Clicks on Scheme Card
```tsx
router.push(`/scheme/${schemeId}`)
```

### Scenario 5: User Logs Out
```tsx
logout()
router.push('/login')
```

---

## Testing the Flow

### Test 1: New User Flow
1. Go to `/` → redirects to `/login`
2. Enter any 10-digit number
3. Enter OTP: `1234`
4. Complete all 6 profile steps
5. See `/dashboard` with schemes

### Test 2: Return User Flow
1. After logout, go to `/login`
2. Repeat login with same number
3. Auto-completes to `/dashboard` (profile persisted)

### Test 3: Route Protection
1. Try accessing `/dashboard` directly without login
2. Redirects to `/login`
3. Try accessing `/dashboard` with incomplete profile
4. Redirects to `/profile`

### Test 4: Settings Access
1. Go to `/settings` without login → redirects to `/login`
2. Login and go to `/settings` → accessible
3. Logout from settings dropdown → redirects to `/login`

---

## API & Data Loading

### Scheme Data
Loaded from `/lib/schemes-data.ts` (mock data, no API calls).

Functions:
- `getSchemesByCategory(category)` - Filter schemes by category
- `getSchemeById(id)` - Get single scheme details
- `categories` - Array of all categories

### Profile Data
Managed entirely by auth context using localStorage.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Stuck on login page | Clear browser localStorage and reload |
| Can't access dashboard | Complete all 6 profile steps |
| Profile data disappeared | Check browser's localStorage settings |
| Navigation doesn't work | Ensure RouteGuardWrapper is in layout.tsx |
| Header not showing | Header auto-hides on `/login` and `/` |

---

## Environment Setup

No environment variables required for routing. All auth is client-side demo.

For production, add:
- Backend OTP verification endpoint
- Real profile database storage
- Authentication tokens (JWT)
- Session management

