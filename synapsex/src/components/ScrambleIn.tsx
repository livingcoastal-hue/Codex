import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

interface ScrambleInProps {
  text: string
  delay: number
  triggered: boolean
}

export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [displayed, setDisplayed] = useState<string>('')
  const cursorRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!triggered) {
      setDisplayed(' ')
      return
    }

    timeoutRef.current = setTimeout(() => {
      cursorRef.current = 0

      intervalRef.current = setInterval(() => {
        cursorRef.current += 0.5
        const reveal = Math.floor(cursorRef.current)

        if (reveal >= text.length) {
          setDisplayed(text)
          if (intervalRef.current) clearInterval(intervalRef.current)
          return
        }

        let result = ''
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            result += ' '
          } else if (i < reveal) {
            result += text[i]
          } else if (i < reveal + 3) {
            result += randomChar()
          } else {
            result += ''
          }
        }
        setDisplayed(result)
      }, 25)
    }, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [triggered, text, delay])

  return <span>{displayed || ' '}</span>
}
