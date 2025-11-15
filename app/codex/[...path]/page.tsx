import { Metadata } from 'next'
import FrameCodexViewer from '@/components/frame-codex-viewer'

interface Props {
  params: {
    path?: string[]
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = params.path?.join('/') || ''
  const title = path ? `${path.split('/').pop()} - Frame Codex` : 'Frame Codex'

  return {
    title,
    description: `Explore ${path || 'Frame Codex'}: structured knowledge for AI agents and superintelligence`,
  }
}

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return []
}

export const dynamicParams = false

export default function CodexWikiPage({ params }: Props) {
  const path = params.path?.join('/') || ''
  return <FrameCodexViewer isOpen mode="page" initialPath={path} />
}
