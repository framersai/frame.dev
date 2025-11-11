'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Github, Package, ExternalLink, Layers, GitBranch, Box, Download, X } from 'lucide-react'

const pages = [
  {
    id: 'overview',
    title: 'Built on OpenStrand',
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-xl sm:text-2xl font-semibold tracking-tight">
            <span
              style={{
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              O
            </span>
            pen
            <span
              className="ml-0.5"
              style={{
                background: 'linear-gradient(135deg, #10B981, #22C55E, #A7F3D0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              S
            </span>
            trand
          </span>
        </div>
        <p className="text-base body-text">
          OpenStrand is a modern personal knowledge management system (PKMS) that combines the power of AI with local-first data ownership. 
          Build your second brain with knowledge graph visualization, multi-format import (20+ formats), and block-level organization—while keeping complete control of your information.
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
            <Layers className="w-10 h-10 mx-auto mb-2 text-frame-green" />
            <p className="text-sm font-semibold">TypeScript everywhere</p>
            <p className="text-xs text-ink-600 dark:text-paper-400 mt-1">Fastify API, Next.js UI, and SDKs in one workspace</p>
          </div>
          <div className="text-center p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
            <GitBranch className="w-10 h-10 mx-auto mb-2 text-frame-green" />
            <p className="text-sm font-semibold">Local-first knowledge graph</p>
            <p className="text-xs text-ink-600 dark:text-paper-400 mt-1">Prisma schema targets PostgreSQL or embedded PGlite</p>
          </div>
          <div className="text-center p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
            <Box className="w-10 h-10 mx-auto mb-2 text-frame-green" />
            <p className="text-sm font-semibold">Automation ready</p>
            <p className="text-xs text-ink-600 dark:text-paper-400 mt-1">Scripts & SDK bootstrap local, self-hosted, or cloud builds</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a 
            href="https://openstrand.ai"
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2 text-sm"
          >
            <Download className="w-5 h-5" />
            Get Community Edition
          </a>
          <a 
            href="https://openstrand.ai/signup" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center justify-center gap-2 px-5 py-2 text-sm"
          >
            Sign Up Now
          </a>
        </div>
      </div>
    )
  },
  {
    id: 'architecture',
    title: 'Architecture',
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm body-text">
            The OpenStrand slip-box is modelled as recursive strands linked by typed edges. Each strand carries content, 
            provenance, authorship, and visibility metadata; every relationship is captured through `StrandLinkType` 
            (<code className="font-mono text-xs">STRUCTURAL</code>, <code className="font-mono text-xs">CONCEPTUAL</code>, 
            <code className="font-mono text-xs">PLACEHOLDER</code>, etc.). Hierarchies guarantee a single structural parent per scope, 
            while still allowing cross-scope reuse, citations, and derivations.
          </p>
          <p className="text-sm body-text">
            Integrity is enforced by <code className="font-mono text-xs">StrandHierarchy</code> and <code className="font-mono text-xs">StrandVisibilityCache</code>. 
            Structure mutations travel through approval queues, background cascades, and optional Slack/email webhooks—keeping PKMS workflows auditable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-paper-100 dark:bg-ink-800/70 rounded-lg">
            <p className="font-semibold text-sm mb-1">Collaborative strands</p>
            <p className="text-xs text-ink-600 dark:text-paper-400">
              Authorship, co-authoring, provenance, link justification, and approval states are first-class fields.
            </p>
          </div>
          <div className="p-4 bg-paper-100 dark:bg-ink-800/70 rounded-lg">
            <p className="font-semibold text-sm mb-1">Local ↔ Cloud symmetry</p>
            <p className="text-xs text-ink-600 dark:text-paper-400">
              PGlite fallback for offline builds, PostgreSQL for team deployments, same Prisma schema powering both.
            </p>
          </div>
          <div className="p-4 bg-paper-100 dark:bg-ink-800/70 rounded-lg">
            <p className="font-semibold text-sm mb-1">Automation-first scripts</p>
            <p className="text-xs text-ink-600 dark:text-paper-400">
              `start-local.sh` bootstraps the workspace, sets env flags, and runs API + App with workspace-aware installs.
            </p>
          </div>
          <div className="p-4 bg-paper-100 dark:bg-ink-800/70 rounded-lg">
            <p className="font-semibold text-sm mb-1">Open documentation</p>
            <p className="text-xs text-ink-600 dark:text-paper-400">
              Architecture, intelligent data pipeline, i18n system, packaging and deployment guides live in `docs/`.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'resources',
    title: 'Resources',
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <a href="https://github.com/framersai/openstrand" target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-3 p-4 bg-paper-100 dark:bg-ink-800 rounded-lg hover:bg-paper-200 dark:hover:bg-ink-700 transition-all group">
            <Github className="w-6 h-6 text-ink-600 dark:text-paper-300 group-hover:text-frame-green" />
            <div className="flex-1">
              <p className="font-semibold">
                <span
                  style={{
                    background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >O</span>pen<span
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #22C55E, #A7F3D0)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >S</span>trand Core
              </p>
              <p className="text-sm text-ink-500 dark:text-paper-500">github.com/framersai/openstrand</p>
            </div>
            <ExternalLink className="w-4 h-4 text-ink-400" />
          </a>
          
          <a href="https://npmjs.com/org/framers" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 p-4 bg-paper-100 dark:bg-ink-800 rounded-lg hover:bg-paper-200 dark:hover:bg-ink-700 transition-all group">
            <Package className="w-6 h-6 text-red-600 group-hover:text-frame-green" />
            <div className="flex-1">
              <p className="font-semibold">NPM Packages</p>
              <p className="text-sm text-ink-500 dark:text-paper-500">@framers/openstrand</p>
            </div>
            <ExternalLink className="w-4 h-4 text-ink-400" />
          </a>

          <a href="https://openstrand.ai/docs" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 p-4 bg-paper-100 dark:bg-ink-800 rounded-lg hover:bg-paper-200 dark:hover:bg-ink-700 transition-all group">
            <Layers className="w-6 h-6 text-frame-green group-hover:text-frame-green-dark" />
            <div className="flex-1">
              <p className="font-semibold">Documentation Hub</p>
              <p className="text-sm text-ink-500 dark:text-paper-500">Architecture, pipelines, packaging, deployment</p>
            </div>
            <ExternalLink className="w-4 h-4 text-ink-400" />
          </a>
          <div className="flex items-center gap-3 p-4 bg-paper-100 dark:bg-ink-800 rounded-lg">
            <a href="https://openstrand.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <img src="/openstrand-logo.svg" alt="OpenStrand" className="h-6 w-auto dark:hidden" />
              <img src="/openstrand-logo-mono.svg" alt="OpenStrand" className="hidden h-6 w-auto dark:block" />
            </a>
            <div className="text-sm text-ink-600 dark:text-paper-400">AI-native knowledge infrastructure</div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-frame-green/10 to-frame-green-dark/10 rounded-lg">
          <p className="text-sm font-semibold mb-2">Join the Community</p>
          <p className="text-xs text-ink-600 dark:text-paper-400 mb-3">
            Get involved in shaping the future of distributed operating systems
          </p>
          <a 
            href="https://openstrand.ai/community" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-frame-green font-semibold hover:underline"
          >
            Join Discord Community
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        
        <div className="pt-4 border-t border-ink-200/20 dark:border-paper-200/10">
          <p className="text-xs text-center text-ink-500 dark:text-paper-500">
            MIT Licensed • Open Source • Community Driven
          </p>
        </div>
      </div>
    )
  }
]

export default function OpenStrandPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  // ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  return (
    <>
      <button
        className="text-2xl md:text-3xl body-text font-light relative group inline-flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-frame-green">
          ∞
        </span>
        <span className="relative">
          <span className="relative z-10 border-b-2 border-dotted border-frame-green/40 hover:border-frame-green/60 transition-colors">
            The <span className="font-bold bg-gradient-to-r from-frame-green to-frame-green-dark bg-clip-text text-transparent">OS</span> for your life
          </span>
        </span>
        <span className="text-frame-green">
          ∞
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - Less blur, more visible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/35 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Premium Modal - Consistent styling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.25 }}
                className="pointer-events-auto w-full max-w-3xl h-[80vh] sm:h-[75vh] overflow-hidden rounded-3xl bg-paper-50 dark:bg-ink-900 flex flex-col shadow-2xl"
              >
              {/* Header with logo */}
              <div className="p-3 sm:p-6 pb-3 sm:pb-4 border-b border-ink-200/10 dark:border-paper-200/10 bg-gradient-to-r from-paper-100/50 to-paper-50/50 dark:from-ink-800/50 dark:to-ink-900/50">
                <div className="flex items-center justify-center">
                  <a href="https://openstrand.ai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <img src="/openstrand-logo.svg" alt="OpenStrand" className="h-10 w-auto dark:hidden" />
                    <img src="/openstrand-logo-gradient.svg" alt="OpenStrand" className="hidden h-10 w-auto dark:block" />
                  </a>
                </div>
              </div>

              {/* Content Pages */}
              <div className="p-3 sm:p-8 flex-1 min-h-0 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 heading-display">
                      {pages[currentPage].title}
                    </h3>
                    {pages[currentPage].content}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between px-4 sm:px-8 pb-4 sm:pb-6">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-lg transition-all ${
                    currentPage === 0 
                      ? 'opacity-30 cursor-not-allowed' 
                      : 'hover:bg-paper-100 dark:hover:bg-ink-800'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Dots */}
                <div className="flex gap-2">
                  {pages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === currentPage 
                          ? 'w-8 bg-frame-green' 
                          : 'w-2 bg-ink-300 dark:bg-ink-700 hover:bg-ink-400 dark:hover:bg-ink-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
                  disabled={currentPage === pages.length - 1}
                  className={`p-2 rounded-lg transition-all ${
                    currentPage === pages.length - 1 
                      ? 'opacity-30 cursor-not-allowed' 
                      : 'hover:bg-paper-100 dark:hover:bg-ink-800'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-paper-100 dark:hover:bg-ink-800 transition-colors"
                aria-label="Close (ESC)"
                title="Press ESC to close"
              >
                <X className="w-5 h-5" />
              </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}