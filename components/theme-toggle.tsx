'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2.5 rounded-lg bg-paper-100 dark:bg-ink-900 hover:bg-paper-200 dark:hover:bg-ink-800 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        // Hand-drawn sun
        <svg 
          className="w-5 h-5 text-ink-600 dark:text-paper-300 group-hover:text-frame-green transition-colors" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {/* Sun rays - hand-drawn style */}
            <path d="M12 2L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 19L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4.22 4.22L6.34 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M17.66 17.66L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M2 12L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M19 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4.22 19.78L6.34 17.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M17.66 6.34L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Sun circle */}
            <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.8" />
          </motion.g>
        </svg>
      ) : (
        // Hand-drawn moon
        <svg 
          className="w-5 h-5 text-ink-600 dark:text-paper-300 group-hover:text-frame-green transition-colors" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ rotate: -30 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="currentColor"
            opacity="0.8"
          />
          {/* Stars - hand-drawn */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <path d="M19 8L19.5 9L20 8L19.5 7L19 8Z" fill="currentColor" opacity="0.6" />
            <path d="M17 4L17.5 5L18 4L17.5 3L17 4Z" fill="currentColor" opacity="0.6" />
          </motion.g>
        </svg>
      )}
    </motion.button>
  )
}