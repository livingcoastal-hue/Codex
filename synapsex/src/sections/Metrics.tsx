import { motion } from 'framer-motion'

const METRICS_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4'

const metrics = [
  { value: '2.4ms', label: 'Synaptic Latency' },
  { value: '99.7%', label: 'Signal Accuracy' },
  { value: '140B', label: 'Neural Parameters' },
]

export default function Metrics() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Video background */}
      <video
        src={METRICS_VIDEO}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full pt-32 pb-32 px-6">
        <motion.p
          className="text-white/40 tracking-[0.2em] uppercase mb-20 text-center"
          style={{ fontSize: 'clamp(13px, 2vw, 14px)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          Performance Metrics
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <div
                className="text-white font-light tracking-[-0.04em] leading-none"
                style={{ fontSize: 'clamp(48px, 10vw, 96px)' }}
              >
                {metric.value}
              </div>
              <div
                className="text-white/40 mt-4 tracking-wide"
                style={{ fontSize: 'clamp(13px, 2vw, 15px)' }}
              >
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
