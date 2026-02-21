# Navigation Testing Checklist

Use this to verify all routes and navigation work correctly.

---

## Browser Setup

**Before each test:**
```javascript
// Clear data
localStorage.clear()

// Reload page
window.location.reload()

// Check auth state (in console)
JSON.parse(localStorage.getItem('farmerProfile'))
```

---

## Test Suite 1: Authentication & Login

### ✓ Test 1.1: Unauthenticated Access
- [ ] Visit `http://localhost:3000`
- [ ] Should redirect to `/login`
- [ ] URL shows `/login`

### ✓ Test 1.2: Send OTP
- [ ] On `/login` page
- [ ] Enter `9876543210` in phone field
- [ ] Click "Send OTP"
- [ ] Step changes to OTP input
- [ ] Message shows phone number

### ✓ Test 1.3: Verify OTP - Correct
- [ ] Enter OTP: `1234`
- [ ] Click "Verify OTP"
- [ ] Redirects to `/profile` (Step 2/3)
- [ ] localStorage has `farmerProfile` with phone

### ✓ Test 1.4: Verify OTP - Incorrect
- [ ] Start over
- [ ] Enter phone, click Send OTP
- [ ] Enter wrong OTP: `5678`
- [ ] Click "Verify OTP"
- [ ] Shows error message
- [ ] Still on OTP screen

### ✓ Test 1.5: Back Button on OTP
- [ ] On OTP verification screen
- [ ] Click "Back" button
- [ ] Returns to phone entry
- [ ] Phone number erased (fresh start)

### ✓ Test 1.6: Phone Validation
- [ ] Enter only 5 digits
- [ ] Click "Send OTP"
- [ ] Error: "Please enter valid 10-digit number"
- [ ] Button disabled

---

## Test Suite 2: Profile Setup

### ✓ Test 2.1: Profile Page Load
- [ ] After OTP verified, on `/profile`
- [ ] Progress shows: "Step 2 of 6"
- [ ] "Profile Setup" label visible
- [ ] State selection cards displayed

### ✓ Test 2.2: State Selection
- [ ] Click any state card (e.g., "Maharashtra")
- [ ] Card gets highlighted
- [ ] "Next" button enabled

### ✓ Test 2.3: State → District
- [ ] Click "Next" after selecting state
- [ ] Progress: "Step 2 of 6"
- [ ] District cards shown for selected state
- [ ] Select district

### ✓ Test 2.4: District → Land
- [ ] Click "Next" after district
- [ ] Progress: "Step 3 of 6"
- [ ] Land ownership cards appear
- [ ] Select ownership and size

### ✓ Test 2.5: Land → Crop Type
- [ ] Click "Next" after land selection
- [ ] Progress: "Step 4 of 6"
- [ ] Crop type options shown
- [ ] Select crop

### ✓ Test 2.6: Crop Type → Season
- [ ] Click "Next" after crop
- [ ] Progress: "Step 5 of 6"
- [ ] Season cards displayed
- [ ] Select season

### ✓ Test 2.7: Season → Category
- [ ] Click "Next" after season
- [ ] Progress: "Step 6 of 6"
- [ ] Farmer category options shown
- [ ] Button text: "Start Exploring"

### ✓ Test 2.8: Profile Complete
- [ ] Select farmer category
- [ ] Click "Start Exploring"
- [ ] Redirects to `/dashboard` (Step 3/3)
- [ ] localStorage shows full profile

### ✓ Test 2.9: Back Navigation in Profile
- [ ] At step 3/6 (Crop Type)
- [ ] Click "Back"
- [ ] Goes to step 2/6 (Land)
- [ ] Data preserved (selected options still visible)
- [ ] All back buttons work at every step

### ✓ Test 2.10: Profile Persistence
- [ ] Complete profile steps 1-4
- [ ] Refresh page (Ctrl+R)
- [ ] Still shows step 5 (data persisted)
- [ ] Can complete remaining steps

---

## Test Suite 3: Dashboard Navigation

### ✓ Test 3.1: Dashboard Load
- [ ] After profile complete, on `/dashboard`
- [ ] Header shows "Kisan Sahay" + welcome
- [ ] Recommended schemes section at top
- [ ] 8 category cards visible

### ✓ Test 3.2: Category Click
- [ ] Click any category card (e.g., "Agriculture")
- [ ] Redirects to `/schemes/agriculture`
- [ ] Lists schemes for that category

### ✓ Test 3.3: Settings Access
- [ ] On `/dashboard`
- [ ] Click settings icon (top right menu)
- [ ] Dropdown shows "Settings" and "Logout"

### ✓ Test 3.4: Settings Navigation
- [ ] Click "Settings" in dropdown
- [ ] Navigates to `/settings`
- [ ] Header shows "Settings" with back button

### ✓ Test 3.5: Logout from Dashboard
- [ ] On `/dashboard`
- [ ] Click menu icon
- [ ] Click "Logout"
- [ ] Clears localStorage
- [ ] Redirects to `/login`
- [ ] Phone field empty (fresh start)

---

## Test Suite 4: Scheme List Page

