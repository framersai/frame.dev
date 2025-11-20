import type { Metadata, Viewport } from 'next'
import { Inter, Crimson_Text } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const crimson = Crimson_Text({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdfcfb' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1b1d' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://frame.dev'),
  title: {
    default: 'Frame - Denoising the web',
    template: '%s | Frame',
  },
  description: 'The OS for your life. A window to organize, simplify, and enhance your digital existence. Framers AI building the future of AgentOS and OpenStrand.',
  keywords: ['Frame', 'frame.dev', 'Framers', 'Framers AI', 'Frame AI', 'AgentOS', 'AgentOS open-source', 'Codex', 'Frame Codex', 'AI Agent', 'AI Agency', 'WebOS', 'HomeOS', 'SafeOS', 'WorkOS', 'MyOS', 'OS for your life', 'OpenStrand', 'OpenStrand OS', 'OpenStrand.ai', 'wearetheframers', 'we are the framers'],
  authors: [{ name: 'Framers', url: 'https://frame.dev' }],
  creator: 'Framers',
  publisher: 'Framers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Frame - Denoising the web',
    description: 'The OS for your life. A window to organize, simplify, and enhance your digital existence.',
    url: 'https://frame.dev',
    siteName: 'Frame',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Frame - The OS for your life',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frame - Denoising the web',
    description: 'The OS for your life',
    creator: '@framersai',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Framers',
              url: 'https://frame.dev',
              logo: 'https://frame.dev/frame-logo.png',
              sameAs: [
                'https://github.com/framersai',
                'https://twitter.com/framersai',
              ],
              description: 'Infrastructure for agentic AI and the operating system for your life.',
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${crimson.variable} font-sans bg-paper-50 dark:bg-ink-950 text-ink-900 dark:text-paper-50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-paper-texture">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
