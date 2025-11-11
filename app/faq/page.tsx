import type { Metadata } from 'next'
import PageLayout from '@/components/page-layout'

export const metadata: Metadata = {
  title: 'FAQ - Frame.dev',
  description:
    'Frequently asked questions about Frame.dev, our OS family, and the OpenStrand foundation.',
  alternates: { canonical: 'https://frame.dev/faq' },
  openGraph: {
    title: 'FAQ - Frame.dev',
    description:
      'Frequently asked questions about Frame.dev, our OS family, and the OpenStrand foundation.',
    url: 'https://frame.dev/faq',
    siteName: 'Frame.dev',
    images: [{ url: '/og-image.png' }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Frame.dev',
    description:
      'Frequently asked questions about Frame.dev, our OS family, and the OpenStrand foundation.'
  },
  authors: [{ name: 'Manic Agency', url: 'https://manic.agency' }]
}

function FAQJsonLd() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Frame.dev?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Frame.dev is a family of operating systems and tooling to denoise the web and orchestrate intelligent systems.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does AgentOS fit in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'AgentOS is our adaptive orchestration layer powering the OS family and the VCA marketplace.'
        }
      }
    ]
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  )
}

export default function FrameFaqPage() {
  return (
    <PageLayout>
      <FAQJsonLd />
      <div className="container mx-auto max-w-4xl px-4 py-10 md:py-14">
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-3 text-base md:text-lg text-ink-600 dark:text-paper-400">
            Answers about Frame.dev, the OS family (AgentOS, WebOS, HomeOS), and OpenStrand.
          </p>
        </header>

        <section className="space-y-7 md:space-y-8">
          <article>
            <h2 className="text-xl md:text-2xl font-semibold">What is Frame.dev?</h2>
            <p className="mt-2">
              Frame.dev is a family of operating systems designed to denoise the web and orchestrate intelligent systems.
              Built on the OpenStrand foundation, it provides specialized OS solutions for different aspects of modern digital life -
              from AI agent orchestration to smart home management.
            </p>
          </article>

          <article>
            <h2 className="text-xl md:text-2xl font-semibold">What is OpenStrand?</h2>
            <p className="mt-2">
              OpenStrand is the backbone infrastructure powering all Frame operating systems. It's a modern personal
              knowledge management system (PKMS) that combines AI capabilities with local-first data ownership,
              featuring knowledge graph visualization, multi-format import (20+ formats), and block-level organization.
            </p>
          </article>

          <article>
            <h2 className="text-xl md:text-2xl font-semibold">Which OS is currently available?</h2>
            <p className="mt-2">
              <strong>AgentOS</strong> is currently live and available at <a className="underline text-frame-green" href="https://agentos.sh" target="_blank" rel="noopener">agentos.sh</a>.
              It's our adaptive AI agency runtime that powers intelligent agent coordination with multi-provider cognition,
              telemetry-backed governance, and fine-grained safety guardrails. Other systems (WebOS, HomeOS, SafeOS, WorkOS, MyOS)
              are in development.
            </p>
          </article>

          <article>
            <h2 className="text-xl md:text-2xl font-semibold">What is the VCA Marketplace?</h2>
            <p className="mt-2">
              VCA (Voice Chat Assistant) at <a className="underline text-frame-green" href="https://vca.chat" target="_blank" rel="noopener">vca.chat</a> is
              our marketplace where you can discover and deploy AI agents powered by AgentOS. It showcases real-world
              applications of our agent orchestration technology.
            </p>
          </article>

          <article>
            <h2 className="text-xl md:text-2xl font-semibold">Is Frame.dev open source?</h2>
            <p className="mt-2">
              Yes! All Frame projects are open source with MIT and Apache 2.0 licenses. You can find our code on
              <a className="underline text-frame-green" href="https://github.com/framersai" target="_blank" rel="noopener"> GitHub</a> and
              packages on <a className="underline text-frame-green" href="https://npmjs.com/org/framers" target="_blank" rel="noopener"> NPM</a>.
              We offer both Community and Enterprise editions.
            </p>
          </article>

          <article>
            <h2 className="text-xl md:text-2xl font-semibold">How does Frame.dev handle privacy and data ownership?</h2>
            <p className="mt-2">
              Frame.dev prioritizes local-first data ownership. With OpenStrand's architecture, your data can be stored
              locally using PGlite for offline builds or PostgreSQL for team deployments. You maintain complete control
              over your information while still benefiting from AI-powered features.
            </p>
          </article>

          <article>
            <h2 className="text-xl md:text-2xl font-semibold">What programming languages and frameworks do you use?</h2>
            <p className="mt-2">
              The entire Frame ecosystem is built with TypeScript. We use Fastify for APIs, Next.js for user interfaces,
              Prisma for database management, and provide SDKs that work seamlessly across the stack. This unified approach
              ensures consistency and developer-friendly experiences.
            </p>
          </article>

          <article>
            <h2 className="text-xl md:text-2xl font-semibold">How can I contribute or get support?</h2>
            <p className="mt-2">
              Join our <a className="underline text-frame-green" href="https://discord.gg/VXXC4SJMKh" target="_blank" rel="noopener">Discord community</a> for
              support and discussions. Contribute on <a className="underline text-frame-green" href="https://github.com/framersai" target="_blank" rel="noopener">GitHub</a>,
              or reach out directly at team@frame.dev. We welcome contributions, bug reports, and feature requests from the community.
            </p>
          </article>

          <article>
            <h2 className="text-xl md:text-2xl font-semibold">Where should I start?</h2>
            <p className="mt-2">
              Start by exploring <a className="underline text-frame-green" href="https://agentos.sh" target="_blank" rel="noopener">AgentOS</a> for
              AI orchestration capabilities. Check out <a className="underline text-frame-green" href="https://vca.chat" target="_blank" rel="noopener">VCA.chat</a> to
              see agents in action. For developers, clone the <a className="underline text-frame-green" href="https://github.com/framersai/openstrand" target="_blank" rel="noopener">OpenStrand repository</a> and
              follow our documentation to build your own intelligent applications.
            </p>
          </article>
        </section>

        <section className="mt-10 md:mt-14">
          <h3 className="text-lg font-semibold">See also</h3>
          <ul className="mt-3 grid gap-2 text-frame-green underline">
            <li><a href="https://agentos.sh/faq" target="_blank" rel="noopener">AgentOS FAQ</a></li>
            <li><a href="https://vca.chat/faq" target="_blank" rel="noopener">VCA.Chat FAQ</a></li>
            <li><a href="https://manic.agency" target="_blank" rel="noopener">Manic Agency</a></li>
            <li><a href="https://manic.agency/blog" target="_blank" rel="noopener">The Looking Glass — AI newsletter & blog</a></li>
          </ul>
        </section>
      </div>
    </PageLayout>
  )
}


