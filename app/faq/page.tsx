import { Metadata } from 'next'
import PageLayout from '@/components/page-layout'
import FAQAccordion from '@/components/faq-accordion'
import { MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions – Frame.dev',
  description: 'Learn about Frame.dev\'s mission to build AI infrastructure for open source SAFE superintelligence, Frame Codex, OpenStrand, and how you can contribute to the future of AI.',
}

const faqs = [
  {
    question: 'What is Frame.dev?',
    answer: 'Frame.dev is building the AI infrastructure for superintelligence. We provide the OS for humans, the codex of humanity, and the foundation for open source SAFE superintelligence. Our ecosystem includes specialized operating systems, knowledge management tools, and AI runtimes—all designed to empower the next generation of intelligent systems.'
  },
  {
    question: 'What is your mission with superintelligence?',
    answer: 'We believe superintelligence should be open, safe, and aligned with human values. We\'re building the infrastructure to ensure AGI and superintelligence remain transparent, auditable, and beneficial to all humanity. This includes Frame Codex (knowledge repository), OpenStrand (AI-native infrastructure), and AgentOS (adaptive AI runtime).'
  },
  {
    question: 'Is Frame open source?',
    answer: 'Yes! We demand and build infrastructure for open source SAFE superintelligence. All Frame projects are available under MIT or Apache 2.0 licenses. We believe that the path to safe superintelligence requires transparency, collaboration, and community oversight.'
  },
  {
    question: 'What is Frame Codex?',
    answer: 'Frame Codex is "the codex of humanity"—a structured repository of human knowledge designed for LLM ingestion. It organizes information as strands (atomic units), looms (curated groups), and weaves (complete collections). The Codex powers our API and is freely available on GitHub for AI training and research.'
  },
  {
    question: 'How does OpenStrand fit into the vision?',
    answer: 'OpenStrand is our AI-native knowledge infrastructure that adds computational intelligence on top of Frame Codex. It enables local-first knowledge management, semantic search, and knowledge graphs—all designed to help AI systems understand and navigate human knowledge effectively.'
  },
  {
    question: 'Which products are currently available?',
    answer: 'AgentOS (AI runtime) and OpenStrand are currently live. Frame Codex is accessible at frame.dev/codex, and our API is in beta. WebOS, HomeOS, SafeOS, WorkOS, and MyOS are in development. The Superintelligence Computer is our long-term vision currently in research phase.'
  },
  {
    question: 'How can I contribute to the mission?',
    answer: 'We\'re looking for collaborators and experts who share our vision of open source SAFE superintelligence. You can contribute code on GitHub, add knowledge to Frame Codex, build on our APIs, or join our community discussions. Every contribution helps build safer AI infrastructure.'
  },
  {
    question: 'What makes Frame different from other AI platforms?',
    answer: 'Frame is building adaptive AI intelligence that is emergent and permanent. We\'re not just creating tools—we\'re building the foundation for superintelligence. Our focus on openness, safety, and human-aligned values sets us apart. We\'re denoising the web and creating infrastructure that will serve humanity for generations.'
  },
  {
    question: 'How does Frame ensure AI safety?',
    answer: 'Safety is built into our architecture: open source for transparency, local-first for control, structured knowledge for alignment, and community governance for oversight. Our infrastructure is designed to be auditable, interpretable, and aligned with human values by default.'
  },
  {
    question: 'What about data privacy and sovereignty?',
    answer: 'Frame is built with privacy and data sovereignty at its core. Our local-first architecture means you control your data. The infrastructure supports end-to-end encryption, zero-knowledge proofs, and decentralized storage options. You choose where your data lives and who can access it.'
  }
]

export default function FAQPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 max-w-4xl pt-20 pb-20">
        <h1 className="text-5xl font-bold mb-12 heading-gradient">Frequently Asked Questions</h1>
        
        <FAQAccordion items={faqs} />

        {/* Call to Action */}
        <div className="mt-16 paper-card p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <h2 className="text-2xl font-bold mb-4">Join the Mission</h2>
          <p className="body-text mb-6">
            We&apos;re building the infrastructure for open source SAFE superintelligence. 
            Join our community of researchers, developers, and thinkers working towards a future 
            where AI amplifies human potential.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://github.com/framersai/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Join Discussions
            </a>
            <a 
              href="https://github.com/framersai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              Contribute on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}