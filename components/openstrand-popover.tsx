'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function OpenStrandPopover() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="text-xl md:text-2xl text-ink-600 dark:text-paper-300 font-light relative group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* OpenStrand infinity symbol before */}
        <span className="inline-block mr-2 text-frame-green animate-pulse">∞</span>
        <span className="underline decoration-frame-green/30 hover:decoration-frame-green transition-all">
          The OS for your life
        </span>
        {/* OpenStrand infinity symbol after */}
        <span className="inline-block ml-2 text-frame-green animate-pulse">∞</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-1/2 -translate-x-1/2 mt-4 w-full max-w-md p-6 neu-card z-50"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-full h-16 dark:invert dark:brightness-200">
                <Image 
                  src="/openstrand-logo-light-1024.png" 
                  alt="OpenStrand" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-2 ink-text text-center">Built on OpenStrand</h3>
            
            <p className="text-sm text-ink-600 dark:text-paper-300 mb-4 text-center">
              OpenStrand is the backbone technology powering all Frame OS sites. It represents our commitment to open infrastructure, allowing anyone to build upon and extend our work.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-frame-green">∞</span>
                <span className="text-ink-700 dark:text-paper-200">Distributed architecture for resilience</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-frame-green">∞</span>
                <span className="text-ink-700 dark:text-paper-200">Open-source foundation for transparency</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-frame-green">∞</span>
                <span className="text-ink-700 dark:text-paper-200">Modular design for extensibility</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neu-dark/10 dark:border-neu-light-shadow/10">
              <p className="text-xs text-ink-500 dark:text-paper-500 text-center">
                A Frame.dev innovation • Open source under MIT
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}