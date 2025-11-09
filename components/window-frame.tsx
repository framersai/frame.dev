'use client'

import { useState } from 'react'
import type { ReactNode, ComponentType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Home, Shield, Briefcase, User, Bot, X, ExternalLink, Github, Package, ChevronRight } from 'lucide-react'
import Image from 'next/image'

type OSIcon = ComponentType<{ className?: string }>

type OSDefinition = {
  title: string
  icon: OSIcon
  description: string
  status: string
  statusColor: string
  placeholder?: boolean
  customSvg?: ReactNode
  logo?: string
  links?: {
    github?: string
    npm?: string
    website?: string
  }
}

const osData: Record<string, OSDefinition> = {
  WebOS: {
    title: 'WebOS',
    icon: Globe,
    description: 'The browser reimagined as an operating system',
    status: 'Coming Soon',
    statusColor: 'text-amber-600',
    placeholder: true,
    customSvg: (
      <svg className="w-12 h-12 opacity-30" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
        <circle cx="50" cy="30" r="15" fill="currentColor" opacity="0.2"/>
        <circle cx="35" cy="60" r="12" fill="currentColor" opacity="0.2"/>
        <circle cx="65" cy="60" r="12" fill="currentColor" opacity="0.2"/>
      </svg>
    )
  },
  HomeOS: {
    title: 'HomeOS',
    icon: Home,
    description: 'Smart home orchestration platform',
    status: 'Coming Soon',
    statusColor: 'text-amber-600',
    placeholder: true,
    customSvg: (
      <svg className="w-12 h-12 opacity-30" viewBox="0 0 100 100">
        <rect x="30" y="40" width="40" height="35" fill="currentColor" opacity="0.2"/>
        <polygon points="50,25 75,40 25,40" fill="currentColor" opacity="0.3"/>
        <rect x="42" y="55" width="16" height="20" fill="currentColor" opacity="0.3"/>
      </svg>
    )
  },
  AgentOS: {
    title: 'AgentOS',
    icon: Bot,
    description: 'Production-ready runtime for AI agents',
    status: 'Live',
    statusColor: 'text-green-600',
    logo: '/agentos-logo.png',
    links: {
      github: 'https://github.com/framersai/agentos',
      npm: 'https://npmjs.com/package/@framers/agentos',
      website: 'https://agentos.sh'
    }
  },
  SafeOS: {
    title: 'SafeOS',
    icon: Shield,
    description: 'Security-first operating system',
    status: 'Coming Soon',
    statusColor: 'text-amber-600',
    placeholder: true,
    customSvg: (
      <svg className="w-12 h-12 opacity-30" viewBox="0 0 100 100">
        <path d="M50 20 L70 30 L70 60 L50 75 L30 60 L30 30 Z" fill="currentColor" opacity="0.2"/>
        <circle cx="50" cy="45" r="8" fill="currentColor" opacity="0.3"/>
      </svg>
    )
  },
  WorkOS: {
    title: 'WorkOS',
    icon: Briefcase,
    description: 'Enterprise productivity platform',
    status: 'Coming Soon',
    statusColor: 'text-amber-600',
    placeholder: true,
    customSvg: (
      <svg className="w-12 h-12 opacity-30" viewBox="0 0 100 100">
        <rect x="25" y="35" width="50" height="35" rx="3" fill="currentColor" opacity="0.2"/>
        <rect x="40" y="30" width="20" height="10" rx="2" fill="currentColor" opacity="0.3"/>
        <line x1="50" y1="45" x2="50" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      </svg>
    )
  },
  MyOS: {
    title: 'MyOS',
    icon: User,
    description: 'Personal AI companion',
    status: 'Coming Soon',
    statusColor: 'text-blue-600',
    placeholder: true,
    customSvg: (
      <svg className="w-12 h-12 opacity-30" viewBox="0 0 100 100">
        <circle cx="50" cy="35" r="12" fill="currentColor" opacity="0.3"/>
        <path d="M35 55 Q50 45 65 55 L65 70 Q50 75 35 70 Z" fill="currentColor" opacity="0.2"/>
      </svg>
    )
  }
}

type OSName = keyof typeof osData

