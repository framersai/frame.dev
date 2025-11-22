/**
 * Toolbar component for Frame Codex viewer
 * Includes navigation shortcuts, contribution helpers, and TTS controls
 * @module codex/CodexToolbar
 */

'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Bot,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  Clock,
  Code,
  Edit3,
  FileText,
  FolderTree,
  GitPullRequest,
  HelpCircle,
  Info,
  LifeBuoy,
  Map,
  Network,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  Square,
  Star,
  Volume2,
  Wand2,
} from 'lucide-react'
import { REPO_CONFIG } from './constants'

interface ToolbarFileRef {
  path: string
  name: string
}

interface TTSState {
  isPlaying: boolean
  isPaused: boolean
  isSupported: boolean
}

interface TTSSettings {
  volume: number
  rate: number
  pitch: number
  voiceURI: string | null
}

interface CodexToolbarProps {
  currentPath: string
  metaOpen: boolean
  onToggleMeta: () => void
  currentFile: ToolbarFileRef | null
  isBookmarked?: boolean
  onToggleBookmark?: () => void
  onOpenBookmarks?: () => void
  onOpenPreferences?: () => void
  onOpenHelp?: () => void
  onOpenGraph?: () => void
  onOpenTimeline?: () => void
  onOpenContribute?: () => void
  onOpenEditor?: () => void
  onOpenQA?: () => void
  theme?: string
  ttsState?: TTSState
  ttsSettings?: TTSSettings
  ttsVoices?: SpeechSynthesisVoice[]
  ttsSupported?: boolean
  onTTSPlay?: () => void
  onTTSPause?: () => void
  onTTSResume?: () => void
  onTTSStop?: () => void
  onTTSVolumeChange?: (volume: number) => void
  onTTSRateChange?: (rate: number) => void
  onTTSPitchChange?: (pitch: number) => void
  onTTSVoiceChange?: (voiceURI: string) => void
}

const baseButton =
  'inline-flex items-center gap-1.5 px-3 md:px-4 py-2.5 text-xs rounded-lg border transition-colors touch-manipulation min-h-[44px]'

