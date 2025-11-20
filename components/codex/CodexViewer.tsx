/**
 * Frame Codex Viewer - Main orchestrator component
 * Coordinates sidebar, content, metadata panel, and state management
 * @module codex/CodexViewer
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Info, FileText, Hash, X } from 'lucide-react'
import type { GitHubFile, SidebarMode, FrameCodexViewerProps } from './types'
import { parseWikiMetadata, shouldIgnorePath, isMarkdownFile } from './utils'
import { API_ENDPOINTS, REPO_CONFIG } from './constants'
import { useGithubTree } from './hooks/useGithubTree'
import { useCodexHotkeys } from './hooks/useCodexHotkeys'
import { useBookmarks } from './hooks/useBookmarks'
import { usePreferences } from './hooks/usePreferences'
import { useSwipeGesture } from './hooks/useSwipeGesture'
import { useTextToSpeech } from './hooks/useTextToSpeech'
import { usePWA } from './hooks/usePWA'
import { clearAllCodexData } from '@/lib/localStorage'
import { getCachedStrand, setCachedStrand } from '@/lib/codexCache'
import CodexSidebar from './CodexSidebar'
import CodexContent from './CodexContent'
import CodexMetadataPanel from './CodexMetadataPanel'
import CodexToolbar from './CodexToolbar'
import MobileToggle from './ui/MobileToggle'
import MetadataToggleFAB from './ui/MetadataToggleFAB'
import BookmarksPanel from './ui/BookmarksPanel'
import PreferencesModal from './ui/PreferencesModal'
import TutorialTour from './ui/TutorialTour'
import HelpInfoPanel from './ui/HelpInfoPanel'
import MobileBottomNav from './ui/MobileBottomNav'
import dynamic from 'next/dynamic'

// Lazy load heavy components for better initial load performance
const KnowledgeGraphView = dynamic(() => import('./ui/KnowledgeGraphView'), { ssr: false })
const TimelineView = dynamic(() => import('./ui/TimelineView'), { ssr: false })
const ContributeModal = dynamic(() => import('./ui/ContributeModal'), { ssr: false })
const ApiStatusBanner = dynamic(() => import('./ui/ApiStatusBanner'), { ssr: false })
const SettingsModal = dynamic(() => import('./ui/SettingsModal'), { ssr: false })
const StrandEditor = dynamic(() => import('./ui/StrandEditor'), { ssr: false })
const QAInterface = dynamic(() => import('./ui/QAInterface'), { ssr: false })
const KeyboardShortcutsModal = dynamic(() => import('./ui/KeyboardShortcutsModal'), { ssr: false })
import { TUTORIALS, type TutorialId } from './tutorials'
import { useSearchFilter } from './hooks/useSearchFilter'
import { getSearchEngine } from '@/lib/search/engine'
import type { CodexSearchResult } from '@/lib/search/types'
import SearchResultsPanel from './ui/SearchResultsPanel'
import PWAInstallBanner from './ui/PWAInstallBanner'
import { ToastProvider, useToast } from './ui/Toast'

/**
 * Main Frame Codex viewer component
 * 
 * @remarks
 * **Features:**
 * - Full-screen modal or embedded page mode
 * - Knowledge tree with hierarchical navigation
 * - Advanced search (name + full-text, case-sensitive)
 * - Markdown rendering with syntax highlighting
 * - Wiki-style internal links
 * - Metadata panel with backlinks
 * - Keyboard shortcuts (m, /, g h, s)
 * - Mobile-responsive (80vw sidebar, 56px FAB, 44px+ touch targets)
 * - Analog styling (paper texture, inner shadows)
 * - URL-based navigation with query params
 * 
 * **Architecture:**
 * - Modular: 8 components + 3 hooks + utilities
 * - Type-safe: Full TypeScript with TSDoc
 * - Accessible: ARIA labels, keyboard nav, focus management
 * - Performant: Debounced search, pagination, lazy loading
 * 
 * @example
 * ```tsx
 * // Modal mode
 * <FrameCodexViewer
 *   isOpen={modalOpen}
 *   onClose={() => setModalOpen(false)}
 *   mode="modal"
 * />
 * 
 * // Page mode
 * <FrameCodexViewer
 *   isOpen={true}
 *   mode="page"
 *   initialPath="weaves/tech"
 * />
 * ```
 */
