'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Sparkles } from 'lucide-react'

export default function VCABanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check localStorage for banner state
    const bannerState = localStorage.getItem('vca-banner-state')
    const bannerTimestamp = localStorage.getItem('vca-banner-timestamp')
    
    if (bannerState === 'never') {
      setIsDismissed(true)
      return
    }
    
    if (bannerState === 'later' && bannerTimestamp) {
      const timestamp = parseInt(bannerTimestamp)
      const now = Date.now()
      const dayInMs = 24 * 60 * 60 * 1000
      
      if (now - timestamp < dayInMs) {
        setIsDismissed(true)
        return
      }
    }
    
    // Show banner after a short delay
    setTimeout(() => setIsVisible(true), 1000)
  }, [])

  const handleDismiss = (type: 'never' | 'later') => {
    setIsVisible(false)
    setIsDismissed(true)
    
    if (type === 'never') {
      localStorage.setItem('vca-banner-state', 'never')
    } else {
      localStorage.setItem('vca-banner-state', 'later')
      localStorage.setItem('vca-banner-timestamp', Date.now().toString())
    }
  }

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="fixed top-20 left-0 right-0 z-30 px-4 py-2"
        >
          <div className="max-w-6xl mx-auto relative">
            <div className="relative bg-gradient-to-r from-frame-green via-frame-green-dark to-frame-green rounded-xl shadow-paper-lifted overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="vca-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M30 0L60 30L30 60L0 30Z" fill="white" opacity="0.1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#vca-pattern)" />
                </svg>
              </div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

              {/* Content */}
              <div className="relative z-10 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-white/90 animate-pulse" />
                  <a 
                    href="https://vca.chat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/90 transition-colors"
                  >
                    <span className="font-semibold">Voice Chat Assistant Marketplace</span>
                    <span className="hidden sm:inline ml-2 opacity-90">
                      — Discover free & premium AI agents compatible with AgentOS
                    </span>
                    <span className="ml-2 inline-flex items-center gap-1 text-sm">
                      Explore now
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                </div>

                {/* Dismiss Options */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDismiss('later')}
                    className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    aria-label="Remind me later"
                    title="Remind me tomorrow"
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDismiss('never')}
                    className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    aria-label="Close permanently"
                    title="Don't show again"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
