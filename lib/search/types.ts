export interface CodexSearchResult {
  path: string
  title: string
  excerpt: string
  score: number
  matchType: 'title' | 'content' | 'semantic'
  tags?: string[]
  metadata?: Record<string, any>
}

export interface SearchOptions {
  limit?: number
  semantic?: boolean
  threshold?: number
}

export interface SearchEngine {
  search(query: string, options?: SearchOptions): Promise<CodexSearchResult[]>
  index(files: any[]): Promise<void>
  canUseSemantic(): boolean
}

