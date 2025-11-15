import PageLayout from '@/components/page-layout'
import FrameCodexViewer from '@/components/frame-codex-viewer'
import CodexBookIcon from '@/components/codex-book-icon'

export const metadata = {
  title: 'Frame Codex – The Codex of Humanity for Superintelligence',
  description:
    'Explore Frame Codex: the codex of humanity for LLMs, AI agents, and superintelligence—structured as weaves, looms, and strands for OpenStrand-powered apps.',
}

export default function CodexPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-10">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight mb-4">
              Frame Codex
            </h1>
            <p className="text-base sm:text-lg text-ink-700 dark:text-paper-300 max-w-2xl">
              The Frame Codex is the structured corpus of humanity&apos;s best knowledge, organized as weaves,
              looms, and strands. It&apos;s designed to be ingested by OpenStrand and other systems for
              high-quality RAG and long-lived knowledge graphs.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center lg:justify-end w-full lg:w-auto">
            <CodexBookIcon className="w-24 h-32 lg:w-28 lg:h-36" isOpen />
          </div>
        </div>

        <div className="mt-4">
          <FrameCodexViewer isOpen mode="page" />
        </div>
      </div>
    </PageLayout>
  )
}


