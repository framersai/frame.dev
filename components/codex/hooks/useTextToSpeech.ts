/**
 * Hook for Text-to-Speech functionality
 * @module codex/hooks/useTextToSpeech
 */

import { useState, useEffect, useCallback, useRef } from 'react'

interface TTSSettings {
  volume: number
  rate: number
  pitch: number
  voiceURI: string | null
}

interface TTSState {
  isPlaying: boolean
  isPaused: boolean
  isSupported: boolean
}

interface UseTextToSpeechResult {
  state: TTSState
  settings: TTSSettings
  availableVoices: SpeechSynthesisVoice[]
  speak: (text: string) => void
  pause: () => void
  resume: () => void
  stop: () => void
  setVolume: (volume: number) => void
  setRate: (rate: number) => void
  setPitch: (pitch: number) => void
  setVoice: (voiceURI: string) => void
  isSupported: boolean
}

export function useTextToSpeech(): UseTextToSpeechResult {
  const [isSupported, setIsSupported] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  
  const [settings, setSettings] = useState<TTSSettings>({
    volume: 1,
    rate: 1,
    pitch: 1,
    voiceURI: null,
  })

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true)
      
      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices()
        setVoices(available)
      }

      window.speechSynthesis.onvoiceschanged = updateVoices
      updateVoices()

      return () => {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const speak = useCallback((text: string) => {
    if (!isSupported) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.volume = settings.volume
    utterance.rate = settings.rate
    utterance.pitch = settings.pitch

    if (settings.voiceURI) {
      const voice = voices.find(v => v.voiceURI === settings.voiceURI)
      if (voice) utterance.voice = voice
    }

    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    utterance.onerror = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [isSupported, settings, voices])

  const pause = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.pause()
    setIsPaused(true)
    setIsPlaying(false)
  }, [isSupported])

  const resume = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.resume()
    setIsPaused(false)
    setIsPlaying(true)
  }, [isSupported])

  const stop = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }, [isSupported])

  const updateSetting = useCallback(<K extends keyof TTSSettings>(key: K, value: TTSSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  return {
    state: { isPlaying, isPaused, isSupported },
    settings,
    availableVoices: voices,
    speak,
    pause,
    resume,
    stop,
    setVolume: (v) => updateSetting('volume', v),
    setRate: (r) => updateSetting('rate', r),
    setPitch: (p) => updateSetting('pitch', p),
    setVoice: (uri) => updateSetting('voiceURI', uri),
    isSupported,
  }
}

