'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-paper-50/95 dark:bg-ink-950/95 backdrop-blur-md border-b border-ink-200/10 dark:border-paper-200/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Using ACTUAL Frame logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-40 h-15">
                <Image 
                  src="/frame-logo.png" 
                  alt="Frame" 
                  width={160}
                  height={60}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/blog" className="nav-link">Blog</Link>
              <a href="https://agentos.sh" className="nav-link text-frame-green font-semibold" target="_blank" rel="noopener noreferrer">
                AgentOS
              </a>
              <a href="https://openstrand.ai" className="nav-link flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                <span className="text-frame-green">∞</span>
                <span>OpenStrand</span>
                <span className="text-frame-green">∞</span>
              </a>
              <a href="https://vca.chat" className="nav-link" target="_blank" rel="noopener noreferrer">
                Marketplace
              </a>
            </div>

            {/* Desktop Social Links */}
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="https://discord.gg/VXXC4SJMKh" 
                className="p-2.5 rounded-lg bg-paper-100 dark:bg-ink-900 hover:bg-paper-200 dark:hover:bg-ink-800 transition-all duration-300 group"
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Discord"
              >
                <svg className="w-5 h-5 text-ink-600 dark:text-paper-300 group-hover:text-frame-green transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/framersai" 
                className="p-2.5 rounded-lg bg-paper-100 dark:bg-ink-900 hover:bg-paper-200 dark:hover:bg-ink-800 transition-all duration-300 group"
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 text-ink-600 dark:text-paper-300 group-hover:text-frame-green transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-paper-100 dark:hover:bg-ink-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-ink-900 dark:text-paper-50" />
              ) : (
                <Menu className="w-6 h-6 text-ink-900 dark:text-paper-50" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-paper-50 dark:bg-ink-950 z-40 lg:hidden"
          >
            <div className="flex flex-col h-full pt-24 px-6">
              <div className="space-y-6">
                <Link href="/about" className="block text-lg font-medium text-ink-900 dark:text-paper-50 hover:text-frame-green transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  About
                </Link>
                <Link href="/blog" className="block text-lg font-medium text-ink-900 dark:text-paper-50 hover:text-frame-green transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Blog
                </Link>
                <a href="https://agentos.sh" className="block text-lg font-bold text-frame-green" target="_blank" rel="noopener noreferrer">
                  AgentOS
                </a>
                <a href="https://openstrand.ai" className="block text-lg font-medium text-ink-900 dark:text-paper-50 hover:text-frame-green transition-colors" target="_blank" rel="noopener noreferrer">
                  ∞ OpenStrand ∞
                </a>
                <a href="https://vca.chat" className="block text-lg font-medium text-ink-900 dark:text-paper-50 hover:text-frame-green transition-colors" target="_blank" rel="noopener noreferrer">
                  Marketplace
                </a>
              </div>
              
              <div className="mt-auto pb-8">
                <div className="flex gap-4">
                  <a href="https://discord.gg/VXXC4SJMKh" className="text-ink-600 dark:text-paper-300 hover:text-frame-green transition-colors" target="_blank" rel="noopener noreferrer">
                    Discord
                  </a>
                  <a href="https://github.com/framersai" className="text-ink-600 dark:text-paper-300 hover:text-frame-green transition-colors" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}