import type { Metadata } from 'next'
import { Inter, Crimson_Text } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const crimson = Crimson_Text({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://frame.dev'),
  title: 'Frame - Denoising the web',
  description: 'The OS for your life. A window to organize, simplify, and enhance your digital existence.',
  applicationName: 'Frame',
  keywords: ['Frame', 'OS', 'AgentOS', 'WebOS', 'HomeOS', 'SafeOS', 'WorkOS', 'MyOS', 'Framers'],
  authors: [{ name: 'Framers', url: 'https://frame.dev' }],
  creator: 'Framers',
  publisher: 'Framers',
  openGraph: {
    title: 'Frame - Denoising the web',
    description: 'The OS for your life',
    url: 'https://frame.dev',
    siteName: 'Frame',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frame - Denoising the web',
    description: 'The OS for your life',
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
