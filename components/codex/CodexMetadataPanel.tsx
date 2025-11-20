/**
 * Metadata and relations panel for Frame Codex viewer
 * Displays frontmatter metadata, backlinks, and graph controls
 * @module codex/CodexMetadataPanel
 */

'use client'

import React, { useMemo, useState, useEffect, useRef } from 'react'
import { ChevronLeft, Info, Hash, Link2, Clock, Search, Filter, FileText, Tags, BookOpen, User, GitCommit, Calendar } from 'lucide-react'
import ExpandableSection from './ui/ExpandableSection'
import type { StrandMetadata, GitHubFile } from './types'
import BacklinkList from '../backlink-list'
import { useSwipeGesture } from './hooks/useSwipeGesture'

interface CodexMetadataPanelProps {
  /** Whether panel is open */
  isOpen: boolean
  /** Close panel callback */
  onClose: () => void
  /** Current file metadata */
  metadata: StrandMetadata
  /** Current file */
  currentFile: GitHubFile | null
  /** All files (for backlink detection) */
  allFiles: GitHubFile[]
  /** Pre-computed extractive summary + last indexed date from Codex index */
  summaryInfo?: {
    summary?: string
    lastIndexed?: string
  }
  /** Raw markdown content for the current file (for TOC & search) */
  content?: string
}

interface GitMetadata {
  author?: string
  authorEmail?: string
  lastCommit?: string
  lastCommitMessage?: string
  lastModified?: string
  commitUrl?: string
}

interface TocItem {
  id: string
  text: string
  level: number
}

interface DocMatch {
  index: number
  match: string
  contextBefore: string
  contextAfter: string
}

const MAX_MATCHES = 30

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Right-hand metadata and relations panel
 * 
 * @remarks
 * - Displays parsed YAML frontmatter as styled chips
 * - Shows backlinks to current file
 * - Provides graph visualization controls
 * - Keyboard shortcut: 'm' to toggle
 * - Mobile: Becomes bottom sheet on small screens
 * - Analog styling: Paper texture, inner shadow, thick border
 * 
 * @example
 * ```tsx
 * <CodexMetadataPanel
 *   isOpen={metaOpen}
 *   onClose={() => setMetaOpen(false)}
 *   metadata={fileMetadata}
 *   currentFile={selectedFile}
 *   allFiles={files}
 * />
 * ```
 */
