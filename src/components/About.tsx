'use client'

import { useState, useEffect } from 'react'
import { Signature } from './Signature'
import { useRouter, useSearchParams } from 'next/navigation'

interface AboutData {
  title: string
  subtitle: string
  bio: string
  skills: string[]
  experience: string
  location: string
}

interface AboutProps {
  language?: 'tr' | 'en'
}

export function About({ language: propLanguage }: AboutProps) {
  const [data, setData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState<'tr' | 'en'>('en')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get language from URL params or props
    const urlLang = searchParams.get('lang') as 'tr' | 'en'
    const currentLang = urlLang || propLanguage || 'en'
    setLanguage(currentLang)
  }, [searchParams, propLanguage])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/about.json')
        const aboutData = await response.json()
        setData(aboutData[language])
      } catch (error) {
        console.error('Error loading about data:', error)
        // Fallback data
        setData({
          title: 'About Me',
          subtitle: 'Creative Developer & Designer',
          bio: 'Hello! I\'m a passionate developer focused on modern web technologies.',
          skills: ['Frontend Development', 'UI/UX Design', '3D Web Technologies'],
          experience: '5+ years experience',
          location: 'Istanbul, Turkey'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [language])

  const handleLanguageChange = (newLang: 'tr' | 'en') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', newLang)
    router.push(`?${params.toString()}`)
  }

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!data) return null

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {data.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {data.subtitle}
            </p>
            
            {/* Signature */}
            <div className="flex justify-center mb-8">
              <Signature 
                height={120}
                color="hsl(var(--primary))"
                duration={2500}
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Bio Section */}
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">
                  {data.bio}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-6 rounded-xl bg-card border border-gray-200 dark:border-gray-700 shadow-soft">
                  <div className="text-3xl font-bold text-primary-500 mb-2">
                    {data.experience}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Experience
                  </div>
                </div>
                <div className="text-center p-6 rounded-xl bg-card border border-gray-200 dark:border-gray-700 shadow-soft">
                  <div className="text-3xl font-bold text-accent-500 mb-2">
                    {data.location}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Location
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Skills & Expertise
              </h3>
              
              <div className="space-y-4">
                {data.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="group p-4 rounded-lg bg-card border border-gray-200 dark:border-gray-700 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {skill}
                      </span>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${Math.min(85 + Math.random() * 15, 100)}%`,
                            animationDelay: `${index * 200}ms`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Language Toggle */}
              <div className="pt-6">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => handleLanguageChange('tr')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      language === 'tr' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    TR
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      language === 'en' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 