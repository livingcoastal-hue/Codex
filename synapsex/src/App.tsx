import Hero from './sections/Hero'
import CinematicText from './sections/CinematicText'
import Metrics from './sections/Metrics'
import Technology from './sections/Technology'
import Architecture from './sections/Architecture'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div style={{ fontFamily: '"Space Mono", monospace' }}>
      <Hero />
      <CinematicText />
      <Metrics />
      <Technology />
      <Architecture />
      <Footer />
    </div>
  )
}
