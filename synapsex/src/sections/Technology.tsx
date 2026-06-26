import { motion } from 'framer-motion'

const TECHNOLOGY_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4'

const features = [
  {
    title: 'Cortical Mapping',
    desc: 'Real-time spatial reconstruction of active neural regions.',
  },
  {
    title: 'Signal Isolation',
    desc: 'Separates cognitive intent from biological noise.',
  },
  {
    title: 'State Prediction',
    desc: 'Anticipates cognitive transitions before they occur.',
  },
  {
    title: 'Loop Feedback',
    desc: 'Closed-loop adjustment based on outcome correlation.',
  },
]

export default function Technology() {
  return (
    <section
      className="relative w-full h-screen h-[100dvh] flex flex-col overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Video background */}
      <video
        src={TECHNOLOGY_VIDEO}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-8 sm:px-12 md:px-16 py-12 sm:py-16">
        {/* Top area */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <motion.h2
            className="text-white font-light leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 8vw, 72px)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
          >
            Adaptive
            <br />
            Intelligence
          </motion.h2>

          <motion.p
            className="text-white/50 leading-relaxed max-w-xs md:text-right md:pt-2"
            style={{ fontSize: 'clamp(13px, 2vw, 15px)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            The system learns your neural baseline within 72 hours. From there, every cognitive
            state is mapped, predicted, and optimized in real time.
          </motion.p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, delay: 0.3 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div
                className="text-white font-normal mb-2"
                style={{ fontSize: 'clamp(14px, 2vw, 16px)' }}
              >
                {feature.title}
              </div>
              <div
                className="text-white/40 leading-relaxed"
                style={{ fontSize: 'clamp(12px, 1.5vw, 14px)' }}
              >
                {feature.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
