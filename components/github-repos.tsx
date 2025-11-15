'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { GitBranch, Star, GitFork, ExternalLink, Code2, Package, Globe, Bot, Shield, Database } from 'lucide-react'

const repoCategories = {
  'Core Infrastructure': [
    {
      name: 'frame.dev',
      description: 'The OS for humans, the codex of humanity.',
      icon: Globe,
      color: 'text-frame-green',
      bgColor: 'bg-frame-green/10',
      language: 'TypeScript',
      stars: 0,
      forks: 0,
      topics: ['landing-page', 'nextjs14'],
      url: 'https://github.com/framersai/frame.dev'
    },
    {
      name: 'codex',
      description: 'AI and human-curated store of humanity\'s knowledge for supercomputer.',
      icon: Code2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-600/10',
      language: 'JavaScript',
      stars: 0,
      forks: 0,
      topics: ['knowledge-base', 'llm-ready'],
      url: 'https://github.com/framersai/codex'
    }
  ],
  'OpenStrand Ecosystem': [
    {
      name: 'openstrand',
      description: 'Standardized open-source protocols and datasets.',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10',
      language: 'Protocol',
      stars: 1,
      forks: 0,
      topics: ['standards', 'protocols'],
      url: 'https://github.com/framersai/openstrand'
    },
    {
      name: 'openstrand-app',
      description: 'Desktop and mobile app for community and teams editions.',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10',
      language: 'TypeScript',
      stars: 0,
      forks: 2,
      topics: ['electron', 'react-native'],
      url: 'https://github.com/framersai/openstrand-app'
    },
    {
      name: 'openstrand-sdk',
      description: 'TypeScript SDK for working with OpenStrand documents.',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10',
      language: 'TypeScript',
      stars: 0,
      forks: 0,
      topics: ['sdk', 'typescript'],
      url: 'https://github.com/framersai/openstrand-sdk'
    }
  ],
  'AgentOS Platform': [
    {
      name: 'agentos',
      description: 'TypeScript runtime for adaptive AI agent intelligence.',
      icon: Bot,
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
      language: 'TypeScript',
      stars: 0,
      forks: 0,
      topics: ['ai-agents', 'runtime'],
      url: 'https://github.com/framersai/agentos'
    },
    {
      name: 'agentos.sh',
      description: 'Marketing site + documentation hub for AgentOS.',
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
      language: 'TypeScript',
      stars: 0,
      forks: 0,
      topics: ['documentation', 'marketing'],
      url: 'https://github.com/framersai/agentos.sh'
    },
    {
      name: 'agentos-extensions',
      description: 'Extensions registry for AgentOS.',
      icon: Bot,
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
      language: 'TypeScript',
      stars: 0,
      forks: 3,
      topics: ['extensions', 'plugins'],
      url: 'https://github.com/framersai/agentos-extensions'
    },
    {
      name: 'agentos-workbench',
      description: 'Local playground environment for AgentOS experiences.',
      icon: Bot,
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
      language: 'TypeScript',
      stars: 0,
      forks: 0,
      topics: ['playground', 'development'],
      url: 'https://github.com/framersai/agentos-workbench'
    }
  ],
  'Utilities & Tools': [
    {
      name: 'sql-storage-adapter',
      description: 'Universal SQL storage manager for cross-platform builds.',
      icon: Database,
      color: 'text-orange-600',
      bgColor: 'bg-orange-600/10',
      language: 'TypeScript',
      stars: 1,
      forks: 0,
      topics: ['sql', 'database', 'cross-platform'],
      url: 'https://github.com/framersai/sql-storage-adapter'
    }
  ]
}

export default function GitHubRepos() {
  return (
    <div className="space-y-12">
      {Object.entries(repoCategories).map(([category, repos], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">{category}</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, index) => {
              const Icon = repo.icon
              return (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <Link href={repo.url} target="_blank" rel="noopener noreferrer">
                    <div className="h-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:shadow-lg">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${repo.bgColor}`}>
                            <Icon className={`w-5 h-5 ${repo.color}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-frame-green dark:group-hover:text-frame-green transition-colors">
                              {repo.name}
                            </h4>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {repo.description}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.topics.slice(0, 3).map(topic => (
                          <span key={topic} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-yellow-400" />
                          {repo.language}
                        </span>
                        {repo.stars > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {repo.stars}
                          </span>
                        )}
                        {repo.forks > 0 && (
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            {repo.forks}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      ))}

      {/* Call to Action */}
      <motion.div
        className="text-center mt-12 p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Join Our Open Source Mission
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          We&apos;re looking for collaborators and experts who share our vision of building 
          infrastructure for open source SAFE superintelligence. Every contribution matters.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="https://github.com/framersai" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
          >
            <GitBranch className="w-5 h-5" />
            View All Repositories
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