### ✓ Test 4.1: Filter by Category
- [ ] On `/schemes/agriculture`
- [ ] Shows schemes filtered by category
- [ ] Category name in header

### ✓ Test 4.2: Filter Chips
- [ ] See filter buttons: "All", "Cash", "Subsidy", etc.
- [ ] "All" is pre-selected (highlighted)
- [ ] Click "Cash" → filters schemes
- [ ] Badge shows count changes

### ✓ Test 4.3: Multiple Filters
- [ ] Click "Cash" (shows cash schemes)
- [ ] Click "Subsidy" (adds subsidy)
- [ ] Shows only cash + subsidy schemes
- [ ] Click "All" → resets to all schemes

### ✓ Test 4.4: Scheme Cards
- [ ] Each card shows:
    - [ ] Scheme name
    - [ ] Benefit type badge
    - [ ] "Best for You" badge (if applicable)
    - [ ] Description

### ✓ Test 4.5: View Details
- [ ] Click scheme card
- [ ] Navigates to `/scheme/[id]`
- [ ] Shows scheme detail page

### ✓ Test 4.6: Back Button
- [ ] On `/schemes/[category]`
- [ ] Click back button
- [ ] Goes to `/dashboard`

### ✓ Test 4.7: Empty State
- [ ] Click filters to show 0 schemes
- [ ] Shows "No schemes match your filters"
- [ ] "Clear Filters" button available

---

## Test Suite 5: Scheme Detail Page

### ✓ Test 5.1: Detail Page Load
- [ ] On `/scheme/[id]`
- [ ] Header shows back and bookmark buttons
- [ ] Scheme name, benefits, eligibility sections visible

### ✓ Test 5.2: Bookmark Toggle
- [ ] Click bookmark icon
- [ ] Icon gets filled
- [ ] Click again → unfilled
- [ ] State preserved (no save needed in demo)

### ✓ Test 5.3: Back Navigation
- [ ] Click back button
- [ ] Returns to `/schemes/[category]`
- [ ] Same category shown

### ✓ Test 5.4: Apply Button
- [ ] Scroll to bottom
- [ ] "Apply Now" button visible
- [ ] Click shows placeholder action (in demo)

### ✓ Test 5.5: Listen Button
- [ ] Audio icon button present
- [ ] Click shows placeholder action

### ✓ Test 5.6: Invalid Scheme ID
- [ ] Visit `/scheme/invalid-id`
- [ ] Shows "Scheme not found"
- [ ] "Go Back" button available

---

## Test Suite 6: Settings Page

### ✓ Test 6.1: Settings Load
- [ ] On `/settings`
- [ ] Shows current profile info:
    - [ ] Mobile number
    - [ ] State
    - [ ] Farmer category

### ✓ Test 6.2: Edit Profile
- [ ] Click "Edit" button
- [ ] Profile fields become editable
- [ ] "Save" button appears

### ✓ Test 6.3: Language Selection
- [ ] Dropdown shows 8 languages
- [ ] Select different language
- [ ] Selection persisted

### ✓ Test 6.4: Simple Mode Toggle
- [ ] Toggle switch visible
- [ ] Click to enable/disable
- [ ] State changes visually

### ✓ Test 6.5: Data Reuse Info
- [ ] Privacy/data reuse text explains usage
- [ ] Easy to understand language

### ✓ Test 6.6: Back Button
- [ ] Click back
- [ ] Returns to `/dashboard`

### ✓ Test 6.7: Logout from Settings
- [ ] Click menu icon (top right)
- [ ] Click "Logout"
- [ ] Clears all data
- [ ] Goes to `/login`

---

## Test Suite 7: Route Protection

### ✓ Test 7.1: Protect Dashboard
- [ ] Clear localStorage
- [ ] Try `/dashboard` directly
- [ ] Redirects to `/login`

### ✓ Test 7.2: Protect Scheme List
- [ ] Clear localStorage
- [ ] Try `/schemes/agriculture`
- [ ] Redirects to `/login`

### ✓ Test 7.3: Protect Scheme Detail
- [ ] Clear localStorage
- [ ] Try `/scheme/pm-kisan`
- [ ] Redirects to `/login`

### ✓ Test 7.4: Protect Settings
- [ ] Clear localStorage
- [ ] Try `/settings`
- [ ] Redirects to `/login`

### ✓ Test 7.5: Profile Gate for Dashboard
- [ ] Complete login, stop at `/profile`
- [ ] Try accessing `/dashboard` directly
- [ ] Redirects back to `/profile`

### ✓ Test 7.6: Auto-complete Login
- [ ] Complete profile
- [ ] Try `/login` again
- [ ] Auto-redirects to `/dashboard`

### ✓ Test 7.7: Auto-complete Profile
- [ ] Login, complete profile
- [ ] Try `/profile` again
- [ ] Auto-redirects to `/dashboard`

---

## Test Suite 8: Data Persistence

### ✓ Test 8.1: Login Data Persists
- [ ] Login with phone `9876543210`
- [ ] Verify OTP
- [ ] Open new tab, visit app
- [ ] Should remember phone (in context)

