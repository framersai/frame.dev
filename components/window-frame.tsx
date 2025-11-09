'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'

interface Pane {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  status: 'live' | 'coming-soon'
  url?: string
  color: string
}

const panes: Pane[] = [
  {
    id: 'webos',
    title: 'WebOS',
    subtitle: 'Universal web framework',
    description: 'The universal framework for interacting with web, Web3, and metaverses concurrently in parallel.',
    features: ['Cross-platform compatibility', 'Web3 integration', 'Metaverse-ready', 'Real-time sync'],
    status: 'coming-soon',
    color: '#4F46E5'
  },
  {
    id: 'homeos',
    title: 'HomeOS',
    subtitle: 'Smart home platform',
    description: 'Intelligent platform for smart home management and automation.',
    features: ['Device orchestration', 'Energy optimization', 'Security monitoring', 'Voice control'],
    status: 'coming-soon',
    color: '#F59E0B'
  },
  {
    id: 'agentos',
    title: 'AgentOS',
    subtitle: 'Adaptive agent platform',
    description: 'Our first and original OS, powered by Frame. The adaptive agent platform for building, deploying, and managing AI agents.',
    features: ['Agent orchestration', 'Natural language processing', 'Multi-modal AI', 'Plugin ecosystem', 'Real-time adaptation'],
    status: 'live',
    url: 'https://agentos.sh',
    color: '#00C896'
  },
  {
    id: 'safeos',
    title: 'SafeOS',
    subtitle: 'Digital vault & identity',
    description: 'Your digital vault for storage, backup, firewall protection, and identity monitoring.',
    features: ['End-to-end encryption', 'Identity protection', 'Secure backup', 'Threat detection'],
    status: 'coming-soon',
    color: '#8B5CF6'
  },
  {
    id: 'workos',
    title: 'WorkOS',
    subtitle: 'Project & CRM platform',
    description: 'Comprehensive platform for work management, projects, and CRM.',
    features: ['Task automation', 'Team collaboration', 'Client management', 'Analytics dashboard'],
    status: 'coming-soon',
    color: '#EC4899'
  },
  {
    id: 'myos',
    title: 'MyOS',
    subtitle: 'Universal dashboard',
    description: 'The dashboard that manages all OSes—your personal command center for the Frame ecosystem.',
    features: ['Unified control', 'Cross-OS sync', 'Personal analytics', 'Custom workflows'],
    status: 'coming-soon',
    color: '#6B7280'
  }
]

export default function WindowFrame() {
  const [selectedPane, setSelectedPane] = useState<string | null>(null)
  const [hoveredPane, setHoveredPane] = useState<string | null>(null)

  const selectedPaneData = panes.find(p => p.id === selectedPane)

  return (
    <>
      {/* Main Window Frame - EXACT MATCH to logo */}
      <div className="relative w-full max-w-5xl mx-auto">
        <svg 
          viewBox="0 0 600 672" 
          className="w-full h-full animate-float"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow filter - exact match */}
          <defs>
            <filter id="frameShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="4" result="offsetblur"/>
              <feFlood floodColor="#000000" floodOpacity="0.15"/>
              <feComposite in2="offsetblur" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Main frame - exact proportions from logo */}
          <g filter="url(#frameShadow)">
            {/* Outer border rect */}
            <rect 
              x="50" y="50" 
              width="500" height="560" 
              fill="#00C896" 
              stroke="#e0e0e0" 
              strokeWidth="20"
            />
            
            {/* Inner white stroke for contrast */}
            <rect 
              x="70" y="70" 
              width="460" height="520" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="20" 
              opacity="0.5"
            />
            
            {/* Left spine highlight */}
            <rect 
              x="50" y="50" 
              width="100" height="560" 
              fill="#ffffff" 
              opacity="0.15"
            />
            
            {/* Vertical divider lines - exact positions */}
            <line x1="200" y1="50" x2="200" y2="610" stroke="#ffffff" strokeWidth="20"/>
            <line x1="400" y1="50" x2="400" y2="610" stroke="#ffffff" strokeWidth="20"/>
            
            {/* Horizontal center line */}
            <line x1="50" y1="330" x2="550" y2="330" stroke="#ffffff" strokeWidth="20"/>
          </g>

          {/* Interactive Panes with exact grid */}
          {panes.map((pane, index) => {
            const col = index % 3
            const row = Math.floor(index / 3)
            const x = 50 + col * 166.67
            const y = 50 + row * 280
            const width = 150
            const height = 260
            const isHovered = hoveredPane === pane.id
            const isActive = pane.status === 'live'

            return (
              <g key={pane.id}>
                <rect
                  x={x + 10}
                  y={y + 10}
                  width={width}
                  height={height}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPane(pane.id)}
                  onMouseLeave={() => setHoveredPane(null)}
                  onClick={() => setSelectedPane(pane.id)}
                />
                
                {/* Hover effect */}
                {isHovered && (
                  <rect
                    x={x + 10}
                    y={y + 10}
                    width={width}
                    height={height}
                    fill={pane.color}
                    fillOpacity="0.1"
                    className="pointer-events-none animate-pulse"
                  />
                )}

                {/* Pane content */}
                <text
                  x={x + 85}
                  y={y + 120}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  <tspan 
                    className="text-2xl font-bold fill-white" 
                    fontFamily="Inter"
                    fontWeight="700"
                  >
                    {pane.title}
                  </tspan>
                  <tspan 
                    x={x + 85} 
                    dy="30" 
                    className="text-sm fill-white/80" 
                    fontFamily="Inter"
                    fontWeight="400"
                  >
                    {pane.subtitle}
                  </tspan>
                </text>

                {/* Status indicator */}
                {isActive ? (
                  <circle cx={x + 140} cy={y + 40} r="8" fill="#00FF00">
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                  </circle>
                ) : (
                  <circle cx={x + 140} cy={y + 40} r="6" fill="#ffffff" opacity="0.3"/>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Pane Detail Popover - Neumorphic style */}
      <AnimatePresence>
        {selectedPane && selectedPaneData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPane(null)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              className="relative max-w-2xl w-full neu-card p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPane(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neu-dark/10 dark:hover:bg-neu-light-shadow/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center shadow-neu-inset dark:shadow-neu-inset-dark"
                  style={{ backgroundColor: selectedPaneData.color + '20' }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg"
                    style={{ backgroundColor: selectedPaneData.color }}
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold heading-display">
                    {selectedPaneData.title}
                  </h2>
                  <p className="text-ink-600 dark:text-paper-400 font-medium">
                    {selectedPaneData.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-lg mb-6 ink-text leading-relaxed">
                {selectedPaneData.description}
              </p>

              {selectedPaneData.id === 'agentos' && (
                <div className="mb-6 p-4 bg-frame-green/10 rounded-xl border border-frame-green/20">
                  <h3 className="font-bold mb-2 text-frame-green">Live Now</h3>
                  <p className="text-sm ink-text">
                    AgentOS is actively developed and available for use. Join thousands of developers building the next generation of AI agents.
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-bold mb-3 ink-text">Key Features</h3>
                <ul className="space-y-2">
                  {selectedPaneData.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-frame-green mt-1">•</span>
                      <span className="text-ink-700 dark:text-paper-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                {selectedPaneData.url ? (
                  <a
                    href={selectedPaneData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Visit {selectedPaneData.title}
                  </a>
                ) : (
                  <button className="btn-paper" disabled>
                    Coming Soon
                  </button>
                )}
                <button
                  onClick={() => setSelectedPane(null)}
                  className="btn-paper"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}