import { motion } from 'framer-motion'

const layers = [
  { num: 'Layer 1', label: 'Capture' },
  { num: 'Layer 2', label: 'Process' },
  { num: 'Layer 3', label: 'Interface' },
]

export default function Architecture() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#000' }}
    >
      <div className="max-w-3xl w-full px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
        >
          <p
            className="text-white/40 tracking-[0.2em] uppercase mb-8"
            style={{ fontSize: 'clamp(13px, 2vw, 14px)' }}
          >
            Architecture
          </p>
          <h2
            className="text-white font-light leading-[1.15] tracking-[-0.02em] mb-10"
            style={{ fontSize: 'clamp(28px, 6vw, 56px)' }}
          >
            Three layers. Zero friction.
          </h2>
          <p
            className="text-white/45 leading-relaxed max-w-xl mx-auto"
            style={{ fontSize: 'clamp(15px, 2vw, 17px)' }}
          >
            Sensor layer captures raw bioelectric signals. Processing layer isolates intent.
            Interface layer delivers structured output to any connected system.
          </p>
        </motion.div>

        <motion.div
          className="mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {layers.map((layer) => (
            <div
              key={layer.num}
              className="max-w-md w-full flex items-center justify-between px-6 border border-white/10 rounded-lg"
              style={{ height: 72 }}
            >
              <span
                className="text-white/30 tracking-[0.15em] uppercase"
                style={{ fontSize: 12 }}
              >
                {layer.num}
              </span>
              <span
                className="text-white font-light"
                style={{ fontSize: 'clamp(16px, 2vw, 18px)' }}
              >
                {layer.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
