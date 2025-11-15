'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Props for a single FAQ item.
 */
interface FAQItem {
  /** The question text */
  question: string
  /** The answer text */
  answer: string
}

/**
 * Props for the FAQAccordion component.
 */
interface FAQAccordionProps {
  /** Array of FAQ items to display */
  items: FAQItem[]
}

/**
 * Elegant, accessible accordion component for FAQ pages.
 * 
 * Features:
 * - Smooth expand/collapse animations
 * - Keyboard navigation (Enter/Space to toggle)
 * - Generous spacing and readable typography
 * - Subtle shadows and rounded corners
 * - Light/dark mode support
 * 
 * @component
 * @example
 * ```tsx
 * <FAQAccordion items={[
 *   { question: "What is Frame?", answer: "Frame is..." },
 *   { question: "How do I contribute?", answer: "You can..." }
 * ]} />
 * ```
 */
export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={`
              rounded-xl border transition-all duration-300
              ${isOpen 
                ? 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-300 dark:border-purple-700 shadow-lg' 
                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md'
              }
            `}
          >
            <button
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleItem(index)
                }
              }}
              className="w-full text-left p-6 flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-xl transition-colors"
              aria-expanded={isOpen}
            >
              <h3 className={`text-lg md:text-xl font-semibold leading-relaxed transition-colors ${
                isOpen 
                  ? 'text-purple-900 dark:text-purple-100' 
                  : 'text-gray-900 dark:text-gray-100'
              }`}>
                {item.question}
              </h3>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex-shrink-0 mt-1"
              >
                <ChevronDown className={`w-6 h-6 transition-colors ${
                  isOpen 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-400 dark:text-gray-600'
                }`} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

