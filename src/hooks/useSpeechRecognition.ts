import { useCallback, useEffect, useRef, useState } from 'react'

type SpeechRecognitionWindow = typeof window & {
  webkitSpeechRecognition?: new () => SpeechRecognition
  SpeechRecognition?: new () => SpeechRecognition
}

export function useSpeechRecognition(onTranscript: (text: string) => void) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const onTranscriptRef = useRef(onTranscript)
  onTranscriptRef.current = onTranscript

  useEffect(() => {
    const win = window as SpeechRecognitionWindow
    const SpeechRecognitionClass = win.SpeechRecognition ?? win.webkitSpeechRecognition
    if (!SpeechRecognitionClass) return

    const recognition = new SpeechRecognitionClass()
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + ' '
        }
      }
      if (transcript) onTranscriptRef.current(transcript)
    }

    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    setIsSupported(true)
  }, [])

  const startListening = useCallback(() => {
    recognitionRef.current?.start()
    setIsListening(true)
  }, [])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  return { isSupported, isListening, startListening, stopListening }
}
