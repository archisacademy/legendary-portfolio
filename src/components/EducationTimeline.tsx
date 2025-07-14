'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { GraduationCap, MapPin, Calendar, Award, Code, Star } from 'lucide-react'

interface EducationEntry {
  id: number
  degree: string
  institution: string
  year: string
  location: string
  description: string
  logo: string
  gpa: string
  achievements: string[]
  technologies: string[]
}

interface EducationData {
  education: EducationEntry[]
}

export function EducationTimeline() {
  const [data, setData] = useState<EducationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/education.yml')
        const yamlText = await response.text()
        const educationData = parseYAML(yamlText)
        setData(educationData)
      } catch (error) {
        console.error('Error loading education data:', error)
        // Fallback data
        setData({
          education: [
            {
              id: 1,
              degree: "Master of Science in Computer Science",
              institution: "Stanford University",
              year: "2022-2024",
              location: "Stanford, CA",
              description: "Specialized in Artificial Intelligence and Machine Learning.",
              logo: "/logos/stanford.svg",
              gpa: "3.9/4.0",
              achievements: ["Graduate Teaching Assistant", "Published 3 papers"],
              technologies: ["Python", "TensorFlow", "PyTorch"]
            }
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const parseYAML = (yamlText: string): EducationData => {
    // Simple YAML parser for our specific format
    const education: EducationEntry[] = []
    const lines = yamlText.split('\n')
    let currentEntry: Partial<EducationEntry> = {}
    let currentArray: string[] = []
    let inArray = false
    let arrayKey = ''

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('- id:')) {
        if (currentEntry.id) {
          education.push(currentEntry as EducationEntry)
        }
        currentEntry = { id: parseInt(line.split(':')[1].trim()) }
        inArray = false
        currentArray = []
      } else if (line.startsWith('degree:')) {
        currentEntry.degree = line.split(':')[1].trim().replace(/"/g, '')
      } else if (line.startsWith('institution:')) {
        currentEntry.institution = line.split(':')[1].trim().replace(/"/g, '')
      } else if (line.startsWith('year:')) {
        currentEntry.year = line.split(':')[1].trim().replace(/"/g, '')
      } else if (line.startsWith('location:')) {
        currentEntry.location = line.split(':')[1].trim().replace(/"/g, '')
      } else if (line.startsWith('description:')) {
        currentEntry.description = line.split(':')[1].trim().replace(/"/g, '')
      } else if (line.startsWith('logo:')) {
        currentEntry.logo = line.split(':')[1].trim().replace(/"/g, '')
      } else if (line.startsWith('gpa:')) {
        currentEntry.gpa = line.split(':')[1].trim().replace(/"/g, '')
      } else if (line.startsWith('achievements:')) {
        inArray = true
        arrayKey = 'achievements'
        currentArray = []
      } else if (line.startsWith('technologies:')) {
        inArray = true
        arrayKey = 'technologies'
        currentArray = []
      } else if (inArray && line.startsWith('- ')) {
        currentArray.push(line.substring(2).replace(/"/g, ''))
      } else if (inArray && line === '') {
        inArray = false
        if (arrayKey === 'achievements') {
          currentEntry.achievements = currentArray
        } else if (arrayKey === 'technologies') {
          currentEntry.technologies = currentArray
        }
      }
    }

    if (currentEntry.id) {
      education.push(currentEntry as EducationEntry)
    }

    return { education }
  }

  const handleImageError = (entryId: number) => {
    setImageLoadErrors(prev => new Set(prev).add(entryId))
  }

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900" id="education">
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
    <section className="py-20 bg-white dark:bg-gray-900" id="education">
      <div className="container mx-auto px-4">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Education Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic path through prestigious institutions
          </p>
        </motion.div>

        <VerticalTimeline lineColor="hsl(var(--primary))">
          {data.education.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
            >
              <VerticalTimelineElement
                className="vertical-timeline-element--education"
                contentStyle={{ 
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 4px 25px -5px rgb(0 0 0 / 0.1)'
                }}
                contentArrowStyle={{ borderRight: '7px solid hsl(var(--card))' }}
                date={entry.year}
                dateClassName="text-primary-500 font-semibold"
                iconStyle={{ 
                  background: 'hsl(var(--primary))',
                  color: 'white',
                  boxShadow: '0 0 20px rgb(26 16 61 / 0.3)'
                }}
                icon={<GraduationCap className="w-6 h-6" />}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      {!imageLoadErrors.has(entry.id) ? (
                        <img
                          src={entry.logo}
                          alt={`${entry.institution} logo`}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                          loading="lazy"
                          onError={() => handleImageError(entry.id)}
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                          <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Institution Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {entry.institution}
                      </h3>
                      <p className="text-lg font-semibold text-primary-500 mb-2">
                        {entry.degree}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{entry.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{entry.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{entry.gpa}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground leading-relaxed">
                    {entry.description}
                  </p>

                  {/* Achievements */}
                  {entry.achievements && entry.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
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
                              delay: index * 0.2 + 0.3 + achievementIndex * 0.1,
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

                  {/* Technologies */}
                  {entry.technologies && entry.technologies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        Technologies & Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {entry.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.2 + 0.4 + techIndex * 0.05,
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
                </div>
              </VerticalTimelineElement>
            </motion.div>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  )
} 