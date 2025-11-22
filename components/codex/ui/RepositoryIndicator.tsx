'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { REPO_CONFIG } from '../constants'

interface RepositoryIndicatorProps {
  allowEdit?: boolean
  onEdit?: () => void
  theme?: string
  compact?: boolean
}

export default function RepositoryIndicator({ allowEdit, onEdit, compact }: RepositoryIndicatorProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 px-4 py-3 flex items-center gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Repository</p>
        <p className="text-sm font-semibold text-zinc-800 dark:text-white truncate">
          {REPO_CONFIG.OWNER}/{REPO_CONFIG.NAME}
        </p>
      </div>
      <Link
        href={`https://github.com/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}`}
        target="_blank"
        rel="noreferrer"
        className="ml-auto inline-flex items-center gap-1 text-xs text-cyan-600 hover:text-cyan-500 font-semibold"
      >
        View repo
        <ExternalLink className="w-3 h-3" />
      </Link>
      {allowEdit && !compact && (
        <button
          onClick={onEdit}
          className="text-xs font-semibold rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-zinc-600 hover:border-cyan-500 hover:text-cyan-600 transition"
        >
          Edit
        </button>
      )}
    </div>
  )
}


