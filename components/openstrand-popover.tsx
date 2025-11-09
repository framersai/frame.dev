'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Github, Package, ExternalLink, Layers, GitBranch, Box } from 'lucide-react'

const pages = [
  {
    id: 'overview',
    title: 'Built on OpenStrand',
    content: (
      <div className="space-y-4">
        <p className="text-sm body-text">
          OpenStrand is the backbone technology powering all Frame operating systems. A revolutionary 
          distributed architecture that enables seamless interoperability between different OS layers.
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <Layers className="w-8 h-8 mx-auto mb-2 text-frame-green" />
            <p className="text-xs font-semibold">Modular</p>
          </div>
          <div className="text-center">
            <GitBranch className="w-8 h-8 mx-auto mb-2 text-frame-green" />
            <p className="text-xs font-semibold">Distributed</p>
          </div>
          <div className="text-center">
            <Box className="w-8 h-8 mx-auto mb-2 text-frame-green" />
            <p className="text-xs font-semibold">Extensible</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'architecture',
    title: 'Architecture',
    content: (
      <div className="space-y-4">
        <div className="relative h-48 bg-gradient-to-br from-frame-green/10 to-frame-green-dark/10 rounded-lg p-4">
          <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            {/* Core */}
            <circle cx="200" cy="100" r="30" fill="#00C896" opacity="0.8"/>
            <text x="200" y="105" textAnchor="middle" className="text-xs font-bold fill-white">Core</text>
            
            {/* Orbiting Systems */}
            {['WebOS', 'HomeOS', 'AgentOS', 'SafeOS', 'WorkOS', 'MyOS'].map((os, i) => {
              const angle = (i * 60) * Math.PI / 180
              const x = 200 + 80 * Math.cos(angle)
              const y = 100 + 80 * Math.sin(angle)
              return (
                <g key={os}>
                  <circle cx={x} cy={y} r="20" fill="#00C896" opacity="0.4"/>
                  <text x={x} y={y + 3} textAnchor="middle" className="text-[10px] fill-ink-900 dark:fill-paper-50">{os}</text>
                  <line x1="200" y1="100" x2={x} y2={y} stroke="#00C896" strokeWidth="1" opacity="0.3"/>
                </g>
              )
            })}
          </svg>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-frame-green">∞</span>
            <span>Event-driven message passing</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-frame-green">∞</span>
            <span>Federated state management</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-frame-green">∞</span>
            <span>Zero-trust security model</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'resources',
    title: 'Resources',
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <a href="https://github.com/framersai/openstrand" target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-3 p-3 bg-paper-100 dark:bg-ink-800 rounded-lg hover:bg-paper-200 dark:hover:bg-ink-700 transition-all group">
            <Github className="w-5 h-5 text-ink-600 dark:text-paper-300 group-hover:text-frame-green" />
            <div className="flex-1">
              <p className="font-semibold text-sm">OpenStrand Core</p>
              <p className="text-xs text-ink-500 dark:text-paper-500">github.com/framersai/openstrand</p>
            </div>
            <ExternalLink className="w-4 h-4 text-ink-400" />
          </a>
          
          <a href="https://npmjs.com/org/framers" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 p-3 bg-paper-100 dark:bg-ink-800 rounded-lg hover:bg-paper-200 dark:hover:bg-ink-700 transition-all group">
            <Package className="w-5 h-5 text-red-600 group-hover:text-frame-green" />
            <div className="flex-1">
              <p className="font-semibold text-sm">NPM Packages</p>
              <p className="text-xs text-ink-500 dark:text-paper-500">@framers/openstrand</p>
            </div>
            <ExternalLink className="w-4 h-4 text-ink-400" />
          </a>
        </div>
        
        <div className="pt-3 border-t border-ink-200/20 dark:border-paper-200/10">
          <p className="text-xs text-center text-ink-500 dark:text-paper-500">
            MIT Licensed • Open Source • Community Driven
          </p>
        </div>
      </div>
    )
  }
]

export default function OpenStrandPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <>
      <button
        className="text-responsive-xl md:text-responsive-2xl body-text font-light relative group inline-flex items-center gap-2"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span className="text-frame-green animate-pulse">∞</span>
        <span className="underline decoration-frame-green/30 hover:decoration-frame-green transition-all decoration-2 underline-offset-4">
          The OS for your life
        </span>
        <span className="text-frame-green animate-pulse">∞</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="absolute left-1/2 -translate-x-1/2 mt-4 w-full max-w-xl paper-card-lifted z-50 overflow-hidden"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* Header with logo */}
            <div className="p-6 pb-4 border-b border-ink-200/10 dark:border-paper-200/10">
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl text-frame-green">∞</span>
                <div className="relative h-12 w-48 dark:invert dark:brightness-200">
                  <Image 
                    src="/openstrand-logo-light-1024.png" 
                    alt="OpenStrand" 
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-2xl text-frame-green">∞</span>
              </div>
            </div>

            {/* Content Pages */}
            <div className="p-6 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-bold mb-4 heading-display">
                    {pages[currentPage].title}
                  </h3>
                  {pages[currentPage].content}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between px-6 pb-6">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className={`p-2 rounded-lg transition-all ${
                  currentPage === 0 
                    ? 'opacity-30 cursor-not-allowed' 
                    : 'hover:bg-paper-100 dark:hover:bg-ink-800'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Page Dots */}
              <div className="flex gap-2">
                {pages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentPage 
                        ? 'w-6 bg-frame-green' 
                        : 'bg-ink-300 dark:bg-ink-700 hover:bg-ink-400 dark:hover:bg-ink-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
                disabled={currentPage === pages.length - 1}
                className={`p-2 rounded-lg transition-all ${
                  currentPage === pages.length - 1 
                    ? 'opacity-30 cursor-not-allowed' 
                    : 'hover:bg-paper-100 dark:hover:bg-ink-800'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}