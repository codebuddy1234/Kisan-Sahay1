# Profile Validation System Documentation

## Overview
The profile setup page now includes comprehensive input validation with smart district/crop/ownership filtering and custom input options for unlisted values.

## Features Implemented

### 1. State Selection (Step 1)
- **All 33 Indian states + 2 UTs** included
- Card-based selection interface
- Selected state clears district when changed
- All states pre-defined in `/lib/profile-data.ts`

### 2. District Selection (Step 2) - WITH FILTERING
- **Minimum filtering**: Only shows districts for selected state
- **Custom input option**: "Not in list? Type your district"
- Districts automatically filtered from `DISTRICTS` object by state
- Users can type any custom district name if not found in predefined list
- Validation requires either:
  - Selection from predefined list, OR
  - Custom input with text entered

**How it works:**
```typescript
// Districts automatically filtered for selected state
const availableDistricts = DISTRICTS[profileData.state]

// Users can also type custom district
if (showCustomDistrict && profileData.customDistrict?.trim() !== '')
  // Custom input is valid
```

### 3. Land Ownership (Step 3)
- **Predefined options**: Own, Leased, Shared
- **Custom option**: "Other (Type)" - for unlisted ownership types
- Users can type custom ownership if needed
- Validation requires either selection OR custom input

**Options:**
- Own (typical case)
- Leased (rented land)
- Shared (joint farming)
- Other (with text input)

### 4. Land Size
- **6 size categories** for better classification:
  - < 0.5 hectare
  - 0.5-1 hectare
  - 1-2 hectares
  - 2-5 hectares
  - 5-10 hectares
  - > 10 hectares

### 5. Crop Type (Step 4) - WITH FILTERING
- **15 crop options** covering all major Indian crops:
  - Rice, Wheat, Maize, Cotton, Sugarcane
  - Vegetables, Fruits, Pulses, Spices, Oilseeds
  - Tea, Coffee, Horticulture, Mixed Cropping
- **Custom crop input**: "Other crop (Type)"
- Users can type any unlisted crop
- Validation requires either selection OR custom input

### 6. Farming Season (Step 5)
- **4 seasons** with clear descriptions:
  - Kharif (Monsoon - Jun to Oct)
  - Rabi (Winter - Oct to Mar)
  - Summer (Mar to Jun)
  - Year-round

### 7. Farmer Category (Step 6)
- **9 categories** covering all farmer types:
  - Marginal, Small, Medium, Large (by land size)
  - Woman Farmer
  - SC/ST Farmer
  - Youth Farmer (below 35)
  - Senior Farmer (above 60)
  - First-time Farmer

---

## Input Validation Rules

### Valid Inputs
✅ **State**: Must select one state
✅ **District**: Either select from list OR type custom
✅ **Land Ownership**: Either select from list OR type custom
✅ **Land Size**: Must select one option
✅ **Crop Type**: Either select from list OR type custom
✅ **Season**: Must select one option
✅ **Farmer Category**: Must select one option

### Next Button Logic
```typescript
const isDistrictValid = 
  profileData.district !== '' || 
  (showCustomDistrict && profileData.customDistrict?.trim() !== '')

const isLandValid = 
  profileData.landOwnership !== '' && 
  profileData.landSize !== '' &&
  (!showCustomLandOwnership || profileData.customLandOwnership?.trim() !== '')

const isCropValid = 
  profileData.cropType !== '' && 
  (!showCustomCropType || profileData.customCropType?.trim() !== '')
```

- Button is **DISABLED** if current step validation fails
- Button is **ENABLED** when all required fields are valid
- Clear visual feedback (button color changes)

---

## Data Structure

### Profile Data Interface
```typescript
interface ProfileData {
  state: string              // Selected state
  district: string           // Selected district from list
  customDistrict?: string    // User-typed district if not in list
  landOwnership: string      // Selected ownership type
  customLandOwnership?: string // User-typed if selecting "Other"
  landSize: string           // Selected land size
  cropType: string           // Selected crop
  customCropType?: string    // User-typed crop if selecting "Other"
  farmingseason: string      // Selected season
  farmerCategory: string     // Selected farmer category
}
```

### Data Storage
```typescript
// On completion, custom values are properly saved:
const finalData = {
  state: profileData.state,
  district: getDistrictDisplay(),          // Returns custom if entered, else selected
  landOwnership: getLandOwnershipDisplay(), // Returns custom if entered, else selected
  landSize: profileData.landSize,
  cropType: getCropTypeDisplay(),          // Returns custom if entered, else selected
  farmingseason: profileData.farmingseason,
  farmerCategory: profileData.farmerCategory,
}
```

---

## User Experience Improvements

### 1. Smart Filtering
- District list updates when state changes
- District input clears when state selection changes
- Users never see irrelevant options

### 2. Custom Input Handling
- Clear "Not in list?" buttons
- Text input fields with placeholders
- Smooth toggle between list and custom input

### 3. Visual Feedback
- Selected items highlighted with primary color
- Hover effects on cards
- Disabled next button when step incomplete
- Progress bar shows current step

### 4. Accessibility
- All buttons have proper contrast
- Text input fields have clear focus states
- Screen reader friendly labels
- Large tap targets (44px+ height)

### 5. Data Validation
- Trimmed whitespace on custom inputs
- Empty string checks prevent invalid submissions
- Backend receives only valid, non-empty values

---

## Testing Checklist

✅ **State Selection**
- [ ] All 33 states visible
- [ ] Can scroll through states
- [ ] Clicking state highlights it
- [ ] Clicking state clears previous district

✅ **District Selection**
- [ ] Only shows districts for selected state
- [ ] Can select from predefined list
- [ ] Can toggle "Type your district" option
- [ ] Can type custom district
- [ ] Next button enabled only with valid input

✅ **Land Ownership**
- [ ] Can select Own/Leased/Shared
- [ ] Can select Other and type custom
- [ ] Custom input works properly
- [ ] Both selections save correctly

✅ **Land Size**
- [ ] All 6 size options visible
- [ ] Can select multiple (but only one at time)
- [ ] Selected size persists

✅ **Crop Type**
- [ ] Can select from 15 options
- [ ] Scrollable if needed
- [ ] Can toggle "Other crop" and type custom
- [ ] Custom crop input works
- [ ] Both selections save

✅ **Season & Category**
- [ ] All options visible and selectable
- [ ] Proper selection styling
- [ ] Validation works

✅ **Navigation**
- [ ] Back button works
- [ ] Next button disabled when invalid
- [ ] Can go back and modify answers
- [ ] Completion redirects to dashboard

---

## Files Modified

- `/app/profile/page.tsx` - Main profile component with improved validation
- `/lib/profile-data.ts` - Centralized profile data configuration

## Future Enhancements

- Add state/district search functionality
- Allow multi-select for crop types
- Add form persistence (save drafts)
- Add form editing from settings
- Add language support for all options
