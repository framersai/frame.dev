"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Folder, File as FileIcon, ChevronRight, Home, Loader2, ExternalLink, Book, FileText, Code, Database, Image as ImageIcon, Hash, Link2, Map, Plus, GitPullRequest, HelpCircle } from 'lucide-react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

interface GitHubFile {
  name: string
  path: string
  type: 'file' | 'dir'
  sha: string
  size?: number
  url: string
  html_url: string
  download_url?: string
}

interface FrameCodexViewerProps {
  isOpen: boolean
  onClose?: () => void
  mode?: 'modal' | 'page'
  initialPath?: string
}

// Wiki-style metadata parser
function parseWikiMetadata(content: string) {
  const lines = content.split('\n')
  const metadata: Record<string, any> = {}
  let inFrontmatter = false
  let frontmatterContent = ''
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true
      } else {
        // Parse YAML frontmatter
        try {
          const pairs = frontmatterContent.split('\n').filter(Boolean)
          pairs.forEach(pair => {
            const [key, ...valueParts] = pair.split(':')
            if (key && valueParts.length) {
              metadata[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
            }
          })
        } catch (e) {
          console.error('Error parsing frontmatter:', e)
        }
        break
      }
    } else if (inFrontmatter) {
      frontmatterContent += lines[i] + '\n'
    }
  }
  
  return metadata
}

