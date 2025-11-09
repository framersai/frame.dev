'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Github, Package, ExternalLink, Layers, GitBranch, Box, Download, X } from 'lucide-react'

const pages = [
  {
    id: 'overview',
    title: 'Built on OpenStrand',
    content: (
      <div className="space-y-6">
        <p className="text-base body-text">
          OpenStrand is the backbone technology powering all Frame operating systems. A revolutionary 
          distributed architecture that enables seamless interoperability between different OS layers.
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
            <Layers className="w-10 h-10 mx-auto mb-2 text-frame-green" />
            <p className="text-sm font-semibold">Modular</p>
            <p className="text-xs text-ink-600 dark:text-paper-400 mt-1">Plug & play architecture</p>
          </div>
          <div className="text-center p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
            <GitBranch className="w-10 h-10 mx-auto mb-2 text-frame-green" />
            <p className="text-sm font-semibold">Distributed</p>
            <p className="text-xs text-ink-600 dark:text-paper-400 mt-1">Decentralized by design</p>
          </div>
          <div className="text-center p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
            <Box className="w-10 h-10 mx-auto mb-2 text-frame-green" />
            <p className="text-sm font-semibold">Extensible</p>
            <p className="text-xs text-ink-600 dark:text-paper-400 mt-1">Infinite possibilities</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a 
            href="https://openstrand.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2 text-sm"
          >
            <Download className="w-5 h-5" />
            Get Community Edition
          </a>
          <a 
            href="https://openstrand.ai/signup" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center justify-center gap-2 px-5 py-2 text-sm"
          >
            Sign Up Now
          </a>
        </div>
      </div>
    )
  },
  {
    id: 'architecture',
    title: 'Architecture',
    content: (
      <div className="space-y-6">
        <div className="relative h-64 bg-gradient-to-br from-frame-green/10 to-frame-green-dark/10 rounded-lg p-6">
          <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            {/* Core */}
            <circle cx="200" cy="100" r="35" fill="#00C896" opacity="0.8"/>
            <text x="200" y="105" textAnchor="middle" className="text-sm font-bold fill-white">Core</text>
            
            {/* Orbiting Systems */}
            {['WebOS', 'HomeOS', 'AgentOS', 'SafeOS', 'WorkOS', 'MyOS'].map((os, i) => {
              const angle = (i * 60) * Math.PI / 180
              const x = 200 + 90 * Math.cos(angle)
              const y = 100 + 90 * Math.sin(angle)
              return (
                <g key={os}>
                  <circle cx={x} cy={y} r="25" fill="#00C896" opacity="0.4"/>
                  <text x={x} y={y + 4} textAnchor="middle" className="text-xs fill-ink-900 dark:fill-paper-50">{os}</text>
                  <line x1="200" y1="100" x2={x} y2={y} stroke="#00C896" strokeWidth="2" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                  </line>
                </g>
              )
            })}
          </svg>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-paper-100 dark:bg-ink-800 rounded-lg">
            <span className="text-frame-green text-lg">∞</span>
            <div>
              <p className="font-semibold text-sm">Event-driven message passing</p>
              <p className="text-xs text-ink-600 dark:text-paper-400">Real-time communication between OS layers</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-paper-100 dark:bg-ink-800 rounded-lg">
            <span className="text-frame-green text-lg">∞</span>
            <div>
              <p className="font-semibold text-sm">Federated state management</p>
              <p className="text-xs text-ink-600 dark:text-paper-400">Distributed consensus protocol</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-paper-100 dark:bg-ink-800 rounded-lg">
            <span className="text-frame-green text-lg">∞</span>
            <div>
              <p className="font-semibold text-sm">Zero-trust security model</p>
              <p className="text-xs text-ink-600 dark:text-paper-400">End-to-end encryption by default</p>
            </div>
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
        <div className="space-y-3">
          <a href="https://github.com/framersai/openstrand" target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-3 p-4 bg-paper-100 dark:bg-ink-800 rounded-lg hover:bg-paper-200 dark:hover:bg-ink-700 transition-all group">
            <Github className="w-6 h-6 text-ink-600 dark:text-paper-300 group-hover:text-frame-green" />
            <div className="flex-1">
              <p className="font-semibold">OpenStrand Core</p>
              <p className="text-sm text-ink-500 dark:text-paper-500">github.com/framersai/openstrand</p>
            </div>
            <ExternalLink className="w-4 h-4 text-ink-400" />
          </a>
          
          <a href="https://npmjs.com/org/framers" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 p-4 bg-paper-100 dark:bg-ink-800 rounded-lg hover:bg-paper-200 dark:hover:bg-ink-700 transition-all group">
            <Package className="w-6 h-6 text-red-600 group-hover:text-frame-green" />
            <div className="flex-1">
              <p className="font-semibold">NPM Packages</p>
              <p className="text-sm text-ink-500 dark:text-paper-500">@framers/openstrand</p>
            </div>
            <ExternalLink className="w-4 h-4 text-ink-400" />
          </a>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-frame-green/10 to-frame-green-dark/10 rounded-lg">
          <p className="text-sm font-semibold mb-2">Join the Community</p>
          <p className="text-xs text-ink-600 dark:text-paper-400 mb-3">
            Get involved in shaping the future of distributed operating systems
          </p>
          <a 
            href="https://openstrand.ai/community" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-frame-green font-semibold hover:underline"
          >
            Join Discord Community
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        
        <div className="pt-4 border-t border-ink-200/20 dark:border-paper-200/10">
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
        className="text-responsive-lg md:text-responsive-xl body-text font-light relative group inline-flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-frame-green animate-pulse">∞</span>
        <span className="underline decoration-frame-green/30 hover:decoration-frame-green transition-all decoration-2 underline-offset-4">
          The <span className="font-semibold">OS</span> for your life
        </span>
        <span className="text-frame-green animate-pulse">∞</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - Less blur, more visible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/35 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal - centered via flex wrapper */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', duration: 0.3 }}
                className="pointer-events-auto w-full max-w-3xl h-fit max-h-[90vh] paper-card-lifted overflow-hidden relative"
              >
              {/* Header with logo */}
              <div className="p-6 pb-4 border-b border-ink-200/10 dark:border-paper-200/10 bg-gradient-to-r from-paper-100/50 to-paper-50/50 dark:from-ink-800/50 dark:to-ink-900/50">
                <div className="flex items-center justify-center">
                  <div className="relative h-16">
                    <svg height="64" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="strand" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#00C896', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#00A67C', stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>
                      <g transform="translate(10, 30)">
                        <path d="M0,0 Q10,-15 20,0 T40,0 T60,0 T80,0" stroke="url(#strand)" strokeWidth="3" fill="none"/>
                        <path d="M0,0 Q10,15 20,0 T40,0 T60,0 T80,0" stroke="url(#strand)" strokeWidth="3" fill="none" opacity="0.6"/>
                        <circle cx="0" cy="0" r="3" fill="#00C896"/>
                        <circle cx="20" cy="0" r="3" fill="#00C896"/>
                        <circle cx="40" cy="0" r="3" fill="#00C896"/>
                        <circle cx="60" cy="0" r="3" fill="#00C896"/>
                        <circle cx="80" cy="0" r="3" fill="#00C896"/>
                      </g>
                      <text x="100" y="35" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="600" className="fill-ink-900 dark:fill-paper-50">OpenStrand</text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content Pages */}
              <div className="p-8 min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold mb-6 heading-display">
                      {pages[currentPage].title}
                    </h3>
                    {pages[currentPage].content}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between px-8 pb-6">
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
                      className={`h-2 rounded-full transition-all ${
                        i === currentPage 
                          ? 'w-8 bg-frame-green' 
                          : 'w-2 bg-ink-300 dark:bg-ink-700 hover:bg-ink-400 dark:hover:bg-ink-600'
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

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-paper-100 dark:hover:bg-ink-800 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}