export default function CodexToolbar({
  currentPath,
  metaOpen,
  onToggleMeta,
  currentFile,
  isBookmarked,
  onToggleBookmark,
  onOpenBookmarks,
  onOpenPreferences,
  onOpenHelp,
  onOpenGraph,
  onOpenTimeline,
  onOpenContribute,
  onOpenEditor,
  onOpenQA,
  theme = 'light',
  ttsState,
  ttsSettings,
  ttsVoices = [],
  ttsSupported = false,
  onTTSPlay,
  onTTSPause,
  onTTSResume,
  onTTSStop,
  onTTSVolumeChange,
  onTTSRateChange,
  onTTSPitchChange,
  onTTSVoiceChange,
}: CodexToolbarProps) {
  const [quickActionsOpen, setQuickActionsOpen] = useState(false)
  const [ttsPanelOpen, setTtsPanelOpen] = useState(false)
  const quickActionsRef = useRef<HTMLDivElement | null>(null)
  const ttsPanelRef = useRef<HTMLDivElement | null>(null)

  const isDark = theme.includes('dark')
  const neutralButton = `${baseButton} ${
    isDark
      ? 'border-zinc-700 text-zinc-200 hover:bg-zinc-800 active:bg-zinc-700'
      : 'border-zinc-200 text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200'
  }`
  const accentButton = `${baseButton} ${
    isDark
      ? 'border-emerald-500 text-emerald-300 bg-emerald-900/10 hover:bg-emerald-900/20'
      : 'border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
  } font-semibold`

  const currentDir = currentPath || ''
  const baseNewUrl = `https://github.com/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}/new/${REPO_CONFIG.BRANCH}/${
    currentDir ? `${currentDir}/` : ''
  }`
  const addStrandUrl = `${baseNewUrl}?filename=new-strand.md`
  const pathSegments = currentDir.split('/').filter(Boolean)
  let yamlSuggestion = ''
  if (pathSegments[0] === 'weaves') {
    if (pathSegments.length === 2) {
      yamlSuggestion = 'weave.yaml'
    } else if (pathSegments.length > 2) {
      yamlSuggestion = 'loom.yaml'
    }
  }
  const addYamlUrl = yamlSuggestion ? `${baseNewUrl}?filename=${yamlSuggestion}` : ''

  const ttsStateSafe: TTSState = ttsState ?? { isPaused: false, isPlaying: false, isSupported: ttsSupported }
  const ttsSettingsSafe: TTSSettings = ttsSettings ?? {
    volume: 1,
    rate: 1,
    pitch: 1,
    voiceURI: null,
  }

  const sortedVoices = useMemo(() => {
    return [...ttsVoices].sort((a, b) => a.name.localeCompare(b.name))
  }, [ttsVoices])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (quickActionsOpen && quickActionsRef.current && !quickActionsRef.current.contains(event.target as Node)) {
        setQuickActionsOpen(false)
      }
      if (ttsPanelOpen && ttsPanelRef.current && !ttsPanelRef.current.contains(event.target as Node)) {
        setTtsPanelOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [quickActionsOpen, ttsPanelOpen])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setQuickActionsOpen(false)
        setTtsPanelOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const statusBadge = ttsStateSafe.isPlaying ? 'Speaking' : ttsStateSafe.isPaused ? 'Paused' : 'Idle'
  const panelBg = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`flex flex-wrap items-center gap-3 text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}
      >
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
            isDark ? 'border-zinc-700 bg-zinc-900/60' : 'border-zinc-200 bg-white/80'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <div className="flex flex-col leading-tight max-w-[240px]">
            <span className="font-medium truncate text-zinc-900 dark:text-zinc-100">
              {currentFile?.name || currentDir || 'Root'}
            </span>
            <span className="text-[11px] uppercase tracking-wide opacity-70 truncate">
              {currentFile?.path || currentDir || '/'}
            </span>
          </div>
        </div>
        {currentFile && (
          <a
            href={`https://github.com/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}/blob/${REPO_CONFIG.BRANCH}/${currentFile.path}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs font-medium ${
              isDark ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-600 hover:text-cyan-500'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            View on GitHub
          </a>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link href="/codex/search" className={neutralButton} title="Advanced search (/)" prefetch={false}>
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </Link>

        <Link href="/codex/architecture" className={neutralButton} title="Architecture diagram" prefetch={false}>
          <Map className="w-4 h-4" />
          <span className="hidden md:inline">Diagram</span>
        </Link>

        {onOpenGraph && (
          <button onClick={onOpenGraph} className={neutralButton} title="Knowledge graph (g)">
            <Network className="w-4 h-4" />
            <span className="hidden md:inline">Graph</span>
          </button>
        )}

        {onOpenTimeline && (
          <button onClick={onOpenTimeline} className={neutralButton} title="Reading timeline">
            <Clock className="w-4 h-4" />
            <span className="hidden md:inline">Timeline</span>
          </button>
        )}

        <button
          onClick={onToggleMeta}
          className={`${neutralButton} ${
            metaOpen
              ? isDark
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                : 'border-zinc-400 bg-zinc-200 text-zinc-900'
              : ''
          }`}
          title="Toggle metadata panel (m)"
        >
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">Info</span>
        </button>

        {currentFile && onToggleBookmark && (
          <button
            onClick={onToggleBookmark}
            className={`${neutralButton} ${
              isBookmarked
                ? 'border-amber-400 bg-amber-50 text-amber-800 dark:border-amber-500 dark:bg-amber-900/20 dark:text-amber-200'
                : ''
            }`}
            title={isBookmarked ? 'Remove bookmark (b)' : 'Bookmark strand (b)'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span className="hidden md:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
        )}

        {onOpenBookmarks && (
          <button onClick={onOpenBookmarks} className={neutralButton} title="Bookmarks & history">
            <Star className="w-4 h-4" />
            <span className="hidden md:inline">Bookmarks</span>
          </button>
        )}

        {onOpenEditor && (
          <button
            onClick={onOpenEditor}
            className={`${neutralButton} ${!currentFile ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!currentFile}
            title="Strand editor (e)"
          >
            <Edit3 className="w-4 h-4" />
            <span className="hidden md:inline">Edit</span>
          </button>
        )}

        {onOpenQA && (
          <button onClick={onOpenQA} className={neutralButton} title="Ask Codex (q)">
            <Bot className="w-4 h-4" />
            <span className="hidden md:inline">Ask</span>
          </button>
        )}

        {ttsSupported && (
          <div className="relative" ref={ttsPanelRef}>
            <button
              onClick={() => setTtsPanelOpen((prev) => !prev)}
              className={`${neutralButton} ${ttsPanelOpen ? 'ring-2 ring-cyan-400/60' : ''}`}
              aria-haspopup="dialog"
              aria-expanded={ttsPanelOpen}
              title="Read aloud"
              disabled={!currentFile}
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden lg:inline">Read aloud</span>
              <span
                className={`hidden lg:inline text-[11px] px-2 py-0.5 rounded-full border ${
                  isDark ? 'border-zinc-700 text-zinc-300' : 'border-zinc-200 text-zinc-600'
                }`}
              >
                {statusBadge}
              </span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {ttsPanelOpen && (
              <div className={`absolute right-0 mt-2 w-80 rounded-xl border shadow-2xl z-50 ${panelBg}`}>
                <div
                  className={`px-4 py-3 border-b ${
                    isDark ? 'border-zinc-800 text-zinc-200' : 'border-zinc-200 text-zinc-700'
                  } flex items-center justify-between`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wide">Text to speech</span>
                    <span className="text-[11px] opacity-70">{currentFile?.name || 'Select a strand'}</span>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      ttsStateSafe.isPlaying
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                    }`}
                  >
                    {statusBadge}
                  </span>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        if (ttsStateSafe.isPlaying) {
                          onTTSPause?.()
                        } else if (ttsStateSafe.isPaused) {
                          onTTSResume?.()
                        } else {
                          onTTSPlay?.()
                        }
                      }}
                      className={`${baseButton} flex-1 justify-center ${
                        isDark
                          ? 'border-cyan-600 text-cyan-200 hover:bg-cyan-900/30'
                          : 'border-cyan-500 text-cyan-700 hover:bg-cyan-50'
                      }`}
                      disabled={!currentFile || !onTTSPlay}
                    >
                      {ttsStateSafe.isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          Pause
                        </>
                      ) : ttsStateSafe.isPaused ? (
                        <>
                          <Play className="w-4 h-4" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Play
                        </>
                      )}
                    </button>
                    <button
                      onClick={ttsStateSafe.isPaused || ttsStateSafe.isPlaying ? onTTSStop : undefined}
                      className={`${baseButton} flex-1 justify-center ${
                        isDark
                          ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                          : 'border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                      }`}
                      disabled={!ttsStateSafe.isPaused && !ttsStateSafe.isPlaying}
                    >
                      <Square className="w-4 h-4" />
                      Stop
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Voice</span>
                      <select
                        className={`text-sm px-3 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-zinc-900 border-zinc-700 text-zinc-200'
                            : 'bg-white border-zinc-200 text-zinc-700'
                        }`}
                        value={ttsSettingsSafe.voiceURI ?? ''}
                        onChange={(event) => onTTSVoiceChange?.(event.target.value || '')}
                      >
                        <option value="">System default</option>
                        {sortedVoices.map((voice) => (
                          <option key={voice.voiceURI} value={voice.voiceURI}>
                            {voice.name} {voice.lang ? `(${voice.lang})` : ''}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Volume ({Math.round(ttsSettingsSafe.volume * 100)}%)</span>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={ttsSettingsSafe.volume}
                        onChange={(event) => onTTSVolumeChange?.(Number(event.target.value))}
                      />
                    </label>

                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Rate ({ttsSettingsSafe.rate.toFixed(2)}×)</span>
                      <input
                        type="range"
                        min={0.5}
                        max={2}
                        step={0.05}
                        value={ttsSettingsSafe.rate}
                        onChange={(event) => onTTSRateChange?.(Number(event.target.value))}
                      />
                    </label>

                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Pitch ({ttsSettingsSafe.pitch.toFixed(2)})</span>
                      <input
                        type="range"
                        min={0.5}
                        max={2}
                        step={0.05}
                        value={ttsSettingsSafe.pitch}
                        onChange={(event) => onTTSPitchChange?.(Number(event.target.value))}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {onOpenContribute && (
          <button onClick={onOpenContribute} className={accentButton} title="Open contribute modal">
            <Wand2 className="w-4 h-4" />
            <span className="hidden md:inline">Contribute</span>
          </button>
        )}

        <div className="relative" ref={quickActionsRef}>
          <button
            onClick={() => setQuickActionsOpen((prev) => !prev)}
            className={`${neutralButton} ${quickActionsOpen ? 'ring-2 ring-emerald-400/50' : ''}`}
            aria-haspopup="menu"
            aria-expanded={quickActionsOpen}
            title="Quick GitHub actions"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden lg:inline">Quick add</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>
          {quickActionsOpen && (
            <div className={`absolute right-0 mt-2 w-80 rounded-xl border shadow-2xl z-40 ${panelBg} overflow-hidden`}>
              <div
                className={`px-4 py-2 text-xs font-medium ${
                  isDark ? 'bg-zinc-900 text-zinc-200' : 'bg-zinc-50 text-zinc-600'
                } border-b ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}
              >
                Contribute to {currentDir || 'root'}.
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
                <a
                  href={addStrandUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/70"
                >
                  <FileText className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Add Markdown strand</span>
                </a>
                {addYamlUrl && (
                  <a
                    href={addYamlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/70"
                  >
                    <Code className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                    <span>Add {yamlSuggestion} manifest</span>
                  </a>
                )}
                <a
                  href={`https://github.com/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}/compare`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/70"
                >
                  <GitPullRequest className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Open Compare &amp; PR</span>
                </a>
                <a
                  href={`https://github.com/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}#contributing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/70"
                >
                  <HelpCircle className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <span>Read contribution guide</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {onOpenPreferences && (
          <button onClick={onOpenPreferences} className={neutralButton} title="Preferences (,)">
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">Settings</span>
          </button>
        )}

        {onOpenHelp && (
          <button onClick={onOpenHelp} className={neutralButton} title="Help & shortcuts (?)">
            <LifeBuoy className="w-4 h-4" />
            <span className="hidden md:inline">Help</span>
          </button>
        )}
      </div>
    </div>
  )
}


