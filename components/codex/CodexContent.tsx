/**
 * Content display area for Frame Codex viewer
 * Renders markdown files with syntax highlighting and wiki features
 * @module codex/CodexContent
 */

'use client'

import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import ImageLightbox from './ui/ImageLightbox'
import MediaViewer from './ui/MediaViewer'
import CodePreview from './ui/CodePreview'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Loader2, Link2, ExternalLink, Book, FileText, Code } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { GitHubFile, StrandMetadata } from './types'
import { isMarkdownFile, isPreviewableTextFile, rewriteImageUrl, stripFrontmatter } from './utils'
import { remarkStripControlFlags } from '@/lib/remark/remarkStripControlFlags'
import { remarkAssetGallery } from '@/lib/remark/remarkAssetGallery'
import { REPO_CONFIG } from './constants'
import { toast } from './ui/Toast'
import { ContentSkeleton } from './ui/Skeleton'

interface CodexContentProps {
  /** Currently selected file */
  file: GitHubFile | null
  /** File content */
  content: string
  /** Parsed metadata */
  metadata: StrandMetadata
  /** Loading state */
  loading: boolean
  /** Current directory path */
  currentPath: string
  /** Navigate to path */
  onNavigate: (path: string) => void
  /** Fetch file content */
  onFetchFile: (file: GitHubFile) => void
  /** Current pathname (for URL building) */
  pathname: string
}

/**
 * Main content display area with markdown rendering
 * 
 * @remarks
 * - Renders markdown with syntax highlighting
 * - Handles internal wiki links (relative paths)
 * - Rewrites image URLs to raw GitHub
 * - Shows empty state with quick guide
 * - Analog styling: Paper texture, inner shadow
 * - Mobile responsive typography
 * 
 * @example
 * ```tsx
 * <CodexContent
 *   file={selectedFile}
 *   content={fileContent}
 *   metadata={fileMetadata}
 *   loading={loading}
 *   currentPath={currentPath}
 *   onNavigate={navigate}
 *   onFetchFile={fetchFile}
 *   pathname={pathname}
 * />
 * ```
 */
