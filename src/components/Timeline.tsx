'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Calendar,
  Award,
  Code,
  Building
} from 'lucide-react'

interface TimelineEntry {
  id: number
  year: string
  title: string
  company: string
  location: string
  duration: string
  description: string
  technologies: string[]
  achievements: string[]
  type: 'work' | 'education'
}

interface TimelineData {
  timeline: TimelineEntry[]
}

export function Timeline() {
  const [data, setData] = useState<TimelineData | null>(null)
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/experience.yml')
        const yamlText = await response.text()
        
        // Parse YAML (we'll use a simple approach for now)
        // In a real app, you'd use js-yaml library
        const parsedData = parseYAML(yamlText)
        setData(parsedData)
      } catch (error) {
        console.error('Error loading timeline data:', error)
        // Fallback data
        setData({
          timeline: [
            {
              id: 1,
              year: "2024",
              title: "Senior Frontend Developer",
              company: "TechCorp Solutions",
              location: "San Francisco, CA",
              duration: "Present",
              description: "Leading frontend development for enterprise applications.",
              technologies: ["React", "TypeScript", "Next.js"],
              achievements: ["Reduced bundle size by 40%", "Implemented design system"],
              type: "work"
            }
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Simple YAML parser for demo purposes
  const parseYAML = (yamlText: string): TimelineData => {
    // This is a simplified parser - in production, use js-yaml
    const timeline: TimelineEntry[] = []
    const lines = yamlText.split('\n')
    let currentEntry: Partial<TimelineEntry> = {}
    let inTimeline = false
    let inEntry = false
    let currentArray: string[] = []
    let currentArrayKey = ''

    for (const line of lines) {
      const trimmed = line.trim()
      
      if (trimmed === 'timeline:') {
        inTimeline = true
        continue
      }

      if (inTimeline && trimmed.startsWith('- id:')) {
        if (currentEntry.id && currentEntry.year && currentEntry.title && currentEntry.company && currentEntry.location && currentEntry.duration && currentEntry.description && currentEntry.type && currentEntry.technologies && currentEntry.achievements) {
          timeline.push(currentEntry as TimelineEntry)
        }
        currentEntry = { id: parseInt(trimmed.split(':')[1].trim()) }
        inEntry = true
        continue
      }

      if (inEntry && trimmed.startsWith('year:')) {
        currentEntry.year = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inEntry && trimmed.startsWith('title:')) {
        currentEntry.title = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inEntry && trimmed.startsWith('company:')) {
        currentEntry.company = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inEntry && trimmed.startsWith('location:')) {
        currentEntry.location = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inEntry && trimmed.startsWith('duration:')) {
        currentEntry.duration = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inEntry && trimmed.startsWith('description:')) {
        currentEntry.description = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inEntry && trimmed.startsWith('type:')) {
        currentEntry.type = trimmed.split(':')[1].trim().replace(/"/g, '') as 'work' | 'education'
        continue
      }

      if (inEntry && trimmed === 'technologies:') {
        currentArray = []
        currentArrayKey = 'technologies'
        continue
      }

      if (inEntry && trimmed === 'achievements:') {
        currentArray = []
        currentArrayKey = 'achievements'
        continue
      }

      if (inEntry && trimmed.startsWith('- ') && currentArrayKey) {
        currentArray.push(trimmed.substring(2).replace(/"/g, ''))
        continue
      }

      if (inEntry && trimmed === '' && currentArrayKey) {
        ;(currentEntry as any)[currentArrayKey] = currentArray
        currentArray = []
        currentArrayKey = ''
        continue
      }
    }

    if (currentEntry.id && currentEntry.year && currentEntry.title && currentEntry.company && currentEntry.location && currentEntry.duration && currentEntry.description && currentEntry.type && currentEntry.technologies && currentEntry.achievements) {
      timeline.push(currentEntry as TimelineEntry)
    }

    return { timeline }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-24 h-24 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-6 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!data) return null

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="timeline">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Experience & Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey through the years
          </p>
        </div>

        <div ref={containerRef} className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500"></div>

            {/* Timeline Entries */}
            <div className="space-y-12">
              {data.timeline.map((entry, index) => (
                <TimelineEntry 
                  key={entry.id} 
                  entry={entry} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineEntryProps {
  entry: TimelineEntry
  index: number
}

function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getIcon = (type: string) => {
    return type === 'work' ? <Briefcase className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />
  }

  const getTypeColor = (type: string) => {
    return type === 'work' ? 'bg-primary-500' : 'bg-accent-500'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      className={`flex gap-8 items-start ${
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Timeline Dot */}
      <div className="relative flex-shrink-0">
        <div className={`w-16 h-16 rounded-full ${getTypeColor(entry.type)} flex items-center justify-center text-white shadow-glow`}>
          {getIcon(entry.type)}
        </div>
        <div className="absolute top-8 left-8 w-0.5 h-8 bg-gradient-to-b from-primary-500 to-accent-500"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.2 + 0.3,
          ease: "easeOut"
        }}
        className={`flex-1 bg-card border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 ${
          index % 2 === 0 ? 'ml-8' : 'mr-8'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-primary-500">{entry.year}</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                {entry.type === 'work' ? 'Work' : 'Education'}
              </span>
            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {entry.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span>{entry.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{entry.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{entry.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
                      <p className="text-gray-900 dark:text-gray-100 mb-6 leading-relaxed">
          {entry.description}
        </p>

        {/* Technologies */}
        {entry.technologies && entry.technologies.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {entry.technologies.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.2 + 0.5 + techIndex * 0.1,
                    ease: "easeOut"
                  }}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {entry.achievements && entry.achievements.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {entry.achievements.map((achievement, achievementIndex) => (
                <motion.li
                  key={achievement}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.2 + 0.6 + achievementIndex * 0.1,
                    ease: "easeOut"
                  }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></div>
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
} 