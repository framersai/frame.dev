'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import WindowFrame from '@/components/window-frame'
import PageLayout from '@/components/page-layout'
import OpenStrandPopover from '@/components/openstrand-popover'
import VCABanner from '@/components/vca-banner'

export default function HomePage() {
  const [headingRevealed, setHeadingRevealed] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setHeadingRevealed(true), 200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <PageLayout>
      {/* VCA Banner - Bottom right */}
      <VCABanner />

      {/* Hero Section */}
      <div className="container mx-auto px-0 sm:px-4 pt-8 pb-8 sm:pt-12 sm:pb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-14 overflow-visible"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] leading-[1.18] md:leading-[1.2] font-display font-black tracking-tight heading-display mb-6 md:mb-8 overflow-visible"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className={`hero-heading ${headingRevealed ? 'is-revealed' : ''}`}
              style={{ willChange: 'transform, filter, clip-path' }}
              initial={{ opacity: 0, y: 8, filter: 'blur(16px)', clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block pb-1">Denoising the web</span>
            </motion.span>
          </motion.h1>
          <motion.div 
            className="text-2xl md:text-3xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <OpenStrandPopover />
          </motion.div>
        </motion.div>

        {/* Interactive Window Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <WindowFrame />
        </motion.div>
      </div>
    </PageLayout>
  )
}