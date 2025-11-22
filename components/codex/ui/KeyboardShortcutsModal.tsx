'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
  theme?: string
}

const SHORTCUTS = [
  { combo: '⌘ + K', description: 'Open command palette (planned)' },
  { combo: '/', description: 'Focus search' },
  { combo: 'm', description: 'Toggle metadata panel' },
  { combo: 'g h', description: 'Go to Codex home' },
  { combo: 's', description: 'Toggle sidebar (mobile)' },
]

export default function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[85]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">Keyboard</p>
                  <h3 className="text-lg font-semibold">Shortcuts</h3>
                </div>
                <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ul className="space-y-2">
                {SHORTCUTS.map((shortcut) => (
                  <li
                    key={shortcut.combo}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm"
                  >
                    <span className="font-mono text-xs bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">{shortcut.combo}</span>
                    <span className="text-zinc-600 dark:text-zinc-300">{shortcut.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


