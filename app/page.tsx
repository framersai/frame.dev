'use client'

import { motion } from 'framer-motion'
import WindowFrame from '@/components/window-frame'
import Navigation from '@/components/navigation'
import ThemeToggle from '@/components/theme-toggle'
import OpenStrandPopover from '@/components/openstrand-popover'

export default function HomePage() {
  return (
    <div className="min-h-screen paper-bg relative overflow-hidden">
      {/* Navigation */}
      <Navigation />

      {/* VCA Marketplace Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-frame-green to-frame-green-dark text-white py-2 px-4 text-center"
      >
        <a href="https://vca.chat" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline">
          🚀 Voice Chat Assistant Marketplace Now Live - Free & Premium Agents Compatible with AgentOS →
        </a>
      </motion.div>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-32 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight ink-text mb-4">
            Denoising the web
          </h1>
          <div className="relative inline-block">
            <OpenStrandPopover />
          </div>
        </motion.div>

        {/* Interactive Window Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <WindowFrame />
        </motion.div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          {/* OpenStrand Section */}
          <div className="text-center mb-12">
            <img src="/openstrand-logo.svg" alt="OpenStrand" className="h-12 mx-auto mb-4" />
            <p className="text-sm text-ink-600 dark:text-paper-400">
              Powered by OpenStrand • The backbone of all Frame operating systems
            </p>
            <p className="text-xs text-ink-500 dark:text-paper-500 mt-2">
              All Frame projects are open source • MIT & Apache 2.0 licensed • Community & Enterprise editions available
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <div>
              <h3 className="font-bold text-sm mb-3 text-ink-500 dark:text-paper-500 uppercase tracking-wider">Products</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://agentos.sh" className="nav-link" target="_blank" rel="noopener noreferrer">AgentOS</a></li>
                <li><a href="https://vca.chat" className="nav-link" target="_blank" rel="noopener noreferrer">VCA Marketplace</a></li>
                <li><span className="text-ink-400 dark:text-paper-600">WebOS (Soon)</span></li>
                <li><span className="text-ink-400 dark:text-paper-600">HomeOS (Soon)</span></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-3 text-ink-500 dark:text-paper-500 uppercase tracking-wider">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="nav-link">About</a></li>
                <li><a href="/team" className="nav-link">Team</a></li>
                <li><a href="/jobs" className="nav-link">Jobs</a></li>
                <li><a href="/blog" className="nav-link">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-3 text-ink-500 dark:text-paper-500 uppercase tracking-wider">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://discord.gg/VXXC4SJMKh" className="nav-link" target="_blank" rel="noopener noreferrer">Discord Support</a></li>
                <li><a href="https://github.com/framersai" className="nav-link" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://npmjs.com/org/framers" className="nav-link" target="_blank" rel="noopener noreferrer">NPM</a></li>
                <li><a href="https://www.linkedin.com/company/manic-agency-llc/" className="nav-link" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-3 text-ink-500 dark:text-paper-500 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/legal/privacy" className="nav-link">Privacy Policy</a></li>
                <li><a href="/legal/terms" className="nav-link">Terms of Service</a></li>
                <li><a href="https://github.com/framersai/frame.dev/blob/master/LICENSE" className="nav-link" target="_blank" rel="noopener noreferrer">MIT License</a></li>
                <li><a href="mailto:team@frame.dev" className="nav-link">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="text-center pt-8 border-t border-ink-200 dark:border-ink-800">
            <p className="text-xs text-ink-500 dark:text-paper-500 mb-2">
              © 2025 Framers • Infrastructure for agentic AI
            </p>
            <p className="text-xs text-ink-400 dark:text-paper-600">
              A subsidiary of <a href="https://www.linkedin.com/company/manic-agency-llc/" className="underline hover:text-frame-green" target="_blank" rel="noopener noreferrer">Manic Agency LLC</a> • team@frame.dev
            </p>
          </div>
        </motion.footer>
      </main>

      {/* Theme Toggle */}
      <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  )
}