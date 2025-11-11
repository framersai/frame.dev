'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import WindowFrame from '@/components/window-frame'
import PageLayout from '@/components/page-layout'
import OpenStrandPopover from '@/components/openstrand-popover'
import VCABanner from '@/components/vca-banner'

export default function HomePage() {
  const [headingRevealed, setHeadingRevealed] = useState(false)
  const [noiseLevel, setNoiseLevel] = useState(100)
  const [isDenoising, setIsDenoising] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const controls = useAnimation()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeadingRevealed(true)
      setIsDenoising(true)
    }, 200)
    return () => clearTimeout(timeout)
  }, [])

  // Subtle noise animation effect
  useEffect(() => {
    if (!canvasRef.current || !isDenoising) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = 150
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    let currentNoise = 60 // Start at 60% for subtlety
    const targetNoise = 0
    const animationDuration = 2500 // 2.5 seconds for smoother feel
    const startTime = Date.now()

    const drawNoise = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)

      // Smoother easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      currentNoise = 60 * (1 - easeOutCubic)
      setNoiseLevel(currentNoise)

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (currentNoise > 0.5) {
        // Create subtle noise pattern
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const data = imageData.data

        // Less dense noise
        for (let i = 0; i < data.length; i += 8) { // Skip more pixels for subtlety
          const noise = Math.random() * currentNoise * 0.6
          const shouldShowNoise = Math.random() * 100 < currentNoise * 0.4

          if (shouldShowNoise) {
            // Subtle monochrome noise with slight green tint
            data[i] = noise * 0.2     // Red
            data[i + 1] = noise * 0.3 // Green (subtle tint)
            data[i + 2] = noise * 0.2 // Blue
            data[i + 3] = noise * 1.5 // Alpha (more transparent)
          }
        }

        ctx.putImageData(imageData, 0, 0)

        // Subtle scan lines
        if (currentNoise > 20) {
          ctx.strokeStyle = `rgba(34, 139, 34, ${currentNoise / 600})`
          ctx.lineWidth = 0.5
          for (let y = 0; y < canvas.height; y += 8) {
            if (Math.random() > 0.7) {
              ctx.beginPath()
              ctx.moveTo(0, y)
              ctx.lineTo(canvas.width, y)
              ctx.stroke()
            }
          }
        }

        // Subtle wave distortion
        if (currentNoise > 10) {
          ctx.strokeStyle = `rgba(34, 139, 34, ${currentNoise / 500})`
          ctx.lineWidth = 1
          ctx.beginPath()
          const waveOffset = (Date.now() / 20) % canvas.width
          for (let x = 0; x < canvas.width; x += 10) {
            const y = canvas.height / 2 + Math.sin((x + waveOffset) * 0.01) * currentNoise * 0.2
            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.stroke()
        }
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(drawNoise)
      } else {
        // Clean up when done
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

  // Subtle text reveal animation
  useEffect(() => {
    if (isDenoising) {
      controls.start({
        filter: ['blur(4px) saturate(0.7)', 'blur(2px) saturate(0.85)', 'blur(1px) saturate(0.95)', 'blur(0px) saturate(1)'],
        opacity: [0.6, 0.75, 0.9, 1],
        letterSpacing: ['0.1em', '0.05em', '0.02em', '0em'],
        transition: {
          duration: 2.5,
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
      <div className="container mx-auto px-0 sm:px-4 pt-8 pb-8 sm:pt-12 sm:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-14 overflow-visible relative"
        >
          {/* Noise overlay canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              mixBlendMode: 'screen',
              opacity: 0.6,
              top: '-50px',
              height: '200px',
            }}
          />

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] leading-[1.18] md:leading-[1.2] font-display font-black tracking-tight heading-display mb-6 md:mb-8 overflow-visible relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className={`hero-heading ${headingRevealed ? 'is-revealed' : ''} relative inline-block`}
              style={{ willChange: 'transform, filter' }}
              animate={controls}
              initial={{
                opacity: 0.6,
                filter: 'blur(4px) saturate(0.7)',
                letterSpacing: '0.1em'
              }}
            >
              {/* Subtle glitch effect */}
              {noiseLevel > 30 && (
                <span
                  className="absolute inset-0 text-frame-green opacity-20"
                  style={{
                    transform: `translate(${Math.sin(Date.now() / 200)}px, 0)`,
                    filter: 'blur(1px)',
                  }}
                >
                  Denoising the web
                </span>
              )}

              {/* Main text - simpler animation */}
              <span className="relative z-10 block pb-1">
                Denoising the web
              </span>
            </motion.span>
          </motion.h1>

          {/* Noise level indicator */}
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: noiseLevel > 0 ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 text-xs text-frame-green">
              <div className="w-24 h-1 bg-ink-200/20 dark:bg-paper-200/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-frame-green to-frame-green/50"
                  style={{ width: `${100 - noiseLevel}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="font-mono text-[10px]">
                {noiseLevel > 0 ? `${Math.round(noiseLevel)}% noise` : 'CLEAR'}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="text-2xl md:text-3xl mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <OpenStrandPopover />
          </motion.div>
        </motion.div>

        {/* Interactive Window Frame with delay for dramatic effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 3 }}
        >
          <WindowFrame />
        </motion.div>
      </div>
    </PageLayout>
  )
}