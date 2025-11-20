/**
 * Expandable Section Component
 * @module codex/ui/ExpandableSection
 * 
 * @remarks
 * Smooth collapsible sections with hover effects
 */

'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface ExpandableSectionProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultExpanded?: boolean
  className?: string
}

export default function ExpandableSection({
  title,
  icon,
  children,
  defaultExpanded = true,
  className = '',
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className={className}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="
          w-full flex items-center justify-between 
          py-2 px-3 -mx-3
          hover:bg-zinc-100 dark:hover:bg-zinc-800/50
          transition-colors rounded-none
          group
        "
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.div>
          {icon && (
            <span className="text-zinc-500 dark:text-zinc-400">
              {icon}
            </span>
          )}
          <h5 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-600 dark:text-zinc-400">
            {title}
          </h5>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { duration: 0.3, ease: 'easeInOut' },
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
