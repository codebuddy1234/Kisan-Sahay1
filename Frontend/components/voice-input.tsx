'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, MicOff, Copy } from 'lucide-react'

interface VoiceInputProps {
  onTranscript: (text: string) => void
  placeholder?: string
}

export function VoiceInput({ onTranscript, placeholder = 'Voice input available' }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-IN'

        recognitionRef.current.onstart = () => {
          setIsListening(true)
        }

        recognitionRef.current.onresult = (event: any) => {
          let interim = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptSegment = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              setTranscript(transcriptSegment)
              onTranscript(transcriptSegment)
            } else {
              interim += transcriptSegment
            }
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [onTranscript])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setTranscript('')
      recognitionRef.current.start()
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleListening}
      title={isListening ? 'Stop listening' : 'Start voice input'}
      className={isListening ? 'bg-red-500/10 text-red-600 border-red-300' : ''}
    >
      {isListening ? (
        <Mic className="h-4 w-4 animate-pulse" />
      ) : (
        <MicOff className="h-4 w-4" />
      )}
    </Button>
  )
}