export default function CodexMetadataPanel({
  isOpen,
  onClose,
  metadata,
  currentFile,
  allFiles,
  summaryInfo,
  content,
}: CodexMetadataPanelProps) {
  // All hooks must be called before any early returns
  const [searchQuery, setSearchQuery] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [regexMode, setRegexMode] = useState(false)
  const [preset, setPreset] = useState<'none' | 'email' | 'phone' | 'todo'>('none')
  const [gitMetadata, setGitMetadata] = useState<GitMetadata>({})

  const panelRef = useRef<HTMLDivElement>(null)
  const normalizedContent = (content || '').replace(/```[\s\S]*?```/g, '')
  
  // Swipe down to close on mobile
  useSwipeGesture({
    onSwipeDown: () => {
      if (window.innerWidth < 768 && isOpen) {
        onClose()
      }
    },
    threshold: 60,
    element: panelRef.current,
  })
  
  // Calculate reading time (avg 200 words per minute)
  const readingTime = useMemo(() => {
    if (!content) return 0
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / 200)
  }, [content])
  
  // Calculate complexity score (0-100 based on various factors)
  const complexityScore = useMemo(() => {
    if (!content) return 0
    
    const words = content.trim().split(/\s+/).length
    const codeBlocks = (content.match(/```/g) || []).length / 2
    const headings = (content.match(/^#+\s/gm) || []).length
    const links = (content.match(/\[([^\]]+)\]\([^)]+\)/g) || []).length
    const avgWordLength = content.split(/\s+/).reduce((sum, w) => sum + w.length, 0) / (words || 1)
    
    // Weighted scoring
    let score = 0
    score += Math.min(words / 50, 30) // Length (max 30 points)
    score += Math.min(codeBlocks * 10, 25) // Code complexity (max 25 points)
    score += Math.min((avgWordLength - 4) * 5, 15) // Word complexity (max 15 points)
    score += Math.min(links / 5, 15) // Reference density (max 15 points)
    score += Math.min(headings / 3, 15) // Structure complexity (max 15 points)
    
    return Math.min(Math.round(score), 100)
  }, [content])
  
  // Fetch Git metadata for current file
  useEffect(() => {
    if (!currentFile?.path) {
      setGitMetadata({})
      return
    }
    
    const fetchGitInfo = async () => {
      try {
        const owner = process.env.NEXT_PUBLIC_CODEX_REPO_OWNER || 'framersai'
        const repo = process.env.NEXT_PUBLIC_CODEX_REPO_NAME || 'codex'
        const branch = process.env.NEXT_PUBLIC_CODEX_REPO_BRANCH || 'main'
        
        // Fetch commits for this file
        const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${currentFile.path}&sha=${branch}&per_page=1`
        const response = await fetch(url)
        
        if (response.ok) {
          const commits = await response.json()
          if (commits && commits.length > 0) {
            const latest = commits[0]
            setGitMetadata({
              author: latest.commit?.author?.name,
              authorEmail: latest.commit?.author?.email,
              lastCommit: latest.sha,
              lastCommitMessage: latest.commit?.message,
              lastModified: latest.commit?.author?.date,
              commitUrl: latest.html_url,
            })
          }
        }
      } catch (error) {
        console.warn('Failed to fetch Git metadata:', error)
      }
    }
    
    fetchGitInfo()
  }, [currentFile?.path])

  const toc: TocItem[] = useMemo(() => {
    if (!normalizedContent) return []
    const lines = normalizedContent.split('\n')
    const items: TocItem[] = []

    for (const line of lines) {
      const match = /^(#{1,6})\s+(.+)$/.exec(line.trim())
      if (!match) continue
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/\s+/g, '-')
      items.push({ id, text, level })
    }
    return items
  }, [normalizedContent])

  const matches: DocMatch[] = useMemo(() => {
    if (!searchQuery || !normalizedContent) return []

    let pattern = searchQuery
    let flags = caseSensitive ? 'g' : 'gi'
    let regex: RegExp

    if (preset === 'email') {
      pattern = '[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}'
      flags = caseSensitive ? 'g' : 'gi'
    } else if (preset === 'phone') {
      pattern = '\\+?\\d[\\d\\s().-]{7,}\\d'
    } else if (preset === 'todo') {
      pattern = '\\b(TODO|FIXME|NOTE)\\b'
      flags = caseSensitive ? 'g' : 'gi'
    }

    try {
      regex = new RegExp(regexMode || preset !== 'none' ? pattern : escapeRegExp(pattern), flags)
    } catch {
      return []
    }

    const results: DocMatch[] = []
    let match: RegExpExecArray | null
    const contextRadius = 40

    while ((match = regex.exec(normalizedContent)) && results.length < MAX_MATCHES) {
      const index = match.index
      const matchText = match[0]
      const start = Math.max(0, index - contextRadius)
      const end = Math.min(normalizedContent.length, index + matchText.length + contextRadius)
      const before = normalizedContent.slice(start, index)
      const after = normalizedContent.slice(index + matchText.length, end)
      results.push({
        index,
        match: matchText,
        contextBefore: before,
        contextAfter: after,
      })
    }

    return results
  }, [searchQuery, caseSensitive, regexMode, preset, normalizedContent])

  // Early return after all hooks are called
  if (!isOpen || !currentFile) return null

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Panel Container - Full-width drawer on mobile, sidebar on desktop */}
      <div
        ref={panelRef}
        className={`
          flex flex-col flex-shrink-0
          bg-white dark:bg-zinc-900/95 backdrop-blur-sm
          transition-all duration-300 ease-in-out
          
          // Mobile: full-width bottom drawer
          md:border-l-2 md:border-zinc-200 md:dark:border-zinc-800/50
          ${isOpen 
            ? 'md:w-64 xl:w-72' 
            : 'md:w-0'
          }
          md:overflow-hidden
          
          // Mobile-specific styling
          fixed md:relative
          inset-x-0 bottom-0 md:inset-auto
          max-h-[85vh] md:max-h-none
          rounded-t-2xl md:rounded-none
          shadow-2xl md:shadow-none
          z-50 md:z-auto
          ${isOpen
            ? 'translate-y-0'
            : 'translate-y-full md:translate-y-0'
          }
        `}
      >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800/50 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <h3 className="text-sm font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          Document Insights
        </h3>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all group rounded-md"
          aria-label="Collapse panel"
          title="Collapse (m)"
        >
          <ChevronLeft className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5 overscroll-contain text-[12px] leading-snug">
        {/* Reading Stats */}
        {content && (
          <div className="flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-cyan-50/30 to-blue-50/30 dark:from-cyan-950/20 dark:to-blue-950/20">
            {/* Reading Time */}
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300">{readingTime}m</span>
            </div>
            
            {/* Divider */}
            <div className="w-px h-3 bg-zinc-300 dark:bg-zinc-700" />
            
            {/* Complexity */}
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${complexityScore < 33 ? 'bg-green-500' : complexityScore < 67 ? 'bg-amber-500' : 'bg-red-500'}`} title={`Complexity: ${complexityScore}/100`} />
              <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{complexityScore}</span>
            </div>
          </div>
        )}
        
        {/* Table of Contents */}
        {toc.length > 0 && (
          <ExpandableSection
            title="Contents"
            icon={<Hash className="w-3.5 h-3.5" />}
            defaultExpanded={true}
          >
            <nav className="space-y-0.5 -mx-2">
              {toc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const el = document.getElementById(item.id)
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className={`
                    block w-full text-left text-xs truncate px-3 py-1.5
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    transition-colors
                    ${item.level === 1 ? 'font-semibold text-gray-900 dark:text-gray-100' : ''}
                    ${item.level === 2 ? 'pl-6 text-gray-700 dark:text-gray-300' : ''}
                    ${item.level > 2 ? 'pl-9 text-gray-500 dark:text-gray-400' : ''}
                  `}
                  title={item.text}
                >
                  {item.text}
                </button>
              ))}
            </nav>
          </ExpandableSection>
        )}

        {/* In-document Search */}
        <ExpandableSection
          title="Search Document"
          icon={<Search className="w-3.5 h-3.5" />}
          defaultExpanded={false}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find in this strand..."
                  className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <Search className="w-3 h-3 absolute right-2 top-1.5 text-gray-400" />
              </div>
              <button
                type="button"
                onClick={() => setRegexMode((v) => !v)}
                className={`
                  inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] border
                  ${regexMode
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-200'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'}
                `}
              >
                <Filter className="w-3 h-3" />
                Regex
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400">
              <label className="inline-flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="w-3 h-3 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
                Case sensitive
              </label>
              <div className="flex items-center gap-1">
                <span className="opacity-70">Presets:</span>
                {(
                  [
                    { id: 'email', label: 'Email' },
                    { id: 'phone', label: 'Phone' },
                    { id: 'todo', label: 'TODO' },
                  ] as const
                ).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setPreset(p.id)
                      setRegexMode(true)
                    }}
                    className={`
                      px-1.5 py-0.5 rounded-full border text-[10px]
                      ${preset === p.id
                        ? 'border-cyan-500 text-cyan-600 dark:border-cyan-400 dark:text-cyan-300'
                        : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'}
                    `}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            {searchQuery && (
              <div className="mt-2 max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-800 rounded-lg p-2 space-y-1 bg-white/70 dark:bg-gray-950/60">
                {matches.length === 0 ? (
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">No matches in this strand.</p>
                ) : (
                  matches.map((m, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        // Best-effort scroll to match using browser find
                        try {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          ;(window as any).find(m.match, caseSensitive, false, true, false, false, false)
                        } catch {
                          // ignore
                        }
                      }}
                      className="block w-full text-left text-[11px] px-1.5 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <span className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                        Match {idx + 1}
                      </span>
                      <div className="truncate">
                        <span className="text-gray-500 dark:text-gray-400">{m.contextBefore}</span>
                        <mark className="bg-yellow-200 text-gray-900 dark:bg-yellow-500/70 dark:text-gray-900 px-0.5 rounded">
                          {m.match}
                        </mark>
                        <span className="text-gray-500 dark:text-gray-400">{m.contextAfter}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </ExpandableSection>
        
        {/* Summary Section (auto-generated, extractive) */}
        {summaryInfo?.summary && (
          <ExpandableSection
            title="Summary"
            icon={<FileText className="w-3.5 h-3.5" />}
            defaultExpanded={true}
          >
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {summaryInfo.summary}
            </p>
            {summaryInfo.lastIndexed && (
              <p className="mt-2 inline-flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                Extractive summary generated{' '}
                {new Date(summaryInfo.lastIndexed).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            )}
          </ExpandableSection>
        )}

        {/* Metadata Section */}
        <ExpandableSection
          title="Metadata"
          icon={<Tags className="w-3.5 h-3.5" />}
          defaultExpanded={true}
        >
          {Object.keys(metadata).length === 0 ? (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">No metadata available</p>
          ) : (
            <div className="space-y-3">
              {/* Tags */}
              {metadata.tags && (
                <div>
                  <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(metadata.tags) ? metadata.tags : metadata.tags.split(',')).map(
                      (tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 font-medium"
                        >
                          {tag.trim()}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Difficulty */}
              {metadata.difficulty && (
                <div>
                  <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Difficulty</p>
                  <span className="inline-block px-2 py-0.5 text-[11px] rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 font-medium capitalize">
                    {metadata.difficulty}
                  </span>
                </div>
              )}

              {/* Version */}
              {metadata.version && (
                <div>
                  <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Version</p>
                  <span className="inline-block px-2 py-0.5 text-[11px] font-mono rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    v{metadata.version}
                  </span>
                </div>
              )}

              {/* Taxonomy */}
              {metadata.taxonomy && (
                <div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Taxonomy</p>
                  <div className="space-y-2">
                    {metadata.taxonomy.subjects && metadata.taxonomy.subjects.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                          Subjects
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {metadata.taxonomy.subjects.map((subject) => (
                            <span
                              key={subject}
                              className="px-2 py-0.5 text-xs rounded bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {metadata.taxonomy.topics && metadata.taxonomy.topics.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                          Topics
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {metadata.taxonomy.topics.map((topic) => (
                            <span
                              key={topic}
                              className="px-2 py-0.5 text-xs rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Content Type */}
              {metadata.contentType && (
                <div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Content Type</p>
                  <span className="inline-block px-2.5 py-1 text-xs rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800 font-medium capitalize">
                    {metadata.contentType}
                  </span>
                </div>
              )}

              {/* Control Flags */}
              {(metadata.skip_ai === 'true' || metadata.skip_ai === true || 
                metadata.skip_index === 'true' || metadata.skip_index === true || 
                metadata.manual_tags === 'true' || metadata.manual_tags === true) && (
                <div>
                  <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Control Flags</p>
                  <div className="space-y-1">
                    {(metadata.skip_ai === 'true' || metadata.skip_ai === true) && (
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-800 font-mono">
                          skip_ai
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">Excluded from AI analysis</span>
                      </div>
                    )}
                    {(metadata.skip_index === 'true' || metadata.skip_index === true) && (
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800 font-mono">
                          skip_index
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">Not in search index</span>
                      </div>
                    )}
                    {(metadata.manual_tags === 'true' || metadata.manual_tags === true) && (
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-800 font-mono">
                          manual_tags
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">Manual tag curation</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </ExpandableSection>

        {/* Raw JSON Viewer */}
        {Object.keys(metadata).length > 0 && (
          <ExpandableSection
            title="Raw JSON"
            icon={<Hash className="w-3.5 h-3.5" />}
            defaultExpanded={false}
          >
            <pre className="text-[10px] font-mono bg-gray-900 dark:bg-black text-green-400 p-3 rounded-lg overflow-x-auto border border-gray-700">
              {JSON.stringify(metadata, null, 2)}
            </pre>
          </ExpandableSection>
        )}

        {/* Git Info */}
        {(gitMetadata.author || gitMetadata.lastModified) && (
          <ExpandableSection
            title="Version History"
            icon={<GitCommit className="w-3.5 h-3.5" />}
            defaultExpanded={false}
          >
            <div className="space-y-2.5">
              {gitMetadata.author && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <User className="w-3 h-3 text-gray-500" />
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Author</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{gitMetadata.author}</p>
                  {gitMetadata.authorEmail && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">{gitMetadata.authorEmail}</p>
                  )}
                </div>
              )}
              
              {gitMetadata.lastModified && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Last Modified</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    {new Date(gitMetadata.lastModified).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              )}
              
              {gitMetadata.lastCommit && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <GitCommit className="w-3 h-3 text-gray-500" />
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Commit</span>
                  </div>
                  {gitMetadata.commitUrl ? (
                    <a
                      href={gitMetadata.commitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      {gitMetadata.lastCommit.slice(0, 7)}
                    </a>
                  ) : (
                    <p className="text-xs font-mono text-gray-700 dark:text-gray-300">{gitMetadata.lastCommit.slice(0, 7)}</p>
                  )}
                  {gitMetadata.lastCommitMessage && (
                    <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {gitMetadata.lastCommitMessage.split('\n')[0]}
                    </p>
                  )}
                </div>
              )}
            </div>
          </ExpandableSection>
        )}

        {/* Divider */}
        <div className="border-t-2 border-zinc-200 dark:border-zinc-800" />

        {/* Backlinks Section */}
        <ExpandableSection
          title="Backlinks"
          icon={<Link2 className="w-3.5 h-3.5" />}
          defaultExpanded={true}
        >
          <BacklinkList currentPath={currentFile.path} files={allFiles} />
        </ExpandableSection>

        {/* Divider */}
        <div className="border-t-2 border-zinc-200 dark:border-zinc-800" />

        {/* Graph Controls */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            Graph Controls
          </h5>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group touch-manipulation min-h-[44px]">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-zinc-300 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-xs text-zinc-700 dark:text-zinc-300 group-hover:text-cyan-600">
                Highlight in graph
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group touch-manipulation min-h-[44px]">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-zinc-300 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-xs text-zinc-700 dark:text-zinc-300 group-hover:text-cyan-600">
                Show same-tag strands
              </span>
            </label>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">Shortcuts</p>
          <div className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
            <p>
              <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-xs border border-zinc-200 dark:border-zinc-700">
                m
              </kbd>{' '}
              Toggle this panel
            </p>
            <p>
              <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-xs border border-zinc-200 dark:border-zinc-700">
                /
              </kbd>{' '}
              Focus search
            </p>
            <p>
              <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-xs border border-zinc-200 dark:border-zinc-700">
                g
              </kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-xs border border-zinc-200 dark:border-zinc-700">
                h
              </kbd>{' '}
              Go home
            </p>
            <p>
              <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-xs border border-zinc-200 dark:border-zinc-700">
                s
              </kbd>{' '}
              Toggle sidebar (mobile)
            </p>
          </div>
        </div>
        
        {/* Mobile: Drag handle indicator */}
        <div className="md:hidden sticky bottom-0 py-2 bg-gradient-to-t from-white dark:from-zinc-950 via-white/95 dark:via-zinc-950/95 to-transparent pointer-events-none">
          <div className="w-12 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto" />
        </div>
      </div>
    </div>
    </>
  )
}



