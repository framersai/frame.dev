/**
 * Preferences/settings modal for the Codex viewer
 * Adds support for toggling history tracking, in addition to the base settings UI.
 */

'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Sun,
  Moon,
  Palette,
  Sparkles,
  Type,
  LayoutGrid,
  Sidebar,
  Trash2,
  BookOpenCheck,
} from 'lucide-react'
import type { UserPreferences } from '@/lib/localStorage'
import { clearCodexCache, getCodexCacheStats, type CodexCacheStats } from '@/lib/codexCache'

const THEME_PRESETS: Array<{
  id: UserPreferences['theme']
  label: string
  description: string
  swatch: string
  icon: JSX.Element
}> = [
  {
    id: 'light',
    label: 'Light',
    description: 'Crisp paper',
    swatch: 'from-slate-50 via-white to-slate-100 text-slate-900',
    icon: <Sun className="w-5 h-5 text-amber-500" />,
  },
  {
    id: 'dark',
    label: 'Dark',
    description: 'Midnight glass',
    swatch: 'from-slate-900 via-slate-800 to-slate-900 text-slate-100',
    icon: <Moon className="w-5 h-5 text-cyan-200" />,
  },
  {
    id: 'sepia-light',
    label: 'Sepia Light',
    description: 'Notebook glow',
    swatch: 'from-amber-50 via-orange-50 to-amber-100 text-amber-900',
    icon: <Palette className="w-5 h-5 text-amber-700" />,
  },
  {
    id: 'sepia-dark',
    label: 'Sepia Dark',
    description: 'Candlelight',
    swatch: 'from-amber-900 via-stone-900 to-stone-950 text-amber-100',
    icon: <Sparkles className="w-5 h-5 text-amber-200" />,
  },
]

interface PreferencesModalProps {
  isOpen: boolean
  onClose: () => void
  preferences: UserPreferences
  onThemeChange: (theme: UserPreferences['theme']) => void
  onFontSizeChange: (size: number) => void
  onTreeDensityChange: (density: UserPreferences['treeDensity']) => void
  onSidebarModeChange: (mode: UserPreferences['defaultSidebarMode']) => void
  onSidebarOpenMobileChange: (open: boolean) => void
  onHistoryTrackingChange?: (enabled: boolean) => void
  onReset: () => void
  onClearAll: () => void
}

/**
 * Preferences modal with local-only data management options.
 */
