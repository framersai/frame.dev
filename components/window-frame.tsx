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
      {/* Main Window Frame - Exact SVG Recreation */}
      <div className="relative w-full max-w-6xl mx-auto aspect-[8/5]">
        <svg 
          viewBox="0 0 800 500" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer frame with shadow */}
          <defs>
            <filter id="frameShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
              <feOffset dx="0" dy="8" result="offsetblur"/>
              <feFlood floodColor="#000000" floodOpacity="0.1"/>
              <feComposite in2="offsetblur" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Main frame */}
          <rect 
            x="50" y="50" 
            width="700" height="400" 
            fill="#ffffff" 
            stroke="#e0e0e0" 
            strokeWidth="3"
            filter="url(#frameShadow)"
            className="dark:fill-ink-900"
          />
          
          {/* Inner border */}
          <rect 
            x="55" y="55" 
            width="690" height="390" 
            fill="none" 
            stroke="#00C896" 
            strokeWidth="2" 
            opacity="0.3"
          />
          
          {/* Left spine highlight */}
          <rect 
            x="50" y="50" 
            width="80" height="400" 
            fill="#00C896" 
            opacity="0.05"
          />

          {/* Grid lines - vertical */}
          <line x1="283" y1="50" x2="283" y2="450" stroke="#00C896" strokeWidth="3" opacity="0.8"/>
          <line x1="516" y1="50" x2="516" y2="450" stroke="#00C896" strokeWidth="3" opacity="0.8"/>
          
          {/* Grid lines - horizontal */}
          <line x1="50" y1="250" x2="750" y2="250" stroke="#00C896" strokeWidth="3" opacity="0.8"/>

          {/* Interactive Panes */}
          {panes.map((pane, index) => {
            const col = index % 3
            const row = Math.floor(index / 3)
            const x = 50 + col * 233
            const y = 50 + row * 200
            const isHovered = hoveredPane === pane.id
            const isActive = pane.status === 'live'

            return (
              <g key={pane.id}>
                <rect
                  x={x + 5}
                  y={y + 5}
                  width="223"
                  height="190"
                  fill={isHovered ? pane.color : '#ffffff'}
                  fillOpacity={isHovered ? 0.1 : 0}
                  stroke={isActive ? pane.color : 'transparent'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all dark:fill-ink-800"
                  onMouseEnter={() => setHoveredPane(pane.id)}
                  onMouseLeave={() => setHoveredPane(null)}
                  onClick={() => setSelectedPane(pane.id)}
                />
                <text
                  x={x + 116}
                  y={y + 90}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  <tspan className="text-xl font-bold fill-ink-900 dark:fill-paper-100" fontFamily="Playfair Display">
                    {pane.title}
                  </tspan>
                  <tspan x={x + 116} dy="25" className="text-sm fill-ink-600 dark:fill-paper-400" fontFamily="Inter">
                    {pane.subtitle}
                  </tspan>
                </text>
                {isActive && (
                  <circle cx={x + 200} cy={y + 30} r="8" fill={pane.color}>
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                  </circle>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Pane Detail Popover */}
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
              className="relative max-w-2xl w-full bg-white dark:bg-ink-900 rounded-2xl shadow-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPane(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: selectedPaneData.color + '20' }}
                >
                  <div 
                    className="w-10 h-10 rounded"
                    style={{ backgroundColor: selectedPaneData.color }}
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-playfair font-bold ink-text">
                    {selectedPaneData.title}
                  </h2>
                  <p className="text-ink-600 dark:text-paper-400">
                    {selectedPaneData.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-lg mb-6 ink-text leading-relaxed">
                {selectedPaneData.description}
              </p>

              {selectedPaneData.id === 'agentos' && (
                <div className="mb-6 p-4 bg-frame-green/10 rounded-lg border border-frame-green/20">
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