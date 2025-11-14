'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Folder, FolderOpen, File, ChevronRight, Home, Loader2, ExternalLink, Book, FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
  onClose: () => void
}

export default function FrameCodexViewer({ isOpen, onClose }: FrameCodexViewerProps) {
  const [currentPath, setCurrentPath] = useState('')
  const [files, setFiles] = useState<GitHubFile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<GitHubFile | null>(null)
  const [fileContent, setFileContent] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [displayLimit, setDisplayLimit] = useState(50)

  // GitHub API configuration
  const REPO_OWNER = 'framersai'
  const REPO_NAME = 'codex'
  const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`

  // Fetch directory contents
  const fetchContents = useCallback(async (path: string = '') => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_BASE}/${path}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`)
      }
      
      const data: GitHubFile[] = await response.json()
      
      // Sort directories first, then files
      const sortedData = data.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name)
        return a.type === 'dir' ? -1 : 1
      })
      
      setFiles(sortedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contents')
    } finally {
      setLoading(false)
    }
  }, [API_BASE]);

  // Fetch file content
  const fetchFileContent = useCallback(async (file: GitHubFile) => {
    if (!file.download_url) return
    
    setLoading(true)
    try {
      const response = await fetch(file.download_url)
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`)
      }
      
      const content = await response.text()
      setFileContent(content)
      setSelectedFile(file)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch file content')
    } finally {
      setLoading(false)
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (isOpen) {
      fetchContents(currentPath)
    }
  }, [isOpen, currentPath, fetchContents]);

  // Handle folder navigation
  const navigateToFolder = (path: string) => {
    setCurrentPath(path)
    setSelectedFile(null)
    setFileContent('')
  };

  // Handle breadcrumb navigation
  const breadcrumbs = currentPath.split('/').filter(Boolean)

  // Filter files based on search with lazy loading
  const allFilteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredFiles = allFilteredFiles.slice(0, displayLimit);
  const hasMore = allFilteredFiles.length > displayLimit;

  // Load more files
  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayLimit(prev => prev + 50);
      setIsLoadingMore(false);
    }, 300);
  };

  // Get file icon
  const getFileIcon = (name: string): JSX.Element => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'md') return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 dark:bg-black/80 z-[10000] backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(8px)' }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
          className="pointer-events-auto w-full max-w-6xl h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-b from-paper-50 to-paper-100 dark:from-ink-900 dark:to-ink-950 flex flex-col shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-ink-200/20 dark:border-white/10"
        >
          {/* Header */}
          <div className="relative px-6 py-4 border-b border-ink-200/20 dark:border-white/10 bg-gradient-to-r from-paper-100/80 to-paper-50/80 dark:from-ink-800/80 dark:to-ink-900/80 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-frame-green/5 via-transparent to-frame-green-dark/5 pointer-events-none" />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Book className="w-8 h-8 text-frame-green" />
                <div>
                  <h2 className="text-2xl font-bold text-ink-900 dark:text-paper-50">Frame Codex</h2>
                  <p className="text-sm text-ink-600 dark:text-paper-400">Browse the knowledge repository</p>
                </div>
              </div>

              <motion.button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-paper-100/90 dark:bg-ink-800/90 hover:bg-paper-200 dark:hover:bg-ink-700 border border-ink-200/30 dark:border-white/10 transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4 border-b border-ink-200/10 dark:border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ink-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-paper-100 dark:bg-ink-800 rounded-xl border border-ink-200/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-frame-green focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Breadcrumbs */}
          {(currentPath || breadcrumbs.length > 0) && (
            <div className="px-6 py-3 border-b border-ink-200/10 dark:border-white/5 bg-paper-50/50 dark:bg-ink-900/50">
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => navigateToFolder('')}
                  className="flex items-center gap-1 text-ink-600 dark:text-paper-400 hover:text-frame-green transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Root</span>
                </button>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <ChevronRight className="w-4 h-4 text-ink-400" />
                    <button
                      onClick={() => navigateToFolder(breadcrumbs.slice(0, index + 1).join('/'))}
                      className="text-ink-600 dark:text-paper-400 hover:text-frame-green transition-colors"
                    >
                      {crumb}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* File Browser with book spine effect */}
            <div className="relative w-1/3 border-r border-ink-200/10 dark:border-white/5 overflow-y-auto bg-gradient-to-r from-paper-50 to-paper-100 dark:from-ink-900 dark:to-ink-950">
              {/* Book spine texture */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)`
              }} />
              <div className="relative p-4">
                {loading && !selectedFile ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-frame-green" />
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">{error}</p>
                    <button
                      onClick={() => fetchContents(currentPath)}
                      className="mt-4 px-4 py-2 bg-frame-green text-white rounded-lg hover:bg-frame-green-dark transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : filteredFiles.length === 0 ? (
                  <p className="text-center text-ink-500 dark:text-paper-500 py-12">
                    {searchQuery ? 'No files match your search' : 'No files in this directory'}
                  </p>
                ) : (
                  <div className="space-y-1">
                    {filteredFiles.map((file) => (
                      <motion.button
                        key={file.sha}
                        onClick={() => {
                          if (file.type === 'dir') {
                            navigateToFolder(file.path)
                          } else {
                            fetchFileContent(file)
                          }
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-paper-100 dark:hover:bg-ink-800 transition-all text-left ${
                          selectedFile?.sha === file.sha ? 'bg-paper-100 dark:bg-ink-800' : ''
                        }`}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {file.type === 'dir' ? (
                          <Folder className="w-5 h-5 text-frame-green flex-shrink-0" />
                        ) : (
                          <span className="text-ink-500 dark:text-paper-500 flex-shrink-0">{getFileIcon(file.name)}</span>
                        )}
                        <span className="text-sm truncate">{file.name}</span>
                        {file.type === 'dir' && (
                          <ChevronRight className="w-4 h-4 text-ink-400 ml-auto flex-shrink-0" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Load more button */}
                  {hasMore && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={loadMore}
                        disabled={isLoadingMore}
                        className="px-4 py-2 text-sm bg-paper-100 dark:bg-ink-800 hover:bg-paper-200 dark:hover:bg-ink-700 rounded-lg transition-colors inline-flex items-center gap-2"
                      >
                        {isLoadingMore ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            Load More ({allFilteredFiles.length - filteredFiles.length} more)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                )}
              </div>
            </div>

            {/* File Viewer with page texture */}
            <div className="relative flex-1 overflow-y-auto bg-gradient-to-br from-paper-50 via-paper-100 to-paper-50 dark:from-ink-950 dark:via-ink-900 dark:to-ink-950">
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='0.1' opacity='0.3'%3E%3Cpath d='M30 30L45 15M30 30L15 45M30 30L45 45M30 30L15 15'/%3E%3C/g%3E%3C/svg%3E")`
              }} />
              <div className="relative">
              {selectedFile ? (
                loading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-6 h-6 animate-spin text-frame-green" />
                  </div>
                ) : (
                  <div className="p-6">
                    {/* File header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-ink-200/10 dark:border-white/5">
                      <div>
                        <h3 className="text-xl font-semibold text-ink-900 dark:text-paper-50">{selectedFile.name}</h3>
                        <p className="text-sm text-ink-500 dark:text-paper-500 mt-1">{selectedFile.path}</p>
                      </div>
                      <a
                        href={selectedFile.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-paper-100 dark:bg-ink-800 hover:bg-paper-200 dark:hover:bg-ink-700 rounded-lg transition-colors"
                      >
                        View on GitHub
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    {/* File content with book-like styling */}
                    {selectedFile.name.endsWith('.md') ? (
                      <div className="relative">
                        {/* Book page texture */}
                        <div className="absolute inset-0 opacity-[0.02]" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                          mixBlendMode: 'multiply'
                        }} />
                        
                        <div className="relative prose prose-lg prose-ink dark:prose-invert max-w-none
                          prose-headings:font-serif prose-headings:tracking-tight 
                          prose-h1:text-4xl prose-h1:mb-8 prose-h1:border-b prose-h1:border-ink-200 dark:prose-h1:border-white/10 prose-h1:pb-4
                          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                          prose-p:text-ink-700 dark:prose-p:text-paper-300 prose-p:leading-relaxed prose-p:mb-6
                          prose-code:bg-paper-100 dark:prose-code:bg-ink-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                          prose-pre:bg-paper-100 dark:prose-pre:bg-ink-800 prose-pre:border prose-pre:border-ink-200/20 dark:prose-pre:border-white/10
                          prose-blockquote:border-l-4 prose-blockquote:border-frame-green prose-blockquote:pl-6 prose-blockquote:italic
                          prose-a:text-frame-green prose-a:no-underline hover:prose-a:underline
                          prose-img:rounded-xl prose-img:shadow-lg
                          prose-hr:border-ink-200/50 dark:prose-hr:border-white/10
                          prose-strong:text-ink-900 dark:prose-strong:text-paper-100
                          prose-em:text-ink-700 dark:prose-em:text-paper-300
                          prose-ul:list-disc prose-ol:list-decimal
                          prose-li:marker:text-frame-green
                          prose-p:first-of-type:first-letter:text-6xl prose-p:first-of-type:first-letter:font-serif prose-p:first-of-type:first-letter:leading-none prose-p:first-of-type:first-letter:mr-2 prose-p:first-of-type:first-letter:mt-1 prose-p:first-of-type:first-letter:text-frame-green"
                          style={{
                            fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                            textRendering: 'optimizeLegibility',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale'
                          }}
                        >
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              // Custom heading renderer with anchors
                              h1: ({ children, ...props }) => (
                                <h1 {...props} className="group relative">
                                  <span className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-frame-green">#</span>
                                  {children}
                                </h1>
                              ),
                              h2: ({ children, ...props }) => (
                                <h2 {...props} className="group relative">
                                  <span className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-frame-green">##</span>
                                  {children}
                                </h2>
                              ),
                              // Keep defaults for paragraphs and code; styling handled via prose classes
                            }}
                          >
                            {fileContent}
                          </ReactMarkdown>
                        </div>
                        
                        {/* Page edge shadow for book effect */}
                        <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <pre className="bg-paper-100 dark:bg-ink-800 p-6 rounded-xl overflow-x-auto border border-ink-200/20 dark:border-white/10 shadow-inner">
                        <code className="text-sm font-mono">{fileContent}</code>
                      </pre>
                    )}
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <Book className="w-16 h-16 text-ink-300 dark:text-ink-700 mx-auto mb-4" />
                    <p className="text-ink-500 dark:text-paper-500">Select a file to view its contents</p>
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
