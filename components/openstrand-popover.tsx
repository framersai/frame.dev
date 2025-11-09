'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function OpenStrandPopover() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="text-xl md:text-2xl text-ink-600 dark:text-paper-300 font-light underline decoration-frame-green/30 hover:decoration-frame-green transition-all cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        The OS for your life
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-1/2 -translate-x-1/2 mt-4 w-full max-w-md p-6 bg-white dark:bg-ink-900 rounded-xl shadow-2xl border border-ink-200 dark:border-ink-800 z-50"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-4 mb-4">
              <img src="/openstrand-logo.svg" alt="OpenStrand" className="h-10" />
            </div>
            
            <h3 className="text-lg font-bold mb-2 ink-text">Built on OpenStrand</h3>
            
            <p className="text-sm text-ink-600 dark:text-paper-300 mb-4">
              OpenStrand is the backbone technology powering all Frame OS sites. It represents our commitment to open infrastructure, allowing anyone to build upon and extend our work.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-frame-green">•</span>
                <span className="text-ink-700 dark:text-paper-200">Distributed architecture for resilience</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-frame-green">•</span>
                <span className="text-ink-700 dark:text-paper-200">Open-source foundation for transparency</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-frame-green">•</span>
                <span className="text-ink-700 dark:text-paper-200">Modular design for extensibility</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-ink-200 dark:border-ink-800">
              <p className="text-xs text-ink-500 dark:text-paper-500">
                A Frame.dev innovation • Open source under MIT
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
