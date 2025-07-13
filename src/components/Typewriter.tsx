import { useState, useEffect } from 'react'

interface TypewriterProps {
  strings: string[]
  speed?: number
  delay?: number
  className?: string
}

export function Typewriter({ strings, speed = 100, delay = 2000, className = '' }: TypewriterProps) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    if (isWaiting) return

    const currentString = strings[currentStringIndex]
    
    if (isDeleting) {
      // Deleting text
      if (currentText === '') {
        setIsDeleting(false)
        setCurrentStringIndex((prev) => (prev + 1) % strings.length)
        return
      }
      
      const timeout = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1))
      }, speed / 2)
      
      return () => clearTimeout(timeout)
    } else {
      // Typing text
      if (currentText === currentString) {
        // Finished typing, wait then start deleting
        const timeout = setTimeout(() => {
          setIsWaiting(false)
          setIsDeleting(true)
        }, delay)
        
        return () => clearTimeout(timeout)
      }
      
      const timeout = setTimeout(() => {
        setCurrentText(currentString.slice(0, currentText.length + 1))
      }, speed)
      
      return () => clearTimeout(timeout)
    }
  }, [currentText, currentStringIndex, isDeleting, isWaiting, strings, speed, delay])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
} 