'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Github, Package, ExternalLink, ChevronRight, Globe, Shield, Home, Briefcase, Grid3X3 } from 'lucide-react'

interface Pane {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  features: string[]
  technical: string[]
  status: 'live' | 'coming-soon'
  url?: string
  github?: string
  npm?: string
  color: string
  gradient: string
}

const panes: Pane[] = [
  {
    id: 'webos',
    title: 'WebOS',
    subtitle: 'Universal web framework',
    description: 'The universal framework for interacting with web, Web3, and metaverses concurrently in parallel. Built for the next generation of internet experiences.',
    icon: <Globe className="w-6 h-6" />,
    features: [
      'Cross-platform compatibility across all devices',
      'Native Web3 and blockchain integration',
      'Metaverse-ready with VR/AR support',
      'Real-time synchronization engine'
    ],
    technical: [
      'WebAssembly runtime for performance',
      'Distributed state management',
      'P2P networking capabilities',
      'Zero-knowledge proof integration'
    ],
    status: 'coming-soon',
    color: '#4F46E5',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'homeos',
    title: 'HomeOS',
    subtitle: 'Smart home platform',
    description: 'Intelligent platform for smart home management and automation. Connect, control, and orchestrate your entire living space.',
    icon: <Home className="w-6 h-6" />,
    features: [
      'Universal device orchestration',
      'AI-powered energy optimization',
      'Advanced security monitoring',
      'Natural language voice control'
    ],
    technical: [
      'Matter/Thread protocol support',
      'Local-first architecture',
      'ML-based predictive automation',
      'End-to-end encryption'
    ],
    status: 'coming-soon',
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'agentos',
    title: 'AgentOS',
    subtitle: 'Adaptive agent platform',
    description: 'Our flagship OS, powered by Frame. The adaptive agent platform for building, deploying, and managing AI agents at scale.',
    icon: <Grid3X3 className="w-6 h-6" />,
    features: [
      'Multi-agent orchestration system',
      'Advanced NLP with GPT-4 integration',
      'Multi-modal AI capabilities',
      'Extensive plugin ecosystem',
      'Real-time adaptive learning'
    ],
    technical: [
      'Kubernetes-native deployment',
      'Vector database integration',
      'Streaming inference pipeline',
      'Distributed training support',
      'AutoML capabilities'
    ],
    status: 'live',
    url: 'https://agentos.sh',
    github: 'https://github.com/framersai/agentos',
    npm: 'https://npmjs.com/package/@framers/agentos',
    color: '#00C896',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'safeos',
    title: 'SafeOS',
    subtitle: 'Digital vault & identity',
    description: 'Your digital vault for storage, backup, firewall protection, and identity monitoring. Military-grade security for your digital life.',
    icon: <Shield className="w-6 h-6" />,
    features: [
      'Zero-knowledge encryption',
      'Decentralized identity management',
      'Automated secure backups',
      'Real-time threat detection'
    ],
    technical: [
      'Post-quantum cryptography',
      'Hardware security module support',
      'Distributed ledger backup',
      'Biometric authentication'
    ],
    status: 'coming-soon',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'workos',
    title: 'WorkOS',
    subtitle: 'Project & CRM platform',
    description: 'Comprehensive platform for work management, projects, and CRM. Transform how teams collaborate and deliver.',
    icon: <Briefcase className="w-6 h-6" />,
    features: [
      'AI-powered task automation',
      'Real-time team collaboration',
      'Intelligent client management',
      'Advanced analytics dashboard'
    ],
    technical: [
      'GraphQL API architecture',
      'Event-driven microservices',
      'Time-series data analytics',
      'Workflow automation engine'
    ],
    status: 'coming-soon',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'myos',
    title: 'MyOS',
    subtitle: 'Universal dashboard',
    description: 'The dashboard that manages all OSes—your personal command center for the entire Frame ecosystem.',
    icon: <Grid3X3 className="w-6 h-6" />,
    features: [
      'Unified control interface',
      'Cross-OS synchronization',
      'Personal analytics suite',
      'Custom workflow builder'
    ],
    technical: [
      'Federation protocol support',
      'Real-time data streaming',
      'Custom widget framework',
      'OAuth2/SAML integration'
    ],
    status: 'coming-soon',
    color: '#6B7280',
    gradient: 'from-gray-500 to-slate-600'
  }
]

