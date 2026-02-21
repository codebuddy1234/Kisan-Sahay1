'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface VoiceContextType {
  voiceMode: boolean
  setVoiceMode: (mode: boolean) => void
  speak: (text: string, lang?: string) => void
  stopSpeaking: () => void
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined)

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [voiceMode, setVoiceMode] = useState(false)

  const speak = (text: string, lang: string = 'en-IN') => {
    if (!voiceMode) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
  }

  const value: VoiceContextType = {
    voiceMode,
    setVoiceMode,
    speak,
    stopSpeaking,
  }

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>
}

export function useVoice() {
  const context = useContext(VoiceContext)
  if (context === undefined) {
    throw new Error('useVoice must be used within VoiceProvider')
  }
  return context
}
