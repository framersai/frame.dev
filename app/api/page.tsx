import Link from 'next/link'
import { ArrowRight, Code2, GitBranch, Search, Database, Globe, Lock } from 'lucide-react'

export const metadata = {
  title: 'API | Frame.dev',
  description: 'Access the best of humanity\'s knowledge formatted perfectly for LLM and programmatic usage. Free, open-source API for AI-powered knowledge retrieval.',
  openGraph: {
    title: 'Frame.dev API - Knowledge Infrastructure for AI',
    description: 'Access structured knowledge optimized for LLMs with search, graphs, relationships, and tags.',
  },
}

export default function APIPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="px-6 pt-24 pb-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Frame.dev API
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            The best of humanity&apos;s knowledge, formatted perfectly for LLM and programmatic usage
          </p>
          <div className="mt-8 inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm">
            <Code2 className="w-4 h-4" />
            <span>Currently in development • Free and open source</span>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-50 p-8 rounded-lg">
            <Search className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Semantic Search</h3>
            <p className="text-gray-600">
              Search across all knowledge using natural language, powered by vector embeddings and LLM-optimized indexing
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <GitBranch className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Knowledge Graphs</h3>
            <p className="text-gray-600">
              Explore relationships between concepts with our comprehensive graph structure connecting all knowledge
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <Database className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">OpenStrand Schema</h3>
            <p className="text-gray-600">
              Structured data following the OpenStrand schema for strands, looms, and weaves with rich metadata
            </p>
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">API Endpoints</h2>
        
        <div className="bg-gray-900 text-gray-100 p-8 rounded-lg font-mono text-sm">
          <div className="mb-6">
            <div className="text-green-400 mb-2"># Search across all knowledge</div>
            <div className="text-gray-300">GET /api/v1/search?q=quantum+computing&amp;limit=10</div>
          </div>
          
          <div className="mb-6">
            <div className="text-green-400 mb-2"># Get specific strand</div>
            <div className="text-gray-300">GET /api/v1/strands/:id</div>
          </div>
          
          <div className="mb-6">
            <div className="text-green-400 mb-2"># Explore knowledge graph</div>
            <div className="text-gray-300">GET /api/v1/graph/relationships?strand=:id&amp;depth=3</div>
          </div>
          
          <div className="mb-6">
            <div className="text-green-400 mb-2"># List weaves and looms</div>
            <div className="text-gray-300">GET /api/v1/weaves</div>
            <div className="text-gray-300">GET /api/v1/weaves/:weave/looms</div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Response Format</h3>
            <div className="bg-gray-100 p-6 rounded-lg font-mono text-sm">
              <pre>{`{
  "data": {
    "strands": [...],
    "relationships": [...],
    "metadata": {...}
  },
  "pagination": {...}
}`}</pre>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Authentication</h3>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                The Frame.dev API is free and open. No authentication required for public data access.
              </p>
              <p className="text-sm text-gray-600">
                Premium features and higher rate limits coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Distributed Infrastructure</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Globe className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Multi-Platform Hosting</h3>
              <p className="text-gray-600 text-sm mb-4">
                Hosted on GitHub, GitLab, and self-hosted instances for maximum availability
              </p>
              <div className="text-xs text-gray-500">
                • GitHub: Primary repository<br/>
                • GitLab: Mirror backup<br/>
                • Self-hosted: Private instances
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Lock className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="font-semibold mb-2">Always Available</h3>
              <p className="text-gray-600 text-sm mb-4">
                Multiple backups ensure knowledge is always accessible, even offline
              </p>
              <div className="text-xs text-gray-500">
                • Git-based version control<br/>
                • Distributed storage<br/>
                • Local-first architecture
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Code2 className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-semibold mb-2">LLM Optimized</h3>
              <p className="text-gray-600 text-sm mb-4">
                Structured specifically for AI consumption with clean, semantic formatting
              </p>
              <div className="text-xs text-gray-500">
                • Markdown with frontmatter<br/>
                • Semantic HTML when rendered<br/>
                • JSON-LD structured data
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Integration Examples</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">JavaScript/TypeScript</h3>
            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`import { FrameClient } from '@framersai/sdk';

const client = new FrameClient();

// Search for knowledge
const results = await client.search(
  'quantum computing applications'
);

// Get specific strand with relationships
const strand = await client.getStrand(id, {
  includeRelationships: true
});`}</pre>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Python</h3>
            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`from frame_sdk import FrameClient

client = FrameClient()

# Search the knowledge base
results = client.search(
    query="machine learning fundamentals",
    limit=10
)

# Traverse knowledge graph
graph = client.get_graph(
    strand_id=strand.id,
    depth=2
)`}</pre>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/wiki/api/examples"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            View more examples
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Start Building with Frame.dev API</h2>
          <p className="text-xl text-gray-300 mb-8">
            Access humanity&apos;s knowledge through a simple, powerful API designed for the AI era
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/framersai/codex"
              className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <GitBranch className="w-5 h-5" />
              Browse GitHub Repository
            </Link>
            <Link
              href="/wiki/api"
              className="px-8 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Read API Documentation
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