export default function WindowFrame() {
  const [selectedOS, setSelectedOS] = useState<OSName | null>(null)
  const [hoveredPane, setHoveredPane] = useState<OSName | null>(null)

  const handlePaneClick = (os: OSName) => {
    if (!osData[os].placeholder || os === 'AgentOS') {
      setSelectedOS(os)
    }
  }

  return (
    <>
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Main Window Frame - Exact match to logo with refined elegant design */}
        <div className="relative group">
          <div 
            className="relative bg-gradient-to-br from-paper-50 to-paper-100 dark:from-ink-900 dark:to-ink-950 rounded-2xl overflow-hidden"
            style={{
              boxShadow: `
                0 0 0 3px #00C896,
                0 10px 40px -10px rgba(0, 200, 150, 0.3),
                0 20px 60px -20px rgba(0, 0, 0, 0.2)
              `
            }}
          >
            {/* Window panes grid - 3x2 like the logo */}
            <div className="grid grid-cols-3 grid-rows-2">
              {Object.entries(osData).map(([os, data], i) => {
                const isAgentOS = os === 'AgentOS'
                const isHovered = hoveredPane === os
                
                return (
                  <motion.div
                    key={os}
                    className={`
                      relative aspect-[4/3] border-2 border-frame-green
                      ${i % 3 !== 2 ? 'border-r-0' : ''}
                      ${i < 3 ? 'border-b-0' : ''}
                      ${data.placeholder && os !== 'AgentOS' ? 'cursor-not-allowed' : 'cursor-pointer'}
                      bg-gradient-to-br from-white/50 to-white/30 dark:from-ink-800/50 dark:to-ink-900/50
                      hover:from-frame-green/5 hover:to-frame-green/10
                      transition-all duration-300
                    `}
                    onClick={() => handlePaneClick(os as OSName)}
                    onMouseEnter={() => setHoveredPane(os as OSName)}
                    onMouseLeave={() => setHoveredPane(null)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="h-full flex flex-col items-center justify-center p-6 relative">
                      {/* Logo or placeholder SVG */}
                      {isAgentOS ? (
                        <div className="mb-3">
                          <Image 
                            src="/agentos-logo.png" 
                            alt="AgentOS" 
                            width={120} 
                            height={40}
                            className="object-contain"
                          />
                        </div>
                      ) : data.placeholder ? (
                        <div className="mb-3 text-ink-400 dark:text-ink-600">
                          {data.customSvg}
                        </div>
                      ) : (
                        <data.icon className="w-12 h-12 text-frame-green mb-3" />
                      )}
                      
                      {/* Title and status */}
                      {!isAgentOS && (
                        <h3 className="text-lg font-bold text-ink-800 dark:text-paper-200 mb-1">
                          {data.title}
                        </h3>
                      )}
                      <p className={`text-xs ${data.statusColor} font-medium`}>
                        {data.status}
                      </p>
                      
                      {/* Live indicator */}
                      {data.status === 'Live' && (
                        <div className="absolute top-4 right-4">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        </div>
                      )}
                      
                      {/* Hover overlay with description */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4"
                          >
                            <p className="text-white text-sm">
                              {data.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for AgentOS details */}
      <AnimatePresence>
        {selectedOS === 'AgentOS' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedOS(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[80vh] paper-card-lifted z-50 overflow-hidden"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <Image 
                      src="/agentos-logo.png" 
                      alt="AgentOS" 
                      width={200} 
                      height={60}
                      className="object-contain mb-3"
                    />
                    <p className="text-lg text-ink-600 dark:text-paper-400">
                      Production-ready runtime for AI agents
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedOS(null)}
                    className="p-2 rounded-lg hover:bg-paper-100 dark:hover:bg-ink-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Overview</h3>
                    <p className="text-base body-text">
                      AgentOS provides a complete runtime environment for deploying, managing, and orchestrating AI agents 
                      at scale. Built with TypeScript for maximum developer productivity and featuring support for all major 
                      AI providers including OpenAI, Anthropic, and Google.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-frame-green mt-1">•</span>
                        <span>Multi-provider support with unified API</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-frame-green mt-1">•</span>
                        <span>Rich ecosystem of extensions and guardrails</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-frame-green mt-1">•</span>
                        <span>Built-in observability and monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-frame-green mt-1">•</span>
                        <span>Apache 2.0 licensed</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <a 
                      href="https://github.com/framersai/agentos" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </a>
                    <a 
                      href="https://agentos.sh" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://npmjs.com/package/@framers/agentos" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-ghost flex items-center gap-2"
                    >
                      <Package className="w-4 h-4" />
                      NPM
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}