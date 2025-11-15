"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Folder, File as FileIcon, ChevronRight, Home, Loader2, ExternalLink, Book, FileText, Code, Database, Image } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'

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
}

const FrameCodexViewer: React.FC<FrameCodexViewerProps> = ({ isOpen, onClose, mode = 'modal' }) => {
  const [currentPath, setCurrentPath] = useState('')
  const [files, setFiles] = useState<GitHubFile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<GitHubFile | null>(null)
  const [fileContent, setFileContent] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [displayLimit, setDisplayLimit] = useState(50)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  const REPO_OWNER = 'framersai'
  const REPO_NAME = 'codex'
  const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`

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
    } catch (err) {
      console.error('Error fetching contents:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch repository contents')
    } finally {
      setLoading(false)
    }
  }, [API_BASE])

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
    } catch (err) {
      console.error('Error fetching file content:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch file content')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      fetchContents()
    }
  }, [isOpen, fetchContents])

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

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  const isMarkdown = (filename: string) => {
    return filename.toLowerCase().endsWith('.md') || filename.toLowerCase().endsWith('.mdx')
  }

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
        return <Image className="w-5 h-5 text-pink-600" />
      default:
        return <FileIcon className="w-5 h-5 text-gray-600" />
    }
  }

  const isModal = mode === 'modal';

  if (!isOpen && isModal) return null;

  const content = (
    <>
      {/* File Browser - Sidebar */}
      <div className="w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col flex-shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Book className="w-6 h-6 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Frame Codex</h2>
            </div>
            {isModal && onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
            />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1 text-sm">
            <button 
              onClick={() => fetchContents('')}
              className="flex items-center gap-1 hover:text-purple-600"
            >
              <Home className="w-4 h-4" />
            </button>
            {currentPath && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {currentPath.split('/').map((part, index, arr) => (
                  <React.Fragment key={index}>
                    <button
                      onClick={() => fetchContents(arr.slice(0, index + 1).join('/'))}
                      className="hover:text-purple-600 dark:text-gray-300"
                    >
                      {part}
                    </button>
                    {index < arr.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
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
              {displayedFiles.map((file) => (
                <motion.button
                  key={file.sha}
                  onClick={() => handleFileClick(file)}
                  className={`w-full text-left p-3 rounded-lg flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${
                    selectedFile?.path === file.path ? 'bg-purple-100 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-700' : ''
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {getFileIcon(file)}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{file.name}</span>
                </motion.button>
              ))}
              
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

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
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

      {/* File Viewer */}
      <div className="flex-1 bg-white dark:bg-gray-950 overflow-hidden flex flex-col">
        {selectedFile ? (
          <>
            {/* File Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(selectedFile)}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{selectedFile.name}</h3>
                    <p className="text-sm text-gray-500">{selectedFile.path}</p>
                  </div>
                </div>
                <a 
                  href={selectedFile.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* File Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                </div>
              ) : isMarkdown(selectedFile.name) ? (
                <article className="prose prose-lg prose-purple dark:prose-invert max-w-4xl mx-auto">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      },
                      h1: ({ children, ...props }) => (
                        <h1 id={String(children).toLowerCase().replace(/\s+/g, '-')} {...props}>
                          {children}
                        </h1>
                      ),
                      h2: ({ children, ...props }) => (
                        <h2 id={String(children).toLowerCase().replace(/\s+/g, '-')} {...props}>
                          {children}
                        </h2>
                      ),
                    }}
                  >
                    {fileContent}
                  </ReactMarkdown>
                </article>
              ) : (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={selectedFile.name.split('.').pop() || 'text'}
                  showLineNumbers
                  wrapLongLines
                >
                  {fileContent}
                </SyntaxHighlighter>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <Book className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
              <p className="text-xl font-medium mb-2">Select a file to view</p>
              <p className="text-sm">Browse the Frame Codex to explore humanity&apos;s knowledge</p>
              
              {/* SEO Content */}
              <div className="mt-8 max-w-2xl text-left space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">What is Frame Codex?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Frame Codex is a comprehensive knowledge repository designed for LLM ingestion and AI applications. 
                  It contains curated, structured information organized in a format optimized for machine understanding.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This codex powers the Frame API, providing semantic search, knowledge graphs, and relationship mappings 
                  for building next-generation AI agents and superintelligence systems.
                </p>
                <div className="pt-4">
                  <Link href="/api" className="text-purple-600 hover:underline text-sm">
                    Learn about the Frame API →
                  </Link>
                </div>
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

  return <div className="w-full h-screen flex">{content}</div>;
}

export default FrameCodexViewer