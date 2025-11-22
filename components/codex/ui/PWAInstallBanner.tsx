'use client'

interface PWAInstallBannerProps {
  isInstallable: boolean
  onInstall?: () => void
  theme?: string
}

export default function PWAInstallBanner({ isInstallable, onInstall }: PWAInstallBannerProps) {
  if (!isInstallable) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90vw] max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-4 flex flex-col md:flex-row md:items-center gap-3">
      <div>
        <p className="text-sm font-semibold text-zinc-900 dark:text-white">Install Frame Codex</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Add the Codex to your dock/home screen for instant access.
        </p>
      </div>
      <div className="flex items-center gap-2 md:ml-auto">
        <button
          onClick={onInstall}
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-4 py-2 text-xs font-semibold hover:bg-zinc-800 transition"
        >
          Install
        </button>
      </div>
    </div>
  )
}


