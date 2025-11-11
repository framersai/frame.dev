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
              A cohesive set of operating systems and libraries that make the web calmer and more capable —
              grounded in OpenStrand.
            </p>
          </article>
          <article>
            <h2 className="text-xl md:text-2xl font-semibold">Where should I start?</h2>
            <p className="mt-2">
              Explore <a className="underline" href="https://agentos.sh" target="_blank" rel="noopener">AgentOS</a> for orchestration,
              and <a className="underline" href="https://vca.chat" target="_blank" rel="noopener">VCA</a> to see agents in action.
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


