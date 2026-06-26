import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrambleIn from '../components/ScrambleIn'
import ScrambleText from '../components/ScrambleText'
import SynapseXLogo from '../components/SynapseXLogo'
import SquashHamburger from '../components/SquashHamburger'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [entranceComplete, setEntranceComplete] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [downloadHovered, setDownloadHovered] = useState(false)
  const [aboutHovered, setAboutHovered] = useState(false)
  const [metricsHovered, setMetricsHovered] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)

  const isSeeking = useRef(false)
  const pendingDelta = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleSeeked = () => {
      isSeeking.current = false
      if (pendingDelta.current !== 0) {
        const delta = pendingDelta.current
        pendingDelta.current = 0
        applyDelta(delta)
      }
    }

    video.addEventListener('seeked', handleSeeked)
    return () => video.removeEventListener('seeked', handleSeeked)
  }, [])

  const applyDelta = (delta: number) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const sensitivity = 0.8
    const newTime = Math.max(0, Math.min(video.duration, video.currentTime + delta * sensitivity * (video.duration / window.innerWidth)))
    video.currentTime = newTime
    isSeeking.current = true
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.movementX
      if (isSeeking.current) {
        pendingDelta.current += delta
      } else {
        applyDelta(delta)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollTo = (y: number) => {
    window.scrollTo({ top: y, behavior: 'smooth' })
    setMenuOpen(false)
  }

  const menuSpring = { type: 'spring' as const, stiffness: 350, damping: 28 }

  return (
    <section
      className="relative w-full h-screen h-[100dvh] flex flex-col overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
          zIndex: 1,
        }}
      />

      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1, marginTop: 50 }}
      >
        <span
          style={{
            fontFamily: '"Anton SC", sans-serif',
            fontSize: 'clamp(120px, 30vw, 521px)',
            textTransform: 'uppercase',
            letterSpacing: '-4px',
            opacity: 0.10,
            background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          TRANSCENDENCE
        </span>
      </div>

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6"
        style={{ height: 80 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Logo pill */}
          <AnimatePresence>
            {(!menuOpen) && (
              <motion.div
                key="logo-pill"
                className="hidden md:flex"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.button
                  className="flex items-center gap-2.5 px-5 rounded-[14px]"
                  style={{
                    height: 48,
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setLogoHovered(true)}
                  onMouseLeave={() => setLogoHovered(false)}
                >
                  <SynapseXLogo size={18} className="text-white" />
                  <ScrambleText
                    text="SynapseX"
                    isHovered={logoHovered}
                    className="text-white"
                    style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.02em' }}
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanding menu pill */}
          <motion.div
            className="relative flex items-center overflow-hidden rounded-[14px]"
            style={{
              height: 48,
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            animate={{ width: menuOpen ? 290 : 48 }}
            transition={menuSpring}
          >
            <motion.button
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: menuOpen ? 36 : 48,
                height: menuOpen ? 36 : 48,
                borderRadius: menuOpen ? 11 : 14,
                background: menuOpen ? 'rgba(255,255,255,0.10)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                marginLeft: menuOpen ? 6 : 0,
                transition: 'background 0.2s, width 0.2s, height 0.2s, border-radius 0.2s, margin 0.2s',
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ background: menuOpen ? 'rgba(255,255,255,0.20)' : 'transparent' }}
            >
              <SquashHamburger isOpen={menuOpen} />
            </motion.button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="flex items-center gap-6 pl-4 pr-5 whitespace-nowrap"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    className="text-white/85 hover:text-white transition-colors"
                    style={{ fontSize: 16, fontFamily: '"Space Mono", monospace', fontWeight: 400, background: 'none', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={() => setAboutHovered(true)}
                    onMouseLeave={() => setAboutHovered(false)}
                    onClick={() => scrollTo(window.innerHeight)}
                  >
                    <ScrambleText text="About" isHovered={aboutHovered} />
                  </button>
                  <button
                    className="text-white/85 hover:text-white transition-colors"
                    style={{ fontSize: 16, fontFamily: '"Space Mono", monospace', fontWeight: 400, background: 'none', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={() => setMetricsHovered(true)}
                    onMouseLeave={() => setMetricsHovered(false)}
                    onClick={() => scrollTo(window.innerHeight * 2)}
                  >
                    <ScrambleText text="Metrics" isHovered={metricsHovered} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile nav */}
        <div className="flex sm:hidden items-center gap-2 w-full">
          {/* Logo pill mobile - hides when menu open */}
          <motion.div
            style={{ overflow: 'hidden' }}
            animate={{ width: menuOpen ? 0 : 'auto', opacity: menuOpen ? 0 : 1 }}
            transition={menuSpring}
          >
            <motion.button
              className="flex items-center gap-2 px-3 rounded-[10px] flex-shrink-0"
              style={{
                height: 36,
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <SynapseXLogo size={14} className="text-white" />
              <span className="text-white" style={{ fontSize: 13, fontWeight: 500, letterSpacing: '-0.02em' }}>SynapseX</span>
            </motion.button>
          </motion.div>

          {/* Mobile menu capsule */}
          <motion.div
            className="relative flex items-center overflow-hidden rounded-[10px]"
            style={{
              height: 36,
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              flexShrink: 0,
            }}
            animate={{ width: menuOpen ? '100%' : 36 }}
            transition={menuSpring}
          >
            <motion.button
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: menuOpen ? 28 : 36,
                height: menuOpen ? 28 : 36,
                borderRadius: menuOpen ? 8 : 10,
                background: menuOpen ? 'rgba(255,255,255,0.10)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                marginLeft: menuOpen ? 4 : 0,
                transition: 'background 0.2s, width 0.2s, height 0.2s, border-radius 0.2s, margin 0.2s',
              }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <SquashHamburger isOpen={menuOpen} isMobile />
            </motion.button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="flex items-center gap-5 pl-3 pr-4 whitespace-nowrap"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    className="text-white/85"
                    style={{ fontSize: 13, fontFamily: '"Space Mono", monospace', background: 'none', border: 'none', cursor: 'pointer' }}
                    onClick={() => scrollTo(window.innerHeight)}
                  >
                    About
                  </button>
                  <button
                    className="text-white/85"
                    style={{ fontSize: 13, fontFamily: '"Space Mono", monospace', background: 'none', border: 'none', cursor: 'pointer' }}
                    onClick={() => scrollTo(window.innerHeight * 2)}
                  >
                    Metrics
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Download button */}
        <motion.button
          className="hidden sm:flex items-center gap-2 rounded-full"
          style={{
            height: 48,
            paddingLeft: 24,
            paddingRight: 24,
            background: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            fontFamily: '"Space Mono", monospace',
            fontSize: 15,
            fontWeight: 400,
            color: '#000',
          }}
          onMouseEnter={() => setDownloadHovered(true)}
          onMouseLeave={() => setDownloadHovered(false)}
          whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
          whileTap={{ scale: 0.97 }}
        >
          <i className="bi bi-apple" style={{ fontSize: 16 }} />
          <ScrambleText text="Download" isHovered={downloadHovered} />
        </motion.button>

        {/* Mobile download button */}
        <motion.button
          className="flex sm:hidden items-center gap-1.5 rounded-full flex-shrink-0"
          style={{
            height: 36,
            paddingLeft: 14,
            paddingRight: 14,
            background: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            fontFamily: '"Space Mono", monospace',
            fontSize: 13,
            color: '#000',
          }}
          whileTap={{ scale: 0.97 }}
        >
          <i className="bi bi-apple" style={{ fontSize: 14 }} />
          <span>Download</span>
        </motion.button>
      </motion.nav>

      {/* Hero content */}
      <motion.div
        className="relative flex flex-col flex-1 px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
        style={{ zIndex: 2 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <h1
              className="text-white font-light leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(40px, 10vw, 100px)' }}
            >
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              className="max-w-sm text-white/60 leading-relaxed"
              style={{ fontSize: 'clamp(13px, 2vw, 15px)' }}
              initial={{ opacity: 0, y: 25 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.215, 0.610, 0.355, 1.000],
              }}
            >
              Built at the intersection of neuroscience and artificial intelligence. SynapseX
              continuously maps neural pathways, cognitive load, and physiological states into a
              single adaptive intelligence layer.
            </motion.p>
          </div>

          {/* Right h1 */}
          <h1
            className="text-white font-light leading-[0.95] tracking-[-0.03em] text-left md:text-right"
            style={{ fontSize: 'clamp(40px, 10vw, 100px)' }}
          >
            <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  )
}
