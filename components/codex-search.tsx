'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, Folder, Hash, Sparkles, TrendingUp, Clock, ArrowUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'

interface SearchResult {
  path: string
  name: string
  type: 'file' | 'dir'
  content?: string
  score?: number
  highlights?: string[]
  metadata?: Record<string, any>
}

interface CodexSearchProps {
  onSelect?: (result: SearchResult) => void
  compact?: boolean
}

export default function CodexSearch({ onSelect, compact = false }: CodexSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = useState<any>(null)
  const [rawIndex, setRawIndex] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  // Load recent searches from localStorage
  useEffect(() => {
    const recent = localStorage.getItem('codex-recent-searches')
    if (recent) {
      setRecentSearches(JSON.parse(recent).slice(0, 5))
    }
  }, [])

  // Initialize search index
  useEffect(() => {
    const loadIndex = async () => {
      try {
        // In production, this would load a pre-built index from GitHub Actions
        const response = await fetch('/api/codex-index.json')
        if (response.ok) {
          const data: SearchResult[] = await response.json()
          
          const fuse = new Fuse(data, {
            keys: [
              { name: 'name', weight: 0.3 },
              { name: 'content', weight: 0.5 },
              { name: 'metadata.title', weight: 0.2 },
              { name: 'metadata.tags', weight: 0.2 },
              { name: 'metadata.summary', weight: 0.3 },
            ],
            threshold: 0.3,
            includeScore: true,
            includeMatches: true,
            minMatchCharLength: 2,
          })
          
          setIndex(fuse)
          setRawIndex(data)
        }
      } catch (error) {
        console.error('Failed to load search index:', error)
      }
    }
    
    loadIndex()
  }, [])

  // Smart suggestions based on input
  useEffect(() => {
    if (query.length > 2) {
      // Generate contextual suggestions
      const contextSuggestions = [
        query + ' architecture',
        query + ' implementation',
        query + ' examples',
        query + ' best practices',
        'how to ' + query,
        'what is ' + query,
      ].filter(s => s.length < 40)
      
      setSuggestions(contextSuggestions.slice(0, 4))
    } else {
      setSuggestions([])
    }
  }, [query])

  const performSearch = useCallback((searchQuery: string) => {
    if (!index || searchQuery.length < 2) {
      setResults([])
      setShowDropdown(false)
      return
    }

    setLoading(true)
    
    // Search using Fuse.js
    const fuseResults = index.search(searchQuery, { limit: 20 })
    
    // Transform results
    const transformedResults = fuseResults.map((result: any) => ({
      ...result.item,
      score: result.score,
      highlights: result.matches?.map((m: any) => m.value) || [],
    }))
    
    setResults(transformedResults)
    setShowDropdown(true)
    setActiveIndex(transformedResults.length > 0 ? 0 : -1)
    setLoading(false)
    
    // Save to recent searches
    if (searchQuery.length > 3) {
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('codex-recent-searches', JSON.stringify(updated))
    }
  }, [index, recentSearches])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [query, performSearch])

  const handleSelect = (result: SearchResult) => {
    if (onSelect) {
      onSelect(result)
    } else {
      // Navigate to the file
      router.push(`/codex?file=${result.path}`)
    }
    setShowDropdown(false)
    setActiveIndex(-1)
  }

  // Autocomplete options derived from index
  const autocompleteOptions = useMemo(() => {
    if (!query || query.length < 2 || rawIndex.length === 0) return []

    const lower = query.toLowerCase()

    const matches = rawIndex
      .filter((item) => {
        const title = (item.metadata?.title || item.name || '').toLowerCase()
        return title.includes(lower)
      })
      .slice(0, 6)

    return matches
  }, [query, rawIndex])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || autocompleteOptions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) =>
        prev < autocompleteOptions.length - 1 ? prev + 1 : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : autocompleteOptions.length - 1
      )
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < autocompleteOptions.length) {
        e.preventDefault()
        handleSelect(autocompleteOptions[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
      setActiveIndex(-1)
    }
  }

  if (compact) {
    return (
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search codex..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => {
              // Small delay to allow click
              setTimeout(() => setShowDropdown(false), 120)
            }}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        </div>
        
        <AnimatePresence>
          {showDropdown && (results.length > 0 || suggestions.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50 max-h-96 overflow-y-auto"
            >
              {/* Search results */}
              {results.length > 0 && (
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 px-2 py-1">Results</div>
                  {results.map((result, idx) => (
                    <button
                      key={result.path}
                      onClick={() => handleSelect(result)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-start gap-2 transition-colors ${
                        idx === activeIndex
                          ? 'bg-purple-50 dark:bg-purple-900/30'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {result.type === 'dir' ? (
                        <Folder className="w-4 h-4 text-amber-600 mt-0.5" />
                      ) : (
                        <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {result.metadata?.title || result.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate">{result.path}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="p-2 border-t border-gray-200 dark:border-gray-800">
                  <div className="text-xs font-medium text-gray-500 px-2 py-1">Try searching for</div>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="w-full text-left px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400"
                    >
                      <Sparkles className="w-3 h-3 inline mr-2 text-purple-500" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search the codex of humanity..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => {
            setTimeout(() => setShowDropdown(false), 120)
          }}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Inline autocomplete dropdown */}
        <AnimatePresence>
          {showDropdown && autocompleteOptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden max-h-80 overflow-y-auto"
            >
              <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 border-b border-gray-100 dark:border-gray-800">
                <span className="flex items-center gap-1">
                  <ArrowUpDown className="w-3 h-3" />
                  Use ↑ ↓ and Enter to select
                </span>
                <span>{autocompleteOptions.length} matches</span>
              </div>
              {autocompleteOptions.map((item, idx) => (
                <button
                  key={item.path}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSelect(item)
                  }}
                  className={`w-full text-left px-4 py-2 flex items-start gap-3 text-sm transition-colors ${
                    idx === activeIndex
                      ? 'bg-purple-50 dark:bg-purple-900/30'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.type === 'dir' ? (
                    <Folder className="w-4 h-4 text-amber-600 mt-1" />
                  ) : (
                    <FileText className="w-4 h-4 text-blue-600 mt-1" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white truncate">
                      {item.metadata?.title || item.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {item.path}
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recent searches */}
      {!query && recentSearches.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => setQuery(search)}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search results */}
      <AnimatePresence mode="wait">
        {results.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-3"
          >
            <div className="text-sm text-gray-500 mb-4">
              Found {results.length} results
            </div>
            
            {results.map((result, index) => (
              <motion.div
                key={result.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelect(result)}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 cursor-pointer transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  {result.type === 'dir' ? (
                    <Folder className="w-5 h-5 text-amber-600 mt-1" />
                  ) : (
                    <FileText className="w-5 h-5 text-blue-600 mt-1" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {result.metadata?.title || result.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{result.path}</p>
                    
                    {result.metadata?.summary && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {result.metadata.summary}
                      </p>
                    )}
                    
                    {result.metadata?.tags && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {result.metadata.tags.split(',').slice(0, 3).map((tag: string) => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs">
                            <Hash className="w-3 h-3" />
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {result.score !== undefined && (
                    <div className="text-xs text-gray-400">
                      {Math.round((1 - result.score) * 100)}% match
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : query.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">No results found for "{query}"</p>
            
            {suggestions.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-3">Try searching for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/30 text-purple-700 dark:text-purple-300 rounded-full text-sm transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center gap-2 text-gray-400 mb-4">
              <TrendingUp className="w-5 h-5" />
              <span>Popular topics</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {['OpenStrand', 'Frame Codex', 'AgentOS', 'Superintelligence', 'Architecture'].map(topic => (
                <button
                  key={topic}
                  onClick={() => setQuery(topic.toLowerCase())}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
