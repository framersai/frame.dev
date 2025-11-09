'use client'

import { useState, useEffect } from 'react'
import type { ReactNode, ComponentType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Home, Shield, Briefcase, User, Bot, X, ExternalLink, Github, Package } from 'lucide-react'
import Image from 'next/image'

type OSIcon = ComponentType<{ className?: string }>

type OSDefinition = {
  title: string
  icon: OSIcon
  description: string
  longDescription?: string
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
  features?: string[]
}

const osData: Record<string, OSDefinition> = {
  WebOS: {
    title: 'WebOS',
    icon: Globe,
    description: 'The browser reimagined as an operating system',
    longDescription: 'WebOS transforms the browser into a fully-fledged operating system, enabling web applications to run with native-like performance and capabilities.',
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
    ),
    features: ['Virtual File System', 'Process Management', 'WebAssembly Runtime', 'PWA Integration']
  },
  HomeOS: {
    title: 'HomeOS',
    icon: Home,
    description: 'Smart home orchestration platform',
    longDescription: 'HomeOS unifies all your smart home devices under a single, intelligent operating system with natural language control and automated workflows.',
    status: 'Coming Soon',
    statusColor: 'text-amber-600',
    placeholder: true,
    customSvg: (
      <svg className="w-12 h-12 opacity-30" viewBox="0 0 100 100">
        <rect x="30" y="40" width="40" height="35" fill="currentColor" opacity="0.2"/>
        <polygon points="50,25 75,40 25,40" fill="currentColor" opacity="0.3"/>
        <rect x="42" y="55" width="16" height="20" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
    features: ['Matter Protocol Support', 'Voice Control', 'Energy Management', 'Security Integration']
  },
  AgentOS: {
    title: 'AgentOS',
    icon: Bot,
    description: 'Production-ready runtime for AI agents',
    longDescription: 'AgentOS provides a complete runtime environment for deploying, managing, and orchestrating AI agents at scale. Built with TypeScript for maximum developer productivity.',
    status: 'Live',
    statusColor: 'text-green-600',
    logo: '/agentos-logo.png',
    links: {
      github: 'https://github.com/framersai/agentos',
      npm: 'https://npmjs.com/package/@framers/agentos',
      website: 'https://agentos.sh'
    },
    features: ['Multi-Provider Support', 'Extension System', 'Guardrails', 'Observability']
  },
  SafeOS: {
    title: 'SafeOS',
    icon: Shield,
    description: 'Security-first operating system',
    longDescription: 'SafeOS is designed from the ground up with security as the primary concern. Perfect for financial institutions, healthcare systems, and government infrastructure.',
    status: 'Coming Soon',
    statusColor: 'text-amber-600',
    placeholder: true,
    customSvg: (
      <svg className="w-12 h-12 opacity-30" viewBox="0 0 100 100">
        <path d="M50 20 L70 30 L70 60 L50 75 L30 60 L30 30 Z" fill="currentColor" opacity="0.2"/>
        <circle cx="50" cy="45" r="8" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
    features: ['Secure Boot', 'Memory Encryption', 'Audit Logging', 'Compliance Ready']
  },
  WorkOS: {
    title: 'WorkOS',
    icon: Briefcase,
    description: 'Enterprise productivity platform',
    longDescription: 'WorkOS reimagines enterprise productivity with AI-native workflows, seamless collaboration, and intelligent automation of repetitive tasks.',
    status: 'Coming Soon',
    statusColor: 'text-amber-600',
    placeholder: true,
    customSvg: (
      <svg className="w-12 h-12 opacity-30" viewBox="0 0 100 100">
        <rect x="25" y="35" width="50" height="35" rx="3" fill="currentColor" opacity="0.2"/>
        <rect x="40" y="30" width="20" height="10" rx="2" fill="currentColor" opacity="0.3"/>
        <line x1="50" y1="45" x2="50" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      </svg>
    ),
    features: ['Smart Documents', 'Team Spaces', 'Process Automation', 'Analytics Dashboard']
  },
  MyOS: {
    title: 'MyOS',
    icon: User,
    description: 'Personal AI companion',
    longDescription: 'MyOS is your personal operating system that learns, adapts, and grows with you. Managing everything from health and finances to learning and creativity.',
    status: 'Coming Soon',
    statusColor: 'text-blue-600',
    placeholder: true,
    customSvg: (
      <svg className="w-12 h-12 opacity-30" viewBox="0 0 100 100">
        <circle cx="50" cy="35" r="12" fill="currentColor" opacity="0.3"/>
        <path d="M35 55 Q50 45 65 55 L65 70 Q50 75 35 70 Z" fill="currentColor" opacity="0.2"/>
      </svg>
    ),
    features: ['Health Tracking', 'Financial Assistant', 'Learning Companion', 'Memory Palace']
  }
}

type OSName = keyof typeof osData

export default function WindowFrame() {
  const [selectedOS, setSelectedOS] = useState<OSName | null>(null)
  const [hoveredPane, setHoveredPane] = useState<OSName | null>(null)

  // ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedOS) {
        setSelectedOS(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedOS])

  return (
    <>
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Main Window Frame */}
        <div className="relative group">
          <div className="absolute inset-0 blur-3xl bg-frame-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative rounded-[28px] bg-gradient-to-br from-frame-green/25 via-white to-frame-green/10 dark:from-frame-green/20 dark:via-ink-900 dark:to-ink-950 p-[6px] shadow-[0_30px_80px_-40px_rgba(0,200,150,0.6)]">
            <div className="relative rounded-[22px] bg-gradient-to-br from-white to-paper-100 dark:from-ink-900 dark:to-ink-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.2)] overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-[1px] rounded-[21px] border border-white/60 dark:border-frame-green/25" />
                <div className="absolute top-0 bottom-0 left-1/3 w-[2px] bg-gradient-to-b from-frame-green/20 via-frame-green/40 to-frame-green/20" />
                <div className="absolute top-0 bottom-0 left-2/3 w-[2px] bg-gradient-to-b from-frame-green/20 via-frame-green/40 to-frame-green/20" />
                <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-frame-green/20 via-frame-green/40 to-frame-green/20" />
              </div>

              <div className="grid grid-cols-3 grid-rows-2 relative">
                {Object.entries(osData).map(([os, data]) => {
                  const isAgentOS = os === 'AgentOS'
                  const isHovered = hoveredPane === os

                  return (
                    <motion.button
                      type="button"
                      key={os}
                      className="relative aspect-[4/3] flex flex-col items-center justify-center p-6 transition-all duration-300 bg-gradient-to-br from-white/60 to-white/20 dark:from-ink-900/60 dark:to-ink-800/20 hover:from-frame-green/15 hover:to-frame-green/10 focus:outline-none focus:ring-2 focus:ring-frame-green/60 cursor-pointer"
                      onClick={() => setSelectedOS(os as OSName)}
                      onMouseEnter={() => setHoveredPane(os as OSName)}
                      onMouseLeave={() => setHoveredPane(null)}
                      whileHover={{ scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    >
                      {isAgentOS ? (
                        <div className="mb-3">
                          <Image src="/agentos-logo.png" alt="AgentOS" width={140} height={42} className="object-contain drop-shadow-lg" />
                        </div>
                      ) : data.placeholder ? (
                        <div className="mb-3 text-ink-400 dark:text-ink-600">
                          {data.customSvg}
                        </div>
                      ) : (
                        <data.icon className="w-12 h-12 text-frame-green mb-3" />
                      )}

                      {!isAgentOS && (
                        <h3 className="text-lg font-semibold text-ink-800 dark:text-paper-100 mb-1 tracking-tight">
                          {data.title}
                        </h3>
                      )}
                      <p className={`text-xs ${data.statusColor} font-medium uppercase tracking-wide`}>
                        {data.status}
                      </p>

                      {data.status === 'Live' && (
                        <div className="absolute top-4 right-4">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        </div>
                      )}

                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4"
                          >
                            <p className="text-white text-sm">{data.description}</p>
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

      {/* Universal Modal */}
      <AnimatePresence>
        {selectedOS && osData[selectedOS] && (
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
              className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[80vh] paper-card-lifted z-50 overflow-auto"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    {osData[selectedOS].logo ? (
                      <Image 
                        src={osData[selectedOS].logo!} 
                        alt={osData[selectedOS].title} 
                        width={200} 
                        height={60}
                        className="object-contain mb-3"
                      />
                    ) : (
                      <h2 className="text-3xl font-bold mb-2 heading-display">{osData[selectedOS].title}</h2>
                    )}
                    <p className="text-lg text-ink-600 dark:text-paper-400">
                      {osData[selectedOS].description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedOS(null)}
                    className="p-2 rounded-lg hover:bg-paper-100 dark:hover:bg-ink-800 transition-colors"
                    aria-label="Close (ESC)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {osData[selectedOS].longDescription && (
                    <p className="text-base body-text">{osData[selectedOS].longDescription}</p>
                  )}

                  {osData[selectedOS].features && (
                    <div>
                      <h3 className="text-xl font-bold mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {osData[selectedOS].features!.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-frame-green mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {osData[selectedOS].links && (
                    <div className="flex gap-3 pt-4">
                      {osData[selectedOS].links!.github && (
                        <a href={osData[selectedOS].links!.github} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {osData[selectedOS].links!.website && (
                        <a href={osData[selectedOS].links!.website} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                          Visit Website
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {osData[selectedOS].links!.npm && (
                        <a href={osData[selectedOS].links!.npm} target="_blank" rel="noopener noreferrer" className="btn-ghost flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          NPM
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}