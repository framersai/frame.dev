import type { SearchEngine, CodexSearchResult, SearchOptions } from './types'

/**
 * Basic client-side search engine implementation using simple string matching.
 * In a real implementation, this would connect to a vector DB or use a local
 * search index like FlexSearch or Minisearch.
 */
class SimpleSearchEngine implements SearchEngine {
  private files: any[] = []

  async index(files: any[]): Promise<void> {
    this.files = files
  }

  async search(query: string, options?: SearchOptions): Promise<CodexSearchResult[]> {
    if (!query) return []

    const q = query.toLowerCase()
    const results: CodexSearchResult[] = []

    // Simulate search delay for realism
    await new Promise(resolve => setTimeout(resolve, 100))

    // This is a placeholder. In production, this connects to the pre-built index.
    // For now, return empty since we rely on GitHub API for tree listing
    // and this engine is used for "advanced" full-text search.
    
    return results
  }

  canUseSemantic(): boolean {
    return false
  }
}

// Singleton instance
let engineInstance: SearchEngine | null = null

export function getSearchEngine(): SearchEngine {
  if (!engineInstance) {
    engineInstance = new SimpleSearchEngine()
  }
  return engineInstance
}

