'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

interface QAInterfaceProps {
  isOpen: boolean
  onClose: () => void
  currentStrand?: string | null
  theme?: string
  onSemanticStatusChange?: (status: 'idle' | 'indexing' | 'ready' | string) => void
  availableWeaves?: string[]
  availableLooms?: string[]
  availableTags?: string[]
  totalStrands?: number
}

export default function QAInterface({
  isOpen,
  onClose,
  currentStrand,
  onSemanticStatusChange,
  availableWeaves = [],
  availableTags = [],
  totalStrands = 0,
}: QAInterfaceProps) {
  const [question, setQuestion] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[94] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">Semantic Q&A</p>
            <h3 className="text-lg font-semibold">Ask about this strand</h3>
            {currentStrand && <p className="text-xs text-zinc-500 mt-1">{currentStrand}</p>}
          </div>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-900">
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="p-4 space-y-3">
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a question about this knowledge base..."
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-[120px]"
          />
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span>Weaves indexed: {availableWeaves.length || '—'}</span>
            <span>• Tags available: {availableTags.length || '—'}</span>
            <span>• Total strands: {totalStrands}</span>
          </div>
        </div>

        <footer className="flex items-center justify-between p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70">
          <button
            onClick={() => {
              onSemanticStatusChange?.('indexing')
              setTimeout(() => onSemanticStatusChange?.('ready'), 1500)
            }}
            className="text-xs text-zinc-500 underline"
          >
            Rebuild semantic index
          </button>
          <button
            disabled={!question.trim()}
            onClick={() => {
              onSemanticStatusChange?.('ready')
              setQuestion('')
            }}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-600 disabled:bg-cyan-300 text-white px-4 py-2 text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            Ask
          </button>
        </footer>
      </div>
    </div>
  )
}