export default function PreferencesModal({
  isOpen,
  onClose,
  preferences,
  onThemeChange,
  onFontSizeChange,
  onTreeDensityChange,
  onSidebarModeChange,
  onSidebarOpenMobileChange,
  onHistoryTrackingChange,
  onReset,
  onClearAll,
}: PreferencesModalProps) {
  const [cacheStats, setCacheStats] = React.useState<CodexCacheStats | null>(null)
  const [cacheLoading, setCacheLoading] = React.useState(false)

  React.useEffect(() => {
    if (!isOpen) return
    let cancelled = false
    setCacheLoading(true)
    getCodexCacheStats()
      .then((stats) => {
        if (!cancelled) {
          setCacheStats(stats)
        }
      })
      .catch((error) => {
        console.warn('[PreferencesModal] Failed to load Codex cache stats', error)
      })
      .finally(() => {
        if (!cancelled) setCacheLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isOpen])

  if (!isOpen) return null

  const humanReadableCacheSize =
    cacheStats && cacheStats.totalBytes > 0
      ? cacheStats.totalBytes > 1024 * 1024
        ? `${(cacheStats.totalBytes / (1024 * 1024)).toFixed(1)} MB`
        : `${(cacheStats.totalBytes / 1024).toFixed(1)} KB`
      : '0 KB'

  const historyEnabled = preferences.historyTrackingEnabled ?? true

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Preferences</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                  aria-label="Close preferences"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Theme */}
                <section>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                    <Sun className="w-4 h-4" />
                    Theme & Atmosphere
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {THEME_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => onThemeChange(preset.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          preferences.theme === preset.id
                            ? 'border-frame-green/70 bg-zinc-100/70 dark:bg-zinc-800'
                            : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                        }`}
                      >
                        <div className="flex items-center justify-start gap-3">
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${preset.swatch} shadow-inner`}
                            aria-hidden
                          >
                            {preset.icon}
                          </span>
                          <div className="text-left">
                            <span className="text-sm font-semibold capitalize">{preset.label}</span>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{preset.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Font Size */}
                <section>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                    <Type className="w-4 h-4" />
                    Font Size: {(preferences.fontSize * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.8"
                    max="1.5"
                    step="0.05"
                    value={preferences.fontSize}
                    onChange={(e) => onFontSizeChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-zinc-500 mt-1">
                    <span>80%</span>
                    <span>150%</span>
                  </div>
                </section>

                {/* Tree Density */}
                <section>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                    <LayoutGrid className="w-4 h-4" />
                    Tree Density
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['compact', 'normal', 'comfortable'] as const).map((density) => (
                      <button
                        key={density}
                        onClick={() => onTreeDensityChange(density)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          preferences.treeDensity === density
                            ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-200 dark:bg-zinc-700'
                            : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                        }`}
                      >
                        <span className="capitalize text-sm font-medium">{density}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Sidebar Defaults */}
                <section>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                    <Sidebar className="w-4 h-4" />
                    Default Sidebar View
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {([{ id: 'tree' as const, label: 'Tree' }, { id: 'toc' as const, label: 'Outline' }]).map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => onSidebarModeChange(mode.id)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          preferences.defaultSidebarMode === mode.id
                            ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-200 dark:bg-zinc-700'
                            : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                        }`}
                      >
                        <span className="text-sm font-medium">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Mobile Sidebar Toggle */}
                <section>
                  <label className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    <span>Open Sidebar by Default on Mobile</span>
                    <button
                      onClick={() => onSidebarOpenMobileChange(!preferences.sidebarOpenMobile)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.sidebarOpenMobile ? 'bg-cyan-600 dark:bg-cyan-500' : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          preferences.sidebarOpenMobile ? 'translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </label>
                </section>

                {/* History Tracking */}
                <section>
                  <label className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    <span className="inline-flex items-center gap-2">
                      <BookOpenCheck className="w-4 h-4" />
                      Track Reading History
                    </span>
                    <button
                      onClick={() => onHistoryTrackingChange?.(!historyEnabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        historyEnabled ? 'bg-green-600 dark:bg-green-500' : 'bg-zinc-300 dark:bg-zinc-600'
                      } ${onHistoryTrackingChange ? '' : 'opacity-50 cursor-not-allowed'}`}
                      disabled={!onHistoryTrackingChange}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          historyEnabled ? 'translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </label>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Keeps a local-only log of viewed strands to power history and timeline. Disable to stop tracking and optionally clear existing history.
                  </p>
                </section>

                <hr className="border-zinc-200 dark:border-zinc-800" />

                {/* Data Management */}
                <section className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Data Management</h3>
                    <p className="text-xs text-zinc-500">
                      All Codex preferences, bookmarks, history, and cache live only in your browser. Nothing is sent to Frame.dev.
                    </p>
                  </div>

                  <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Codex SQL Cache (IndexedDB)</p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {cacheLoading
                          ? 'Calculating...'
                          : `Cached strands: ${cacheStats?.totalItems ?? 0} • Approx. size: ${humanReadableCacheSize}`}
                      </p>
                    </div>
                    <button
                      onClick={async () => {
                        if (
                          !confirm(
                            'Clear the Codex SQL cache? This removes locally cached strands but keeps bookmarks and history.'
                          )
                        ) {
                          return
                        }
                        setCacheLoading(true)
                        try {
                          await clearCodexCache()
                          const stats = await getCodexCacheStats()
                          setCacheStats(stats)
                        } finally {
                          setCacheLoading(false)
                        }
                      }}
                      className="py-1.5 px-3 text-xs bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition-colors"
                      disabled={cacheLoading}
                    >
                      {cacheLoading ? 'Clearing…' : 'Clear Cache'}
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={onReset}
                      className="flex-1 py-2 px-4 text-sm bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition-colors"
                    >
                      Reset Preferences
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Clear all bookmarks, history, and preferences? This cannot be undone.')) {
                          onClearAll()
                          onClose()
                        }
                      }}
                      className="flex-1 py-2 px-4 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear All Data
                    </button>
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                <p className="text-xs text-zinc-500 text-center">
                  Changes are saved automatically • Data never leaves your browser
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

