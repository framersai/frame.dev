import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Team - Frame',
  description: 'Meet the team behind Frame',
}

export default function TeamPage() {
  return (
    <div className="min-h-screen paper-bg">
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <nav className="mb-8">
          <Link href="/" className="text-sm text-ink-600 dark:text-paper-400 hover:text-frame-green transition-colors">
            ← Back to Frame
          </Link>
        </nav>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold ink-text mb-8">
            Meet the Manics
          </h1>
          
          <div className="text-lg leading-relaxed space-y-8 ink-text">
            <p className="text-xl font-light italic">
              Manic Agency is comprised of a curated collective of senior engineers, visionary designers, and strategic operators – the navigators of the Frame Blueprint.
            </p>

            {/* Team Members */}
            <div className="space-y-12 mt-12">
              <div className="p-6 bg-paper-100 dark:bg-ink-900 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold mb-2">Johnny Dunn</h3>
                <p className="text-frame-green font-medium mb-3">Lead Engineering & Co-founder</p>
                <p className="text-ink-700 dark:text-paper-200">
                  A NLP wizard navigating the digital ether. Full-stack engineer & artist specializing in crafting complex data pipelines, training SOTA models, and tailoring bespoke web/app experiences. Previously architected systems at eBay & blockchain solutions at Tilting Point.
                </p>
              </div>

              <div className="p-6 bg-paper-100 dark:bg-ink-900 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold mb-2">Nathan Franc</h3>
                <p className="text-frame-green font-medium mb-3">Lead Design & Co-founder</p>
                <p className="text-ink-700 dark:text-paper-200">
                  Multidisciplinary Design Principal based in Melbourne, AU. Expertise spans Product Design (UI/UX), intricate Design Systems, and Brand Identity. Explores the liminal space where Generative AI intersects with meaningful, human-centered design applications.
                </p>
              </div>

              <div className="p-6 bg-paper-100 dark:bg-ink-900 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold mb-2">Jeffrey</h3>
                <p className="text-frame-green font-medium mb-3">Junior Marketer</p>
                <p className="text-ink-700 dark:text-paper-200">
                  Gradually forging their mark in the digital marketing world, becoming a staple in web3 communities globally, with a knack for managing social media content and community engagement.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-paper-100 to-paper-200 dark:from-ink-900 dark:to-ink-800 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold mb-2">Extended Network</h3>
                <p className="text-frame-green font-medium mb-3">Collaborators & Future Allies</p>
                <p className="text-ink-700 dark:text-paper-200">
                  We work with a global network of specialists, researchers, and creative technologists who share our vision for the future of computing.
                </p>
                <a href="mailto:team@frame.dev" className="inline-flex items-center gap-2 mt-4 text-frame-green hover:text-frame-green-dark transition-colors font-medium">
                  Inquire Within →
                </a>
              </div>
            </div>

            <div className="mt-12 p-8 bg-paper-100 dark:bg-ink-900 rounded-lg border-2 border-frame-green/20">
              <h2 className="text-2xl font-playfair font-bold mb-4">Operational Nexus</h2>
              <p className="mb-4">
                Manic operates in multiple hemispheres, with a seamless collaborative workflow spanning Los Angeles to Melbourne, Lagos to London.
              </p>
              <p className="text-sm text-ink-600 dark:text-paper-400">
                Digital Nexus // Los Angeles Anchor
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-ink-500 dark:text-paper-500">
                Frame is a product of <a href="https://www.linkedin.com/company/manic-agency-llc/" className="text-frame-green hover:underline" target="_blank" rel="noopener noreferrer">Manic Agency LLC</a>
              </p>
              <a href="mailto:team@frame.dev" className="inline-flex items-center gap-2 mt-4 text-frame-green hover:text-frame-green-dark transition-colors font-medium">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                team@frame.dev
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}