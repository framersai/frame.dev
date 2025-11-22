'use client'

export function ContentSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-900" />
        ))}
      </div>
    </div>
  )
}

export function FileListSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
      ))}
    </div>
  )
}

export function KnowledgeTreeSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="space-y-2">
          <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="ml-4 space-y-2">
            <div className="h-3 w-1/2 rounded bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
            <div className="h-3 w-2/3 rounded bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}


