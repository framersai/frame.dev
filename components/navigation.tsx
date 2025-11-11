'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, ExternalLink } from 'lucide-react'
import ThemeToggle from './theme-toggle'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-500 bg-gradient-to-r ${
          scrolled
            ? 'from-paper-50/95 via-paper-50/85 to-paper-50/95 dark:from-ink-950/96 dark:via-ink-950/92 dark:to-ink-950/96'
            : 'from-paper-50/90 via-paper-50/70 to-paper-50/90 dark:from-ink-950/94 dark:via-ink-950/86 dark:to-ink-950/94'
        }`}
        style={{
          boxShadow: scrolled
            ? '0 18px 46px -30px rgba(18, 52, 29, 0.55)'
            : '0 20px 60px -44px rgba(18, 52, 29, 0.45)',
          borderBottom: scrolled
            ? '1px solid rgba(34,139,34,0.12)'
            : '1px solid rgba(34,139,34,0.08)'
        }}
      >
        <div className="px-3 sm:px-6">
          <div className="relative mx-auto w-full max-w-6xl flex items-center justify-between h-20">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper-50/0 via-paper-50/20 to-paper-50/0 dark:from-ink-950/0 dark:via-ink-950/20 dark:to-ink-950/0" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper-50/0 via-paper-50/20 to-paper-50/0 dark:from-ink-950/0 dark:via-ink-950/20 dark:to-ink-950/0" />
            {/* Logo with subtle effects */}
            <Link href="/" className="flex items-center group relative z-10 pl-1 sm:pl-0">
              <div className="relative">
                <svg
                  width="260"
                  height="78"
                  viewBox="0 0 800 240"
                  className="relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_2px_8px_rgba(34,139,34,0.2)]"
                >
                  <image
                    href="/frame-logo-no-subtitle.svg"
                    width="800"
                    height="240"
                  />
                </svg>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 relative z-10">
              {[
                { href: '/about', label: 'About' },
                { href: '/blog', label: 'Blog' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group"
                >
                  <span
                    className={`relative z-10 font-medium transition-all duration-300 ${
                      pathname === link.href || (link.href === '/blog' && pathname?.startsWith('/blog'))
                        ? 'text-frame-green font-semibold'
                        : 'text-ink-700 dark:text-paper-200 hover:text-frame-green'
                    }`}
                  >
                    {link.label}
                  </span>
                  {/* Clean underline for internal links */}
                  <div
                    className={`absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-frame-green origin-left transition-transform duration-300 ${
                      pathname === link.href || (link.href === '/blog' && pathname?.startsWith('/blog'))
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}

              {/* External links with different style */}
              <a
                href="https://agentos.sh"
                className="relative font-bold text-frame-green hover:text-frame-green/90 transition-colors group inline-flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10">AgentOS</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* Dotted underline for external */}
                <div
                  className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #228b22, #228b22 2px, transparent 2px, transparent 4px)',
                  }}
                />
              </a>

              <a
                href="https://openstrand.ai"
                className="flex items-center gap-1 group relative"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-frame-green">∞</span>
                <span className="text-ink-700 dark:text-paper-200 group-hover:text-frame-green transition-colors">OpenStrand</span>
                <span className="text-frame-green">∞</span>
                <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-ink-600 dark:text-paper-400" />
                {/* Dotted underline */}
                <div
                  className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #228b22, #228b22 2px, transparent 2px, transparent 4px)',
                  }}
                />
              </a>

              <a
                href="https://vca.chat"
                className="relative text-ink-700 dark:text-paper-200 hover:text-frame-green transition-colors font-medium group inline-flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Marketplace
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* Dotted underline */}
                <div
                  className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #228b22, #228b22 2px, transparent 2px, transparent 4px)',
                  }}
                />
              </a>
            </div>

            {/* Desktop Social Links + Theme Toggle */}
            <div className="hidden lg:flex items-center gap-3 relative z-10">
              <ThemeToggle />

              {/* Discord with gradient background */}
              <a
                href="https://discord.gg/VXXC4SJMKh"
                className="relative p-2.5 rounded-xl bg-gradient-to-br from-paper-100 to-paper-200 dark:from-ink-900 dark:to-ink-800 shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-frame-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="relative z-10 w-5 h-5 text-ink-600 dark:text-paper-300 group-hover:text-frame-green transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>

              {/* GitHub with gradient background */}
              <a
                href="https://github.com/framersai"
                className="relative p-2.5 rounded-xl bg-gradient-to-br from-paper-100 to-paper-200 dark:from-ink-900 dark:to-ink-800 shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-frame-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="relative z-10 w-5 h-5 text-ink-600 dark:text-paper-300 group-hover:text-frame-green transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gradient-to-br from-paper-100/95 to-paper-200/95 dark:from-ink-900/95 dark:to-ink-800/95 shadow-lg hover:shadow-xl transition-all relative z-10"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-ink-900 dark:text-paper-50" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-ink-900 dark:text-paper-50" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu with improved styling */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-paper-50/98 dark:bg-ink-950/98 backdrop-blur-xl z-40 lg:hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(247,249,253,0.96) 100%)',
              boxShadow: '-10px 0 30px -5px rgba(0,0,0,0.1)'
            }}
          >
            <div className="flex flex-col h-full pt-24 px-6">
              <div className="space-y-5">
                {/* Internal Links */}
                {[
                  { href: '/about', label: 'About', internal: true },
                  { href: '/blog', label: 'Blog', internal: true },
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      className={`block text-lg font-medium transition-all duration-300 pb-2 border-b border-transparent hover:border-frame-green/30 ${
                        pathname === link.href || (link.href === '/blog' && pathname?.startsWith('/blog'))
                          ? 'text-frame-green font-bold'
                          : 'text-ink-900 dark:text-paper-50 hover:text-frame-green'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* External Links with icons */}
                <motion.a
                  href="https://agentos.sh"
                  className="flex items-center gap-2 text-lg font-bold text-frame-green pb-2 border-b border-transparent hover:border-frame-green/30 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  AgentOS
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </motion.a>

                <motion.a
                  href="https://openstrand.ai"
                  className="flex items-center gap-2 text-lg font-medium text-ink-900 dark:text-paper-50 hover:text-frame-green pb-2 border-b border-transparent hover:border-frame-green/30 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28 }}
                >
                  ∞ OpenStrand ∞
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </motion.a>

                <motion.a
                  href="https://vca.chat"
                  className="flex items-center gap-2 text-lg font-medium text-ink-900 dark:text-paper-50 hover:text-frame-green pb-2 border-b border-transparent hover:border-frame-green/30 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.36 }}
                >
                  Marketplace
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </motion.a>
              </div>

              <div className="mt-auto pb-8 space-y-6">
                <div className="flex items-center justify-center">
                  <ThemeToggle />
                </div>
                <div className="flex gap-6 justify-center">
                  <motion.a
                    href="https://discord.gg/VXXC4SJMKh"
                    className="flex items-center gap-2 text-ink-600 dark:text-paper-300 hover:text-frame-green transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    <span className="text-sm font-medium">Discord</span>
                  </motion.a>
                  <motion.a
                    href="https://github.com/framersai"
                    className="flex items-center gap-2 text-ink-600 dark:text-paper-300 hover:text-frame-green transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-sm font-medium">GitHub</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop with blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}