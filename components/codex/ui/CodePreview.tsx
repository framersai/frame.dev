'use client'

import { useState } from 'react'
import { Copy, Check, Download, FileCode2 } from 'lucide-react'
import type { GitHubFile } from '../types'

interface CodePreviewProps {
  file: GitHubFile
  content: string
}

export default function CodePreview({ file, content }: CodePreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.error('Unable to copy text', error)
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950/90">
        <div className="flex items-center gap-3">
          <FileCode2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
          <div>
            <p className="font-semibold text-zinc-900 dark:text-white">{file.name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{file.path}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:border-cyan-500 hover:text-cyan-600 transition"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          {file.download_url && (
            <a
              href={file.download_url}
              download={file.name}
              className="inline-flex items-center gap-1 rounded-full bg-zinc-900 text-white dark:bg-white/10 dark:text-white px-3 py-1 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white/20 transition"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          )}
        </div>
      </header>

      <pre className="max-h-[70vh] overflow-auto bg-zinc-950 text-zinc-100 text-sm p-4 font-mono whitespace-pre-wrap">
        {content || '// No preview available.'}
      </pre>
    </div>
  )
}


