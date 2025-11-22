'use client'

import { FileText, Image as ImageIcon, Film, Music, Download } from 'lucide-react'
import type { GitHubFile, StrandMetadata } from '../types'
import { MEDIA_EXTENSIONS, REPO_CONFIG, API_ENDPOINTS } from '../constants'
import { isMediaFile } from '../utils'

interface MediaViewerProps {
  file: GitHubFile
  metadata: StrandMetadata
}

const getRawUrl = (file: GitHubFile): string => {
  if (file.download_url) return file.download_url
  const base = API_ENDPOINTS.raw(file.path)
  return base.startsWith('http') ? base : `https://raw.githubusercontent.com/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}/${REPO_CONFIG.BRANCH}/${file.path}`
}

const IMAGE_EXTENSIONS = new Set(MEDIA_EXTENSIONS.images.map((ext) => ext.toLowerCase()))
const AUDIO_EXTENSIONS = new Set(MEDIA_EXTENSIONS.audio.map((ext) => ext.toLowerCase()))
const VIDEO_EXTENSIONS = new Set(MEDIA_EXTENSIONS.video.map((ext) => ext.toLowerCase()))
const DOC_EXTENSIONS = new Set(MEDIA_EXTENSIONS.documents.map((ext) => ext.toLowerCase()))

const getExtension = (name: string) => {
  const idx = name.lastIndexOf('.')
  if (idx === -1) return ''
  return name.substring(idx).toLowerCase()
}

export default function MediaViewer({ file, metadata }: MediaViewerProps) {
  const url = getRawUrl(file)
  const ext = getExtension(file.name)

  const isImage = IMAGE_EXTENSIONS.has(ext)
  const isAudio = AUDIO_EXTENSIONS.has(ext)
  const isVideo = VIDEO_EXTENSIONS.has(ext)
  const isDocument = DOC_EXTENSIONS.has(ext)

  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isImage ? <ImageIcon className="w-6 h-6 text-cyan-500" /> : isAudio ? <Music className="w-6 h-6 text-emerald-500" /> : isVideo ? <Film className="w-6 h-6 text-purple-500" /> : <FileText className="w-6 h-6 text-amber-500" />}
          <div>
            <p className="font-semibold text-zinc-900 dark:text-white">{metadata.title || file.name}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{file.path}</p>
          </div>
        </div>
        <a
          href={url}
          download={file.name}
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-4 py-2 text-sm font-semibold hover:bg-zinc-800 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
      </header>

      <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 min-h-[320px] flex items-center justify-center">
        {isImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={metadata.title || file.name} className="max-w-full max-h-[70vh] rounded-xl shadow-lg" />
        )}

        {isAudio && (
          <audio controls preload="metadata" className="w-full">
            <source src={url} />
            Your browser does not support the audio element.
          </audio>
        )}

        {isVideo && (
          <video controls preload="metadata" className="w-full rounded-xl shadow-lg" style={{ maxHeight: '70vh' }}>
            <source src={url} />
            Your browser does not support the video tag.
          </video>
        )}

        {isDocument && (
          <iframe
            src={`${url}#toolbar=0`}
            title={file.name}
            className="w-full h-[70vh] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white"
          />
        )}

        {!isMediaFile(file.name) && (
          <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 space-y-2">
            <p>This file type is not previewable in the Codex yet.</p>
            <a href={url} download={file.name} className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-500 font-semibold">
              <Download className="w-4 h-4" />
              Download instead
            </a>
          </div>
        )}
      </div>
    </div>
  )
}


