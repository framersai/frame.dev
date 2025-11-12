import type { Metadata } from 'next'
import PageLayout from '@/components/page-layout'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Frame',
  description: 'Building infrastructure for agentic AI through open-source operating systems',
}

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 max-w-4xl pt-20 pb-20">
        <h1 className="text-5xl font-bold mb-12 heading-gradient">About Frame</h1>
        
        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 heading-display">Our Mission</h2>
          <div className="space-y-6 body-text">
            <p className="text-lg">
              Frame is building the infrastructure layer for agentic AI. We believe the future of computing 
              requires specialized operating systems that can manage, orchestrate, and secure AI agents 
              at scale.
            </p>
            <p className="text-lg">
              Through our suite of open-source operating systems—WebOS, HomeOS, AgentOS, SafeOS, WorkOS, 
              and MyOS—we're creating the foundation for a world where AI agents seamlessly integrate 
              into every aspect of digital life.
            </p>
          </div>
        </section>

        {/* Open Source Commitment */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 heading-display">Open Source First</h2>
          <div className="space-y-6 body-text">
            <p className="text-lg">
              All Frame projects are open source, available under MIT or Apache 2.0 licenses. We believe 
              in building in public and empowering developers worldwide to contribute to and build upon 
              our work.
            </p>
            <p className="text-lg">
              Every operating system we publish ships with a fully functional Community Edition that is free 
              for personal use forever. Enterprise and Teams editions add multi-tenant controls, fine-grained 
              RBAC, and advanced collaboration features for organizations, but the core capabilities are always 
              accessible to the community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="paper-card p-6">
                <h3 className="text-xl font-semibold mb-3 text-frame-green">Community Edition</h3>
                <p className="text-ink-600 dark:text-paper-400">
                  Full access to all core features, perfect for individuals and small teams building 
                  the future of AI.
                </p>
              </div>
              <div className="paper-card p-6">
                <h3 className="text-xl font-semibold mb-3 text-frame-green">Enterprise Edition</h3>
                <p className="text-ink-600 dark:text-paper-400">
                  Advanced features, dedicated support, and SLAs for organizations deploying at scale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 heading-display">The Team</h2>
          <div className="space-y-6 body-text">
            <p className="text-lg">
              Frame is built by a distributed team of engineers, researchers, and designers passionate 
              about the intersection of AI and operating systems. We're united by our belief that the 
              next generation of computing requires fundamentally new infrastructure.
            </p>
            <div className="paper-card p-8">
              <p className="text-lg mb-6">
                Our team brings together expertise in distributed systems, AI/ML, security, and developer 
                experience. We've previously built products at leading technology companies and research 
                institutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://github.com/framersai" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 text-frame-green hover:underline">
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                <a href="https://linkedin.com/company/framersai" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 text-frame-green hover:underline">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <a href="https://twitter.com/framersai" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 text-frame-green hover:underline">
                  <Twitter className="w-5 h-5" />
                  Twitter
                </a>
                <a href="mailto:team@frame.dev"
                   className="inline-flex items-center gap-2 text-frame-green hover:underline">
                  <Mail className="w-5 h-5" />
                  team@frame.dev
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 heading-display">Join Us</h2>
          <div className="paper-card p-8 bg-gradient-to-br from-paper-100/50 to-paper-50/50 dark:from-ink-800/50 dark:to-ink-900/50">
            <p className="text-lg mb-4">
              We're always looking for exceptional people to join our mission. If you're passionate about 
              building the future of AI infrastructure, we'd love to hear from you.
            </p>
            <p className="text-lg">
              For opportunities and general inquiries, please reach out to{' '}
              <a href="mailto:team@frame.dev" className="text-frame-green hover:underline">
                team@frame.dev
              </a>
            </p>
          </div>
        </section>

        {/* Frame Ecosystem */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 heading-display">The Frame Ecosystem</h2>
          <div className="space-y-6 body-text">
            <p className="text-lg">
              Every Frame OS is built on top of <strong>AgentOS</strong> and <strong>OpenStrand</strong>, 
              our foundational technologies for agent orchestration and distributed computing. This shared 
              architecture ensures seamless interoperability and consistent developer experience across all 
              our operating systems.
            </p>
            <div className="grid gap-4">
              <div className="paper-card p-6">
                <h3 className="text-xl font-bold mb-3 text-frame-green">WebOS</h3>
                <p className="text-ink-600 dark:text-paper-400">
                  Your OS interface for the web. A unified layer bridging Web 2.0 and Web 3.0 standards, 
                  authentication systems, and protocols—providing a consistent interface for all web interactions.
                </p>
              </div>
              <div className="paper-card p-6">
                <h3 className="text-xl font-bold mb-3 text-frame-green">HomeOS</h3>
                <p className="text-ink-600 dark:text-paper-400">
                  All-in-one intelligent smart home. The complete platform with AI integrations and assistants 
                  managing everything from security to comfort, energy to entertainment.
                </p>
              </div>
              <div className="paper-card p-6">
                <h3 className="text-xl font-bold mb-3 text-frame-green">SafeOS</h3>
                <p className="text-ink-600 dark:text-paper-400">
                  Digital trusted safe vault. Your secure digital vault for documents, identity monitoring, 
                  and malware protection. Features automated signing, death switches, and dependent management 
                  intelligence.
                </p>
              </div>
              <div className="paper-card p-6">
                <h3 className="text-xl font-bold mb-3 text-frame-green">WorkOS</h3>
                <p className="text-ink-600 dark:text-paper-400">
                  CRM & work platform with AI agents. The complete work platform combining CRM, project 
                  management, and AI agents. Built on AgentOS and OpenStrand for seamless enterprise automation.
                </p>
              </div>
              <div className="paper-card p-6">
                <h3 className="text-xl font-bold mb-3 text-frame-green">MyOS</h3>
                <p className="text-ink-600 dark:text-paper-400">
                  Your personalized virtual assistant. The central dashboard customized for you, managing all 
                  Frame OS integrations, data sharing, and syncing across your digital life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl font-bold mb-6 heading-display">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="paper-card p-6">
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-ink-600 dark:text-paper-400">
                Building in public, sharing our learnings, and fostering open collaboration.
              </p>
            </div>
            <div className="paper-card p-6">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-ink-600 dark:text-paper-400">
                Pushing boundaries and reimagining what's possible with AI infrastructure.
              </p>
            </div>
            <div className="paper-card p-6">
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-ink-600 dark:text-paper-400">
                Empowering developers worldwide to build the future together.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}