import { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/page-layout'
import { Code2, Globe, Search, Layers, Lock, AlertCircle, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frame API – AI Infrastructure for Knowledge and Superintelligence',
  description: 'Access the best of humanity\'s knowledge formatted perfectly for LLM and programmatic usage. Free API with search, graphs, relationships, and tags powering AI agents and superintelligence.',
}

export default function APIPage() {
  return (
    <PageLayout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* WIP Banner */}
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm font-medium">
              <AlertCircle className="w-4 h-4" />
              Work in Progress - Beta Access Available
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              Frame API
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              The best of humanity&apos;s knowledge, formatted perfectly for LLM and programmatic usage.
            </p>

            <div className="prose prose-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400 mb-12">
              <p>
                Our API provides structured access to the Frame Codex, offering semantic search, 
                knowledge graphs, relationships, and tags—all designed for AI agents and superintelligence applications.
              </p>
            </div>
          </div>
        </div>

        {/* Beta Access Form */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Get Beta Access</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Join our beta program to get early access to the Frame API. Free tier available with generous limits.
            </p>
            
            {/* EmailOctopus Embed */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
              <form 
                className="space-y-4"
                action="https://emailoctopus.com/lists/YOUR_LIST_ID/members/embedded/1.3/add"
                method="post"
                data-message-success="Thanks for signing up! Check your email for beta access details."
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-frame-green focus:border-transparent"
                    placeholder="developer@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name (optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-frame-green focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-frame-green to-frame-green-dark text-white rounded-lg font-medium hover:from-frame-green-dark hover:to-frame-green transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Get Beta Access
                </button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                We&apos;ll only use your email for API access. No spam, ever.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <Search className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Semantic Search</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Search across all knowledge using natural language queries optimized for AI understanding.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <Globe className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Knowledge Graphs</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Navigate relationships between concepts, topics, and resources with typed edges and metadata.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <Layers className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">OpenStrand Schema</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built on the OpenStrand format with strands, looms, and weaves for structured knowledge.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <Code2 className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">LLM Optimized</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Responses formatted for direct LLM ingestion with context windows in mind.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <Lock className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Free & Open</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Public data access requires no authentication. Premium features coming soon.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <Globe className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Distributed</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Hosted on GitHub, GitLab, and self-hosted nodes for resilience and permanence.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              {/* Free Tier */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-4">Free Tier</h3>
                <p className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">1,000 API calls/day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Access to all public knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Basic search & graph queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Community support</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all">
                  Get Started Free
                </button>
              </div>

              {/* Pro Tier */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 shadow-sm border border-purple-200 dark:border-purple-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium px-4 py-1 rounded-bl-lg">
                  COMING SOON
                </div>
                <h3 className="text-2xl font-bold mb-4">Pro Tier</h3>
                <p className="text-4xl font-bold mb-6">$29<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">100,000 API calls/day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Advanced graph traversal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Webhooks & real-time updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Custom knowledge bases</span>
                  </li>
                </ul>
                <button 
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium opacity-50 cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Need higher limits or custom deployment? 
                <Link href="/contact" className="text-frame-green hover:underline ml-1">
                  Contact us for enterprise pricing
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Documentation Links */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to integrate?</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/api/docs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
              >
                <Code2 className="w-5 h-5" />
                API Documentation
              </Link>
              <Link 
                href="https://github.com/framersai/codex"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all"
              >
                Browse Frame Codex
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}