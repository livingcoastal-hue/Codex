import { motion } from 'framer-motion'

interface SquashHamburgerProps {
  isOpen: boolean
  isMobile?: boolean
}

export default function SquashHamburger({ isOpen, isMobile = false }: SquashHamburgerProps) {
  const w = isMobile ? 15 : 18
  const h = isMobile ? 10 : 12
  const barH = isMobile ? 1.2 : 1.5

  const spring = { type: 'spring' as const, stiffness: 300, damping: 20 }

  return (
    <div
      style={{ width: w, height: h }}
      className="relative flex flex-col justify-between"
    >
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: barH,
          backgroundColor: 'white',
          borderRadius: barH,
          top: 0,
        }}
        animate={
          isOpen
            ? { rotate: 45, y: h / 2 - barH / 2 }
            : { rotate: 0, y: 0 }
        }
        transition={spring}
      />
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: barH,
          backgroundColor: 'white',
          borderRadius: barH,
          top: '50%',
          marginTop: -barH / 2,
        }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={spring}
      />
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: barH,
          backgroundColor: 'white',
          borderRadius: barH,
          bottom: 0,
        }}
        animate={
          isOpen
            ? { rotate: -45, y: -(h / 2 - barH / 2) }
            : { rotate: 0, y: 0 }
        }
        transition={spring}
      />
    </div>
  )
}
