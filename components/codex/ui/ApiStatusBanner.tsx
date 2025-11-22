'use client'

import { WifiOff, Wifi, Settings } from 'lucide-react'

interface ApiStatusBannerProps {
  graphqlAvailable: boolean
  searchAvailable: boolean
  semanticStatus: 'idle' | 'indexing' | 'ready' | string
  onOpenSettings: () => void
}

const STATUS_COPY: Record<string, string> = {
  idle: 'Semantic search idle',
  indexing: 'Semantic index building…',
  ready: 'Semantic search ready',
}

export default function ApiStatusBanner({
  graphqlAvailable,
  searchAvailable,
  semanticStatus,
  onOpenSettings,
}: ApiStatusBannerProps) {
  const allGood = graphqlAvailable && searchAvailable && semanticStatus === 'ready'

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 px-4 py-2 text-sm ${
        allGood ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
      } border ${allGood ? 'border-emerald-100' : 'border-amber-100'}`}
    >
      <div className="flex items-center gap-2">
        {allGood ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
        <span className="font-semibold">{allGood ? 'Systems nominal' : 'Limited functionality'}</span>
        <span className="text-xs uppercase tracking-[0.25em]">
          {graphqlAvailable ? 'GraphQL ON' : 'GraphQL OFF'} • {searchAvailable ? 'Index ON' : 'Index OFF'}
        </span>
        <span className="text-xs text-amber-600">
          {STATUS_COPY[semanticStatus] ?? `Semantic: ${semanticStatus}`}
        </span>
      </div>
      <button
        onClick={onOpenSettings}
        className="inline-flex items-center gap-1 rounded-full border border-current/30 px-3 py-1 text-xs font-semibold"
      >
        <Settings className="w-4 h-4" />
        Settings
      </button>
    </div>
  )
}


