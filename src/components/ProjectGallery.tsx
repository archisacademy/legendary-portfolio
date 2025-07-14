'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, Code } from 'lucide-react'
import Masonry from 'react-masonry-css'

interface Project {
  id: number
  title: string
  year: string
  stack: string[]
  description: string
  liveUrl: string
  repoUrl: string
  previewGif: string
}

interface ProjectData {
  projects: Project[]
}

export function ProjectGallery() {
  const [data, setData] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/projects.yml')
        const yamlText = await response.text()
        const parsedData = parseYAML(yamlText)
        setData(parsedData)
      } catch (error) {
        console.error('Error loading projects data:', error)
        // Fallback data
        setData({
          projects: [
            {
              id: 1,
              title: "Legendary Portfolio",
              year: "2024",
              stack: ["Next.js", "TypeScript", "Tailwind CSS"],
              description: "A modern, interactive portfolio showcasing my skills.",
              liveUrl: "https://legendary-portfolio.vercel.app",
              repoUrl: "https://github.com/username/legendary-portfolio",
              previewGif: "/previews/legendary-portfolio.gif"
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
  const parseYAML = (yamlText: string): ProjectData => {
    const projects: Project[] = []
    const lines = yamlText.split('\n')
    let currentProject: Partial<Project> = {}
    let inProjects = false
    let inProject = false
    let currentArray: string[] = []
    let currentArrayKey = ''

    for (const line of lines) {
      const trimmed = line.trim()
      
      if (trimmed === 'projects:') {
        inProjects = true
        continue
      }

      if (inProjects && trimmed.startsWith('- id:')) {
        if (currentProject.id && currentProject.title && currentProject.year && currentProject.stack && currentProject.description && currentProject.liveUrl && currentProject.repoUrl && currentProject.previewGif) {
          projects.push(currentProject as Project)
        }
        currentProject = { id: parseInt(trimmed.split(':')[1].trim()) }
        inProject = true
        continue
      }

      if (inProject && trimmed.startsWith('title:')) {
        currentProject.title = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inProject && trimmed.startsWith('year:')) {
        currentProject.year = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inProject && trimmed.startsWith('description:')) {
        currentProject.description = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inProject && trimmed.startsWith('liveUrl:')) {
        currentProject.liveUrl = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inProject && trimmed.startsWith('repoUrl:')) {
        currentProject.repoUrl = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inProject && trimmed.startsWith('previewGif:')) {
        currentProject.previewGif = trimmed.split(':')[1].trim().replace(/"/g, '')
        continue
      }

      if (inProject && trimmed === 'stack:') {
        currentArray = []
        currentArrayKey = 'stack'
        continue
      }

      if (inProject && trimmed.startsWith('- ') && currentArrayKey) {
        currentArray.push(trimmed.substring(2).replace(/"/g, ''))
        continue
      }

      if (inProject && trimmed === '' && currentArrayKey) {
        ;(currentProject as any)[currentArrayKey] = currentArray
        currentArray = []
        currentArrayKey = ''
        continue
      }
    }

    // Ensure stack array is always initialized
    if (currentProject.id && !currentProject.stack) {
      currentProject.stack = []
    }

    if (currentProject.id && currentProject.title && currentProject.year && currentProject.stack && currentProject.description && currentProject.liveUrl && currentProject.repoUrl && currentProject.previewGif) {
      projects.push(currentProject as Project)
    }

    return { projects }
  }

  const handleImageError = (projectId: number) => {
    setImageLoadErrors(prev => new Set(prev).add(projectId))
  }

  const breakpointColumns = {
    default: 3,
    1025: 3,
    641: 2,
    640: 1
  }

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-48 bg-muted rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
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
    <section className="py-20 bg-white dark:bg-gray-900" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of my best work showcasing various technologies and solutions
          </p>
        </div>

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {data.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="mb-6 bg-card border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                {!imageLoadErrors.has(project.id) ? (
                  <img
                    src={project.previewGif}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => handleImageError(project.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
                    <Code className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex gap-4">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 dark:text-gray-100 hover:bg-white transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 dark:text-gray-100 hover:bg-white transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.stack && Array.isArray(project.stack) && project.stack.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.1 + 0.3 + techIndex * 0.05,
                          ease: "easeOut"
                        }}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live ↗
                  </motion.a>
                  <motion.a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub ↗
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>
    </section>
  )
} 