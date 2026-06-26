import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

import type { CSSProperties } from 'react'

interface ScrambleTextProps {
  text: string
  isHovered: boolean
  className?: string
  style?: CSSProperties
}

export default function ScrambleText({ text, isHovered, className = '', style }: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (!isHovered) {
      setDisplayed(text)
      return
    }

    frameRef.current = 0

    intervalRef.current = setInterval(() => {
      frameRef.current++
      const reveal = Math.floor(frameRef.current / 4)

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
        } else {
          result += randomChar()
        }
      }
      setDisplayed(result)
    }, 25)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovered, text])

  return <span className={className} style={style}>{displayed}</span>
}
