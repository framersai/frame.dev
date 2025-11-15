import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://frame.dev'),
  title: 'Frame.dev – AI Infrastructure for Knowledge and Superintelligence',
  description:
    'Frame.dev is building adaptive AI infrastructure that is emergent and permanent—denoising the web, powering AI agents, and serving as the OS for humans and the codex of humanity.',
  applicationName: 'Frame.dev',
  keywords: [
    'Frame',
    'Frame.dev',
    'framersai',
    'Framers',
    'AI infrastructure',
    'superintelligence',
    'AI agents',
    'agentic AI',
    'Frame Codex',
    'OpenStrand',
    'knowledge graph',
  ],
  authors: [{ name: 'Framers', url: 'https://frame.dev' }],
  creator: 'Framers',
  publisher: 'Framers',
  openGraph: {
    title: 'Frame.dev – AI Infrastructure for Knowledge and Superintelligence',
    description:
      'Denoising the web with adaptive AI intelligence that is emergent and permanent. The OS for humans, the codex of humanity.',
    url: 'https://frame.dev',
    siteName: 'Frame.dev',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frame.dev – AI Infrastructure for Knowledge and Superintelligence',
    description:
      'Denoising the web with adaptive AI intelligence that is emergent and permanent. The OS for humans, the codex of humanity.',
    creator: '@framersai',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: ['/icon.svg'],
    apple: '/icon.svg',
  },
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  other: {
    contact: 'team@frame.dev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased bg-paper-50 dark:bg-ink-950 text-ink-900 dark:text-paper-50`}>
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
