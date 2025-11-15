'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ZoomIn, ZoomOut, Maximize2, Move, GitBranch, Eye, Layers } from 'lucide-react'
import * as d3 from 'd3'

interface GraphNode {
  id: string
  name: string
  type: 'weave' | 'loom' | 'strand'
  group: number
  metadata?: {
    description?: string
    url?: string
  }
}

interface GraphLink {
  source: string
  target: string
  type: 'contains' | 'references' | 'related'
  strength: number
}

interface CodexGraphProps {
  data?: {
    nodes: GraphNode[]
    links: GraphLink[]
  }
  onNodeClick?: (node: GraphNode) => void
  height?: number
}

export default function CodexGraph({ data, onNodeClick, height = 600 }: CodexGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'force' | 'tree' | 'radial'>('force')
  const [showLabels, setShowLabels] = useState(true)
  const [zoom, setZoom] = useState(1)

  // Sample data if none provided
  const defaultData = {
    nodes: [
      {
        id: 'frame',
        name: 'Frame Codex',
        type: 'weave' as const,
        group: 0,
        metadata: {
          description: 'The codex of humanity – curated knowledge for LLMs and agents.',
          url: '/codex',
        },
      },
      {
        id: 'openstrand',
        name: 'OpenStrand',
        type: 'loom' as const,
        group: 1,
        metadata: {
          description: 'AI-native knowledge infrastructure and local-first slip-box.',
          url: 'https://openstrand.ai',
        },
      },
      {
        id: 'agentos',
        name: 'AgentOS',
        type: 'loom' as const,
        group: 1,
        metadata: {
          description: 'Adaptive AI agency runtime and experience platform.',
          url: 'https://agentos.sh',
        },
      },
      {
        id: 'architecture',
        name: 'Architecture',
        type: 'strand' as const,
        group: 2,
        metadata: {
          description: 'Visual overview of weaves, looms, and strands.',
          url: '/codex/architecture',
        },
      },
      {
        id: 'api',
        name: 'API Reference',
        type: 'strand' as const,
        group: 2,
        metadata: {
          description: 'Programmatic access to the Frame Codex.',
          url: '/api',
        },
      },
      {
        id: 'schemas',
        name: 'Schemas',
        type: 'strand' as const,
        group: 2,
        metadata: {
          description: 'OpenStrand and Codex schema reference.',
          url: '/codex/search?tab=schema',
        },
      },
      {
        id: 'guides',
        name: 'Guides',
        type: 'loom' as const,
        group: 1,
        metadata: {
          description: 'Tutorials and best practices for modelling knowledge.',
          url: '/codex/search',
        },
      },
      {
        id: 'quickstart',
        name: 'Quick Start',
        type: 'strand' as const,
        group: 2,
        metadata: {
          description: 'First steps to explore and contribute to the Codex.',
          url: 'https://github.com/framersai/codex#readme',
        },
      },
      {
        id: 'tutorials',
        name: 'Tutorials',
        type: 'strand' as const,
        group: 2,
        metadata: {
          description: 'Deep dives into strands, looms, and weaves.',
          url: '/codex/search',
        },
      },
    ],
    links: [
      { source: 'frame', target: 'openstrand', type: 'contains' as const, strength: 1 },
      { source: 'frame', target: 'agentos', type: 'contains' as const, strength: 1 },
      { source: 'frame', target: 'guides', type: 'contains' as const, strength: 1 },
      { source: 'openstrand', target: 'architecture', type: 'contains' as const, strength: 0.8 },
      { source: 'openstrand', target: 'api', type: 'contains' as const, strength: 0.8 },
      { source: 'agentos', target: 'schemas', type: 'contains' as const, strength: 0.8 },
      { source: 'guides', target: 'quickstart', type: 'contains' as const, strength: 0.8 },
      { source: 'guides', target: 'tutorials', type: 'contains' as const, strength: 0.8 },
      { source: 'architecture', target: 'schemas', type: 'references' as const, strength: 0.5 },
      { source: 'api', target: 'schemas', type: 'references' as const, strength: 0.5 },
    ]
  }

  const graphData = data || defaultData

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove()

    const width = svgRef.current.clientWidth
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)

    // Create zoom behavior
    const zoomBehavior = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
        setZoom(event.transform.k)
      })

    svg.call(zoomBehavior as any)

    // Container for zoom
    const g = svg.append('g')

    // Define gradients
    const defs = svg.append('defs')
    
    // Weave gradient
    const weaveGradient = defs.append('radialGradient')
      .attr('id', 'weave-gradient')
    weaveGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#8B5CF6')
      .attr('stop-opacity', 0.8)
    weaveGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#7C3AED')
      .attr('stop-opacity', 0.6)

    // Loom gradient
    const loomGradient = defs.append('radialGradient')
      .attr('id', 'loom-gradient')
    loomGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3B82F6')
      .attr('stop-opacity', 0.8)
    loomGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#2563EB')
      .attr('stop-opacity', 0.6)

    // Strand gradient
    const strandGradient = defs.append('radialGradient')
      .attr('id', 'strand-gradient')
    strandGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#10B981')
      .attr('stop-opacity', 0.8)
    strandGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#059669')
      .attr('stop-opacity', 0.6)

    // Create force simulation
    const simulation = d3.forceSimulation(graphData.nodes as any)
      .force('link', d3.forceLink(graphData.links)
        .id((d: any) => d.id)
        .distance((d: any) => viewMode === 'tree' ? 100 : 60 / d.strength))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => {
        return d.type === 'weave' ? 40 : d.type === 'loom' ? 30 : 20
      }))

    // Draw links
    const link = g.append('g')
      .selectAll('line')
      .data(graphData.links)
      .enter().append('line')
      .attr('stroke', (d: any) => {
        switch (d.type) {
          case 'contains': return '#6B7280'
          case 'references': return '#F59E0B'
          case 'related': return '#10B981'
          default: return '#9CA3AF'
        }
      })
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d: any) => Math.sqrt(d.strength * 4))
      .attr('stroke-dasharray', (d: any) => d.type === 'references' ? '5,5' : null)

    // Draw nodes
    const node = g.append('g')
      .selectAll('g')
      .data(graphData.nodes)
      .enter().append('g')
      .attr('cursor', 'pointer')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any)

    // Node circles
    node.append('circle')
      .attr('r', (d: any) => {
        switch (d.type) {
          case 'weave': return 30
          case 'loom': return 22
          case 'strand': return 16
          default: return 20
        }
      })
      .attr('fill', (d: any) => {
        switch (d.type) {
          case 'weave': return 'url(#weave-gradient)'
          case 'loom': return 'url(#loom-gradient)'
          case 'strand': return 'url(#strand-gradient)'
          default: return '#6B7280'
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('click', (event, d: any) => {
        setSelectedNode(d.id)
        if (onNodeClick) onNodeClick(d)
        if (d.metadata?.url) {
          const url: string = d.metadata.url
          if (url.startsWith('http')) {
            window.open(url, '_blank', 'noopener,noreferrer')
          } else {
            window.location.href = url
          }
        }
      })

    // Node labels
    if (showLabels) {
      node.append('text')
        .text((d: any) => d.name)
        .attr('text-anchor', 'middle')
        .attr('dy', (d: any) => {
          switch (d.type) {
            case 'weave': return 45
            case 'loom': return 35
            case 'strand': return 28
            default: return 30
          }
        })
        .attr('font-size', (d: any) => d.type === 'weave' ? '14px' : '12px')
        .attr('font-weight', (d: any) => d.type === 'weave' ? 'bold' : 'normal')
        .attr('fill', '#374151')
        .attr('class', 'select-none')
    }

    // Node icons
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('font-size', '16px')
      .attr('fill', '#fff')
      .text((d: any) => {
        switch (d.type) {
          case 'weave': return '🌐'
          case 'loom': return '🧵'
          case 'strand': return '📄'
          default: return '•'
        }
      })

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [graphData, viewMode, showLabels, height, onNodeClick])

  return (
    <div className="relative w-full bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-1 flex items-center gap-1">
          <button
            onClick={() => setViewMode('force')}
            className={`p-2 rounded ${viewMode === 'force' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            title="Force-directed layout"
          >
            <GitBranch className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('tree')}
            className={`p-2 rounded ${viewMode === 'tree' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            title="Tree layout"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`p-2 rounded ${showLabels ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            title="Toggle labels"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-1 text-sm">
          <span className="text-gray-500">Zoom:</span>
          <span className="ml-2 font-medium">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
        <div className="text-xs font-medium text-gray-500 mb-2">Knowledge Types</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span className="text-xs">Weave (Universe)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-xs">Loom (Collection)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-xs">Strand (Unit)</span>
          </div>
        </div>
      </div>

      {/* SVG Graph */}
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        className="w-full cursor-move"
        style={{ background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.05) 0%, transparent 50%)' }}
      />

      {/* Selected node info */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs"
        >
          {(() => {
            const node = graphData.nodes.find(n => n.id === selectedNode)
            if (!node) return null
            return (
              <>
                <h3 className="font-semibold mb-1">{node.name}</h3>
                {node.metadata?.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {node.metadata.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Click a node to open its documentation or Codex view.
                </p>
              </>
            )
          })()}
        </motion.div>
      )}
    </div>
  )
}
