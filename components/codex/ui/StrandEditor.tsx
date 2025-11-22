'use client'

import { useEffect, useState } from 'react'
import { X, Save } from 'lucide-react'
import type { GitHubFile, StrandMetadata } from '../types'

interface StrandEditorProps {
  file: GitHubFile
  content: string
  metadata: StrandMetadata
  isOpen: boolean
  onClose: () => void
  onSave: (content: string, metadata: StrandMetadata) => Promise<void> | void
  theme?: string
}

export default function StrandEditor({ file, content, metadata, isOpen, onClose, onSave }: StrandEditorProps) {
  const [draft, setDraft] = useState(content)

  useEffect(() => {
    setDraft(content)
  }, [content, file.path])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[95] bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[90vh] bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl flex flex-col">
        <header className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Editing Strand</p>
            <h3 className="font-semibold">{file.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSave(draft, metadata)}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-4 py-2 text-sm font-semibold hover:bg-zinc-800 transition"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-900">
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="flex-1 w-full p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-900 outline-none resize-none"
        />
      </div>
    </div>
  )
}