export default function FrameCodexViewer({
  isOpen,
  onClose,
  mode = 'modal',
  initialPath = '',
}: FrameCodexViewerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // State
  const [currentPath, setCurrentPath] = useState('')
  const [files, setFiles] = useState<GitHubFile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<GitHubFile | null>(null)
  const [fileContent, setFileContent] = useState<string>('')
  const [fileMetadata, setFileMetadata] = useState<Record<string, any>>({})
  const {
    options: searchOptions,
    setQuery: setSearchQueryInput,
    toggleSearchNames,
    toggleSearchContent,
    toggleCaseSensitive,
    setFilterScope,
    toggleHideEmptyFolders,
    setRootScope,
    filteredFiles,
    resetFilters: resetSearchFilters,
  } = useSearchFilter(files)
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('tree')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [metaOpen, setMetaOpen] = useState(true)
  const [rightPanelMode, setRightPanelMode] = useState<'metadata' | 'editor' | 'graph'>('metadata')
  const [expandedTreePaths, setExpandedTreePaths] = useState<Set<string>>(new Set())
  const [bookmarksOpen, setBookmarksOpen] = useState(false)
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const [activeTutorial, setActiveTutorial] = useState<TutorialId | null>(null)
  const [helpOpen, setHelpOpen] = useState(false)
  const [graphOpen, setGraphOpen] = useState(false)
  const [timelineOpen, setTimelineOpen] = useState(false)
  const [contributeOpen, setContributeOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const [qaOpen, setQAOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [summaryIndex, setSummaryIndex] = useState<Map<string, { summary?: string; lastIndexed?: string }>>(
    () => new Map()
  )
  const [searchResults, setSearchResults] = useState<CodexSearchResult[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [semanticEnabled, setSemanticEnabled] = useState(false)
  const [semanticSupported, setSemanticSupported] = useState(false)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [graphqlAvailable, setGraphqlAvailable] = useState(true)
  const [searchIndexAvailable, setSearchIndexAvailable] = useState(true)
  const [semanticStatus, setSemanticStatus] = useState<'ready' | 'degraded' | 'offline'>('ready')

  // Knowledge tree
  const {
    tree: knowledgeTree,
    loading: knowledgeTreeLoading,
    error: knowledgeTreeError,
    totalStrands: totalTreeStrands,
    totalWeaves: totalTreeWeaves,
    graphqlAvailable: githubGraphqlAvailable,
  } = useGithubTree()

  // Update local GraphQL status when tree hook reports it
  useEffect(() => {
    setGraphqlAvailable(githubGraphqlAvailable)
  }, [githubGraphqlAvailable])

  // Bookmarks and history
  const {
    bookmarks,
    history,
    isBookmarked,
    toggleBookmark,
    recordView,
    removeBookmark,
    removeFromHistory,
    clearAllBookmarks,
    clearAllHistory,
  } = useBookmarks()

  // User preferences
  const {
    preferences,
    updateTheme,
    updateFontSize,
    updateTreeDensity,
    updateDefaultSidebarMode,
    updateSidebarOpenMobile,
    updateMultiple,
    reset: resetPreferences,
  } = usePreferences()

  // Apply preferences
  useEffect(() => {
    setSidebarMode(preferences.defaultSidebarMode)
  }, [preferences.defaultSidebarMode])

  // Keyboard shortcuts
  useCodexHotkeys({
    onToggleMeta: () => setMetaOpen((v) => !v),
    onFocusSearch: () => {
      const input = document.getElementById('codex-search-input') as HTMLInputElement | null
      input?.focus()
    },
    onGoHome: () => router.push('/codex'),
    onToggleSidebar: () => setSidebarOpen((v) => !v),
    onToggleBookmarks: () => setBookmarksOpen((v) => !v),
    onOpenPreferences: () => setPreferencesOpen(true),
    onToggleHelp: () => setHelpOpen((v) => !v),
    onToggleEdit: selectedFile ? () => setEditorOpen((v) => !v) : undefined,
    onToggleQA: () => setQAOpen((v) => !v),
    onToggleShortcuts: () => setShortcutsOpen((v) => !v),
  })

  // Mobile swipe gestures
  useSwipeGesture({
    onSwipeRight: () => {
      if (window.innerWidth < 768 && !sidebarOpen) {
        setSidebarOpen(true)
      }
    },
    onSwipeLeft: () => {
      if (window.innerWidth < 768) {
        if (sidebarOpen) {
          setSidebarOpen(false)
        } else if (!metaOpen) {
          setMetaOpen(true)
        }
      }
    },
    onSwipeDown: () => {
      // Close any open modals on swipe down
      if (window.innerWidth < 768) {
        if (qaOpen) setQAOpen(false)
        else if (editorOpen) setEditorOpen(false)
        else if (graphOpen) setGraphOpen(false)
        else if (bookmarksOpen) setBookmarksOpen(false)
        else if (preferencesOpen) setPreferencesOpen(false)
        else if (helpOpen) setHelpOpen(false)
      }
    },
    threshold: 100,
  })

  // Text-to-Speech
  // Wrapped in useMemo to prevent TDZ errors during SSR/initial render
  const tts = useTextToSpeech()
  
  // PWA
  const pwa = usePWA()
  
  // Speak current file content
  const handleReadAloud = useCallback(() => {
    // Defensive check: tts may not be fully initialized on first render
    if (!tts || !fileContent) return
    if (typeof tts.speak === 'function') {
      tts.speak(fileContent)
    }
  }, [fileContent, tts])

  /**
   * Update URL when navigation changes (page mode only)
   */
  const updateURL = useCallback(
    (path: string, file?: string) => {
      if (mode === 'page') {
        const params = new URLSearchParams()
        if (path) params.set('path', path)
        if (file) params.set('file', file)

        const newPath = `${pathname}?${params.toString()}`
        router.push(newPath, { scroll: false })
      }
    },
    [mode, pathname, router]
  )

  /**
   * Load pre-computed Codex index (codex-index.json) for extractive summaries.
   * This file is generated by the Codex auto-indexer in GitHub Actions and
   * cached in SQLite based on content hash, so we only fetch a single JSON
   * blob here and reuse it for all strands.
   */
  useEffect(() => {
    let cancelled = false

    const fetchSummaryIndex = async () => {
      try {
        const indexUrl = API_ENDPOINTS.raw('codex-index.json')
        const response = await fetch(indexUrl)
        if (!response.ok) {
          // 404 is expected for non-Frame codex repos or when index isn't built yet
          if (!cancelled) setSearchIndexAvailable(false)
          return
        }

        const data = await response.json()
        if (!Array.isArray(data)) return

        const map = new Map<string, { summary?: string; lastIndexed?: string }>()
        data.forEach((entry: any) => {
          if (!entry || typeof entry.path !== 'string') return
          const metadata = entry.metadata || {}
          const auto = metadata.autoGenerated || {}
          map.set(entry.path, {
            summary: metadata.summary,
            lastIndexed: auto.lastIndexed,
          })
        })

        if (!cancelled) {
          setSummaryIndex(map)
          setSearchIndexAvailable(true)
        }
      } catch (err) {
        if (!cancelled) setSearchIndexAvailable(false)
      }
    }

    fetchSummaryIndex()

    return () => {
      cancelled = true
    }
  }, [])

  // Debounce search query for advanced ranking engines
  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim())
    }, 250)
    return () => window.clearTimeout(handle)
  }, [searchQuery])

  const handleSearchQueryChange = useCallback(
    (value: string) => {
      setSearchQueryInput(value)
      setSearchQuery(value)
    },
    [setSearchQueryInput],
  )

  const handleSearchReset = useCallback(() => {
    resetSearchFilters()
    setSearchQuery('')
    setSemanticEnabled(false)
  }, [resetSearchFilters])

  // Execute BM25 / semantic search when query changes
  useEffect(() => {
    let cancelled = false
    const query = debouncedSearchQuery

    if (!query) {
      setSearchResults([])
      setSearchError(null)
      setSearchLoading(false)
      return () => {
        cancelled = true
      }
    }

    const runSearch = async () => {
      setSearchLoading(true)
      setSearchError(null)
      try {
        const engine = getSearchEngine()
        const results = await engine.search(query, {
          limit: 25,
          semantic: semanticEnabled,
        })
        if (!cancelled) {
          setSemanticSupported(engine.canUseSemantic())
          setSearchResults(results)
        }
      } catch (err) {
        console.error('Advanced search error:', err)
        if (!cancelled) {
          setSearchError('Advanced search is temporarily unavailable.')
          setSearchResults([])
          setSemanticSupported(false)
        }
      } finally {
        if (!cancelled) {
          setSearchLoading(false)
        }
      }
    }

    runSearch()

    return () => {
      cancelled = true
    }
  }, [debouncedSearchQuery, semanticEnabled])

  /**
   * Fetch directory contents from GitHub API
   */
  const fetchContents = useCallback(
    async (path: string = ''): Promise<GitHubFile[]> => {
      let sortedData: GitHubFile[] = []
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(API_ENDPOINTS.contents(path))
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`)
        }

        const data = await response.json()
        const filtered = data.filter((item: GitHubFile) => !shouldIgnorePath(item.name))
        sortedData = filtered.sort((a: GitHubFile, b: GitHubFile) => {
          if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
          return a.name.localeCompare(b.name)
        })

        setFiles(sortedData)
        setCurrentPath(path)
        updateURL(path)
      } catch (err) {
        console.error('Error fetching contents:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch repository contents')
      } finally {
        setLoading(false)
      }
      return sortedData
    },
    [updateURL]
  )

  /**
   * Fetch file content from GitHub with optional SQL-backed cache.
   */
  const fetchFileContent = useCallback(
    async (file: GitHubFile) => {
      if (file.type !== 'file' || !file.download_url) return

      setLoading(true)
      setError(null)

      try {
        const cacheKey = file.path

        // Try cache first for instant load on repeat views.
        const cached = await getCachedStrand(cacheKey)
        let content = cached || ''

        if (!cached) {
          const response = await fetch(file.download_url)
          if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`)
          }

          content = await response.text()
          // Store in SQL-backed cache (IndexedDB/sql.js in browser, memory in SSR)
          await setCachedStrand(cacheKey, content)
        }

        setFileContent(content)
        setSelectedFile(file)

        // Parse metadata
        if (isMarkdownFile(file.name)) {
          const metadata = parseWikiMetadata(content)
          setFileMetadata(metadata)
        }

        // Record view in history
        recordView(file.path, file.name)

        updateURL(currentPath, file.path)
      } catch (err) {
        console.error('Error fetching file content:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch file content')
      } finally {
        setLoading(false)
      }
    },
    [currentPath, updateURL]
  )

  /**
   * Handle file/directory click
   */
  const handleFileClick = (file: GitHubFile) => {
    if (file.type === 'dir') {
      fetchContents(file.path)
    } else {
      fetchFileContent(file)
    }
  }

  /**
   * Toggle tree path expansion
   */
  const toggleTreePath = (path: string) => {
    setExpandedTreePaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  /**
   * Open file from knowledge tree
   */
  const openFileFromTree = useCallback(
    async (fullPath: string) => {
      const normalizedPath = fullPath.replace(/^\/+/, '')
      const segments = normalizedPath.split('/')
      const fileName = segments.pop() || normalizedPath
      const parentDir = segments.join('/')

      const filePayload: GitHubFile = {
        name: fileName,
        path: normalizedPath,
        type: 'file',
        sha: '',
        url: '',
        html_url: `https://github.com/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}/blob/${REPO_CONFIG.BRANCH}/${normalizedPath}`,
        download_url: API_ENDPOINTS.raw(normalizedPath),
      }

      if (parentDir !== currentPath) {
        await fetchContents(parentDir)
      }

      await fetchFileContent(filePayload)

      // Auto-close sidebar on mobile
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    },
    [currentPath, fetchContents, fetchFileContent]
  )

  const handleOpenSearchResult = useCallback(
    (fullPath: string) => {
      openFileFromTree(fullPath)
    },
    [openFileFromTree],
  )

  // Load from URL params on mount and when URL changes
  const urlPath = searchParams.get('path') || ''
  const urlFile = searchParams.get('file') || ''
  
  useEffect(() => {
    if (isOpen && mode === 'page') {
      const path = urlPath || initialPath || ''
      const file = urlFile

      fetchContents(path).then((newFiles) => {
        if (file) {
          const allFilesForSearch = newFiles && newFiles.length > 0 ? newFiles : files
          const targetFile = allFilesForSearch.find((f) => f.path === file)
          if (targetFile) {
            fetchFileContent(targetFile)
          }
        }
      })
    } else if (isOpen) {
      fetchContents(initialPath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, mode, urlPath, urlFile])

  const isModal = mode === 'modal'

  if (!isOpen && isModal) return null

  const currentSummary =
    selectedFile && summaryIndex.size > 0 ? summaryIndex.get(selectedFile.path) ?? null : null
  const activeSearchQuery = searchQuery.trim()

  const content = (
    <div className="frame-codex-viewer flex-1 flex overflow-hidden">
      {/* Mobile Toggle Button */}
      <MobileToggle isOpen={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
      
      {/* Metadata Toggle FAB (shows when panel closed) */}
      <MetadataToggleFAB 
        isOpen={metaOpen} 
        onToggle={() => setMetaOpen(true)}
        theme={preferences.theme}
      />

      {/* Sidebar */}
      <CodexSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPath={currentPath}
        files={files}
        filteredFiles={filteredFiles}
        selectedFile={selectedFile}
        onFileClick={handleFileClick}
        onNavigate={fetchContents}
        mode={sidebarMode}
        onModeChange={setSidebarMode}
        knowledgeTree={knowledgeTree}
        knowledgeTreeLoading={knowledgeTreeLoading}
        knowledgeTreeError={knowledgeTreeError}
        totalTreeStrands={totalTreeStrands}
        totalTreeWeaves={totalTreeWeaves}
        expandedTreePaths={expandedTreePaths}
        onToggleTreePath={toggleTreePath}
        onOpenFileFromTree={openFileFromTree}
        loading={loading}
        error={error}
        searchOptions={searchOptions}
        onSearchQueryChange={handleSearchQueryChange}
        onToggleSearchNames={toggleSearchNames}
        onToggleSearchContent={toggleSearchContent}
        onToggleCaseSensitive={toggleCaseSensitive}
        onSetFilterScope={setFilterScope}
        onToggleHideEmptyFolders={toggleHideEmptyFolders}
        onSetRootScope={setRootScope}
        onResetSearch={handleSearchReset}
        onOpenHelp={() => setHelpOpen(true)}
        onOpenPreferences={() => setPreferencesOpen(true)}
        sidebarWidth={sidebarWidth}
        onSidebarWidthChange={setSidebarWidth}
        theme={preferences.theme}
      />

      {/* Main content area with toolbar and content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* API Status Banner */}
        <ApiStatusBanner
          graphqlAvailable={graphqlAvailable}
          searchAvailable={searchIndexAvailable && semanticStatus === 'ready'}
          semanticStatus={semanticStatus}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        {/* Toolbar */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 backdrop-blur-sm">
          <CodexToolbar
            currentPath={currentPath}
            metaOpen={metaOpen}
            onToggleMeta={() => setMetaOpen((v) => !v)}
            currentFile={selectedFile ? { path: selectedFile.path, name: selectedFile.name } : null}
            isBookmarked={selectedFile ? isBookmarked(selectedFile.path) : false}
            onToggleBookmark={selectedFile ? () => toggleBookmark(selectedFile.path, selectedFile.name) : undefined}
            onOpenBookmarks={() => setBookmarksOpen(true)}
            onOpenPreferences={() => setPreferencesOpen(true)}
            onOpenHelp={() => setHelpOpen(true)}
            onOpenGraph={() => setGraphOpen(true)}
            onOpenTimeline={() => setTimelineOpen(true)}
            onOpenContribute={() => setContributeOpen(true)}
            onOpenEditor={() => setEditorOpen(true)}
            onOpenQA={() => setQAOpen(true)}
            ttsState={tts.state}
            ttsSettings={tts.settings}
            ttsVoices={tts.availableVoices}
            ttsSupported={tts.isSupported}
            onTTSPlay={handleReadAloud}
            onTTSPause={tts.pause}
            onTTSResume={tts.resume}
            onTTSStop={tts.stop}
            onTTSVolumeChange={tts.setVolume}
            onTTSRateChange={tts.setRate}
            onTTSPitchChange={tts.setPitch}
            onTTSVoiceChange={tts.setVoice}
            theme={preferences.theme}
          />
        </div>
        {activeSearchQuery.length > 0 && (
          <SearchResultsPanel
            query={activeSearchQuery}
            results={searchResults}
            loading={searchLoading}
            error={searchError}
            semanticEnabled={semanticEnabled}
            semanticSupported={semanticSupported}
            onToggleSemantic={setSemanticEnabled}
            onSelectResult={handleOpenSearchResult}
            onClear={handleSearchReset}
          />
        )}

        {/* Content Area */}
        <CodexContent
          file={selectedFile}
          content={fileContent}
          metadata={fileMetadata}
          loading={loading}
          currentPath={currentPath}
          onNavigate={fetchContents}
          onFetchFile={fetchFileContent}
          pathname={pathname}
        />
      </div>

      {/* Right Panel - Unified (Metadata / Editor / Graph) */}
      {metaOpen && (
        <div 
          className={`
            fixed md:relative right-0 top-0 bottom-0 z-30
            w-full md:w-96
            ${preferences.theme === 'dark' ? 'bg-zinc-900' : ''}
            ${preferences.theme === 'light' ? 'bg-white' : ''}
            ${preferences.theme === 'sepia-light' ? 'bg-[#F4F1EA]' : ''}
            ${preferences.theme === 'sepia-dark' ? 'bg-[#1A0E0A]' : ''}
            border-l ${preferences.theme.includes('dark') ? 'border-zinc-800' : 'border-zinc-200'}
            flex flex-col overflow-hidden
            touch-pan-y touch-pinch-zoom
          `}
          style={{ touchAction: 'pan-y pinch-zoom' }}
        >
          {/* Right Panel Tabs - Mobile Optimized */}
          <div className={`
            flex items-center border-b shrink-0
            ${preferences.theme.includes('dark') ? 'border-zinc-800' : 'border-zinc-200'}
            ${preferences.theme === 'dark' ? 'bg-zinc-900/95' : ''}
            ${preferences.theme === 'light' ? 'bg-zinc-50' : ''}
            ${preferences.theme === 'sepia-light' ? 'bg-[#E8E4D9]' : ''}
            ${preferences.theme === 'sepia-dark' ? 'bg-[#0F0704]' : ''}
          `}>
            {/* Mobile: Icon-only tabs, Desktop: Text tabs */}
            <button
              onClick={() => setRightPanelMode('metadata')}
              className={`
                flex-1 px-2 md:px-4 py-3 md:py-3 text-xs font-medium transition-all
                flex items-center justify-center gap-2
                ${rightPanelMode === 'metadata'
                  ? preferences.theme.includes('dark')
                    ? 'text-cyan-400 border-b-2 border-cyan-400 bg-zinc-800/50'
                    : 'text-cyan-600 border-b-2 border-cyan-600 bg-white'
                  : preferences.theme.includes('dark')
                    ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }
              `}
              title="Info"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">Info</span>
            </button>
            <button
              onClick={() => setRightPanelMode('editor')}
              disabled={!selectedFile}
              className={`
                flex-1 px-2 md:px-4 py-3 md:py-3 text-xs font-medium transition-all
                flex items-center justify-center gap-2
                ${rightPanelMode === 'editor'
                  ? preferences.theme.includes('dark')
                    ? 'text-purple-400 border-b-2 border-purple-400 bg-zinc-800/50'
                    : 'text-purple-600 border-b-2 border-purple-600 bg-white'
                  : preferences.theme.includes('dark')
                    ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }
                ${!selectedFile ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              title="Edit"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={() => setRightPanelMode('graph')}
              className={`
                flex-1 px-2 md:px-4 py-3 md:py-3 text-xs font-medium transition-all
                flex items-center justify-center gap-2
                ${rightPanelMode === 'graph'
                  ? preferences.theme.includes('dark')
                    ? 'text-emerald-400 border-b-2 border-emerald-400 bg-zinc-800/50'
                    : 'text-emerald-600 border-b-2 border-emerald-600 bg-white'
                  : preferences.theme.includes('dark')
                    ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }
              `}
              title="Graph"
            >
              <Hash className="w-4 h-4" />
              <span className="hidden sm:inline">Graph</span>
            </button>
            <button
              onClick={() => setMetaOpen(false)}
              className={`
                px-3 py-3 transition-colors shrink-0
                ${preferences.theme.includes('dark') ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}
              `}
              aria-label="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-hidden">
            {rightPanelMode === 'metadata' && (
              <CodexMetadataPanel
                isOpen={true}
                onClose={() => {}}
                metadata={fileMetadata}
                currentFile={selectedFile}
                allFiles={files}
                summaryInfo={currentSummary || undefined}
                content={fileContent}
              />
            )}

            {rightPanelMode === 'editor' && selectedFile && (
              <div className="h-full flex flex-col">
                <StrandEditor
                  file={selectedFile}
                  content={fileContent}
                  metadata={fileMetadata}
                  isOpen={true}
                  onClose={() => setRightPanelMode('metadata')}
                  onSave={async (content, metadata) => {
                    // TODO: Implement save via GitHub API
                    console.log('Save content:', content, metadata)
                    setRightPanelMode('metadata')
                  }}
                  theme={preferences.theme}
                />
              </div>
            )}

            {rightPanelMode === 'graph' && (
              <KnowledgeGraphView
                tree={knowledgeTree}
                selectedPath={selectedFile?.path}
                onNavigate={fetchContents}
                onClose={() => setRightPanelMode('metadata')}
              />
            )}
          </div>
        </div>
      )}

      {/* Bookmarks Panel */}
      <BookmarksPanel
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarks={bookmarks}
        history={history}
        onNavigate={openFileFromTree}
        onRemoveBookmark={removeBookmark}
        onRemoveHistory={removeFromHistory}
        onClearBookmarks={clearAllBookmarks}
        onClearHistory={clearAllHistory}
      />

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
        preferences={preferences}
        onThemeChange={updateTheme}
        onFontSizeChange={updateFontSize}
        onTreeDensityChange={updateTreeDensity}
        onSidebarModeChange={updateDefaultSidebarMode}
        onSidebarOpenMobileChange={updateSidebarOpenMobile}
        onHistoryTrackingChange={(enabled) => {
          updateMultiple({ historyTrackingEnabled: enabled })
          if (!enabled) {
            // When disabling history tracking, clear any existing history
            clearAllHistory()
          }
        }}
        onReset={resetPreferences}
        onClearAll={() => {
          clearAllCodexData()
          setPreferencesOpen(false)
        }}
      />

      {/* Tutorial Tour */}
      {activeTutorial && (
        <TutorialTour
          tourId={TUTORIALS[activeTutorial].id}
          title={TUTORIALS[activeTutorial].title}
          steps={TUTORIALS[activeTutorial].steps}
          isActive={!!activeTutorial}
          onComplete={() => setActiveTutorial(null)}
          onSkip={() => setActiveTutorial(null)}
        />
      )}

      {/* Help/Info Panel */}
      <HelpInfoPanel isOpen={helpOpen} onClose={() => setHelpOpen(false)} />

      {/* Knowledge Graph View */}
      {graphOpen && (
        <KnowledgeGraphView
          tree={knowledgeTree}
          selectedPath={selectedFile?.path}
          onNavigate={openFileFromTree}
          onClose={() => setGraphOpen(false)}
        />
      )}

      {/* Timeline View */}
      {timelineOpen && (
        <TimelineView
          history={history}
          onNavigate={openFileFromTree}
          onClose={() => setTimelineOpen(false)}
        />
      )}

      {/* Contribute Modal */}
      <ContributeModal
        isOpen={contributeOpen}
        onClose={() => setContributeOpen(false)}
        currentPath={currentPath}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Strand Editor */}
      {selectedFile && (
        <StrandEditor
          file={selectedFile}
          content={fileContent}
          metadata={fileMetadata}
          isOpen={editorOpen}
          onClose={() => setEditorOpen(false)}
          onSave={async (content, metadata) => {
            // TODO: Implement save via GitHub API
            console.log('Save content:', content, metadata)
            setEditorOpen(false)
          }}
          theme={preferences.theme}
        />
      )}

      {/* Q&A Interface */}
      <QAInterface
        isOpen={qaOpen}
        onClose={() => setQAOpen(false)}
        currentStrand={selectedFile?.path}
        theme={preferences.theme}
        onSemanticStatusChange={(status) => setSemanticStatus(status)}
        availableWeaves={Array.from(new Set(knowledgeTree.map(node => node.path.split('/')[0] || node.name)))}
        availableLooms={Array.from(new Set(knowledgeTree.flatMap(node => 
          node.children?.map(child => child.name) || []
        )))}
        availableTags={Array.from(new Set(
          fileMetadata.tags ? (Array.isArray(fileMetadata.tags) ? fileMetadata.tags : [fileMetadata.tags]).map(t => String(t)) : []
        ))}
        totalStrands={totalTreeStrands}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
        theme={preferences.theme}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={selectedFile ? 'home' : undefined}
        onHome={() => {
          router.push('/codex')
          setSidebarOpen(false)
        }}
        onSearch={() => {
          const input = document.getElementById('codex-search-input') as HTMLInputElement | null
          input?.focus()
          setSidebarOpen(true)
        }}
        onBookmarks={() => {
          setBookmarksOpen(true)
          setSidebarOpen(false)
        }}
        onSettings={() => {
          setPreferencesOpen(true)
          setSidebarOpen(false)
        }}
      />
      
      {/* PWA Install Banner - DISABLED until app is ready */}
      {/* <PWAInstallBanner
        isInstallable={pwa.isInstallable}
        onInstall={pwa.install}
        theme={preferences.theme}
      /> */}
    </div>
  )

  // Modal mode
  if (isModal) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 z-[60] backdrop-blur-md"
              onClick={onClose}
            />

            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="codex-viewer w-full max-w-7xl h-[90vh] bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl flex"
            >
              {content}
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    )
  }

  // Page mode
  return (
    <div className="codex-viewer w-full h-screen flex flex-col md:flex-row pb-20 md:pb-0 relative">
      {content}
    </div>
  )
}