### ✓ Test 8.2: Profile Data Persists
- [ ] Complete full profile
- [ ] Refresh page (Ctrl+R)
- [ ] Still on `/dashboard` (not kicked to login)
- [ ] Profile data visible in settings

### ✓ Test 8.3: Data Survives Reload
- [ ] At `/schemes/agriculture`
- [ ] Refresh page (Ctrl+R)
- [ ] Still authenticated
- [ ] Same page shown (or back to dashboard)

### ✓ Test 8.4: Logout Clears Data
- [ ] Complete full flow
- [ ] Logout
- [ ] Refresh page
- [ ] Redirected to `/login` (not dashboard)
- [ ] localStorage empty

---

## Test Suite 9: Edge Cases

### ✓ Test 9.1: Network Error (Future)
- [ ] Simulate offline (DevTools)
- [ ] Should still work (all data cached)

### ✓ Test 9.2: Rapid Navigation
- [ ] Click multiple dashboard cards quickly
- [ ] Each navigates correctly
- [ ] No race conditions

### ✓ Test 9.3: Browser Back Button
- [ ] Navigate: Dashboard → Category → Detail
- [ ] Click browser back button multiple times
- [ ] Each step goes back correctly

### ✓ Test 9.4: Multiple Tabs
- [ ] Open app in tab 1 (logged in)
- [ ] Open new tab 2
- [ ] Both should show same auth state
- [ ] Logout in tab 1, tab 2 shows `/login`

### ✓ Test 9.5: Window Resize
- [ ] On `/dashboard`
- [ ] Resize window (desktop to mobile)
- [ ] Layout adjusts (Tailwind responsive)
- [ ] All content accessible

### ✓ Test 9.6: Mobile Touch
- [ ] On mobile device/simulator
- [ ] Tap buttons (not click)
- [ ] All buttons respond
- [ ] No lag or double-tap

---

## Test Suite 10: Accessibility

### ✓ Test 10.1: Keyboard Navigation
- [ ] Press Tab to navigate buttons
- [ ] Enter/Space to activate buttons
- [ ] Can reach all interactive elements

### ✓ Test 10.2: Focus Indicators
- [ ] Tab through page
- [ ] Focus rings visible on buttons
- [ ] Can see current focused element

### ✓ Test 10.3: Alt Text on Images
- [ ] Inspect scheme cards
- [ ] All images have alt text

### ✓ Test 10.4: Screen Reader
- [ ] Use screen reader (NVDA/JAWS)
- [ ] Can navigate page structure
- [ ] Button labels read correctly

### ✓ Test 10.5: Color Contrast
- [ ] Check primary/secondary colors
- [ ] Text passes contrast ratio (4.5:1 minimum)

---

## Performance Tests

### ✓ Test 11.1: Load Time
- [ ] Clear cache (Ctrl+Shift+Delete)
- [ ] Visit `/dashboard`
- [ ] Measures < 2 seconds

### ✓ Test 11.2: Route Navigation
- [ ] Dashboard → Category → Detail
- [ ] Each transition < 500ms
- [ ] Smooth transitions

### ✓ Test 11.3: localStorage Size
- [ ] Complete profile
- [ ] Check localStorage size < 1KB

---

## Final Verification Checklist

- [ ] All 10 test suites passed
- [ ] No console errors
- [ ] No console warnings
- [ ] Mobile layout works
- [ ] Desktop layout works
- [ ] Data persists correctly
- [ ] Routes protect correctly
- [ ] All navigation buttons work
- [ ] Logout works everywhere
- [ ] Login flow complete

---

## Browser Testing

Test in these browsers:

- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest on Mac)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari (iOS)

---

## Debugging Commands

```javascript
// Check current auth state
JSON.parse(localStorage.getItem('farmerProfile'))

// Clear all data
localStorage.clear()
window.location.reload()

// Check specific property
localStorage.getItem('farmerProfile')?.includes('Maharashtra')

// Simulate logout
localStorage.removeItem('farmerProfile')

// Check all localStorage keys
Object.keys(localStorage)
```

---

## Report Issues

If tests fail, check:

1. **Console errors** - Look for red errors in DevTools
2. **Auth context** - Verify `lib/auth-context.tsx` state updates
3. **Route guard** - Check `lib/route-guard.tsx` logic
4. **localStorage** - Verify data being saved/loaded
5. **Component rendering** - Check page component code
6. **Network** - Ensure no API failures (demo shouldn't have any)

---

## Test Report Template

```
Date: __________
Browser: __________
Device: __________
OS: __________

Test Suite 1: _____ / 6 passed
Test Suite 2: _____ / 10 passed
Test Suite 3: _____ / 5 passed
Test Suite 4: _____ / 7 passed
Test Suite 5: _____ / 6 passed
Test Suite 6: _____ / 7 passed
Test Suite 7: _____ / 7 passed
Test Suite 8: _____ / 4 passed
Test Suite 9: _____ / 6 passed
Test Suite 10: _____ / 5 passed

Total: _____ / 63 tests passed

Issues found:
- 
- 
- 

Notes:
```

