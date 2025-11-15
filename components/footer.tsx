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

        {/* Supporters */}
        <div className="text-center py-6 border-t border-ink-200/20 dark:border-paper-200/10 mb-6">
          <p className="text-xs text-ink-500 dark:text-paper-500 mb-3">
            Supported by
          </p>
          <div className="flex items-center justify-center gap-6">
            <a 
              href="https://openai.com/startups" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
            >
              <svg className="h-5 w-auto" viewBox="0 0 320 320" fill="currentColor">
                <path d="M297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07V171.4l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.98zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49l-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43l-26.94-15.55c-.29-.14-.48-.42-.52-.74V107.93c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54l34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20v-40z"/>
              </svg>
              <span className="text-xs text-ink-600 dark:text-paper-400">OpenAI Startup Credits</span>
            </a>
          </div>
          <p className="text-xs text-ink-400 dark:text-paper-600 mt-2">
            Frame Codex uses OpenAI's Startup Credits program for AI-powered quality analysis
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="text-center py-6 border-t border-ink-200/20 dark:border-paper-200/10">
          <div className="flex items-center justify-center gap-4 mb-3">
            <ThemeToggle />
          </div>
          <p 
            className="text-sm text-ink-400 dark:text-paper-500 mb-2 italic"
            style={{ 
              fontFamily: '"Brush Script MT", "Apple Chancery", cursive',
              letterSpacing: '0.02em'
            }}
          >
            The OS for humans, the codex of humanity.
          </p>
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
