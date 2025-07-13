'use client'

import { useEffect, useRef } from 'react'

interface SignatureProps {
  className?: string
  height?: number
  color?: string
  duration?: number
}

export function Signature({ 
  className = '', 
  height = 120, 
  color = 'currentColor',
  duration = 2000 
}: SignatureProps) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    // Get the total length of the path
    const pathLength = path.getTotalLength()
    
    // Set initial state
    path.style.strokeDasharray = pathLength.toString()
    path.style.strokeDashoffset = pathLength.toString()
    
    // Animate the drawing
    const animate = () => {
      path.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`
      path.style.strokeDashoffset = '0'
    }

    // Start animation after a small delay
    const timer = setTimeout(animate, 500)
    
    return () => clearTimeout(timer)
  }, [duration])

  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d="M20 80 Q40 60 60 80 T100 80 Q120 60 140 80 T180 80 Q200 60 220 80 T260 80 Q280 60 300 80 T340 80 Q360 60 380 80"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Add some flourishes */}
      <path
        d="M380 80 Q400 70 390 60"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: '20',
          strokeDashoffset: '20',
          animation: `draw 1s ease-in-out ${duration + 500}ms forwards`
        }}
      />
      <path
        d="M20 80 Q10 70 15 60"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: '20',
          strokeDashoffset: '20',
          animation: `draw 1s ease-in-out ${duration + 500}ms forwards`
        }}
      />
      
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  )
} 