'use client'

import type { FileFilterScope } from '../types'

interface FileFilterToggleProps {
  value: FileFilterScope
  onChange: (value: FileFilterScope) => void
  hideEmptyFolders: boolean
  onToggleHideEmptyFolders: () => void
}

const OPTIONS: { label: string; value: FileFilterScope; description: string }[] = [
  { label: 'All', value: 'all', description: 'Show every file' },
  { label: 'Strands', value: 'strands', description: 'Only markdown knowledge' },
  { label: 'Media', value: 'media', description: 'Images, audio, video' },
  { label: 'Configs', value: 'configs', description: 'JSON/YAML/INI/TOML files' },
]

export default function FileFilterToggle({ value, onChange, hideEmptyFolders, onToggleHideEmptyFolders }: FileFilterToggleProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/50 p-3 space-y-3">
      <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">File Filters</p>
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`text-left rounded-xl border px-3 py-2 text-sm transition ${
              value === option.value
                ? 'border-cyan-500 bg-cyan-50 dark:border-cyan-400 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-200'
                : 'border-zinc-200 dark:border-zinc-800 hover:border-cyan-400 hover:text-cyan-600 text-zinc-600 dark:text-zinc-300'
            }`}
          >
            <p className="font-semibold">{option.label}</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{option.description}</p>
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
        <input
          type="checkbox"
          checked={hideEmptyFolders}
          onChange={onToggleHideEmptyFolders}
          className="w-4 h-4 rounded border-zinc-300 text-cyan-600 focus:ring-cyan-500"
        />
        Hide empty folders
      </label>
    </div>
  )
}


