import type { Metadata } from 'next'
import PageLayout from '@/components/page-layout'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - Frame',
  description: 'Frequently asked questions about Frame operating systems',
}

const faqs = [
  {
    question: 'What is Frame?',
    answer: 'Frame is a revolutionary suite of operating systems designed to organize, simplify, and enhance every aspect of your digital existence. We provide specialized operating systems for different domains—web, home, work, security, and personal life—all built on our unified OpenStrand architecture.'
  },
  {
    question: 'How are all Frame operating systems connected?',
    answer: 'Every Frame OS is built on top of AgentOS and OpenStrand. AgentOS provides the adaptive intelligence runtime for AI agents, while OpenStrand is our distributed architecture that enables event-driven message passing, federated state management, and seamless interoperability between all operating systems.'
  },
  {
    question: 'What is AgentOS?',
    answer: 'AgentOS is our production-ready runtime for AI agents. It\'s the foundational layer that powers all Frame operating systems, enabling developers to deploy, manage, and orchestrate intelligent agents at scale. Built with TypeScript, it supports all major AI providers and includes features like real-time observability, guardrails, and policy enforcement.'
  },
  {
    question: 'What is OpenStrand?',
    answer: 'OpenStrand is the distributed architecture that connects all Frame operating systems. It provides event-driven message passing for real-time communication, federated state management with distributed consensus, zero-trust security model with end-to-end encryption, and infinite extensibility through a modular, plugin-based architecture.'
  },
  {
    question: 'Are Frame operating systems open source?',
    answer: 'Yes! All Frame projects are open source, available under MIT or Apache 2.0 licenses. We believe in building in public and invite developers worldwide to contribute. Each OS has both Community and Enterprise editions, with the Community edition being free for personal use forever.'
  },
  {
    question: 'Which operating systems are currently available?',
    answer: 'AgentOS is currently live and production-ready. WebOS, HomeOS, SafeOS, WorkOS, and MyOS are in active development, with early access versions coming soon. Follow our GitHub repositories for the latest updates.'
  },
  {
    question: 'How can I get started with Frame?',
    answer: 'Start with AgentOS at agentos.sh. You can install it with pnpm add @framers/agentos, use the create-agentos CLI to scaffold a project, or explore our GitHub repositories. Join our Discord community for support and to connect with other builders.'
  },
  {
    question: 'What makes Frame different from other platforms?',
    answer: 'Frame is not just another platform—it\'s a fundamental reimagining of how we interact with technology. By providing specialized operating systems for every domain of digital life, all interconnected through AgentOS and OpenStrand, we enable a level of integration and intelligence that traditional platforms can\'t match.'
  },
  {
    question: 'Can I use Frame operating systems independently?',
    answer: 'Yes! While Frame operating systems are designed to work seamlessly together through OpenStrand, each one is fully functional on its own. You can start with the OS that best fits your needs and expand to others as desired.'
  },
  {
    question: 'How does Frame handle my data and privacy?',
    answer: 'Frame is built with privacy and data sovereignty at its core. Our zero-trust security model ensures end-to-end encryption, and you maintain full control over your data. Each OS can run locally or in your preferred cloud environment, and our open-source nature means you can audit exactly how your data is handled.'
  }
]

export default function FAQPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 max-w-4xl pt-20 pb-20">
        <h1 className="text-5xl font-bold mb-12 heading-gradient">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="paper-card group">
              <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-paper-100 dark:hover:bg-ink-800 transition-colors rounded-lg">
                <h2 className="text-xl font-semibold pr-4">{faq.question}</h2>
                <ChevronDown className="w-5 h-5 text-ink-600 dark:text-paper-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 pt-2 body-text">
                <p className="text-ink-600 dark:text-paper-400">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 paper-card p-8 bg-gradient-to-br from-frame-green/5 to-frame-green-dark/5">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="body-text mb-6">
            Can't find what you're looking for? Get in touch with our team or join our community.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://discord.gg/VXXC4SJMKh" className="btn-primary">
              Join Discord
            </a>
            <a href="mailto:team@frame.dev" className="btn-secondary">
              Email Us
            </a>
            <a href="https://github.com/framersai" className="btn-ghost">
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}