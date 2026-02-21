# Voice Features Documentation

## Overview
The Kisan Sahay application includes comprehensive voice assistance features to make it more accessible for farmers with varying literacy levels and language preferences.

## Components

### 1. VoiceSpeaker Component
Location: `components/voice-speaker.tsx`

**Purpose**: Allows users to listen to instructions and questions.

**Features**:
- Speaker icon button on profile setup steps
- Text-to-speech using Web Speech API
- Multilingual support (English, Hindi, Marathi)
- Auto-detects language from language context
- Hover feedback with visual indication

**Usage**:
```tsx
<VoiceSpeaker 
  text="Which state are you in?" 
  lang="en-IN" 
/>
```

**Available Languages**:
- English: `en-IN` (Indian English)
- Hindi: `hi-IN`
- Marathi: `mr-IN`

### 2. VoiceInput Component
Location: `components/voice-input.tsx`

**Purpose**: Enables voice-to-text input for form fields via microphone.

**Features**:
- Microphone icon button for voice input
- Real-time speech recognition
- Visual feedback (animating mic when listening)
- Error handling for speech recognition
- Supports Indian languages and English

**Usage**:
```tsx
<VoiceInput
  onTranscript={(text) => {
    setField(text)
  }}
  placeholder="Use microphone for input"
/>
```

### 3. Voice Context
Location: `lib/voice-context.tsx`

**Purpose**: Global state management for voice mode toggle.

**Features**:
- `voiceMode`: Boolean state for voice feature enablement
- `setVoiceMode()`: Toggle voice mode on/off
- `speak()`: Function to trigger text-to-speech

**Usage**:
```tsx
const { voiceMode, setVoiceMode, speak } = useVoice()
```

## Integration Points

### Profile Setup Page (`app/profile/page.tsx`)

#### Sections with Voice Speaker (Instructions):
1. **State Selection** - "Which state are you in?"
2. **District Selection** - "Which district?" with dynamic state name
3. **Land Ownership** - "Tell us about your farming land"
4. **Crop Type** - "What do you grow?"
5. **Farming Season** - "Select your farming season"
6. **Farmer Category** - "Your farmer category"

#### Custom Input Fields with Voice Input (Microphone):
1. **Custom District** (if not in predefined list)
   - Input field + microphone button
   
2. **Custom Land Ownership** (other types)
   - Input field + microphone button
   
3. **Custom Crop Type** (unlisted crops)
   - Input field + microphone button

### Navbar Features
- **Voice Mode Toggle Button**: Located in navbar, toggles voice assistance globally
  - Enabled: Volume icon (highlighted)
  - Disabled: Volume-X icon
- **Dark Mode Toggle**: Complements voice mode for accessibility

### Settings Page
- Language selector affects voice language
- Voice mode state persists via context

## User Flow

### For Listening (VoiceSpeaker):
1. User sees speaker icon button on each profile step
2. Clicks speaker button
3. Instruction/question is read aloud in selected language
4. User can read text simultaneously

### For Voice Input (VoiceInput):
1. User clicks microphone button on custom input field
2. Microphone indicator shows listening state (pulsing red mic)
3. User speaks their answer
4. Speech is transcribed and auto-populated in field
5. User can edit if transcription needs correction

## Language Support

**VoiceSpeaker Languages**:
- English (India): `en-IN`
- Hindi: `hi-IN`
- Marathi: `mr-IN`

**VoiceInput Languages**:
- Defaults to `en-IN`
- Can be customized via language context

## Accessibility Features

1. **Large Touch Targets**: All voice buttons meet 44px minimum tap target size
2. **Visual Feedback**: 
   - Highlighted buttons when active
   - Animated microphone when listening
   - Color-coded status (red for listening, green for enabled)
3. **No Required**: All voice features are optional and can be disabled
4. **Keyboard Navigation**: All buttons keyboard accessible
5. **Screen Reader Compatible**: Buttons have proper aria labels and titles

## Browser Support

**VoiceSpeaker (Text-to-Speech)**:
- Chrome/Edge: Full support
- Safari: Full support
- Firefox: Full support
- Mobile browsers: Full support

**VoiceInput (Speech Recognition)**:
- Chrome/Edge: Full support (native Web Speech API)
- Safari: Limited support
- Firefox: Limited support
- Mobile: Platform dependent

## Error Handling

### VoiceSpeaker:
- Graceful fallback if Speech Synthesis API unavailable
- Handles unsupported languages

### VoiceInput:
- Handles speech recognition errors silently
- Shows listening state for user feedback
- Stops listening on error or completion

## Performance Considerations

1. **VoiceSpeaker**: Uses browser's built-in Text-to-Speech (no external calls)
2. **VoiceInput**: Uses browser's built-in Speech Recognition
3. **Minimal Bundle Impact**: Features use native Web APIs
4. **No Network Dependency**: All processing client-side

## Future Enhancements

1. Support for more Indian languages
2. Offline speech recognition capability
3. Custom voice profiles per language
4. Voice commands for navigation
5. Feedback mechanism for transcription accuracy

## Testing Checklist

- [ ] Speaker button works on all profile steps
- [ ] Voice plays in correct selected language
- [ ] Voice mode toggle persists across navigation
- [ ] Microphone input captures and populates fields correctly
- [ ] Custom inputs accept voice input without errors
- [ ] Dark mode doesn't affect voice feature visibility
- [ ] Mobile devices support voice input
- [ ] Error messages display appropriately
- [ ] All buttons are keyboard accessible
