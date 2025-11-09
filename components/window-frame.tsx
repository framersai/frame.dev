'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Home, Shield, Briefcase, User, Bot, X, ExternalLink, Github, Package, ChevronRight, Layers, Cpu, Lock, Cloud, Zap, Code, Monitor, Server } from 'lucide-react'

const osData = {
  WebOS: {
    title: 'WebOS',
    icon: Globe,
    description: 'The browser reimagined as an operating system',
    status: 'In Development',
    statusColor: 'text-amber-600',
    tabs: {
      overview: {
        title: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="text-base body-text">
              WebOS transforms the browser into a fully-fledged operating system, enabling web applications 
              to run with native-like performance and capabilities. Built for the era where the web is the platform.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <Monitor className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">Browser-Native</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">Runs entirely in the browser with no installation required</p>
              </div>
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <Cloud className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">Cloud-First</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">Seamless sync across all your devices</p>
              </div>
            </div>
          </div>
        )
      },
      features: {
        title: 'Features',
        content: (
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Virtual File System</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">In-browser file management with cloud sync</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Process Management</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Multi-tab orchestration and resource allocation</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">WebAssembly Runtime</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Near-native performance for web applications</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">PWA Integration</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Deep integration with Progressive Web Apps</p>
              </div>
            </li>
          </ul>
        )
      },
      technical: {
        title: 'Technical',
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-ink-950/5 dark:bg-paper-50/5 rounded-lg font-mono text-sm">
              <p className="text-frame-green"># Architecture</p>
              <p>• Service Worker orchestration</p>
              <p>• IndexedDB for persistence</p>
              <p>• WebRTC for P2P communication</p>
              <p>• Web Crypto API for security</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">TypeScript</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">React</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">WebAssembly</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Service Workers</span>
            </div>
          </div>
        )
      }
    }
  },
  HomeOS: {
    title: 'HomeOS',
    icon: Home,
    description: 'Smart home orchestration and automation platform',
    status: 'In Development',
    statusColor: 'text-amber-600',
    tabs: {
      overview: {
        title: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="text-base body-text">
              HomeOS unifies all your smart home devices under a single, intelligent operating system. 
              Control everything from lights to security systems with natural language and automated workflows.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <Home className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">Universal Hub</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">Works with all major smart home protocols</p>
              </div>
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <Zap className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">AI Automation</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">Learns your routines and preferences</p>
              </div>
            </div>
          </div>
        )
      },
      features: {
        title: 'Features',
        content: (
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Matter Protocol Support</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Native support for the latest smart home standard</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Voice Control</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Natural language processing for all devices</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Energy Management</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Optimize power usage across your home</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Security Integration</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Unified security and monitoring system</p>
              </div>
            </li>
          </ul>
        )
      },
      technical: {
        title: 'Technical',
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-ink-950/5 dark:bg-paper-50/5 rounded-lg font-mono text-sm">
              <p className="text-frame-green"># Protocols</p>
              <p>• Matter / Thread</p>
              <p>• Zigbee / Z-Wave</p>
              <p>• WiFi / Bluetooth</p>
              <p>• MQTT / CoAP</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Rust</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Python</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Node-RED</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Docker</span>
            </div>
          </div>
        )
      }
    }
  },
  AgentOS: {
    title: 'AgentOS',
    icon: Bot,
    description: 'Production-ready runtime for AI agents',
    status: 'Live',
    statusColor: 'text-green-600',
    links: {
      github: 'https://github.com/framersai/agentos',
      npm: 'https://npmjs.com/package/@framers/agentos',
      website: 'https://agentos.sh'
    },
    tabs: {
      overview: {
        title: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="text-base body-text">
              AgentOS provides a complete runtime environment for deploying, managing, and orchestrating AI agents 
              at scale. Built with TypeScript for maximum developer productivity.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <Bot className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">Agent Runtime</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">Deploy and manage AI agents with ease</p>
              </div>
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <Server className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">Scalable</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">From single agent to enterprise deployment</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="https://github.com/framersai/agentos" target="_blank" rel="noopener noreferrer" 
                 className="btn-secondary flex items-center gap-2">
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
              <a href="https://agentos.sh" target="_blank" rel="noopener noreferrer" 
                 className="btn-primary flex items-center gap-2">
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )
      },
      features: {
        title: 'Features',
        content: (
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Multi-Provider Support</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Works with OpenAI, Anthropic, Google, and more</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Extension System</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Rich ecosystem of plugins and extensions</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Guardrails</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Built-in safety and compliance features</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Observability</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Complete monitoring and debugging tools</p>
              </div>
            </li>
          </ul>
        )
      },
      technical: {
        title: 'Technical',
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-ink-950/5 dark:bg-paper-50/5 rounded-lg font-mono text-sm">
              <p className="text-frame-green"># Quick Start</p>
              <p>npm install @framers/agentos</p>
              <p className="mt-2 text-frame-green"># License</p>
              <p>Apache 2.0</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">TypeScript</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Node.js</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Docker</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Kubernetes</span>
            </div>
          </div>
        )
      }
    }
  },
  SafeOS: {
    title: 'SafeOS',
    icon: Shield,
    description: 'Security-first operating system for critical infrastructure',
    status: 'In Development',
    statusColor: 'text-amber-600',
    tabs: {
      overview: {
        title: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="text-base body-text">
              SafeOS is designed from the ground up with security as the primary concern. Perfect for financial 
              institutions, healthcare systems, and government infrastructure.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <Lock className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">Zero Trust</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">Every operation is verified and encrypted</p>
              </div>
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <Shield className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">Hardened Kernel</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">Formally verified security guarantees</p>
              </div>
            </div>
          </div>
        )
      },
      features: {
        title: 'Features',
        content: (
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Secure Boot</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Cryptographically verified boot process</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Memory Encryption</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Full memory encryption at rest and in transit</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Audit Logging</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Immutable audit trail of all operations</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Compliance Ready</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">FIPS, HIPAA, PCI-DSS compliant</p>
              </div>
            </li>
          </ul>
        )
      },
      technical: {
        title: 'Technical',
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-ink-950/5 dark:bg-paper-50/5 rounded-lg font-mono text-sm">
              <p className="text-frame-green"># Security Stack</p>
              <p>• seL4 microkernel</p>
              <p>• Hardware security modules</p>
              <p>• Trusted Platform Module</p>
              <p>• Secure enclaves</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Rust</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">C</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Formal Methods</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">HSM</span>
            </div>
          </div>
        )
      }
    }
  },
  WorkOS: {
    title: 'WorkOS',
    icon: Briefcase,
    description: 'Enterprise productivity and collaboration platform',
    status: 'In Development',
    statusColor: 'text-amber-600',
    tabs: {
      overview: {
        title: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="text-base body-text">
              WorkOS reimagines enterprise productivity with AI-native workflows, seamless collaboration, 
              and intelligent automation of repetitive tasks.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <Briefcase className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">AI Workflows</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">Automate complex business processes</p>
              </div>
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <Layers className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">Integration Hub</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">Connect all your enterprise tools</p>
              </div>
            </div>
          </div>
        )
      },
      features: {
        title: 'Features',
        content: (
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Smart Documents</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">AI-powered document creation and analysis</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Team Spaces</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Collaborative workspaces with real-time sync</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Process Automation</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">No-code workflow builder with AI assistance</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Analytics Dashboard</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Real-time insights and productivity metrics</p>
              </div>
            </li>
          </ul>
        )
      },
      technical: {
        title: 'Technical',
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-ink-950/5 dark:bg-paper-50/5 rounded-lg font-mono text-sm">
              <p className="text-frame-green"># Enterprise Stack</p>
              <p>• SAML/OIDC authentication</p>
              <p>• REST/GraphQL APIs</p>
              <p>• WebSocket real-time sync</p>
              <p>• Multi-tenant architecture</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">TypeScript</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">PostgreSQL</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Redis</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Kubernetes</span>
            </div>
          </div>
        )
      }
    }
  },
  MyOS: {
    title: 'MyOS',
    icon: User,
    description: 'Personal AI companion and life management system',
    status: 'Coming Soon',
    statusColor: 'text-blue-600',
    tabs: {
      overview: {
        title: 'Overview',
        content: (
          <div className="space-y-4">
            <p className="text-base body-text">
              MyOS is your personal operating system that learns, adapts, and grows with you. Managing everything 
              from health and finances to learning and creativity.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <User className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">Personal AI</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">Your own AI that knows you</p>
              </div>
              <div className="p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
                <Cpu className="w-8 h-8 mb-2 text-frame-green" />
                <h4 className="font-semibold mb-1">Life Dashboard</h4>
                <p className="text-sm text-ink-600 dark:text-paper-400">All aspects of your life in one place</p>
              </div>
            </div>
          </div>
        )
      },
      features: {
        title: 'Features',
        content: (
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Health Tracking</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Comprehensive health and wellness monitoring</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Financial Assistant</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Smart budgeting and investment advice</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Learning Companion</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Personalized education and skill development</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-frame-green mt-1">•</span>
              <div>
                <p className="font-semibold">Memory Palace</p>
                <p className="text-sm text-ink-600 dark:text-paper-400">Never forget important moments and information</p>
              </div>
            </li>
          </ul>
        )
      },
      technical: {
        title: 'Technical',
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-ink-950/5 dark:bg-paper-50/5 rounded-lg font-mono text-sm">
              <p className="text-frame-green"># Privacy First</p>
              <p>• Local-first architecture</p>
              <p>• End-to-end encryption</p>
              <p>• Self-sovereign identity</p>
              <p>• Data portability</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Swift</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">Kotlin</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">React Native</span>
              <span className="px-3 py-1 bg-paper-200 dark:bg-ink-700 rounded-full text-xs">SQLite</span>
            </div>
          </div>
        )
      }
    }
  }
}

