'use client'

import { motion } from 'framer-motion'
import ThemeToggle from './theme-toggle'

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="mt-20"
    >
      {/* OpenStrand Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <a href="https://openstrand.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <img src="/openstrand-logo.svg" alt="OpenStrand" className="h-8 w-auto dark:hidden" />
            <img src="/openstrand-logo-gradient.svg" alt="OpenStrand" className="hidden h-8 w-auto dark:block" />
          </a>
        </div>
        <p className="text-sm text-ink-600 dark:text-paper-400">
          Powered by OpenStrand • The backbone of all Frame operating systems
        </p>
        <p className="text-xs text-ink-500 dark:text-paper-500 mt-2">
          All Frame projects are open source • MIT & Apache 2.0 licensed • Community & Enterprise editions available
        </p>
      </div>

      {/* Links Grid */}
      <div className="container mx-auto px-4">
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
              <li><a href="/faq" className="nav-link">FAQ</a></li>
              <li><a href="/blog" className="nav-link">Blog</a></li>
              <li><a href="mailto:team@frame.dev" className="nav-link">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3 text-ink-500 dark:text-paper-500 uppercase tracking-wider">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://discord.gg/VXXC4SJMKh" className="nav-link" target="_blank" rel="noopener noreferrer">Discord Support</a></li>
              <li><a href="https://github.com/framersai" className="nav-link" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://npmjs.com/org/framers" className="nav-link" target="_blank" rel="noopener noreferrer">NPM</a></li>
              <li><a href="https://linkedin.com/company/framersai" className="nav-link" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3 text-ink-500 dark:text-paper-500 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/legal/privacy" className="nav-link">Privacy</a></li>
              <li><a href="/legal/terms" className="nav-link">Terms</a></li>
              <li><a href="https://github.com/framersai/frame.dev/blob/main/LICENSE" className="nav-link" target="_blank" rel="noopener noreferrer">MIT License</a></li>
              <li><a href="https://www.apache.org/licenses/LICENSE-2.0" className="nav-link" target="_blank" rel="noopener noreferrer">Apache 2.0 License</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center py-6 border-t border-ink-200/20 dark:border-paper-200/10">
          <div className="flex items-center justify-center gap-4 mb-3">
            <ThemeToggle />
          </div>
          <p className="text-xs text-ink-500 dark:text-paper-500">
            © 2025 Framers • Infrastructure for agentic AI
          </p>
          <p className="text-xs text-ink-400 dark:text-paper-600 mt-1">
            team@frame.dev
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
