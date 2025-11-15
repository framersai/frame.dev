"use client"

/**
 * Frame Codex Submission Component
 * 
 * Client-side UI for submitting content to Frame Codex:
 * - URL scraping with Readability.js
 * - File upload (drag-drop, paste, select)
 * - Auto-generate metadata using TF-IDF
 * - Rate limiting (5 submissions/hour)
 * - Toast notifications
 * - Direct GitHub API PR creation
 * 
 * Requires user's GitHub OAuth token for PR creation.
 */

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, Link2, FileText, Sparkles, AlertCircle, CheckCircle2, 
  Loader2, X, Plus, Tag, Hash, BookOpen, Zap, Github, Info 
} from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

interface SubmissionMetadata {
  title: string
  summary: string
  tags: string[]
  subjects: string[]
  topics: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  contentType: 'markdown' | 'code' | 'data' | 'media'
  weave: string
  loom: string
}

interface SubmissionState {
  mode: 'url' | 'file' | 'paste' | null
  content: string
  metadata: Partial<SubmissionMetadata>
  loading: boolean
  error: string | null
  success: boolean
  prUrl: string | null
}

interface RateLimitState {
  count: number
  resetTime: number
}

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour

// TF-IDF keyword extraction (simplified client-side version)
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
  'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'been', 'be',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
  'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
])

function extractKeywords(text: string, limit = 10): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !STOP_WORDS.has(word))
  
  const frequency: Record<string, number> = {}
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1
  })
  
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word)
}

function generateSummary(text: string): string {
  const sentences = text
    .replace(/```[\s\S]*?```/g, '')
    .split(/[.!?]+\s+/)
    .filter(s => s.length > 20)
  
  return sentences[0]?.substring(0, 300) || text.substring(0, 300)
}

function detectDifficulty(text: string): SubmissionMetadata['difficulty'] {
  const lower = text.toLowerCase()
  if (lower.match(/beginner|intro|basic|start|simple/)) return 'beginner'
  if (lower.match(/advanced|expert|complex|deep|optimization/)) return 'advanced'
  if (lower.match(/expert|research|cutting-edge|novel/)) return 'expert'
  return 'intermediate'
}

