/**
 * Remark plugin to strip control flags (like ::cl-naive::) from content
 * @module remark/remarkStripControlFlags
 */

import { visit } from 'unist-util-visit'
import type { Root, Text, Parent } from 'mdast'

// Regex to match ::control-flags::
const CONTROL_FLAG_REGEX = /::[\w-]+::/g

/**
 * Strip control flags from text nodes
 */
export function remarkStripControlFlags() {
  return function transformer(tree: Root) {
    visit(tree, 'text', (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return

      if (CONTROL_FLAG_REGEX.test(node.value)) {
        node.value = node.value.replace(CONTROL_FLAG_REGEX, '')
        
        // If node becomes empty, we might want to remove it, but usually empty text node is harmless
      }
    })
  }
}

