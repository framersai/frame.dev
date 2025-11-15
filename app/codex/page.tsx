import { Metadata } from 'next'
import FrameCodexViewer from '@/components/frame-codex-viewer'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Frame Codex – The Codex of Humanity for Superintelligence',
  description:
    'Explore Frame Codex: the codex of humanity for LLMs, AI agents, and superintelligence—structured as weaves, looms, and strands for OpenStrand-powered apps.',
}

export default function CodexPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading Codex…</div>}>
      <FrameCodexViewer isOpen mode="page" />
    </Suspense>
  )
}