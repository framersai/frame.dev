import { useState, useMemo, useCallback } from 'react'
import type { GitHubFile, SearchOptions, FileFilterScope, NavigationRootScope } from '../types'

export function useSearchFilter(files: GitHubFile[]) {
  const [options, setOptions] = useState<SearchOptions>({
    query: '',
    searchNames: true,
    searchContent: false,
    caseSensitive: false,
    filterScope: 'all',
    hideEmptyFolders: false,
    rootScope: 'fabric', // Default root scope
  })

  const setQuery = useCallback((query: string) => {
    setOptions((prev) => ({ ...prev, query }))
  }, [])

  const toggleSearchNames = useCallback(() => {
    setOptions((prev) => ({ ...prev, searchNames: !prev.searchNames }))
  }, [])

  const toggleSearchContent = useCallback(() => {
    setOptions((prev) => ({ ...prev, searchContent: !prev.searchContent }))
  }, [])

  const toggleCaseSensitive = useCallback(() => {
    setOptions((prev) => ({ ...prev, caseSensitive: !prev.caseSensitive }))
  }, [])

  const setFilterScope = useCallback((scope: FileFilterScope) => {
    setOptions((prev) => ({ ...prev, filterScope: scope }))
  }, [])

  const toggleHideEmptyFolders = useCallback(() => {
    setOptions((prev) => ({ ...prev, hideEmptyFolders: !prev.hideEmptyFolders }))
  }, [])

  const setRootScope = useCallback((scope: NavigationRootScope) => {
    setOptions((prev) => ({ ...prev, rootScope: scope }))
  }, [])

  const resetFilters = useCallback(() => {
    setOptions({
      query: '',
      searchNames: true,
      searchContent: false,
      caseSensitive: false,
      filterScope: 'all',
      hideEmptyFolders: false,
      rootScope: 'fabric',
    })
  }, [])

  const filteredFiles = useMemo(() => {
    if (!files || files.length === 0) return []

    let result = files

    // 1. Scope filtering
    if (options.filterScope === 'strands' && options.rootScope) {
      // TODO: Implement specific scope filtering logic if needed
      // For now we just check if it starts with rootScope if we were using 'root' logic,
      // but since 'root' isn't in FileFilterScope, we adapt.
    }

    // 2. Query filtering
    if (options.query) {
      const q = options.caseSensitive ? options.query : options.query.toLowerCase()
      
      result = result.filter((f) => {
        const name = options.caseSensitive ? f.name : f.name.toLowerCase()
        const path = options.caseSensitive ? f.path : f.path.toLowerCase()
        
        // Simple name match
        if (options.searchNames && name.includes(q)) return true
        
        // Path match (often useful)
        if (path.includes(q)) return true

        return false
      })
    }

    // 3. Empty folder hiding (basic implementation)
    if (options.hideEmptyFolders) {
      // This is tricky with a flat list, usually requires tree traversal.
      // For now, we'll skip strict empty folder logic on client-side flat lists
      // unless we build a tree first.
    }

    return result
  }, [files, options])

  return {
    options,
    setQuery,
    toggleSearchNames,
    toggleSearchContent,
    toggleCaseSensitive,
    setFilterScope,
    toggleHideEmptyFolders,
    setRootScope,
    filteredFiles,
    resetFilters,
  }
}

