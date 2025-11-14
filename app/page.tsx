'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import WindowFrame from '@/components/window-frame'
import PageLayout from '@/components/page-layout'
import OpenStrandPopover from '@/components/openstrand-popover'
import VCABanner from '@/components/vca-banner'
import FrameCodexBanner from '@/components/frame-codex-banner'

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
    }, 50) // Much faster start
    return () => clearTimeout(timeout)
  }, [])

  // More interesting noise animation effect
  useEffect(() => {
    if (!canvasRef.current || !isDenoising) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = 200
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    let currentNoise = 80 // Start higher for more dramatic effect
    const targetNoise = 0
    const animationDuration = 800 // Faster denoise reveal
    const startTime = Date.now()

    const drawNoise = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)

      // More dramatic easing
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      currentNoise = 80 * (1 - easeOutQuart)
      setNoiseLevel(currentNoise)

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (currentNoise > 0.5) {
        // Create more interesting noise pattern with particles
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const data = imageData.data

        // More varied noise pattern
        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * currentNoise
          const shouldShowNoise = Math.random() * 100 < currentNoise * 0.8

          if (shouldShowNoise) {
            // Create digital rain effect with green tint
            const isGreenRain = Math.random() > 0.7
            if (isGreenRain) {
              data[i] = noise * 0.1     // Red
              data[i + 1] = noise * 0.8 // Green (strong tint)
              data[i + 2] = noise * 0.2 // Blue
              data[i + 3] = noise * 2.5 // Alpha
            } else {
              // Regular static
              data[i] = noise * 0.3
              data[i + 1] = noise * 0.4
              data[i + 2] = noise * 0.3
              data[i + 3] = noise * 1.8
            }
          }
        }

        ctx.putImageData(imageData, 0, 0)

        // Digital scan lines effect
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

        // Matrix-style falling characters
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

        // Wave distortion with multiple waves
        if (currentNoise > 10) {
          ctx.strokeStyle = `rgba(0, 248, 180, ${currentNoise / 200})`
          ctx.lineWidth = 2

          for (let wave = 0; wave < 3; wave++) {
            ctx.beginPath()
            const waveOffset = (Date.now() / (10 + wave * 5)) % canvas.width
            for (let x = 0; x < canvas.width; x += 5) {
              const y = canvas.height / 2 +
                       Math.sin((x + waveOffset) * 0.02) * currentNoise * 0.5 +
                       Math.cos((x + waveOffset) * 0.01) * currentNoise * 0.3 +
                       wave * 20
              if (x === 0) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }
            }
            ctx.stroke()
          }
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

  // Faster text reveal animation
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
              {/* Glitch effect with more intensity */}
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

              {/* Main text */}
              <span className="relative z-10 block pb-1">
                Denoising the web
              </span>
            </motion.span>
          </motion.h1>

          <motion.div
            className="text-2xl md:text-3xl mt-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <OpenStrandPopover />
          </motion.div>
        </motion.div>

        {/* Interactive Window Frame with quick reveal */}
        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <WindowFrame />
        </motion.div>

        {/* Frame Codex Banner */}
        <FrameCodexBanner />
      </div>
    </PageLayout>
  )
}