export default function WindowFrame() {
  const [selectedPane, setSelectedPane] = useState<string | null>(null)
  const [hoveredPane, setHoveredPane] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'technical'>('overview')

  const selectedPaneData = panes.find(p => p.id === selectedPane)

  return (
    <>
      {/* Main Window Frame - Intricate Design */}
      <div className="relative w-full max-w-6xl mx-auto perspective-1000">
        <div className="relative bg-gradient-to-br from-paper-50 to-paper-100 dark:from-ink-900 dark:to-ink-950 rounded-2xl shadow-paper-lifted overflow-hidden">
          {/* Window Title Bar */}
          <div className="h-12 bg-gradient-to-r from-paper-200/50 to-paper-100/50 dark:from-ink-800/50 dark:to-ink-900/50 backdrop-blur-sm flex items-center px-4 border-b border-ink-200/10 dark:border-paper-200/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
            </div>
            <span className="ml-4 text-xs font-mono text-ink-500 dark:text-paper-500">frame://operating-systems</span>
          </div>

          {/* Window Panes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-200/10 dark:bg-paper-200/10 p-px">
            {panes.map((pane, index) => (
              <motion.div
                key={pane.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
                className="relative group"
                onMouseEnter={() => setHoveredPane(pane.id)}
                onMouseLeave={() => setHoveredPane(null)}
              >
                <div
                  className={`
                    relative h-48 sm:h-56 lg:h-64 bg-gradient-to-br ${pane.gradient} 
                    cursor-pointer overflow-hidden transition-all duration-500
                    ${hoveredPane === pane.id ? 'scale-[1.02] z-10' : ''}
                  `}
                  onClick={() => setSelectedPane(pane.id)}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`pattern-${pane.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <circle cx="20" cy="20" r="1" fill="white" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#pattern-${pane.id})`} />
                    </svg>
                  </div>

                  {/* Glass Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-white">
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: hoveredPane === pane.id ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="mb-3"
                    >
                      {pane.icon}
                    </motion.div>
                    
                    <h3 className="text-responsive-xl font-bold mb-1 text-center">
                      {pane.title}
                    </h3>
                    <p className="text-responsive-sm opacity-90 text-center">
                      {pane.subtitle}
                    </p>

                    {/* Status Badge */}
                    <div className="mt-4">
                      {pane.status === 'live' ? (
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          Live Now
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs opacity-75">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPane === pane.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"
                  />

                  {/* Click Indicator */}
                  {hoveredPane === pane.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-frame-green/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-frame-green/10 rounded-full blur-3xl"></div>
      </div>

      {/* Detailed Pane Modal */}
      <AnimatePresence>
        {selectedPane && selectedPaneData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPane(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-4xl w-full bg-paper-50 dark:bg-ink-950 rounded-2xl shadow-paper-lifted overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`h-32 bg-gradient-to-br ${selectedPaneData.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <button
                  onClick={() => setSelectedPane(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="relative z-10 h-full flex items-center px-8">
                  <div className="text-white">
                    <div className="mb-2">{selectedPaneData.icon}</div>
                    <h2 className="text-3xl font-display font-bold">{selectedPaneData.title}</h2>
                    <p className="text-lg opacity-90">{selectedPaneData.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-ink-200/10 dark:border-paper-200/10 bg-paper-100/50 dark:bg-ink-900/50">
                {(['overview', 'features', 'technical'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      flex-1 px-6 py-3 text-sm font-medium capitalize transition-all duration-300
                      ${activeTab === tab 
                        ? 'text-frame-green border-b-2 border-frame-green bg-white/50 dark:bg-black/20' 
                        : 'text-ink-600 dark:text-paper-400 hover:text-ink-900 dark:hover:text-paper-200'
                      }
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-lg text-ink-700 dark:text-paper-200 leading-relaxed mb-6">
                        {selectedPaneData.description}
                      </p>
                      
                      {selectedPaneData.status === 'live' && (
                        <div className="flex flex-wrap gap-3">
                          {selectedPaneData.url && (
                            <a
                              href={selectedPaneData.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-frame-green text-white rounded-lg hover:bg-frame-green-dark transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Visit {selectedPaneData.title}
                            </a>
                          )}
                          {selectedPaneData.github && (
                            <a
                              href={selectedPaneData.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-ink-900 dark:bg-paper-100 text-white dark:text-ink-900 rounded-lg hover:opacity-90 transition-opacity"
                            >
                              <Github className="w-4 h-4" />
                              GitHub
                            </a>
                          )}
                          {selectedPaneData.npm && (
                            <a
                              href={selectedPaneData.npm}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <Package className="w-4 h-4" />
                              NPM
                            </a>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'features' && (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      {selectedPaneData.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-paper-100/50 dark:bg-ink-900/50 rounded-lg"
                        >
                          <span className="text-frame-green mt-1">✓</span>
                          <span className="text-ink-700 dark:text-paper-200">{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'technical' && (
                    <motion.div
                      key="technical"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      {selectedPaneData.technical.map((tech, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-paper-100/50 dark:bg-ink-900/50 rounded-lg font-mono text-sm"
                        >
                          <span className="text-frame-green">→</span>
                          <span className="text-ink-700 dark:text-paper-200">{tech}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}