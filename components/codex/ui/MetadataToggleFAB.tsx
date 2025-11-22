'use client'

import { PanelRightOpen } from 'lucide-react'

interface MetadataToggleFABProps {
  isOpen: boolean
  onToggle: () => void
  theme?: string
}

export default function MetadataToggleFAB({ isOpen, onToggle, theme }: MetadataToggleFABProps) {
  if (isOpen) return null

  const bg =
    theme && theme.includes('dark')
      ? 'bg-white/10 text-white hover:bg-white/20'
      : 'bg-zinc-900 text-white hover:bg-zinc-800'

  return (
    <button
      onClick={onToggle}
      className={`hidden md:flex items-center gap-2 fixed z-40 bottom-6 right-6 rounded-full px-4 py-2 shadow-2xl transition ${bg}`}
      aria-label="Open metadata panel"
    >
      <PanelRightOpen className="w-4 h-4" />
      <span className="text-xs font-semibold uppercase tracking-[0.25em]">Meta</span>
    </button>
  )
}