const FrameCodexViewer: React.FC<FrameCodexViewerProps> = ({ isOpen, onClose, mode = 'modal', initialPath = '' }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [currentPath, setCurrentPath] = useState('')
  const [files, setFiles] = useState<GitHubFile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<GitHubFile | null>(null)
  const [fileContent, setFileContent] = useState<string>('')
  const [fileMetadata, setFileMetadata] = useState<Record<string, any>>({})
  const [showMetadata, setShowMetadata] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [displayLimit, setDisplayLimit] = useState(50)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [showVisualization, setShowVisualization] = useState(false)
  const [showContribute, setShowContribute] = useState(false)

  const REPO_OWNER = 'framersai'
  const REPO_NAME = 'codex'
  const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`

  // Update URL when navigation changes
  const updateURL = useCallback((path: string, file?: string) => {
    if (mode === 'page') {
      const params = new URLSearchParams()
      if (path) params.set('path', path)
      if (file) params.set('file', file)
      
      const newPath = `${pathname}?${params.toString()}`
      router.push(newPath, { scroll: false })
    }
  }, [mode, pathname, router])

  const fetchContents = useCallback(async (path: string = '') => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_BASE}/${path}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`)
      }
      
      const data = await response.json()
      const sortedData = data.sort((a: GitHubFile, b: GitHubFile) => {
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
  }, [API_BASE, updateURL])

  const fetchFileContent = useCallback(async (file: GitHubFile) => {
    if (file.type !== 'file' || !file.download_url) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(file.download_url)
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`)
      }
      
      const content = await response.text()
      setFileContent(content)
      setSelectedFile(file)
      
      // Parse metadata for wiki features
      if (file.name.endsWith('.md') || file.name.endsWith('.mdx')) {
        const metadata = parseWikiMetadata(content)
        setFileMetadata(metadata)
      }
      
      updateURL(currentPath, file.path)
    } catch (err) {
      console.error('Error fetching file content:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch file content')
    } finally {
      setLoading(false)
    }
  }, [currentPath, updateURL])

  // Load from URL params on mount
  useEffect(() => {
    if (isOpen && mode === 'page') {
      const path = searchParams.get('path') || initialPath || ''
      const file = searchParams.get('file')
      
      fetchContents(path).then(() => {
        if (file) {
          // Find and select the file
          const targetFile = files.find(f => f.path === file)
          if (targetFile) {
            fetchFileContent(targetFile)
          }
        }
      })
    } else if (isOpen) {
      fetchContents(initialPath)
    }
  }, [isOpen, mode]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileClick = (file: GitHubFile) => {
    if (file.type === 'dir') {
      fetchContents(file.path)
    } else {
      fetchFileContent(file)
    }
  }

  const navigateUp = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/')
    fetchContents(parentPath)
  }

  // Helper to restrict content to markdown strands
  const isMarkdown = (filename: string) => {
    return filename.toLowerCase().endsWith('.md') || filename.toLowerCase().endsWith('.mdx')
  }

  // Only surface directories + markdown files in the sidebar to feel like a Codex TOC,
  // not a raw repo file explorer.
  const filteredFiles = files.filter((file) => {
    const matchesQuery = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchesQuery) return false
    if (file.type === 'dir') return true
    return isMarkdown(file.name)
  })

  const loadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setDisplayLimit(prev => prev + 50)
      setIsLoadingMore(false)
    }, 300)
  }

  const allFilteredFiles = filteredFiles
  const displayedFiles = allFilteredFiles.slice(0, displayLimit)
  const hasMore = allFilteredFiles.length > displayLimit

  // Build contribution targets based on current folder / file
  const getCurrentDir = (): string => {
    if (selectedFile && selectedFile.type === 'file') {
      return selectedFile.path.split('/').slice(0, -1).join('/')
    }
    return currentPath || ''
  }

  const currentDir = getCurrentDir()
  const baseNewUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/new/main/${currentDir ? `${currentDir}/` : ''}`
  const addStrandUrl = `${baseNewUrl}?filename=new-strand.md`
  const yamlSuggestion = currentDir.includes('/looms')
    ? 'loom.yaml'
    : currentDir.includes('/weaves')
    ? 'weave.yaml'
    : ''
  const addYamlUrl = yamlSuggestion ? `${baseNewUrl}?filename=${yamlSuggestion}` : ''

  const getFileIcon = (file: GitHubFile) => {
    if (file.type === 'dir') return <Folder className="w-5 h-5 text-amber-600" />
    
    const ext = file.name.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'md':
      case 'mdx':
        return <FileText className="w-5 h-5 text-blue-600" />
      case 'yaml':
      case 'yml':
        return <Database className="w-5 h-5 text-purple-600" />
      case 'json':
      case 'js':
      case 'ts':
      case 'tsx':
        return <Code className="w-5 h-5 text-green-600" />
      case 'svg':
      case 'png':
      case 'jpg':
        return <ImageIcon className="w-5 h-5 text-pink-600" />
      default:
        return <FileIcon className="w-5 h-5 text-gray-600" />
    }
  }

  const isModal = mode === 'modal';

  if (!isOpen && isModal) return null;

  const content = (
    <>
      {/* File Browser - Sidebar - collapsible on mobile */}
      <div className="w-full md:w-80 bg-gray-50 dark:bg-gray-900 md:border-r border-gray-200 dark:border-gray-800 flex flex-col flex-shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col gap-2">
            {/* Heading row */}
            <div className="flex items-center gap-2">
              <Image src="/frame-logo-no-subtitle.svg" alt="Frame" width={20} height={20} className="dark:invert" />
              <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-gray-800 dark:text-gray-300">
                Frame Codex
              </h2>
            </div>

            {/* Toolbar row - touch-optimized */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* High-level tools */}
              <Link
                href="/codex/search"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation"
              >
                <Search className="w-3 h-3" />
                <span className="hidden sm:inline">Search</span>
              </Link>
              <Link
                href="/codex/architecture"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation"
              >
                <Home className="w-3 h-3" />
                <span className="hidden sm:inline">Diagram</span>
              </Link>

              {/* Contribute dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowContribute((v) => !v)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors touch-manipulation"
                  title="Contribute: add a new file or open a PR on GitHub"
                  aria-label="Contribute"
                >
                  <Plus className="w-4 h-4" />
                </button>
                {showContribute && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-50">
                    <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100 dark:border-gray-800">
                      Contribute to {currentDir || 'root'} in Frame Codex.
                    </div>
                    <div className="py-1">
                      <a
                        href={addStrandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowContribute(false)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                      >
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span>Add new Markdown strand (MD)</span>
                      </a>
                      {addYamlUrl && (
                        <a
                          href={addYamlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowContribute(false)}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                        >
                          <Code className="w-4 h-4 text-purple-600" />
                          <span>Add {yamlSuggestion} manifest</span>
                        </a>
                      )}
                      <a
                        href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/compare`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowContribute(false)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                      >
                        <GitPullRequest className="w-4 h-4" />
                        <span>Open Compare &amp; Pull Request</span>
                      </a>
                      <a
                        href={`https://github.com/${REPO_OWNER}/${REPO_NAME}#contributing`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowContribute(false)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Read contribution guide</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowVisualization(!showVisualization)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Toggle Knowledge Graph"
              >
                <Map className="w-5 h-5" />
              </button>
              {isModal && onClose && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search knowledge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
            />
          </div>
        </div>

        {/* Enhanced Breadcrumb */}
        <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1 text-sm flex-wrap">
            <button 
              onClick={() => fetchContents('')}
              className="flex items-center gap-1 hover:text-purple-600 font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Codex</span>
            </button>
            {currentPath && (
              <>
                {currentPath.split('/').map((part, index, arr) => (
                  <React.Fragment key={index}>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <button
                      onClick={() => fetchContents(arr.slice(0, index + 1).join('/'))}
                      className="hover:text-purple-600 dark:text-gray-300 font-medium"
                    >
                      {part}
                    </button>
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
          {/* Wiki-style context */}
          {currentPath && (
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {currentPath.includes('weaves') && '📚 Weave Collection'}
              {currentPath.includes('looms') && '🧵 Loom Group'}
              {currentPath.includes('strands') && '📄 Knowledge Strands'}
              {currentPath.includes('schema') && '📋 Schema Definitions'}
            </div>
          )}
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {loading && files.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
            </div>
          ) : error ? (
            <div className="text-red-600 dark:text-red-400 text-sm p-4">{error}</div>
          ) : displayedFiles.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
              {searchQuery ? 'No files found' : 'No files in this directory'}
            </div>
          ) : (
            <>
              {displayedFiles.map((file) => {
                const depth = file.path.split('/').length - (file.type === 'dir' ? 0 : 1)
                const padding = depth * 12 + 4

                const isDir = file.type === 'dir'

                return (
                  <motion.button
                    key={file.sha}
                    onClick={() => handleFileClick(file)}
                    className={`w-full text-left py-2 pr-3 pl-[${padding}px] rounded-lg flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${
                      selectedFile?.path === file.path ? 'bg-purple-100 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-700' : ''
                    }`}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDir ? (
                      <span className="inline-block w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                    ) : (
                      <span className="inline-block w-1 h-1 opacity-0" />
                    )}
                    <span className={`text-sm flex-1 truncate ${isDir ? 'font-semibold tracking-wide uppercase text-gray-800 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>${file.name.replace(/\.(md|mdx)$/,'')}</span>
                  </motion.button>
                )
              })}
              
              {hasMore && (
                <button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="w-full mt-4 p-3 text-center text-purple-600 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoadingMore ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    `Load more (${allFilteredFiles.length - displayLimit} remaining)`
                  )}
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer with stats */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{files.length} items</span>
            <a 
              href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-purple-600"
            >
              View on GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white dark:bg-gray-950 overflow-hidden flex flex-col">
        {selectedFile ? (
          <>
            {/* Enhanced File Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(selectedFile)}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      {fileMetadata.title || selectedFile.name}
                      {fileMetadata.id && (
                        <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                          ID: {fileMetadata.id}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Link2 className="w-3 h-3" />
                      {selectedFile.path}
                      {fileMetadata.version && (
                        <span className="text-xs">• v{fileMetadata.version}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Copy link button */}
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}${pathname}?path=${currentPath}&file=${selectedFile.path}`
                      navigator.clipboard.writeText(url)
                    }}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Copy direct link"
                  >
                    <Link2 className="w-5 h-5" />
                  </button>
                  <a 
                    href={selectedFile.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {/* Metadata toolbar */}
              {Object.keys(fileMetadata).length > 0 && (
                <div className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-2 text-xs flex items-center gap-4">
                  <button
                    className="font-semibold text-purple-600 hover:underline"
                    onClick={() => setShowMetadata(!showMetadata)}
                  >
                    {showMetadata ? 'Hide' : 'Show'} metadata
                  </button>
                  {showMetadata && (
                    <div className="flex flex-wrap gap-2">
                      {fileMetadata.tags &&
                        fileMetadata.tags.split(',').map((tag: string) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                            {tag.trim()}
                          </span>
                        ))}
                      {fileMetadata.taxonomy && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          {fileMetadata.taxonomy.subject?.join?.(', ')}
                        </span>
                      )}
                      {fileMetadata.version && (
                        <span className="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          v{fileMetadata.version}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Metadata tags */}
              {(fileMetadata.tags || fileMetadata.taxonomy) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {fileMetadata.tags?.split(',').map((tag: string) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                      <Hash className="w-3 h-3" />
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* File Content with Hitchhiker's Guide styling */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto p-8">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                  </div>
                ) : showVisualization && selectedFile.path.includes('schema') ? (
                  // Schema visualization
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
                    <h3 className="text-2xl font-bold mb-6">Schema Visualization</h3>
                    {/* Add D3.js or similar visualization here */}
                    <p className="text-gray-600 dark:text-gray-400">Interactive schema explorer coming soon...</p>
                  </div>
                ) : isMarkdown(selectedFile.name) ? (
                  <article className="prose prose-lg prose-purple dark:prose-invert max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Typed loosely to avoid TS issues with react-markdown's internal props
                        code(codeProps) {
                          const { inline, className, children, ...props } = codeProps as {
                            inline?: boolean
                            className?: string
                            children?: React.ReactNode
                          } & React.HTMLAttributes<HTMLElement>

                          const match = /language-(\w+)/.exec(className || '')
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={vscDarkPlus as any}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                borderRadius: '0.75rem',
                                padding: '1.5rem',
                                fontSize: '0.875rem',
                              }}
                              {...props}
                            >
                              {String(children ?? '').toString().replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-sm" {...props}>
                              {children}
                            </code>
                          )
                        },
                        h1: ({ children, ...props }) => (
                          <h1 id={String(children).toLowerCase().replace(/\s+/g, '-')} className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" {...props}>
                            {children}
                          </h1>
                        ),
                        h2: ({ children, ...props }) => (
                          <h2 id={String(children).toLowerCase().replace(/\s+/g, '-')} className="text-3xl font-bold text-gray-900 dark:text-white" {...props}>
                            {children}
                          </h2>
                        ),
                        blockquote: ({ children, ...props }) => (
                          <blockquote className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg my-4" {...props}>
                            {children}
                          </blockquote>
                        ),
                        img: ({ src = '', alt = '', ...imgProps }) => {
                          let fixedSrc = src
                          if (src && !src.startsWith('http')) {
                            // convert relative repo path to raw github url
                            const base = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/`
                            fixedSrc = base + src.replace(/^\//, '')
                          }
                          return <img src={fixedSrc} alt={alt} {...imgProps} />
                        },
                        a: ({ href, children, ...props }) => {
                          // Handle internal wiki links
                          if (href?.startsWith('./') || href?.startsWith('../')) {
                            const linkedPath = currentPath + '/' + href
                            return (
                              <button
                                onClick={() => {
                                  const normalizedPath = linkedPath.replace(/\/\.\//g, '/').replace(/\/[^/]+\/\.\.\//g, '/')
                                  if (normalizedPath.endsWith('.md')) {
                                    fetchFileContent({ 
                                      path: normalizedPath,
                                      name: normalizedPath.split('/').pop() || '',
                                      type: 'file',
                                      download_url: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${normalizedPath}`,
                                      html_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/${normalizedPath}`,
                                      sha: '',
                                      url: ''
                                    })
                                  } else {
                                    fetchContents(normalizedPath)
                                  }
                                }}
                                className="text-purple-600 hover:text-purple-700 underline"
                              >
                                {children}
                              </button>
                            )
                          }
                          return (
                            <a href={href} className="text-purple-600 hover:text-purple-700 underline" {...props}>
                              {children}
                            </a>
                          )
                        },
                      }}
                    >
                      {fileContent}
                    </ReactMarkdown>
                  </article>
                ) : (
                  <SyntaxHighlighter
                    style={vscDarkPlus as any}
                    language={selectedFile.name.split('.').pop() || 'text'}
                    showLineNumbers
                    wrapLongLines
                    customStyle={{
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      fontSize: '0.875rem',
                    }}
                  >
                    {fileContent}
                  </SyntaxHighlighter>
                )}
                
                {/* Wiki-style footer with relationships */}
                {fileMetadata.relationships && (
                  <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">Related Knowledge</h3>
                    <div className="grid gap-3">
                      {/* Add relationship links here */}
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Knowledge graph connections coming soon...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center max-w-2xl">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-purple-500/20 blur-3xl"></div>
                <Book className="w-24 h-24 relative text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Don&apos;t Panic
              </h2>
              <p className="text-xl mb-2">Welcome to the Frame Codex</p>
              <p className="text-base mb-8">
                Your hitchhiker&apos;s guide to humanity&apos;s knowledge, formatted for superintelligence
              </p>
              
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">42</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Weaves</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">∞</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Connections</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">∀</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Knowledge</div>
                </div>
              </div>
              
              {/* Interactive guide */}
              <div className="text-left space-y-2 text-sm">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Guide:</h3>
                <p className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-amber-600" />
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong>Weaves</strong> - Complete knowledge universes
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong>Looms</strong> - Curated topic collections
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong>Strands</strong> - Individual knowledge units
                  </span>
                </p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <Link href="/api" className="text-purple-600 hover:text-purple-700 font-medium">
                  Access via Frame API →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

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
                className="w-full max-w-7xl h-[90vh] bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-2xl flex"
              >
                {content}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    )
  }

  return <div className="w-full h-screen flex flex-col md:flex-row">{content}</div>;
}

export default FrameCodexViewer