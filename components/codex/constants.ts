/**
 * Constants and configuration for Frame Codex viewer
 * @module codex/constants
 */

import { Book, Folder, FileText, Code } from 'lucide-react'
import type { NodeLevel, LevelStyle } from './types'

/**
 * GitHub repository configuration
 *
 * @remarks
 * By default this points at the public Frame Codex repository.
 * You can point the viewer at any GitHub repo that follows the
 * same weave/loom/strand structure by setting:
 *
 * - `NEXT_PUBLIC_CODEX_REPO_OWNER`
 * - `NEXT_PUBLIC_CODEX_REPO_NAME`
 * - `NEXT_PUBLIC_CODEX_REPO_BRANCH`
 *
 * in your environment. These are read at build-time and used on
 * the client only (public, no secrets).
 */
export const REPO_CONFIG = {
  /** Repository owner (public, safe for client) */
  OWNER: process.env.NEXT_PUBLIC_CODEX_REPO_OWNER || 'framersai',
  /** Repository name (public, safe for client) */
  NAME: process.env.NEXT_PUBLIC_CODEX_REPO_NAME || 'codex',
  /** Default branch (public, safe for client) */
  BRANCH: process.env.NEXT_PUBLIC_CODEX_REPO_BRANCH || 'main',
} as { OWNER: string; NAME: string; BRANCH: string }

/**
 * GitHub API endpoints
 */
const joinPath = (base: string, path?: string) => {
  if (!path) return base
  const sanitized = path.replace(/^\/+/, '')
  return `${base}/${sanitized}`
}

export const API_ENDPOINTS = {
  contents: (path = '') =>
    `${joinPath(
      `https://api.github.com/repos/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}/contents`,
      path
    )}?ref=${encodeURIComponent(REPO_CONFIG.BRANCH)}`,
  tree: () =>
    `https://api.github.com/repos/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}/git/trees/${REPO_CONFIG.BRANCH}?recursive=1`,
  raw: (path = '') =>
    joinPath(`https://raw.githubusercontent.com/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}/${REPO_CONFIG.BRANCH}`, path),
} as const

/**
 * Paths and files to ignore in the viewer
 * These are filtered from the file tree and search results
 */
export const IGNORED_SEGMENTS = [
  '.github',
  '.husky',
  'node_modules',
  '.next',
  '.cache',
  'dist',
  'coverage',
  '.git',
  '.vscode',
  '.idea',
] as const

/**
 * Supported markdown file extensions
 */
export const MARKDOWN_EXTENSIONS = ['.md', '.mdx'] as const

/**
 * Media file extensions (images, audio, video, PDFs)
 */
export const MEDIA_EXTENSIONS = {
  images: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'],
  audio: ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.webm'],
  video: ['.mp4', '.webm', '.ogv', '.mov', '.avi', '.mkv'],
  documents: ['.pdf'],
} as const

/**
 * All supported media extensions (flattened)
 */
export const ALL_MEDIA_EXTENSIONS = [
  ...MEDIA_EXTENSIONS.images,
  ...MEDIA_EXTENSIONS.audio,
  ...MEDIA_EXTENSIONS.video,
  ...MEDIA_EXTENSIONS.documents,
] as const

/**
 * Plain-text configuration/document extensions that can be previewed inline
 */
export const TEXT_FILE_EXTENSIONS = [
  '.json',
  '.yaml',
  '.yml',
  '.toml',
  '.ini',
  '.cfg',
  '.conf',
  '.txt',
  '.log',
  '.env',
  '.gitignore',
  '.gitattributes',
  '.mdxconfig',
  '.schema',
] as const

/**
 * Level-specific styling for knowledge hierarchy
 * Maps NodeLevel to display configuration
 * 
 * @remarks
 * Color scheme: Monochrome base (grey/black) with subdued warm neon accents
 * - Weave: Warm amber/gold burst
 * - Loom: Cool cyan/blue burst
 * - Strand: Electric purple/violet burst
 * - Folder: Pure monochrome
 */
export const LEVEL_STYLES: Record<NodeLevel, LevelStyle> = {
  fabric: {
    label: 'Fabric',
    className: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-2 border-zinc-800 dark:border-zinc-200',
    icon: Book,
  },
  weave: {
    label: 'Weave',
    className: 'bg-gradient-to-br from-amber-400/20 to-yellow-400/20 text-amber-900 dark:from-amber-500/10 dark:to-yellow-500/10 dark:text-amber-300 border-2 border-amber-500/30 dark:border-amber-400/30',
    icon: Folder,
  },
  loom: {
    label: 'Loom',
    className: 'bg-gradient-to-br from-cyan-400/20 to-blue-400/20 text-cyan-900 dark:from-cyan-500/10 dark:to-blue-500/10 dark:text-cyan-300 border-2 border-cyan-500/30 dark:border-cyan-400/30',
    icon: FileText,
  },
  strand: {
    label: 'Strand',
    className:
      'bg-gradient-to-br from-emerald-400/20 via-sky-400/20 to-rose-400/20 text-emerald-900 dark:from-emerald-500/10 dark:via-sky-500/10 dark:to-rose-500/10 dark:text-emerald-300 border-2 border-emerald-500/30 dark:border-emerald-400/30',
    icon: Code,
  },
  folder: {
    label: 'Folder',
    className: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-2 border-zinc-300 dark:border-zinc-700',
    icon: Folder,
  },
}

/**
 * Default search options
 */
export const DEFAULT_SEARCH_OPTIONS = {
  query: '',
  searchNames: true,
  searchContent: false,
  caseSensitive: false,
  filterScope: 'strands' as const,
  hideEmptyFolders: false,
  rootScope: 'fabric' as const,
} as const

/**
 * Pagination configuration
 */
export const PAGINATION = {
  /** Initial number of items to display */
  INITIAL_LIMIT: 50,
  /** Number of items to load per "Load More" click */
  LOAD_MORE_INCREMENT: 50,
} as const

/**
 * Mobile breakpoints (matches Tailwind defaults)
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const

/**
 * Keyboard shortcuts
 */
export const HOTKEYS = {
  /** Toggle metadata panel */
  TOGGLE_META: 'm',
  /** Focus search input */
  FOCUS_SEARCH: '/',
  /** Navigate to home */
  GO_HOME: 'g h',
  /** Toggle sidebar (mobile) */
  TOGGLE_SIDEBAR: 's',
} as const