type OSName = keyof typeof osData

export default function WindowFrame() {
  const [selectedOS, setSelectedOS] = useState<OSName | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'technical'>('overview')

  const handlePaneClick = (os: OSName) => {
    setSelectedOS(os)
    setActiveTab('overview')
  }

  const handleClose = () => {
    setSelectedOS(null)
  }

  // Handle Escape key
  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && selectedOS) {
      handleClose()
    }
  }

  return (
    <>
      <div className="relative max-w-4xl mx-auto" onKeyDown={handleEscape}>
        {/* Main Window Frame - Exact match to logo */}
        <div className="relative group">
          <svg
            viewBox="0 0 400 300"
            className="w-full h-auto filter drop-shadow-2xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="frame-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#00C896', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#00B688', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#00A67C', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="frame-shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                <feOffset dx="0" dy="4" result="offsetblur"/>
                <feFlood floodColor="#000000" floodOpacity="0.2"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Outer frame with gradient */}
            <rect x="20" y="20" width="360" height="260" rx="8" ry="8" 
                  fill="none" stroke="url(#frame-gradient)" strokeWidth="4" filter="url(#frame-shadow)"/>
            
            {/* Inner dividers - matching logo exactly */}
            <line x1="20" y1="115" x2="380" y2="115" stroke="url(#frame-gradient)" strokeWidth="3"/>
            <line x1="20" y1="185" x2="380" y2="185" stroke="url(#frame-gradient)" strokeWidth="3"/>
            <line x1="146" y1="20" x2="146" y2="280" stroke="url(#frame-gradient)" strokeWidth="3"/>
            <line x1="254" y1="20" x2="254" y2="280" stroke="url(#frame-gradient)" strokeWidth="3"/>
            
            {/* Interactive panes */}
            {(Object.entries(osData) as [OSName, typeof osData[OSName]][]).map(([ os, data], i) => {
              const col = i % 3
              const row = Math.floor(i / 3)
              const x = 24 + col * 128
              const y = 24 + row * 90
              const Icon = data.icon
              
              return (
                <g key={os} className="cursor-pointer" onClick={() => handlePaneClick(os)}>
                  <rect x={x} y={y} width="118" height="82" fill="transparent" 
                        className="hover:fill-white hover:fill-opacity-5 transition-all"/>
                  <foreignObject x={x} y={y} width="118" height="82">
                    <div className="h-full flex flex-col items-center justify-center p-2 group/pane">
                      <Icon className="w-8 h-8 text-ink-600 dark:text-paper-300 group-hover/pane:text-frame-green transition-colors mb-1" />
                      <p className="text-xs font-semibold text-ink-800 dark:text-paper-200" style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)' }}>
                        {data.title}
                      </p>
                      <p className={`text-xs ${data.statusColor} opacity-70`} style={{ fontSize: 'clamp(0.5rem, 1vw, 0.625rem)' }}>
                        {data.status}
                      </p>
                      {data.status === 'Live' && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mt-1" />
                      )}
                    </div>
                  </foreignObject>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedOS && osData[selectedOS] && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={handleClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl paper-card-lifted z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 pb-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const IconComponent = osData[selectedOS].icon
                      return <IconComponent className="w-8 h-8 text-frame-green" />
                    })()}
                    <div>
                      <h3 className="text-2xl font-bold heading-display">{osData[selectedOS].title}</h3>
                      <p className="text-sm text-ink-600 dark:text-paper-400">{osData[selectedOS].description}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-lg hover:bg-paper-100 dark:hover:bg-ink-800 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 border-b border-ink-200/10 dark:border-paper-200/10">
                  {(Object.keys(osData[selectedOS].tabs) as Array<'overview' | 'features' | 'technical'>).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium transition-all relative ${
                        activeTab === tab
                          ? 'text-frame-green'
                          : 'text-ink-600 dark:text-paper-400 hover:text-ink-900 dark:hover:text-paper-200'
                      }`}
                    >
                      {osData[selectedOS].tabs[tab].title}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-frame-green"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {osData[selectedOS].tabs[activeTab].content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}