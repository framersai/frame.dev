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
          <div className="relative">
            <svg height="48" viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="footer-strand" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#00C896', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#00A67C', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <g transform="translate(10, 30)">
                <path d="M0,0 Q10,-15 20,0 T40,0 T60,0 T80,0" stroke="url(#footer-strand)" strokeWidth="3" fill="none"/>
                <path d="M0,0 Q10,15 20,0 T40,0 T60,0 T80,0" stroke="url(#footer-strand)" strokeWidth="3" fill="none" opacity="0.6"/>
                <circle cx="0" cy="0" r="3" fill="#00C896"/>
                <circle cx="20" cy="0" r="3" fill="#00C896"/>
                <circle cx="40" cy="0" r="3" fill="#00C896"/>
                <circle cx="60" cy="0" r="3" fill="#00C896"/>
                <circle cx="80" cy="0" r="3" fill="#00C896"/>
              </g>
              <text x="100" y="35" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="600" className="fill-ink-900 dark:fill-paper-50">OpenStrand</text>
            </svg>
          </div>
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