export default function CodexSubmit({ onClose }: { onClose?: () => void }) {
  const [state, setState] = useState<SubmissionState>({
    mode: null,
    content: '',
    metadata: {},
    loading: false,
    error: null,
    success: false,
    prUrl: null
  })
  
  const [rateLimit, setRateLimit] = useState<RateLimitState>({ count: 0, resetTime: 0 })
  const [githubToken, setGithubToken] = useState<string>('')
  const [showTokenInput, setShowTokenInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  
  // Load rate limit from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('codex-rate-limit')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.resetTime > Date.now()) {
        setRateLimit(parsed)
      } else {
        localStorage.removeItem('codex-rate-limit')
      }
    }
    
    // Load GitHub token
    const token = localStorage.getItem('github-token')
    if (token) setGithubToken(token)
  }, [])
  
  // Check rate limit
  const checkRateLimit = useCallback((): boolean => {
    if (rateLimit.resetTime < Date.now()) {
      setRateLimit({ count: 0, resetTime: Date.now() + RATE_LIMIT_WINDOW })
      return true
    }
    
    if (rateLimit.count >= RATE_LIMIT_MAX) {
      const minutesLeft = Math.ceil((rateLimit.resetTime - Date.now()) / 60000)
      setState(prev => ({
        ...prev,
        error: `Rate limit exceeded. Try again in ${minutesLeft} minutes.`
      }))
      return false
    }
    
    return true
  }, [rateLimit])
  
  // Update rate limit
  const incrementRateLimit = useCallback(() => {
    const newLimit = {
      count: rateLimit.count + 1,
      resetTime: rateLimit.resetTime || Date.now() + RATE_LIMIT_WINDOW
    }
    setRateLimit(newLimit)
    localStorage.setItem('codex-rate-limit', JSON.stringify(newLimit))
  }, [rateLimit])
  
  // Scrape URL using a CORS proxy + Readability
  const scrapeURL = useCallback(async (url: string) => {
    if (!checkRateLimit()) return
    
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      // Fetch via CORS proxy
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      const response = await fetch(proxyUrl)
      const data = await response.json()
      
      if (!data.contents) {
        throw new Error('Failed to fetch URL content')
      }
      
      // Parse HTML with DOMParser
      const parser = new DOMParser()
      const doc = parser.parseFromString(data.contents, 'text/html')
      
      // Extract title
      const title = doc.querySelector('title')?.textContent || 
                    doc.querySelector('h1')?.textContent || 
                    'Untitled'
      
      // Extract main content (simplified Readability)
      const article = doc.querySelector('article') || 
                      doc.querySelector('main') || 
                      doc.body
      
      const content = article?.textContent || ''
      const cleanContent = content.replace(/\s+/g, ' ').trim()
      
      // Auto-generate metadata
      const keywords = extractKeywords(cleanContent)
      const summary = generateSummary(cleanContent)
      const difficulty = detectDifficulty(cleanContent)
      
      setState(prev => ({
        ...prev,
        mode: 'url',
        content: `# ${title}\n\nSource: ${url}\n\n${cleanContent.substring(0, 5000)}`,
        metadata: {
          title,
          summary,
          tags: keywords,
          difficulty,
          contentType: 'markdown'
        },
        loading: false
      }))
      
      incrementRateLimit()
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: `Failed to scrape URL: ${error instanceof Error ? error.message : 'Unknown error'}`
      }))
    }
  }, [checkRateLimit, incrementRateLimit])
  
  // Handle file upload
  const handleFileUpload = useCallback((file: File) => {
    if (!checkRateLimit()) return
    
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      
      // Auto-generate metadata
      const keywords = extractKeywords(content)
      const summary = generateSummary(content)
      const difficulty = detectDifficulty(content)
      
      setState(prev => ({
        ...prev,
        mode: 'file',
        content,
        metadata: {
          title: file.name.replace(/\.[^/.]+$/, ''),
          summary,
          tags: keywords,
          difficulty,
          contentType: file.name.endsWith('.md') ? 'markdown' : 'data'
        },
        loading: false
      }))
      
      incrementRateLimit()
    }
    
    reader.onerror = () => {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to read file'
      }))
    }
    
    reader.readAsText(file)
  }, [checkRateLimit, incrementRateLimit])
  
  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }, [handleFileUpload])
  
  // Handle paste
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text')
    if (text && text.length > 100) {
      if (!checkRateLimit()) return
      
      const keywords = extractKeywords(text)
      const summary = generateSummary(text)
      const difficulty = detectDifficulty(text)
      
      setState(prev => ({
        ...prev,
        mode: 'paste',
        content: text,
        metadata: {
          title: text.split('\n')[0].substring(0, 100),
          summary,
          tags: keywords,
          difficulty,
          contentType: 'markdown'
        }
      }))
      
      incrementRateLimit()
    }
  }, [checkRateLimit, incrementRateLimit])
  
  // Create GitHub PR
  const createPR = useCallback(async () => {
    if (!githubToken) {
      setShowTokenInput(true)
      setState(prev => ({ ...prev, error: 'GitHub token required to create PR' }))
      return
    }
    
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const { metadata, content } = state
      
      // Generate frontmatter
      const frontmatter = `---
id: ${uuidv4()}
slug: ${metadata.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'untitled'}
title: "${metadata.title || 'Untitled'}"
summary: "${metadata.summary || ''}"
version: "1.0.0"
contentType: ${metadata.contentType || 'markdown'}
difficulty: ${metadata.difficulty || 'intermediate'}
taxonomy:
  subjects: [${metadata.subjects?.map(s => `"${s}"`).join(', ') || ''}]
  topics: [${metadata.topics?.map(t => `"${t}"`).join(', ') || ''}]
tags: [${metadata.tags?.map(t => `"${t}"`).join(', ') || ''}]
publishing:
  created: "${new Date().toISOString()}"
  status: "draft"
---

`
      
      const fullContent = frontmatter + content
      
      // Determine file path
      const weave = metadata.weave || 'community'
      const loom = metadata.loom || 'general'
      const filename = `${metadata.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'untitled'}.md`
      const filePath = `weaves/${weave}/looms/${loom}/strands/${filename}`
      
      // Create branch
      const branchName = `submit/${Date.now()}-${filename.replace('.md', '')}`
      
      // GitHub API calls
      const headers = {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
      
      // Get main branch ref
      const refResponse = await fetch(
        'https://api.github.com/repos/framersai/codex/git/refs/heads/main',
        { headers }
      )
      const refData = await refResponse.json()
      const mainSha = refData.object.sha
      
      // Create new branch
      await fetch(
        'https://api.github.com/repos/framersai/codex/git/refs',
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            ref: `refs/heads/${branchName}`,
            sha: mainSha
          })
        }
      )
      
      // Create file
      await fetch(
        `https://api.github.com/repos/framersai/codex/contents/${filePath}`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            message: `feat: add ${metadata.title || 'new content'}`,
            content: btoa(unescape(encodeURIComponent(fullContent))),
            branch: branchName
          })
        }
      )
      
      // Create PR
      const prResponse = await fetch(
        'https://api.github.com/repos/framersai/codex/pulls',
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            title: `Add: ${metadata.title || 'New Content'}`,
            head: branchName,
            base: 'main',
            body: `## Submission via Frame Codex UI

**Summary:** ${metadata.summary || 'No summary provided'}

**Metadata:**
- **Type:** ${metadata.contentType || 'markdown'}
- **Difficulty:** ${metadata.difficulty || 'intermediate'}
- **Tags:** ${metadata.tags?.join(', ') || 'None'}
- **Subjects:** ${metadata.subjects?.join(', ') || 'None'}
- **Topics:** ${metadata.topics?.join(', ') || 'None'}

**Source:** ${state.mode === 'url' ? 'URL scrape' : state.mode === 'file' ? 'File upload' : 'Pasted content'}

---

Submitted via [Frame Codex](https://frame.dev/codex) submission UI.

/cc @framersai/codex-maintainers`
          })
        }
      )
      
      const prData = await prResponse.json()
      
      if (prData.html_url) {
        setState(prev => ({
          ...prev,
          loading: false,
          success: true,
          prUrl: prData.html_url
        }))
        
        // Save token for future use
        localStorage.setItem('github-token', githubToken)
      } else {
        throw new Error(prData.message || 'Failed to create PR')
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: `Failed to create PR: ${error instanceof Error ? error.message : 'Unknown error'}`
      }))
    }
  }, [state, githubToken])
  
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Submit to Frame Codex
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share knowledge with the world
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Success State */}
          {state.success && state.prUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                    Pull Request Created!
                  </h3>
                  <p className="text-green-800 dark:text-green-200 mb-4">
                    Your submission has been sent for review. Our maintainers will review it shortly.
                  </p>
                  <a
                    href={state.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Pull Request
                  </a>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Error State */}
          {state.error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 dark:text-red-200 text-sm">{state.error}</p>
            </motion.div>
          )}
          
          {/* Input Methods */}
          {!state.mode && !state.success && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* URL Scrape */}
              <button
                onClick={() => {
                  const url = prompt('Enter URL to scrape:')
                  if (url) scrapeURL(url)
                }}
                className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 rounded-xl transition-colors group"
              >
                <Link2 className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  From URL
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Scrape content from any webpage
                </p>
              </button>
              
              {/* File Upload */}
              <button
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 rounded-xl transition-colors group"
              >
                <FileText className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Upload File
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Drag & drop or click to select
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".md,.txt,.json,.yaml,.yml"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                />
              </button>
              
              {/* Paste Content */}
              <button
                onClick={() => setState(prev => ({ ...prev, mode: 'paste' }))}
                className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 rounded-xl transition-colors group"
              >
                <Sparkles className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Paste Content
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Write or paste markdown
                </p>
              </button>
            </div>
          )}
          
          {/* Paste Mode */}
          {state.mode === 'paste' && !state.content && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Paste your content
              </label>
              <textarea
                ref={textAreaRef}
                onPaste={handlePaste}
                placeholder="Paste markdown content here..."
                className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}
          
          {/* Metadata Editor */}
          {state.content && !state.success && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Sparkles className="w-4 h-4" />
                <span>Metadata auto-generated • Edit as needed</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={state.metadata.title || ''}
                    onChange={(e) => setState(prev => ({
                      ...prev,
                      metadata: { ...prev.metadata, title: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={state.metadata.difficulty || 'intermediate'}
                    onChange={(e) => setState(prev => ({
                      ...prev,
                      metadata: { ...prev.metadata, difficulty: e.target.value as any }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Summary *
                </label>
                <textarea
                  value={state.metadata.summary || ''}
                  onChange={(e) => setState(prev => ({
                    ...prev,
                    metadata: { ...prev.metadata, summary: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={state.metadata.tags?.join(', ') || ''}
                  onChange={(e) => setState(prev => ({
                    ...prev,
                    metadata: { ...prev.metadata, tags: e.target.value.split(',').map(t => t.trim()) }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              
              {/* GitHub Token Input */}
              {(showTokenInput || !githubToken) && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <div className="flex items-start gap-3 mb-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        GitHub Token Required
                      </h4>
                      <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                        To create a PR, we need a GitHub personal access token with <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">repo</code> scope.
                      </p>
                      <a
                        href="https://github.com/settings/tokens/new?scopes=repo&description=Frame%20Codex%20Submission"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Create token on GitHub →
                      </a>
                    </div>
                  </div>
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                  />
                </div>
              )}
              
              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => setState({
                    mode: null,
                    content: '',
                    metadata: {},
                    loading: false,
                    error: null,
                    success: false,
                    prUrl: null
                  })}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Start Over
                </button>
                
                <button
                  onClick={createPR}
                  disabled={state.loading || !state.metadata.title || !state.metadata.summary}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {state.loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating PR...
                    </>
                  ) : (
                    <>
                      <Github className="w-4 h-4" />
                      Create Pull Request
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
          
          {/* Info Footer */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                By submitting, you agree that your content is original or properly licensed, 
                and will be published under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">CC-BY-4.0</a>.
                {' '}Rate limit: {rateLimit.count}/{RATE_LIMIT_MAX} submissions per hour.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

