'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { StarField } from './StarField'
import { Typewriter } from './Typewriter'

export function Hero() {
  const typewriterStrings = [
    "Frontend Developer",
    "UI/UX Designer", 
    "Creative Coder",
    "Digital Artist",
    "Problem Solver"
  ]

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Three.js Canvas with StarField */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a103d)' }}
        >
          <StarField />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center space-y-8 px-4 max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="block">I'm a</span>
            <span className="block bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text text-transparent">
              <Typewriter 
                strings={typewriterStrings}
                speed={150}
                delay={3000}
                className="text-5xl md:text-7xl font-bold"
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences with code, creativity, and cutting-edge technology.
            Let's build something legendary together.
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow-lg">
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
    </section>
  )
} 