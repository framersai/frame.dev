'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WindowFrame from '@/components/window-frame'
import PageLayout from '@/components/page-layout'
import OpenStrandPopover from '@/components/openstrand-popover'
import VCABanner from '@/components/vca-banner'
import FrameCodexBanner from '@/components/frame-codex-banner'
import GitHubRepos from '@/components/github-repos'
import SuperintelligenceBanner from '@/components/superintelligence-banner'

const taglines = [
  "Building adaptive AI intelligence that is emergent and permanent",
  "Infrastructure for open source SAFE superintelligence",
  "Denoising the web for humanity's collective knowledge"
]

export default function HomePage() {
  const [headingRevealed, setHeadingRevealed] = useState(false)
  const [noiseLevel, setNoiseLevel] = useState(100)
  const [isDenoising, setIsDenoising] = useState(false)
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const controls = useAnimation()

  // Cycle through taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeadingRevealed(true)
      setIsDenoising(true)
    }, 50)
    return () => clearTimeout(timeout)
  }, [])

  // Noise animation effect
  useEffect(() => {
    if (!canvasRef.current || !isDenoising) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = 200
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    let currentNoise = 80
    const animationDuration = 800
    const startTime = Date.now()

    const drawNoise = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      currentNoise = 80 * (1 - easeOutQuart)
      setNoiseLevel(currentNoise)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (currentNoise > 0.5) {
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * currentNoise
          const shouldShowNoise = Math.random() * 100 < currentNoise * 0.8

          if (shouldShowNoise) {
            const isGreenRain = Math.random() > 0.7
            if (isGreenRain) {
              data[i] = noise * 0.1
              data[i + 1] = noise * 0.8
              data[i + 2] = noise * 0.2
              data[i + 3] = noise * 2.5
            } else {
              data[i] = noise * 0.3
              data[i + 1] = noise * 0.4
              data[i + 2] = noise * 0.3
              data[i + 3] = noise * 1.8
            }
          }
        }

        ctx.putImageData(imageData, 0, 0)

        // Digital scan lines
        if (currentNoise > 15) {
          ctx.strokeStyle = `rgba(0, 248, 180, ${currentNoise / 300})`
          ctx.lineWidth = 1
          for (let y = 0; y < canvas.height; y += 4) {
            if (Math.random() > 0.5) {
              ctx.beginPath()
              ctx.moveTo(0, y)
              ctx.lineTo(canvas.width, y)
              ctx.stroke()
            }
          }
        }

        // Matrix-style characters
        if (currentNoise > 25) {
          ctx.font = '10px monospace'
          ctx.fillStyle = `rgba(0, 248, 180, ${currentNoise / 150})`
          for (let x = 0; x < canvas.width; x += 20) {
            for (let y = 0; y < canvas.height; y += 20) {
              if (Math.random() > 0.8) {
                ctx.fillText(Math.random() > 0.5 ? '1' : '0', x, y)
              }
            }
          }
        }
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(drawNoise)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    drawNoise()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [isDenoising])

  useEffect(() => {
    if (isDenoising) {
      controls.start({
        filter: ['blur(8px) saturate(0)', 'blur(4px) saturate(0.5)', 'blur(2px) saturate(0.8)', 'blur(0px) saturate(1)'],
        opacity: [0.3, 0.6, 0.85, 1],
        letterSpacing: ['0.2em', '0.1em', '0.05em', '0em'],
        transition: {
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }
      })
    }
  }, [isDenoising, controls])

  return (
    <PageLayout>
      {/* VCA Banner - Bottom right */}
      <VCABanner />

      {/* Hero Section */}
      <div className="container mx-auto px-0 sm:px-4 pt-4 pb-6 sm:pt-8 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10 overflow-visible relative z-10"
        >
          {/* Noise overlay canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              mixBlendMode: 'screen',
              opacity: 0.8,
              top: '-50px',
              height: '250px',
            }}
          />

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] leading-[1.18] md:leading-[1.2] font-display font-black tracking-tight heading-display mb-6 md:mb-8 overflow-visible relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.span
              className={`hero-heading ${headingRevealed ? 'is-revealed' : ''} relative inline-block`}
              style={{ willChange: 'transform, filter' }}
              animate={controls}
              initial={{
                opacity: 0.3,
                filter: 'blur(8px) saturate(0)',
                letterSpacing: '0.2em'
              }}
            >
              {/* Glitch effect */}
              {noiseLevel > 30 && (
                <>
                  <span
                    className="absolute inset-0 text-frame-green opacity-30"
                    style={{
                      transform: `translate(${Math.sin(Date.now() / 100) * 2}px, ${Math.cos(Date.now() / 150)}px)`,
                      filter: 'blur(1px)',
                    }}
                  >
                    Denoising the web
                  </span>
                  <span
                    className="absolute inset-0 text-red-500 opacity-20"
                    style={{
                      transform: `translate(${-Math.sin(Date.now() / 100) * 2}px, 0)`,
                      filter: 'blur(1px)',
                    }}
                  >
                    Denoising the web
                  </span>
                </>
              )}
              <span className="relative z-10 block pb-1">
                Denoising the web
              </span>
            </motion.span>
          </motion.h1>

          {/* Animated Taglines */}
          <div className="h-16 relative mb-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTaglineIndex}
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {taglines[currentTaglineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Enhanced Tagline */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-frame-green/20 to-frame-green-dark/20 rounded-xl blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <p className="relative text-xl md:text-2xl font-serif bg-gradient-to-r from-frame-green to-frame-green-dark bg-clip-text text-transparent px-4 py-2">
              The OS for humans, the codex of humanity.
            </p>
          </motion.div>

          <motion.div
            className="text-2xl md:text-3xl mt-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <OpenStrandPopover />
          </motion.div>
        </motion.div>

        {/* Interactive Window Frame */}
        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <WindowFrame />
        </motion.div>

        {/* Open Source Mission Statement */}
        <motion.section
          className="mt-16 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Infrastructure for Open Source SAFE Superintelligence
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            We&apos;re building the foundation for humanity&apos;s collective intelligence. 
            Our mission is to ensure that superintelligence remains open, safe, and aligned with human values.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="https://github.com/framersai" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Join as Collaborator
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all transform hover:scale-105"
            >
              Learn Our Mission
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.section>

        {/* GitHub Repos Showcase */}
        <motion.section
          className="mt-16 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Open Source Projects</h2>
          <GitHubRepos />
        </motion.section>

        {/* Frame Codex Banner */}
        <FrameCodexBanner />

        {/* Superintelligence Banner */}
        <SuperintelligenceBanner />
      </div>
    </PageLayout>
  )
}