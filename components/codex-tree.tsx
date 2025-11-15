import React from 'react'
import { motion } from 'framer-motion'

interface Node {
  name: string
  path: string
  type: 'dir' | 'file'
  children?: Node[]
}

interface CodexTreeProps {
  tree: Node[]
  onSelect: (path: string) => void
  selectedPath?: string
}

function renderNode(node: Node, depth = 0, onSelect: (p: string) => void, selected?: string) {
  const isDir = node.type === 'dir'
  const indent = depth * 14 + 4
  return (
    <div key={node.path}
      className={`pl-[${indent}px] py-1`}
    >
      <button
        onClick={() => onSelect(node.path)}
        className={`text-left text-sm w-full truncate rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${selected===node.path? 'font-semibold text-purple-700 dark:text-purple-300': ''}`}
      >
        {isDir? node.name.toUpperCase(): node.name.replace(/\.(md|mdx)$/,'')}
      </button>
      {isDir && node.children?.map(child=>renderNode(child, depth+1, onSelect, selected))}
    </div>
  )
}

export default function CodexTree({tree,onSelect,selectedPath}:CodexTreeProps){
  return (
    <motion.div className="overflow-y-auto">
      {tree.map(n=>renderNode(n,0,onSelect,selectedPath))}
    </motion.div>
  )
}
