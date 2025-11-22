import type { LucideIcon } from 'lucide-react'

export interface GitHubFile {
  name: string
  path: string
  type: 'file' | 'dir'
  sha: string
  size?: number
  url: string
  html_url: string
  download_url?: string
}

export interface GitTreeItem {
  path: string
  type: 'blob' | 'tree'
  sha: string
  size?: number
}

export type NodeLevel = 'fabric' | 'weave' | 'loom' | 'strand' | 'folder'

export interface KnowledgeTreeNode {
  name: string
  path: string
  type: 'file' | 'dir'
  children?: KnowledgeTreeNode[]
  strandCount: number
  level: NodeLevel
}

export interface StrandMetadata {
  id?: string
  slug?: string
  title?: string
  version?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  taxonomy?: {
    subjects?: string[]
    topics?: string[]
  }
  tags?: string | string[]
  contentType?: string
  relationships?: {
    references?: string[]
    prerequisites?: string[]
  }
  publishing?: {
    status?: 'draft' | 'published' | 'archived'
    lastUpdated?: string
  }
  [key: string]: any
}

export type SidebarMode = 'tree' | 'toc'
export type ViewerMode = 'modal' | 'page'
export type FileFilterScope = 'all' | 'strands' | 'media' | 'configs'
export type NavigationRootScope = 'fabric' | 'weaves'

export interface SearchOptions {
  query: string
  searchNames: boolean
  searchContent: boolean
  caseSensitive: boolean
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  tags?: string[]
  subjects?: string[]
  filterScope: FileFilterScope
  hideEmptyFolders: boolean
  rootScope: NavigationRootScope
}

export interface LevelStyle {
  label: string
  className: string
  icon?: LucideIcon
}

export interface FrameCodexViewerProps {
  isOpen: boolean
  onClose?: () => void
  mode?: ViewerMode
  initialPath?: string
}


