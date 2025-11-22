import {
  isMarkdownFile as baseIsMarkdownFile,
  rewriteImageUrl,
  stripFrontmatter,
  parseWikiMetadata,
  shouldIgnorePath as baseShouldIgnorePath,
  formatNodeName as baseFormatNodeName,
} from '../../../../packages/codex-viewer/src/lib/utils'
import type { GitHubFile, FileFilterScope } from './types'
import { MEDIA_EXTENSIONS, TEXT_FILE_EXTENSIONS } from './constants'

export const isMarkdownFile = baseIsMarkdownFile
export const shouldIgnorePath = baseShouldIgnorePath
export const formatNodeName = baseFormatNodeName
export { rewriteImageUrl, stripFrontmatter, parseWikiMetadata }

const MEDIA_EXTENSION_SET = new Set(
  [...MEDIA_EXTENSIONS.images, ...MEDIA_EXTENSIONS.audio, ...MEDIA_EXTENSIONS.video, ...MEDIA_EXTENSIONS.documents].map(
    (ext) => ext.toLowerCase()
  )
)

const TEXT_EXTENSION_SET = new Set(TEXT_FILE_EXTENSIONS.map((ext) => ext.toLowerCase()))

const getExtension = (filename: string = ''): string => {
  const lastDot = filename.lastIndexOf('.')
  if (lastDot === -1) return ''
  return filename.substring(lastDot).toLowerCase()
}

export function isPreviewableTextFile(filename: string = ''): boolean {
  const ext = getExtension(filename)
  return ext ? TEXT_EXTENSION_SET.has(ext) : false
}

export function isMediaFile(filename: string = ''): boolean {
  const ext = getExtension(filename)
  return ext ? MEDIA_EXTENSION_SET.has(ext) : false
}

export function shouldShowFile(
  file: Pick<GitHubFile, 'name' | 'path' | 'type'>,
  scope: FileFilterScope,
  _includeMarkdown: boolean = true,
  extraExtensions: string[] = []
): boolean {
  if (file.type === 'dir') return true
  const ext = getExtension(file.name)
  if (extraExtensions.length > 0 && ext && !extraExtensions.includes(ext)) {
    return false
  }

  switch (scope) {
    case 'strands':
      return isMarkdownFile(file.name)
    case 'media':
      return isMediaFile(file.name)
    case 'configs':
      return isPreviewableTextFile(file.name)
    case 'all':
    default:
      return true
  }
}


