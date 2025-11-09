'use client'

import { motion } from 'framer-motion'
import WindowFrame from '@/components/window-frame'
import PageLayout from '@/components/page-layout'
import OpenStrandPopover from '@/components/openstrand-popover'
import VCABanner from '@/components/vca-banner'

export default function HomePage() {
  return (
    <PageLayout>
      {/* VCA Banner - Bottom right */}
      <VCABanner />

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight heading-display mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Denoising the web
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