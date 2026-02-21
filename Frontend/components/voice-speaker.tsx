'use client'

import { useVoice } from '@/lib/voice-context'
import { Button } from '@/components/ui/button'
import { Volume2 } from 'lucide-react'

interface VoiceSpeakerProps {
  text: string
  lang?: string
  disabled?: boolean
}

export function VoiceSpeaker({ text, lang = 'en-IN', disabled = false }: VoiceSpeakerProps) {
  const { voiceMode, speak } = useVoice()

  if (!voiceMode) return null

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => speak(text, lang)}
      disabled={disabled}
      title="Listen"
      className="h-8 w-8"
    >
      <Volume2 className="h-4 w-4" />
    </Button>
  )
}