export default function CodexContent({
  file,
  content,
  metadata,
  loading,
  currentPath,
  onNavigate,
  onFetchFile,
  pathname,
}: CodexContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<any[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Set up lightbox handler on mount
  useEffect(() => {
    (window as any).openLightbox = (index: number) => {
      // Extract all gallery images from the page
      const galleryItems = document.querySelectorAll('[data-lightbox="true"]')
      const images = Array.from(galleryItems).map((item: any) => ({
        filename: item.dataset.lightboxUrl?.split('/').pop() || 'image',
        url: item.dataset.lightboxUrl || '',
        alt: item.dataset.lightboxAlt || '',
      }))
      
      setLightboxImages(images)
      setLightboxIndex(index)
      setLightboxOpen(true)
    }

    return () => {
      delete (window as any).openLightbox
    }
  }, [])

  return (
    <div className="codex-content flex-1 bg-white dark:bg-zinc-950 overflow-hidden flex flex-col relative pb-0 md:pb-0">
      {/* Analog Paper Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Inner Shadow for Depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06), inset 0 -2px 8px rgba(0,0,0,0.03)',
        }}
      />

      {file ? (
        <>
          {/* File Header */}
          <div className="relative p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 min-h-[44px]">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FileText className="w-6 h-6 text-zinc-700 dark:text-zinc-300 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-zinc-900 dark:text-white flex flex-wrap items-center gap-2 text-lg sm:text-xl">
                    <span className="truncate">{metadata.title || file.name}</span>
                    {metadata.id && (
                      <span className="text-xs px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded font-mono">
                        ID: {metadata.id.substring(0, 8)}...
                      </span>
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 flex items-center gap-2 truncate mt-1">
                    <Link2 className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{file.path}</span>
                    {metadata.version && (
                      <span className="text-xs whitespace-nowrap">• v{metadata.version}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Copy Link */}
                <button
                  onClick={() => {
                    const url = `${window.location.origin}${pathname}?path=${currentPath}&file=${file.path}`
                    navigator.clipboard.writeText(url).then(() => {
                      toast.copied('Link')
                    })
                  }}
                  className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
                  title="Copy direct link"
                  aria-label="Copy link to this document"
                >
                  <Link2 className="w-5 h-5" />
                </button>
                {/* View on GitHub */}
                <a
                  href={file.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  title="View on GitHub"
                  aria-label="View this document on GitHub"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* File Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain relative">
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
              {loading ? (
                <ContentSkeleton />
              ) : isMarkdownFile(file.name) ? (
                <article className="prose prose-sm sm:prose-base lg:prose-lg prose-zinc dark:prose-invert max-w-none prose-img:rounded-xl">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkStripControlFlags, remarkAssetGallery]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      // Allow raw HTML (for divs, images, etc.)
                      div: ({ children, ...props }) => <div {...props}>{children}</div>,
                      img: ({ src = '', alt = '', ...imgProps }) => {
                        const fixedSrc = rewriteImageUrl(src, REPO_CONFIG.OWNER, REPO_CONFIG.NAME, REPO_CONFIG.BRANCH)
                        return (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={fixedSrc} alt={alt} {...imgProps} />
                        )
                      },
                      // Code blocks with syntax highlighting
                      code(codeProps) {
                        const { inline, className, children, ...props } = codeProps as {
                          inline?: boolean
                          className?: string
                          children?: React.ReactNode
                        } & React.HTMLAttributes<HTMLElement>

                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus as any}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{
                              borderRadius: '1rem',
                              padding: '1.5rem',
                              fontSize: '0.875rem',
                            }}
                            {...props}
                          >
                            {String(children ?? '').replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded text-sm font-mono"
                            {...props}
                          >
                            {children}
                          </code>
                        )
                      },
                      // Styled headings with anchor IDs
                      h1: ({ children, ...props }) => (
                        <h1
                          id={String(children).toLowerCase().replace(/\s+/g, '-')}
                          className="text-4xl font-black bg-gradient-to-r from-zinc-900 via-cyan-700 to-zinc-900 dark:from-zinc-100 dark:via-cyan-400 dark:to-zinc-100 bg-clip-text text-transparent"
                          {...props}
                        >
                          {children}
                        </h1>
                      ),
                      h2: ({ children, ...props }) => (
                        <h2
                          id={String(children).toLowerCase().replace(/\s+/g, '-')}
                          className="text-3xl font-bold text-zinc-900 dark:text-white"
                          {...props}
                        >
                          {children}
                        </h2>
                      ),
                      // Styled blockquotes
                      blockquote: ({ children, ...props }) => (
                        <blockquote
                          className="border-l-4 border-cyan-500 pl-4 py-2 bg-cyan-50/30 dark:bg-cyan-900/10 rounded-r-lg my-4"
                          {...props}
                        >
                          {children}
                        </blockquote>
                      ),
                      // Handle internal wiki links
                      a: ({ href, children, ...props }) => {
                        if (href?.startsWith('./') || href?.startsWith('../')) {
                          const linkedPath = currentPath + '/' + href
                          return (
                            <button
                              onClick={() => {
                                const normalizedPath = linkedPath
                                  .replace(/\/\.\//g, '/')
                                  .replace(/\/[^/]+\/\.\.\//g, '/')
                                if (normalizedPath.endsWith('.md')) {
                                  onFetchFile({
                                    path: normalizedPath,
                                    name: normalizedPath.split('/').pop() || '',
                                    type: 'file',
                                    download_url: `https://raw.githubusercontent.com/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}/${REPO_CONFIG.BRANCH}/${normalizedPath}`,
                                    html_url: `https://github.com/${REPO_CONFIG.OWNER}/${REPO_CONFIG.NAME}/blob/${REPO_CONFIG.BRANCH}/${normalizedPath}`,
                                    sha: '',
                                    url: '',
                                  })
                                } else {
                                  onNavigate(normalizedPath)
                                }
                              }}
                              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline"
                            >
                              {children}
                            </button>
                          )
                        }
                        return (
                          <a href={href} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline" {...props}>
                            {children}
                          </a>
                        )
                      },
                     }}
                   >
                     {stripFrontmatter(content)}
                  </ReactMarkdown>
                </article>
              ) : isPreviewableTextFile(file.name) ? (
                <CodePreview file={file} content={content} />
              ) : (
                // Non-markdown files: use MediaViewer for images, videos, PDFs, etc.
                <MediaViewer file={file} metadata={metadata} />
              )}
            </div>
          </div>
        </>
      ) : (
        // Empty State
        <div className="flex-1 flex items-center justify-center text-zinc-500 dark:text-zinc-400 p-4">
          <div className="text-center max-w-2xl">
            {/* Frame Logo */}
            <Link
              href="https://frame.dev"
              className="inline-block mb-6 group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Frame.dev Home"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl"></div>
                <Image
                  src="/frame-logo-no-subtitle.svg"
                  alt="Frame.dev Logo"
                  width={120}
                  height={120}
                  className="relative dark:invert transition-transform group-hover:scale-110"
                  priority
                />
              </div>
            </Link>
            <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
              Don&apos;t Panic
            </h2>
            <p className="text-xl mb-2 font-semibold">Welcome to the Frame Codex</p>
            <p className="text-base mb-6 text-zinc-600 dark:text-zinc-300">
              A structured, version-controlled knowledge repository designed as the canonical source for AI systems, AI agents, and the Frame AI ecosystem.
            </p>

            {/* Technical Overview */}
            <div className="text-left max-w-xl mx-auto mb-8 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-3">How It Works (Powered by OpenStrand)</h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                  <span>
                    <strong>Organic hierarchy:</strong> Every weave lives at <code>weaves/&lt;slug&gt;</code>, every folder
                    inside a weave is a loom, and every file (any depth) is a strand—no more <code>/looms</code> or
                    <code>/strands</code> scaffolding. Core to the OpenStrand OS philosophy.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">•</span>
                  <span>
                    <strong>SQL-cached indexing:</strong> 85-95% faster incremental updates (30s → 2-5s) for your AI Agency.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                  <span>
                    <strong>Static NLP pipeline:</strong> TF-IDF, n-grams, auto-categorization ($0 cost). Optimized for Framers AI workflows.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                  <span>
                    <strong>GitHub Actions automation:</strong> Validation, indexing, optional AI enhancement for AgentOS open-source deployments.
                  </span>
                </li>
              </ul>
              <pre className="mt-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 text-xs font-mono text-zinc-700 dark:text-zinc-300">
{`weaves/
  frame/
    weave.yaml
    overview.md
    research/
      roadmap.md
      glossary/
        terms.md
  wiki/
    weave.yaml
    architecture/
      systems.md`}
              </pre>
              <Link
                href="/codex/architecture"
                className="inline-flex items-center gap-1 mt-3 text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold"
              >
                Read full architecture →
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 rounded-lg p-4 border-2 border-amber-500/20 dark:border-amber-400/20">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">42</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Weaves</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-lg p-4 border-2 border-cyan-500/20 dark:border-cyan-400/20">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">∞</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Connections</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg p-4 border-2 border-green-500/20 dark:border-green-400/20">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">∀</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Knowledge</div>
              </div>
            </div>

            {/* Quick Guide */}
            <div className="text-left space-y-2 text-sm">
              <h3 className="font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Knowledge Hierarchy:</h3>
              <p className="flex items-start gap-2">
                <Book className="w-4 h-4 text-zinc-900 dark:text-zinc-100 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  <strong>Fabric</strong> - Collection of weaves (Frame Codex itself is a fabric)
                </span>
              </p>
              <p className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span className="text-zinc-600 dark:text-zinc-400">
                  <strong>Weaves</strong> - Complete knowledge universes (self-contained, no cross-dependencies)
                </span>
              </p>
              <p className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  <strong>Looms</strong> - Any folder inside a weave (nested folders allowed, auto-detected)
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Code className="w-4 h-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  <strong>Strands</strong> - Individual markdown files at any depth (atomic knowledge units)
                </span>
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <Link href="/api" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium">
                Access via Frame API →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={lightboxIndex}
      />
    </div>
  )
}



