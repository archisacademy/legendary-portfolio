'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface Toast {
  id: string
  type: 'success' | 'error'
  message: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, type, message }])
    
    // Remove toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      addToast('error', 'Please fix the errors in the form')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        addToast('success', 'Message sent successfully! I&apos;ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setErrors({})
      } else {
        addToast('error', 'Failed to send message. Please try again.')
      }
    } catch {
      addToast('error', 'Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/username',
      icon: Github,
      color: 'hover:bg-gray-900 hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/username',
      icon: Linkedin,
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/username',
      icon: Twitter,
      color: 'hover:bg-blue-400 hover:text-white'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/username',
      icon: Instagram,
      color: 'hover:bg-pink-500 hover:text-white'
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let&apos;s work together! I&apos;m always open to discussing new opportunities and exciting projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Let&apos;s Connect
              </h3>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
            I&apos;m passionate about creating innovative solutions and would love to hear about your project. 
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900">
                  <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Email</p>
                  <p className="text-muted-foreground">hello@example.com</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="p-3 rounded-full bg-accent-100 dark:bg-accent-900">
                  <Phone className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Phone</p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Location</p>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.4 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-soft"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.name 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-primary-500'
                    } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-primary-500'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.subject 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-primary-500'
                  } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                  placeholder="What&apos;s this about?"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-primary-500'
                  } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary-500 text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className={`flex items-center gap-3 p-4 rounded-lg shadow-lg max-w-sm ${
              toast.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  )
} 