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
        {/* Main Window Frame - refined to match branding */}
        <div className="relative group">
          {/* Outer glow */}
          <div className="absolute inset-0 blur-3xl bg-frame-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Outer frame */}
          <div className="relative rounded-[28px] bg-gradient-to-br from-frame-green/25 via-white to-frame-green/10 dark:from-frame-green/20 dark:via-ink-900 dark:to-ink-950 p-[6px] shadow-[0_30px_80px_-40px_rgba(0,200,150,0.6)]">
            <div className="relative rounded-[22px] bg-gradient-to-br from-white to-paper-100 dark:from-ink-900 dark:to-ink-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.2)] overflow-hidden">
              {/* Inner border highlight & dividers */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-[1px] rounded-[21px] border border-white/60 dark:border-frame-green/25" />
                <div className="absolute top-0 bottom-0 left-1/3 w-[2px] bg-gradient-to-b from-frame-green/20 via-frame-green/40 to-frame-green/20 dark:from-frame-green/10 dark:via-frame-green/30 dark:to-frame-green/10" />
                <div className="absolute top-0 bottom-0 left-2/3 w-[2px] bg-gradient-to-b from-frame-green/20 via-frame-green/40 to-frame-green/20 dark:from-frame-green/10 dark:via-frame-green/30 dark:to-frame-green/10" />
                <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-frame-green/20 via-frame-green/40 to-frame-green/20 dark:from-frame-green/10 dark:via-frame-green/30 dark:to-frame-green/10" />
              </div>

              {/* Window panes */}
              <div className="grid grid-cols-3 grid-rows-2 relative">
                {Object.entries(osData).map(([os, data]) => {
                  const isAgentOS = os === 'AgentOS'
                  const isHovered = hoveredPane === os

                  return (
                    <motion.button
                      type="button"
                      key={os}
                      className={`
                        relative aspect-[4/3] flex flex-col items-center justify-center p-6 transition-all duration-300
                        ${data.placeholder && os !== 'AgentOS' ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                        bg-gradient-to-br from-white/60 to-white/20 dark:from-ink-900/60 dark:to-ink-800/20
                        hover:from-frame-green/15 hover:to-frame-green/10 focus:outline-none focus:ring-2 focus:ring-frame-green/60
                      `}
                      onClick={() => handlePaneClick(os as OSName)}
                      onMouseEnter={() => setHoveredPane(os as OSName)}
                      onMouseLeave={() => setHoveredPane(null)}
                      whileHover={{ scale: data.placeholder && os !== 'AgentOS' ? 1 : 1.015 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      disabled={data.placeholder && os !== 'AgentOS'}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Logo or placeholder */}
                      {isAgentOS ? (
                        <div className="mb-3">
                          <Image
                            src="/agentos-logo.png"
                            alt="AgentOS"
                            width={140}
                            height={42}
                            className="object-contain drop-shadow-lg"
                          />
                        </div>
                      ) : data.placeholder ? (
                        <div className="mb-3 text-ink-400 dark:text-ink-600">
                          {data.customSvg}
                        </div>
                      ) : (
                        <data.icon className="w-12 h-12 text-frame-green mb-3" />
                      )}

                      {/* Title & status */}
                      {!isAgentOS && (
                        <h3 className="text-lg font-semibold text-ink-800 dark:text-paper-100 mb-1 tracking-tight">
                          {data.title}
                        </h3>
                      )}
                      <p className={`text-xs ${data.statusColor} font-medium uppercase tracking-wide`}>
                        {data.status}
                      </p>

                      {/* Live indicator */}
                      {data.status === 'Live' && (
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                          <span className="text-xs text-green-500 font-medium">Live</span>
                        </div>
                      )}

                      {/* Hover description */}
                      <AnimatePresence>
                        {isHovered && !data.placeholder && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-1 rounded-lg bg-gradient-to-t from-frame-green/90 via-frame-green/50 to-transparent backdrop-blur-sm flex items-end p-4"
                          >
                            <p className="text-sm text-white leading-snug">
                              {data.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )
                })}
              </div>
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