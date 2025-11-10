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
    description: 'Adaptive AI agency runtime & orchestration layer',
    longDescription: 'AgentOS is the adaptive intelligence runtime that powers Framers agencies. It fuses policy-aware agent coordination, multi-provider cognition, and telemetry-backed governance into one deployable TypeScript stack. Designed for long-lived automation, it balances autonomous execution with human-in-the-loop checkpoints, live session streaming, and fine-grained safety guardrails.',
    status: 'Live',
    statusColor: 'text-green-600',
    logo: '/agentos-logo.png',
    links: {
      github: 'https://github.com/framersai/agentos',
      npm: 'https://npmjs.com/package/@framers/agentos',
      website: 'https://agentos.sh'
    },
    features: [
      'Adaptive multi-agent graph with programmable agencies & roles',
      'Real-time session bus, artifact registry, and audit timeline',
      'Provider abstraction for OpenAI, Anthropic, Google, local LLMs',
      'Guardrail framework with extension packs for PII, policy, and risk',
      'Observability hooks: live streams, structured logs, metric adapters'
    ]
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
              {/* Wood-like left frame accent (subtle) */}
              <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-5 sm:w-6 bg-gradient-to-b from-ink-900/8 via-ink-900/6 to-ink-900/4 dark:from-black/14 dark:via-black/12 dark:to-black/8 shadow-[inset_-6px_0_14px_rgba(0,0,0,0.25)]" />
              {/* Inner edge highlight to separate frame and panes */}
              <div className="pointer-events-none absolute left-5 sm:left-6 top-0 z-20 h-full w-px bg-white/30 dark:bg-white/15" />
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-[1px] rounded-[21px] border border-white/60 dark:border-frame-green/25" />
                {/* Shadow dividers for realistic depth (softer, with warm accent on dark) */}
                <div className="absolute top-0 bottom-0 left-1/3 w-[12px] -translate-x-1/2 bg-gradient-to-b from-black/0 via-black/12 to-black/0 dark:from-black/0 dark:via-black/16 dark:to-black/0 blur-[3px]" />
                <div className="absolute top-0 bottom-0 left-1/3 w-px -translate-x-1/2 bg-gradient-to-b from-amber-200/0 via-amber-200/8 to-amber-200/0 opacity-20" />
                <div className="absolute top-0 bottom-0 left-2/3 w-[12px] -translate-x-1/2 bg-gradient-to-b from-black/0 via-black/12 to-black/0 dark:from-black/0 dark:via-black/16 dark:to-black/0 blur-[3px]" />
                <div className="absolute top-0 bottom-0 left-2/3 w-px -translate-x-1/2 bg-gradient-to-b from-amber-200/0 via-amber-200/8 to-amber-200/0 opacity-20" />
                <div className="absolute left-0 right-0 top-1/2 h-[12px] -translate-y-1/2 bg-gradient-to-r from-black/0 via-black/10 to-black/0 dark:from-black/0 dark:via-black/14 dark:to-black/0 blur-[3px]" />
                <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-amber-200/0 via-amber-200/8 to-amber-200/0 opacity-20" />
                {/* Ambient right-side soft glow to balance dark frame */}
                <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white/5 to-transparent dark:from-white/4" />
              </div>

              {/* Global light field overlay (doesn't touch frame) */}
              <div className="pointer-events-none absolute inset-2 sm:inset-3 z-[2] rounded-[18px]">
                <div className="dark:hidden absolute inset-0" style={{ backgroundImage: 'radial-gradient(80% 80% at 85% 10%, rgba(253,230,138,0.12) 0%, rgba(253,230,138,0.04) 50%, rgba(255,255,255,0) 100%), linear-gradient(315deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)' }} />
                <div className="hidden dark:block absolute inset-0" style={{ backgroundImage: 'radial-gradient(80% 80% at 85% 10%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0) 100%), linear-gradient(315deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)' }} />
              </div>

              <div className="relative z-10 pl-7 sm:pl-9 grid grid-cols-2 grid-rows-3 gap-3 md:grid-cols-3 md:grid-rows-2">
                {Object.entries(osData).map(([os, data], idx) => {
                  const isAgentOS = os === 'AgentOS'
                  const isHovered = hoveredPane === os
                  // Per-pane accent classes (light and dark)
                  const paneAccentViaLight = ['via-sky-50/70','via-violet-50/70','via-amber-50/65','via-rose-50/65','via-emerald-50/70','via-indigo-50/65']
                  const paneAccentViaDark = ['dark:via-emerald-900/22','dark:via-indigo-900/22','dark:via-amber-900/20','dark:via-rose-900/20','dark:via-teal-900/22','dark:via-sky-900/22']
                  const accentViaClassLight = paneAccentViaLight[idx % paneAccentViaLight.length]
                  const accentViaClassDark = paneAccentViaDark[idx % paneAccentViaDark.length]
                  // Refractive overlay tints
                  const overlayTintLight = ['rgba(56,189,248,0.18)','rgba(167,139,250,0.18)','rgba(251,191,36,0.16)','rgba(244,114,182,0.18)','rgba(52,211,153,0.18)','rgba(99,102,241,0.18)']
                  const overlayTintDark = ['rgba(255,255,255,0.10)','rgba(255,255,255,0.12)','rgba(255,255,255,0.11)','rgba(255,255,255,0.09)','rgba(255,255,255,0.10)','rgba(255,255,255,0.11)']
                  const lightOverlayImage = `radial-gradient(60% 60% at 20% 15%, ${overlayTintLight[idx % overlayTintLight.length]} 0%, rgba(255,255,255,0) 60%), linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 28%, rgba(255,255,255,0) 55%)`
                  const darkOverlayImage = `radial-gradient(60% 60% at 20% 15%, ${overlayTintDark[idx % overlayTintDark.length]} 0%, rgba(0,0,0,0) 60%), linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0) 55%)`
 
                  return (
                    <motion.button
                      type="button"
                      key={os}
                      className={`group relative aspect-[3/4] min-h-[320px] sm:min-h-[280px] flex flex-col items-center p-4 sm:p-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-frame-green/60 cursor-pointer rounded-[18px] ring-1 ring-black/5 dark:ring-white/8 hover:ring-amber-300/30 dark:hover:ring-amber-300/20 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_44px_-26px_rgba(0,0,0,0.85)] bg-transparent`}
                      onClick={() => setSelectedOS(os as OSName)}
                      onMouseEnter={() => setHoveredPane(os as OSName)}
                      onMouseLeave={() => setHoveredPane(null)}
                      whileHover={{ y: -6, rotateX: -2, boxShadow: '0 32px 72px -44px rgba(251,191,36,0.35)' }}
                      whileTap={{ y: -2, rotateX: -1 }}
                      style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
                      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    >
                      {/* Base angled pane gradient (light/dark), simulating global light from top-right */}
                      <div className="absolute inset-0 rounded-[18px] pointer-events-none opacity-100 dark:hidden" style={{ backgroundImage: `linear-gradient(315deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 28%, ${overlayTintLight[idx % overlayTintLight.length]} 65%, rgba(240,243,247,0.92) 100%)` }} />
                      <div className="absolute inset-0 rounded-[18px] pointer-events-none opacity-100 hidden dark:block" style={{ backgroundImage: `linear-gradient(315deg, rgba(23,25,29,0.98) 0%, rgba(18,20,24,0.96) 32%, ${overlayTintDark[idx % overlayTintDark.length]} 68%, rgba(10,12,14,0.98) 100%)` }} />
                      {/* Refractive highlight overlays */}
                      <div className="absolute inset-0 rounded-[18px] pointer-events-none mix-blend-screen opacity-80 dark:hidden transition-opacity duration-300" style={{ backgroundImage: lightOverlayImage }} />
                      <div className="absolute inset-0 rounded-[18px] pointer-events-none mix-blend-screen hidden dark:block opacity-70 transition-opacity duration-300" style={{ backgroundImage: darkOverlayImage }} />
                      {/* Hinge shadow on left edge when hovering (book-open feel) */}
                      <div className="absolute left-0 top-0 h-full w-3 rounded-l-[18px] opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-r from-black/25 via-black/10 to-transparent dark:from-black/55 dark:via-black/28" />
                      {/* Warm glow near top-left on hover */}
                      <div className="absolute -top-1 -left-1 h-16 w-24 rounded-full blur-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300" style={{ background: 'radial-gradient(60% 60% at 30% 30%, rgba(251,191,36,0.25), rgba(0,0,0,0))' }} />
                      {isAgentOS ? (
                        <div className="mb-3 flex flex-col items-center">
                          <Image src="/agentos-icon.svg" alt="AgentOS" width={40} height={40} className="object-contain mb-1" />
                          <h3 className="text-base sm:text-lg font-semibold text-ink-900 dark:text-paper-50 tracking-tight">
                            Agent
                            <span
                              className="ml-0.5"
                              style={{
                                background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                              }}
                            >
                              OS
                            </span>
                          </h3>
                        </div>
                      ) : data.placeholder ? (
                        <div className="mb-4 text-ink-400 dark:text-ink-600 opacity-80">
                          {data.customSvg}
                        </div>
                      ) : (
                        <div className="mb-3 flex flex-col items-center">
                          <data.icon className="w-10 h-10 sm:w-12 sm:h-12 text-frame-green mb-1 drop-shadow-[0_12px_18px_rgba(0,200,150,0.35)]" />
                          <h3 className="text-base sm:text-lg font-semibold text-ink-800 dark:text-paper-100 tracking-tight">
                            {data.title}
                          </h3>
                        </div>
                      )}
                      {/* Top-right status dot */}
                      {data.status === 'Live' ? (
                        <div className="absolute top-4 right-4"><div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" /></div>
                      ) : (
                        <div className="absolute top-4 right-4"><div className="w-3 h-3 bg-amber-400 rounded-full" /></div>
                      )}

                      {/* Flexible spacer pushes desc/status to bottom for consistency */}
                      <div className="flex-1" />

                      {/* Description/tagline moved near bottom, above status */}
                      <div className="w-full text-center px-2">
                        <p className="text-[11px] sm:text-[12px] text-ink-600 dark:text-paper-400 leading-snug">
                          {isAgentOS ? (
                            <span style={{ fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace' }}>Adaptive AI Orchestration</span>
                          ) : (
                            <span>{(data as any).descriptionShort ?? data.description}</span>
                          )}
                        </p>
                        <div className="mt-2 flex items-center justify-center">
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] sm:text-xs bg-ink-900/5 dark:bg-white/5">
                            <span className={`${data.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-400'} h-2 w-2 rounded-full`} />
                            <span className="text-ink-700 dark:text-paper-300">{data.status}</span>
                          </span>
                        </div>
                      </div>

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
            
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', duration: 0.3 }}
                className="pointer-events-auto w-screen h-screen sm:w-full sm:h-fit sm:max-w-2xl sm:max-h-[85vh] overflow-auto rounded-none sm:rounded-lg border border-ink-200/30 bg-paper-50/90 shadow-2xl shadow-black/30 dark:border-frame-green/20 dark:bg-ink-900/90 dark:shadow-black/60 backdrop-blur-md"
              >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    {selectedOS === 'AgentOS' ? (
                      <div className="flex items-center gap-2">
                        <Image src="/agentos-icon.svg" alt="AgentOS" width={28} height={28} className="object-contain" />
                        <span className="text-2xl font-semibold text-ink-900 dark:text-paper-50 leading-none">
                          Agent
                          <span
                            className="ml-0.5"
                            style={{
                              background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899)',
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                            }}
                          >
                            OS
                          </span>
                        </span>
                      </div>
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
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}