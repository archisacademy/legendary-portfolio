'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code, 
  Palette, 
  Smartphone, 
  Globe, 
  Database, 
  Zap, 
  Shield, 
  Layers,
  Cpu,
  Wifi,
  Cloud,
  Lock,
  Eye,
  Heart,
  Star,
  Target,
  Rocket,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react'

interface Skill {
  name: string
  icon: React.ComponentType<any>
  color: string
  level: number
  category: string
}

// Icon components for skills that don't exist in lucide-react
const Cube = ({ className, ...props }: any) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)

const Server = ({ className, ...props }: any) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
)

const Package = ({ className, ...props }: any) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <line x1="16.5" y1="9.4" x2="7.55" y2="4.24"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)

const GitBranch = ({ className, ...props }: any) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <line x1="6" y1="3" x2="6" y2="15"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M18 9a9 9 0 0 1-9 9"/>
  </svg>
)

const TestTube = ({ className, ...props }: any) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M9 12l2 2 4-4"/>
    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
    <path d="M12 3c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z"/>
    <path d="M12 21c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"/>
  </svg>
)

const Flame = ({ className, ...props }: any) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M9 12l2 2 4-4"/>
    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
    <path d="M12 3c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z"/>
    <path d="M12 21c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"/>
  </svg>
)

const skills: Skill[] = [
  { name: 'React', icon: Code, color: '#61DAFB', level: 95, category: 'Frontend' },
  { name: 'TypeScript', icon: Code, color: '#3178C6', level: 90, category: 'Language' },
  { name: 'Next.js', icon: Globe, color: '#000000', level: 92, category: 'Framework' },
  { name: 'Tailwind CSS', icon: Palette, color: '#06B6D4', level: 88, category: 'Styling' },
  { name: 'Three.js', icon: Cube, color: '#000000', level: 85, category: '3D' },
  { name: 'Node.js', icon: Server, color: '#339933', level: 82, category: 'Backend' },
  { name: 'PostgreSQL', icon: Database, color: '#336791', level: 80, category: 'Database' },
  { name: 'GraphQL', icon: Zap, color: '#E10098', level: 78, category: 'API' },
  { name: 'Docker', icon: Package, color: '#2496ED', level: 75, category: 'DevOps' },
  { name: 'AWS', icon: Cloud, color: '#FF9900', level: 72, category: 'Cloud' },
  { name: 'Figma', icon: Palette, color: '#F24E1E', level: 85, category: 'Design' },
  { name: 'Git', icon: GitBranch, color: '#F05032', level: 90, category: 'Version Control' },
  { name: 'Jest', icon: TestTube, color: '#C21325', level: 80, category: 'Testing' },
  { name: 'Redux', icon: Layers, color: '#764ABC', level: 85, category: 'State Management' },
  { name: 'MongoDB', icon: Database, color: '#47A248', level: 75, category: 'Database' },
  { name: 'Vue.js', icon: Code, color: '#4FC08D', level: 70, category: 'Frontend' },
  { name: 'Python', icon: Code, color: '#3776AB', level: 75, category: 'Language' },
  { name: 'Django', icon: Server, color: '#092E20', level: 70, category: 'Backend' },
  { name: 'Firebase', icon: Flame, color: '#FFCA28', level: 80, category: 'Backend' },
  { name: 'Vercel', icon: Zap, color: '#000000', level: 85, category: 'Deployment' }
]

interface FloatingBadgeProps {
  skill: Skill
  position: { x: number; y: number }
  onClose: () => void
}

function FloatingBadge({ skill, position, onClose }: FloatingBadgeProps) {
  const IconComponent = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="bg-card border border-border shadow-strong rounded-lg p-4 min-w-[200px]">
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: skill.color + '20' }}
          >
            <IconComponent 
              className="w-5 h-5" 
              style={{ color: skill.color }}
            />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{skill.name}</h4>
            <p className="text-sm text-muted-foreground">{skill.category}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Proficiency</span>
            <span className="font-medium text-foreground">{skill.level}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function SkillCloud() {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  const [badgePosition, setBadgePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSkillHover = (skill: Skill, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setBadgePosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 20
    })
    setHoveredSkill(skill)
  }

  const handleSkillLeave = () => {
    setHoveredSkill(null)
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive collection of technologies and tools I work with
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full h-[600px] overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50/50 to-accent-50/50 border border-border"
        >
          {/* Skill Tags */}
          <div className="absolute inset-0">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              const angle = (index / skills.length) * 2 * Math.PI
              const radius = 200 + Math.random() * 100
              const x = Math.cos(angle) * radius + 300
              const y = Math.sin(angle) * radius + 300

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: x,
                    y: y
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    zIndex: 10
                  }}
                  className="absolute cursor-pointer"
                  onMouseEnter={(e) => handleSkillHover(skill, e)}
                  onMouseLeave={handleSkillLeave}
                >
                  <motion.div
                    className="px-4 py-2 rounded-full text-sm font-medium shadow-soft hover:shadow-medium transition-all duration-300"
                    style={{ 
                      backgroundColor: skill.color + '20',
                      color: skill.color,
                      border: `1px solid ${skill.color}30`
                    }}
                    whileHover={{ 
                      boxShadow: `0 0 20px ${skill.color}40`
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4" />
                      <span>{skill.name}</span>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Floating Badge */}
          <AnimatePresence>
            {hoveredSkill && (
              <FloatingBadge
                skill={hoveredSkill}
                position={badgePosition}
                onClose={() => setHoveredSkill(null)}
              />
            )}
          </AnimatePresence>

          {/* Center Info */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow"
              >
                <Code className="w-12 h-12 text-white" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-4 text-muted-foreground font-medium"
              >
                Hover over skills to learn more
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 