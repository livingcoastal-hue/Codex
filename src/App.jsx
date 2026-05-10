import { motion } from 'framer-motion'

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '2rem', fontFamily: 'sans-serif' }}
    >
      <h1>Codex</h1>
      <p>framer-motion is ready.</p>
    </motion.div>
  )
}
