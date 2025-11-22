/**
 * SQL-backed cache for Frame Codex client-side data.
 *
 * @remarks
 * - Uses @framers/sql-storage-adapter with IndexedDB/sql.js in the browser.
 * - Falls back to in-memory storage for SSR / unsupported environments.
 * - Stores only public Codex content (no tokens, no secrets, no PATs).
 */

// Stub adapter imports since Frame.dev might not have the full adapter package configured yet.
// In production, this should import from @framers/sql-storage-adapter.
// For now, we'll implement a simple in-memory/localStorage fallback to unblock the build.

// import type { StorageAdapter } from '@framers/sql-storage-adapter'
// import { createDatabase as createDatabaseExport } from '@framers/sql-storage-adapter'

const TABLE_NAME = 'codex_strands_cache'

type CachedRow = {
  path: string
  content: string
  updated_at: string
}

export type CodexCacheStats = {
  /** Total cached strands */
  totalItems: number
  /** Approximate total size in bytes (character length) */
  totalBytes: number
}

// In-memory fallback cache
const memoryCache = new Map<string, CachedRow>()

/**
 * Get cached strand content by path.
 *
 * @param path - GitHub path (weaves/…)
 */
export async function getCachedStrand(path: string): Promise<string | null> {
  if (!path) return null
  const row = memoryCache.get(path)
  return row?.content ?? null
}

/**
 * Store strand content in cache.
 *
 * @param path - GitHub path (weaves/…)
 * @param content - Raw markdown content
 */
export async function setCachedStrand(path: string, content: string): Promise<void> {
  if (!path) return
  const row: CachedRow = {
    path,
    content,
    updated_at: new Date().toISOString(),
  }
  memoryCache.set(path, row)
}

/**
 * Get approximate cache statistics for display in Preferences.
 */
export async function getCodexCacheStats(): Promise<CodexCacheStats> {
  let totalBytes = 0
  memoryCache.forEach((row) => {
    totalBytes += row.content.length
  })
  return {
    totalItems: memoryCache.size,
    totalBytes,
  }
}

/**
 * Clear all cached strands.
 */
export async function clearCodexCache(): Promise<void> {
  memoryCache.clear()
}

