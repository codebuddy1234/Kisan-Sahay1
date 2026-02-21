# Navbar Implementation Guide

## Overview
The persistent navbar has been implemented across all pages of the Kisan Sahay application. It's always visible and sticky at the top, allowing users to change language anytime from any page.

## Navbar Features
- **Sticky Position**: Stays at top of page (z-40) when scrolling
- **Always Visible**: Never hidden by other UI elements
- **Language Selector**: Dropdown menu with 3 languages (English, हिंदी, मराठी)
- **Live Translation**: Entire app translates immediately on language change
- **Mobile Responsive**: Works perfectly on all screen sizes
- **Consistent Branding**: App name/logo visible on all pages

## Technical Implementation

### Navbar Component (`/components/navbar.tsx`)
```tsx
<nav className="border-b border-border bg-card sticky top-0 z-40">
  {/* Logo */}
  {/* Language Selector Dropdown */}
</nav>
```

**Key Props:**
- `sticky top-0 z-40` - Fixed positioning below route guard (z-50)
- `border-b` - Bottom border for visual separation
- `bg-card` - Matches page backgrounds

## Pages with Navbar Integration

### 1. Home Page (`/app/page.tsx`)
```tsx
<Navbar />
<main>...</main>
```
- Landing page with hero section
- "Get Started" button routes to `/access`
- Language can be changed anytime

### 2. Access Page (`/app/access/page.tsx`)
```tsx
<Navbar />
<main>...</main>
```
- OTP login and verification
- Demo OTP: 1234
- After successful login → routes to `/profile`

### 3. Profile Setup Page (`/app/profile/page.tsx`)
```tsx
<>
  <Navbar />
  <main>...</main>
</>
```
- 6-step multi-step form
- Can change language between steps
- Profile data persists while changing language
- After completion → routes to `/dashboard`

### 4. Dashboard Page (`/app/dashboard/page.tsx`)
```tsx
<>
  <Navbar />
  <main>...</main>
</>
```
- Main hub after profile setup
- 8 scheme categories
- Recommended schemes section
- Language change updates category labels and scheme names

### 5. Schemes List Page (`/app/schemes/[category]/page.tsx`)
```tsx
<>
  <Navbar />
  <main>...</main>
</>
```
- Browse schemes by category
- 7 filter options (Cash, Subsidy, Loan, Insurance, New, EndingSoon, All)
- Language changes filter labels and scheme details
- Back button to return to dashboard

### 6. Scheme Detail Page (`/app/scheme/[id]/page.tsx`)
```tsx
<>
  <Navbar />
  <main>...</main>
</>
```
- Complete scheme information
- Benefits, eligibility, documents, how to apply
- Apply Now button
- Language changes all scheme details
- Back button to return to schemes list

### 7. Settings Page (`/app/settings/page.tsx`)
```tsx
<>
  <Navbar />
  <main>...</main>
</>
```
- User profile management
- Language selection (duplicated from navbar)
- Simple Mode toggle
- Notification preferences
- Logout button

## Language Context Integration

### How Translation Works
1. All pages use `useLanguage()` from language context
2. `t('key.path')` function translates strings
3. Available languages:
   - `'en'` - English
   - `'hi'` - हिंदी (Hindi)
   - `'mr'` - मराठी (Marathi)

### Example Translation Usage
```tsx
const { t, language, setLanguage } = useLanguage()

// Using translation
<h1>{t('dashboard.welcome')}</h1>

// Checking current language
if (language === 'hi') {
  // Do something
}

// Changing language
setLanguage('hi')
```

## User Flow with Language Switching

```
User Flow:
  1. Lands on home page (/)
  2. Navbar visible with language selector
  3. Can change language anytime
  4. Clicks "Get Started"
  5. Enters phone number and OTP on /access
  6. Language stays consistent
  7. Fills profile on /profile
  8. Can change language between profile steps
  9. Sees dashboard (/dashboard)
  10. Browses schemes with navbar always visible
  11. Changes language anytime - all content updates
  12. Goes to /settings to manage profile
  13. Navbar always available for language changes
```

## Z-Index Stack

The z-index hierarchy ensures proper layering:
- `z-50` - Route guard modal (if any)
- `z-40` - Navbar (sticky top)
- `z-30` - Dropdowns inside navbar
- `z-20` - Page modals
- Default - Page content

This ensures the navbar is always visible but doesn't block important modals.

## Mobile Optimization

The navbar is fully responsive:
- On mobile: Language selector is compact
- Logo remains visible at all times
- No horizontal scrolling
- Touch-friendly buttons (48px minimum)

```
Desktop View:
┌────────────────────────────────────┐
│ 🌾 Kisan Sahay    [Language ▼]    │
└────────────────────────────────────┘

Mobile View:
┌──────────────────────┐
│ 🌾 Kisan Sahay       │
│        [Language ▼]  │
└──────────────────────┘
```

## Persistent Data

When user changes language:
- ✓ Profile data is preserved
- ✓ Current page content updates
- ✓ Navigation state maintained
- ✓ Form inputs not cleared

## Performance Notes

- Navbar re-renders only when language changes (via context)
- Page content re-renders in sync with navbar
- No additional API calls when changing language
- Smooth transitions (no loading screens)

## Common Tasks

### To add navbar to a new page:
```tsx
import { Navbar } from '@/components/navbar'

export default function NewPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page content */}
      </main>
    </>
  )
}
```

### To add a translated string:
1. Edit `/lib/language-context.tsx`
2. Add to translations object:
```tsx
en: {
  'new.key': 'English text'
},
hi: {
  'new.key': 'हिंदी पाठ'
},
mr: {
  'new.key': 'मराठी मजकूर'
}
```
3. Use in component: `t('new.key')`

### To check current language in component:
```tsx
const { language } = useLanguage()
if (language === 'en') { /* ... */ }
```

## Known Considerations

1. **Mobile Users**: Navbar takes ~60px at top - pages adjusted accordingly
2. **Accessibility**: Language selector is keyboard navigable
3. **Performance**: Language context is optimized to prevent unnecessary re-renders
4. **Persistence**: Language preference is saved in localStorage (can be extended)

## Debugging

If navbar isn't showing:
1. Check if LanguageProvider wraps the app in layout
2. Verify component imports Navbar correctly
3. Check z-index values in globals.css
4. Ensure page is wrapped in `<>...</>` fragment

If translations aren't updating:
1. Verify translation key exists in language-context
2. Check useLanguage hook is called
3. Ensure component is wrapped in LanguageProvider
4. Clear browser cache and localStorage
