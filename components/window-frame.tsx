'use client'

import { useState, useEffect } from 'react'
import type { ReactNode, ComponentType } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Globe, Home, Shield, Briefcase, User, Bot, X, ExternalLink, Github, Package, Sparkles } from 'lucide-react'
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
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'noon' | 'evening' | 'night'>('noon')
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Handle mouse move for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Determine time of day for lighting
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 10) setTimeOfDay('morning')
    else if (hour >= 10 && hour < 16) setTimeOfDay('noon')
    else if (hour >= 16 && hour < 20) setTimeOfDay('evening')
    else setTimeOfDay('night')
  }, [])

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

  // Get sunlight color and intensity based on time
  const getSunlightEffect = () => {
    const effects = {
      morning: { color: 'rgba(255, 200, 100, 0.15)', intensity: 0.7, angle: '135deg' },
      noon: { color: 'rgba(255, 230, 150, 0.12)', intensity: 1, angle: '120deg' },
      evening: { color: 'rgba(255, 150, 50, 0.18)', intensity: 0.6, angle: '45deg' },
      night: { color: 'rgba(150, 180, 255, 0.08)', intensity: 0.3, angle: '315deg' }
    }
    return effects[timeOfDay]
  }

  const sunlight = getSunlightEffect()

  return (
    <>
      <div className="relative w-full max-w-full sm:max-w-5xl mx-0 sm:mx-auto px-0 sm:px-4">
        {/* Main Window Frame with enhanced effects */}
        <div className="relative">
          {/* Ambient glow behind frame */}
          <div className="absolute inset-0 blur-3xl opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-frame-green/20 via-transparent to-frame-green/10" />
          </div>

          <div className="relative rounded-[32px] bg-gradient-to-br from-frame-green/30 via-frame-green/15 to-frame-green/10 dark:from-frame-green/25 dark:via-frame-green/12 dark:to-frame-green/8 p-[6px] sm:p-[8px] shadow-[0_40px_100px_-30px_rgba(34,139,34,0.4)] dark:shadow-[0_40px_100px_-30px_rgba(34,139,34,0.3)]">
            <div className="relative rounded-[26px] bg-gradient-to-br from-white/95 via-paper-50/90 to-paper-100/95 dark:from-ink-900/95 dark:via-ink-950/90 dark:to-black/95 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.15)] overflow-hidden backdrop-blur-xl">

              {/* Enhanced wood frame with gradient */}
              <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-7 sm:w-8 bg-gradient-to-r from-amber-900/15 via-amber-800/10 to-transparent dark:from-amber-900/20 dark:via-amber-800/15 dark:to-transparent">
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-amber-200/20 via-amber-200/10 to-amber-200/20" />
              </div>

              {/* Sunlight overlay effect */}
              <div
                className="pointer-events-none absolute inset-0 z-[5] opacity-60"
                style={{
                  background: `linear-gradient(${sunlight.angle}, ${sunlight.color} 0%, transparent 60%)`,
                  opacity: sunlight.intensity
                }}
              />

              {/* Window pane dividers with shadows */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* Vertical dividers */}
                <div className="absolute top-0 bottom-0 left-1/3 w-[2px] bg-gradient-to-b from-black/20 via-black/30 to-black/20 dark:from-black/30 dark:via-black/40 dark:to-black/30">
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-200/20 via-amber-200/10 to-amber-200/20" />
                </div>
                <div className="absolute top-0 bottom-0 left-1/3 w-[20px] -translate-x-1/2 bg-gradient-to-r from-transparent via-black/5 to-transparent blur-sm" />

                <div className="absolute top-0 bottom-0 left-2/3 w-[2px] bg-gradient-to-b from-black/20 via-black/30 to-black/20 dark:from-black/30 dark:via-black/40 dark:to-black/30">
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-200/20 via-amber-200/10 to-amber-200/20" />
                </div>
                <div className="absolute top-0 bottom-0 left-2/3 w-[20px] -translate-x-1/2 bg-gradient-to-r from-transparent via-black/5 to-transparent blur-sm" />

                {/* Horizontal divider */}
                <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-black/20 via-black/30 to-black/20 dark:from-black/30 dark:via-black/40 dark:to-black/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-amber-200/10 to-amber-200/20" />
                </div>
                <div className="absolute left-0 right-0 top-1/2 h-[20px] -translate-y-1/2 bg-gradient-to-b from-transparent via-black/5 to-transparent blur-sm" />
              </div>

              <div className="relative z-10 pl-7 sm:pl-10 pr-2 sm:pr-3 py-3 sm:py-4 grid grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2">
                {Object.entries(osData).map(([os, data], idx) => {
                  const isAgentOS = os === 'AgentOS'
                  const isHovered = hoveredPane === os

                  // Calculate pane-specific sunlight refraction
                  const row = Math.floor(idx / 3)
                  const col = idx % 3
                  const refractionIntensity = 1 - (row * 0.3 + col * 0.2)

                  return (
                    <motion.button
                      type="button"
                      key={os}
                      className="group relative aspect-[3/4] min-h-[320px] sm:min-h-[280px] flex flex-col items-center p-4 sm:p-6 transition-all duration-500 focus:outline-none cursor-pointer rounded-[20px] overflow-hidden"
                      onClick={() => setSelectedOS(os as OSName)}
                      onMouseEnter={() => setHoveredPane(os as OSName)}
                      onMouseLeave={() => setHoveredPane(null)}
                      whileHover={{ scale: 1.02, z: 50 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                      }}
                    >
                      {/* Glass pane background */}
                      <motion.div
                        className="absolute inset-0 rounded-[20px]"
                        initial={false}
                        animate={{
                          background: isHovered
                            ? 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 50%, rgba(240,245,250,0.98) 100%)'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.88) 50%, rgba(240,245,250,0.92) 100%)'
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          boxShadow: isHovered
                            ? '0 20px 40px -10px rgba(0,0,0,0.2), inset 0 2px 10px rgba(255,255,255,0.8)'
                            : '0 10px 30px -15px rgba(0,0,0,0.15), inset 0 1px 4px rgba(255,255,255,0.5)'
                        }}
                      />

                      {/* Dark mode glass background */}
                      <div className="absolute inset-0 rounded-[20px] dark:block hidden"
                        style={{
                          background: isHovered
                            ? 'linear-gradient(135deg, rgba(10,12,16,0.95) 0%, rgba(15,17,21,0.92) 50%, rgba(8,10,14,0.95) 100%)'
                            : 'linear-gradient(135deg, rgba(10,12,16,0.88) 0%, rgba(15,17,21,0.85) 50%, rgba(8,10,14,0.88) 100%)',
                          boxShadow: isHovered
                            ? '0 20px 40px -10px rgba(0,0,0,0.5), inset 0 2px 10px rgba(255,255,255,0.1)'
                            : '0 10px 30px -15px rgba(0,0,0,0.3), inset 0 1px 4px rgba(255,255,255,0.05)'
                        }}
                      />

                      {/* Shimmer effect on hover */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute inset-0 rounded-[20px] pointer-events-none z-20"
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: '100%', opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/10 skew-x-12" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Sunlight refraction per pane */}
                      <div
                        className="absolute inset-0 rounded-[20px] pointer-events-none z-[3]"
                        style={{
                          background: `radial-gradient(circle at 20% 20%, ${sunlight.color} 0%, transparent 50%)`,
                          opacity: sunlight.intensity * refractionIntensity * 0.5
                        }}
                      />

                      {/* Sparkle effects for live OS */}
                      {data.status === 'Live' && (
                        <div className="absolute top-3 right-3 z-30">
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 180, 360]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            <Sparkles className="w-4 h-4 text-frame-green opacity-60" />
                          </motion.div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        {isAgentOS ? (
                          <motion.div
                            className="mb-4 flex flex-col items-center"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Image src="/agentos-icon.svg" alt="AgentOS" width={48} height={48} className="object-contain mb-2 drop-shadow-lg" />
                            <h3 className="text-lg sm:text-xl font-bold text-ink-900 dark:text-paper-50 tracking-tight">
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
                          </motion.div>
                        ) : data.placeholder ? (
                          <motion.div
                            className="mb-4 flex flex-col items-center"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="mb-2 text-ink-400 dark:text-ink-600 opacity-60">
                              {data.customSvg}
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-ink-900 dark:text-paper-100 opacity-80">
                              {data.title}
                            </h3>
                          </motion.div>
                        ) : (
                          <motion.div
                            className="mb-4 flex flex-col items-center"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <data.icon className="w-12 h-12 sm:w-14 sm:h-14 text-frame-green mb-2 drop-shadow-[0_4px_12px_rgba(34,139,34,0.4)]" />
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-ink-900 dark:text-paper-100">
                              {data.title}
                            </h3>
                          </motion.div>
                        )}

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-ink-700 dark:text-paper-300 text-center px-2 mb-4 leading-relaxed">
                          {data.description}
                        </p>

                        {/* Status badge */}
                        <motion.div
                          className="mt-auto"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                            data.status === 'Live'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 shadow-[0_0_20px_rgba(34,139,34,0.3)]'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                          } backdrop-blur-sm`}>
                            <span className={`${data.status === 'Live' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'} h-2 w-2 rounded-full`} />
                            {data.status}
                          </span>
                        </motion.div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Modal with paper-like feel */}
      <AnimatePresence>
        {selectedOS && osData[selectedOS] && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md z-40"
              onClick={() => setSelectedOS(null)}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                className="pointer-events-auto w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-gradient-to-br from-paper-50 via-white to-paper-100 dark:from-ink-900 dark:via-ink-950 dark:to-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col"
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {/* Header with gradient */}
                <div className="relative px-6 pt-6 pb-4 border-b border-ink-200/10 dark:border-paper-200/10">
                  <div className="absolute inset-0 bg-gradient-to-r from-frame-green/5 via-transparent to-frame-green/5" />
                  <div className="relative flex items-start justify-between">
                    <div>
                      {selectedOS === 'AgentOS' ? (
                        <div className="flex items-center gap-3">
                          <Image src="/agentos-icon.svg" alt="AgentOS" width={36} height={36} className="object-contain drop-shadow-md" />
                          <span className="text-3xl font-bold text-ink-900 dark:text-paper-50">
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
                        <h2 className="text-3xl font-bold text-ink-900 dark:text-paper-50">{osData[selectedOS].title}</h2>
                      )}
                      <p className="mt-2 text-base text-ink-600 dark:text-paper-400 leading-relaxed">
                        {osData[selectedOS].description}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setSelectedOS(null)}
                      className="p-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                      aria-label="Close"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5 text-ink-600 dark:text-paper-400" />
                    </motion.button>
                  </div>
                </div>

                {/* Content with paper texture */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                  {osData[selectedOS].longDescription && (
                    <motion.p
                      className="text-base leading-relaxed text-ink-700 dark:text-paper-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {osData[selectedOS].longDescription}
                    </motion.p>
                  )}

                  {osData[selectedOS].features && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xl font-bold mb-4 text-ink-900 dark:text-paper-50">Key Features</h3>
                      <ul className="space-y-3">
                        {osData[selectedOS].features!.map((feature, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            <span className="text-frame-green mt-0.5">✦</span>
                            <span className="text-sm leading-relaxed text-ink-700 dark:text-paper-300">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {osData[selectedOS].links && (
                    <motion.div
                      className="flex gap-3 pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {osData[selectedOS].links!.github && (
                        <motion.a
                          href={osData[selectedOS].links!.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ink-900 text-white hover:bg-ink-800 transition-colors shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </motion.a>
                      )}
                      {osData[selectedOS].links!.website && (
                        <motion.a
                          href={osData[selectedOS].links!.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-frame-green text-white hover:bg-frame-green/90 transition-colors shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Visit Website
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                      {osData[selectedOS].links!.npm && (
                        <motion.a
                          href={osData[selectedOS].links!.npm}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-paper-100 dark:bg-ink-800 text-ink-900 dark:text-paper-50 hover:bg-paper-200 dark:hover:bg-ink-700 transition-colors shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Package className="w-4 h-4" />
                          NPM
                        </motion.a>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}