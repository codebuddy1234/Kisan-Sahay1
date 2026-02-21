# Kisan Sahay - Complete Flow Diagram

## Overall Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        App Root Layout                          │
│  (AuthProvider + RouteGuardWrapper + RouteGuard Hook)           │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            (Auth Check)          (Route Guard)
                    │                   │
         ┌──────────┴──────────┐       │
         │                     │       │
    Authenticated?         Redirect    │
         │                  Logic      │
    ┌────┴────┐                        │
    │          │                       │
   YES        NO ◄──────────────────────┘
    │          │
    │          └──────► /login ◄─────── (Auto-redirect if auth)
    │                       ▲
    └──────────┐            │
               │            │ (Step 1/3)
    Profile    │    ┌───────┴─────────────────┐
    Complete?  │    │                         │
    │          │    ├─► Phone Entry          │
    ├─YES      │    ├─► OTP Verification    │
    │          │    └─► setFarmerProfile()  │
    │          │         (isAuthenticated=true)
    │          │
    │          └──► /profile ◄─── (Auto-redirect if complete)
    │                  ▲
    │                  │
    │         (Step 2/3)
    │                  │
    │         ┌────────┴──────────────────┐
    │         │                           │
    │         ├─► State Selection        │
    │         ├─► District Selection     │
    │         ├─► Land Details           │
    │         ├─► Crop Type              │
    │         ├─► Farming Season         │
    │         └─► Farmer Category        │
    │                  │
    │                  └─► updateProfile()
    │                      completeProfile()
    │                      (isProfileComplete=true)
    │
    └──────────────► /dashboard ◄─── (Step 3/3)
                         ▲
                         │
                    ┌────┴────────────────────┐
                    │                         │
                    ├─► Recommended Schemes  │
                    ├─► Categories Grid      │
                    └─► Settings/Logout      │
                         │
              ┌──────────┬┘
              │          │
              ▼          ▼
          Settings   Category Click
              │          │
              ▼          ▼
         /settings   /schemes/[category]
              │          │
         ┌────┴────┐     ├─► Filter Chips
         │         │     ├─► Scheme List
    Settings   Logout    └─► View Details Click
    Features      │
    Profile       ▼
    Language   /login (redirect)
    Mode       (User logged out)


              ┌──────────────┐
              ▼              ▼
          Details       Dashboard
          /scheme/[id]   (Back button)


```

---

## State Transitions Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        Initial State                             │
│  isAuthenticated: false                                          │
│  isProfileComplete: false                                        │
│  farmerProfile: { mobileNumber: '' }                             │
└──────────────────────────────────────────────────────────────────┘
                         │
                         │ User navigates to /
                         ▼
         (Routes to /login automatically)
                         │
                         │ User enters phone & OTP
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│              After OTP Verification                              │
│  isAuthenticated: true ✓                                         │
│  isProfileComplete: false                                        │
│  farmerProfile: { mobileNumber: '9876543210' }                   │
└──────────────────────────────────────────────────────────────────┘
                         │
                         │ Routes to /profile automatically
                         ▼
                  User completes 6 steps
                         │
                         │ Click "Start Exploring"
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│              After Profile Complete                              │
│  isAuthenticated: true ✓                                         │
│  isProfileComplete: true ✓                                       │
│  farmerProfile: {                                                │
│    mobileNumber: '9876543210',                                   │
│    state: 'Maharashtra',                                         │
│    district: 'Pune',                                             │
│    landOwnership: 'Owner',                                       │
│    landSize: '2 acres',                                          │
│    cropType: 'Rice',                                             │
│    farmingseason: 'Monsoon',                                     │
│    farmerCategory: 'Small Farmer'                                │
│  }                                                               │
└──────────────────────────────────────────────────────────────────┘
                         │
                         │ Routes to /dashboard automatically
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
      Browse         Settings        Logout
      Schemes                           │
          │              │              │
          │              ▼              ▼
          │         View/Edit Profile  Cleared State
          │         Change Language    (go to /login)
          │         Toggle Modes
          │         Save Settings
          │

```

---

## Route Guard Decision Tree

```
User navigates to route
        │
        ▼
Is route public? (/login, /)
    │           │
   YES          NO
    │           │
Accept          ▼
    │    Is user authenticated?
    │           │
    │       NO  │  YES
    │       │   │   │
    │       │   │   ▼
    │       │   │ Is profile complete?
    │       │   │   │         │
    │       │   │  YES       NO
    │       │   │   │         │
    │       │   │   │         ▼
    │       │   │   │    Redirect /profile
    │       │   │   │    (if trying /dashboard)
    │       │   │   │
    │       │   ▼   ▼ (if trying /profile)
    │       │ Redirect  Accept
    │       │ /login
    │       │
    └───────┴────────────────────────────┐
                                         ▼
                                      Render Page

```

---

## Component Hierarchy

