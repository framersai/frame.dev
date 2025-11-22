'use client'

import { useEffect, useMemo, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react'

export interface LightboxImage {
  url: string
  alt?: string
  filename?: string
}

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  images: LightboxImage[]
  initialIndex?: number
}

export default function ImageLightbox({ isOpen, onClose, images, initialIndex = 0 }: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    if (isOpen) {
      setIndex(Math.min(initialIndex, Math.max(initialIndex, 0)))
    }
  }, [initialIndex, isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setIndex((prev) => (prev + 1) % Math.max(images.length, 1))
      if (event.key === 'ArrowLeft') setIndex((prev) => (prev - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, images.length, onClose])

  const currentImage = useMemo(() => images[index], [images, index])

  if (!isOpen || images.length === 0 || !currentImage) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <button
        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-2"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-6 text-white/80 hover:text-white transition-colors p-3"
            onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            className="absolute right-6 text-white/80 hover:text-white transition-colors p-3"
            onClick={() => setIndex((prev) => (prev + 1) % images.length)}
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div className="max-w-5xl w-full px-6">
        <div className="relative bg-white/5 rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col gap-4">
          <div className="relative w-full aspect-video bg-black/40 flex items-center justify-center rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImage.url}
              alt={currentImage.alt ?? currentImage.filename ?? 'Codex asset'}
              className="max-h-[70vh] object-contain rounded-xl"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-white/80 text-sm">
            <div>
              <p className="font-semibold text-white">{currentImage.filename || 'asset'}</p>
              {currentImage.alt && <p className="text-white/60">{currentImage.alt}</p>}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] text-white/60">
                {index + 1} / {images.length}
              </span>
              <a
                className="inline-flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold"
                href={currentImage.url}
                download={currentImage.filename}
                target="_blank"
                rel="noreferrer"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


