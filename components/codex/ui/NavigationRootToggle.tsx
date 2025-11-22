'use client'

import type { NavigationRootScope } from '../types'

interface NavigationRootToggleProps {
  value: NavigationRootScope
  onChange: (value: NavigationRootScope) => void
}

export default function NavigationRootToggle({ value, onChange }: NavigationRootToggleProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/50 p-3 space-y-2">
      <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">Navigation Scope</p>
      <div className="inline-flex rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1">
        {(['fabric', 'weaves'] as NavigationRootScope[]).map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
              value === option
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {option === 'fabric' ? 'Entire Repo' : 'Weaves Only'}
          </button>
        ))}
      </div>
    </div>
  )
}