```
Root Layout
├── AuthProvider
│   └── RouteGuardWrapper
│       ├── useRouteGuard() [runs on every route change]
│       └── Children
│           ├── Header [conditional rendering]
│           │   └── Navigation menu
│           │       └── Dropdown
│           │           ├── Settings link
│           │           └── Logout button
│           │
│           └── Page Content
│               ├── /login
│               │   └── LoginPage component
│               │
│               ├── /profile
│               │   └── ProfilePage component
│               │       └── Multi-step form
│               │
│               ├── /dashboard
│               │   └── DashboardPage component
│               │       ├── Recommended schemes
│               │       └── Category grid
│               │
│               ├── /schemes/[category]
│               │   └── SchemesPage component
│               │       ├── Filter chips
│               │       └── Scheme cards
│               │
│               ├── /scheme/[id]
│               │   └── SchemeDetailPage
│               │       ├── Overview
│               │       ├── Benefits
│               │       ├── Eligibility
│               │       ├── Documents
│               │       └── How to apply
│               │
│               └── /settings
│                   └── SettingsPage component
│                       ├── Profile section
│                       ├── Language toggle
│                       ├── Mode toggle
│                       └── Logout button
```

---

## Data Flow Diagram

```
User Input
    │
    ├─────────────────────────┐
    │                         │
    ▼                         ▼
Page State             useAuth() Hook
    │                         │
    │                    ┌────┴─────────┐
    │                    │              │
    │            farmerProfile      Methods:
    │            isAuthenticated    ├─ setFarmerProfile()
    │            isProfileComplete  ├─ updateProfile()
    │                               ├─ completeProfile()
    │                               └─ logout()
    │                    │
    │                    ▼
    │            localStorage
    │            'farmerProfile'
    │
    └────────┬──────────────┘
             │
             ▼
        Page Component
             │
             ├─ Displays data
             ├─ Accepts user input
             └─ Calls auth methods
                  │
                  └─► State updated
                      ├─ Component re-renders
                      ├─ Route guard checks
                      └─ May redirect

```

---

## User Navigation Paths

### Path 1: First-Time User (Complete Happy Path)
```
Enter app
  │
  ▼ /
  │ (redirect)
  ▼ /login
  │ (enter phone)
  ▼ Send OTP button
  │ (enter OTP)
  ▼ Verify OTP button
  │ (navigate)
  ▼ /profile
  │ (fill 6 steps)
  ▼ Start Exploring button
  │ (navigate)
  ▼ /dashboard
  │ (browse)
  ▼ Click category
  │ (navigate)
  ▼ /schemes/agriculture
  │ (browse)
  ▼ Click scheme
  │ (navigate)
  ▼ /scheme/pm-kisan
  │ (click back)
  ▼ /schemes/agriculture
  │ (click settings in header)
  ▼ /settings
  │ (click logout)
  ▼ /login
```

### Path 2: Returning User (Resume)
```
Enter app
  │
  ▼ /
  │ (redirect + auth check)
  ▼ /dashboard
  │ (localStorage has full profile)
```

### Path 3: User with Incomplete Profile
```
App previously crashed at /profile (step 3/6)
  │
  ▼ Enter app
  │ (localStorage has partial profile)
  ▼ /
  │ (redirect + auth check)
  ▼ /profile
  │ (resume at step 3 - data restored)
```

### Path 4: Route Protection Test
```
Try /dashboard without login
  │
  ▼ Route guard check
  │ (isAuthenticated = false)
  ▼ /login
  │ (user must authenticate)
```

---

## localStorage Flow

```
Page Load
  │
  ├─► Check localStorage['farmerProfile']
  │   │
  │   ├─► Data found
  │   │   ├─ Parse JSON
  │   │   ├─ Set farmerProfile state
  │   │   ├─ Set isAuthenticated = true
  │   │   └─ Check if profile complete
  │   │
  │   └─► No data
  │       └─ Set defaults
  │
  ▼
User Action (login/profile update)
  │
  ├─► Call updateProfile() or setFarmerProfile()
  │   │
  │   ├─ Update state
  │   └─ Save to localStorage
  │       localStorage['farmerProfile'] = JSON.stringify(profile)
  │
  ▼
User logs out
  │
  ├─► Call logout()
  │   │
  │   ├─ Clear state
  │   └─ Remove localStorage['farmerProfile']
  │
  ▼
Page Refresh
  │
  └─► Reload from localStorage (if exists)
```

---

## Query Parameter Flow (Future)

```
Currently: No query parameters used
Future enhancement could be:

/schemes/agriculture?filter=cash&sort=new
  │
  ├─► Parse query params
  ├─► Apply filters
  ├─► Sort results
  └─► URL-sharable scheme filters

/scheme/pm-kisan?utm_source=email
  │
  └─► Track campaign source
```

---

## Error Handling Flow

```
User Action
    │
    ▼
Validation
    │
    ├─ Valid
    │   │
    │   ▼
    │ Proceed
    │
    └─ Invalid
        │
        ▼
    Show Error Toast
        │
        ▼
    User corrects
        │
        ▼
    Retry
```

---

## Performance Considerations

```
Initial Load (App Start)
  └─► 1. Load layout.tsx
      2. Initialize AuthProvider
      3. Check localStorage
      4. Run RouteGuard
      5. Render appropriate page
      
      Time: ~500ms-1s

Page Navigation
  └─► 1. Check auth state
      2. Validate route
      3. Load page component
      4. Render with data
      
      Time: ~100-300ms

State Update
  └─► 1. Update component state
      2. Update context
      3. Save to localStorage
      4. Re-render affected components
      5. Route guard check
      
      Time: ~50-150ms
```

