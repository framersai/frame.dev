'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navigation() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-neu-base/95 dark:bg-neu-base-dark/95 backdrop-blur-xl border-b border-neu-dark/10 dark:border-neu-light-shadow/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Using EXACT SVG */}
          <Link href="/" className="flex items-center group">
            <svg width="160" height="60" viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-105">
              <defs>
                <filter id="shadow-green-nav" x="-50%" y="-50%" width="200%" height="200%">
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
              {/* Icon with border */}
              <g transform="translate(107.5, 60)" filter="url(#shadow-green-nav)">
                {/* Outer border rect */}
                <rect x="-25" y="-28" width="50" height="56" fill="#00C896" stroke="#e0e0e0" strokeWidth="2"/>
                {/* Inner white stroke for contrast */}
                <rect x="-23" y="-26" width="46" height="52" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.5"/>
                {/* Left spine highlight */}
                <rect x="-25" y="-28" width="10" height="56" fill="#ffffff" opacity="0.15"/>
                {/* Vertical divider lines */}
                <line x1="-15" y1="-28" x2="-15" y2="28" stroke="#ffffff" strokeWidth="2"/>
                <line x1="5" y1="-28" x2="5" y2="28" stroke="#ffffff" strokeWidth="2"/>
                {/* Horizontal center line */}
                <line x1="-25" y1="0" x2="25" y2="0" stroke="#ffffff" strokeWidth="2"/>
              </g>
              {/* Text */}
              <text x="142.5" y="65" fontFamily="Inter" fontSize="42" fontWeight="700" fill="#00C896">Frame</text>
            </svg>
          </Link>

          {/* Navigation Links with better typography */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/about" className="nav-link-neu">About</Link>
            <Link href="/team" className="nav-link-neu">Team</Link>
            <Link href="/blog" className="nav-link-neu">Blog</Link>
            <Link href="/jobs" className="nav-link-neu">Jobs</Link>
            <a href="https://agentos.sh" className="nav-link-neu text-frame-green" target="_blank" rel="noopener noreferrer">AgentOS</a>
            <a href="https://vca.chat" className="nav-link-neu" target="_blank" rel="noopener noreferrer">Marketplace</a>
          </div>

          {/* External Links with neumorphic style */}
          <div className="flex items-center gap-4">
            <a 
              href="https://discord.gg/VXXC4SJMKh" 
              className="p-3 rounded-xl bg-neu-base dark:bg-neu-base-dark shadow-neu-sm dark:shadow-neu-sm-dark hover:shadow-neu-inset dark:hover:shadow-neu-inset-dark transition-all duration-300"
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Discord"
            >
              <svg className="w-5 h-5 text-frame-green" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a 
              href="https://github.com/framersai" 
              className="p-3 rounded-xl bg-neu-base dark:bg-neu-base-dark shadow-neu-sm dark:shadow-neu-sm-dark hover:shadow-neu-inset dark:hover:shadow-neu-inset-dark transition-all duration-300"
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 text-ink-600 dark:text-paper-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/manic-agency-llc/" 
              className="p-3 rounded-xl bg-neu-base dark:bg-neu-base-dark shadow-neu-sm dark:shadow-neu-sm-dark hover:shadow-neu-inset dark:hover:shadow-neu-inset-dark transition-all duration-300"
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 text-ink-600 dark:text-paper-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}