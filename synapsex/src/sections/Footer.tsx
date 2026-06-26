import SynapseXLogo from '../components/SynapseXLogo'

const FOOTER_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4'

export default function Footer() {
  return (
    <footer
      className="w-full overflow-hidden"
      style={{ background: '#000' }}
    >
      <div className="flex flex-col md:flex-row min-h-[400px]">
        {/* Left: video */}
        <div className="relative h-[300px] md:h-auto md:flex-1 overflow-hidden">
          <video
            src={FOOTER_VIDEO}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Right: content */}
        <div className="md:flex-1 flex flex-col justify-between p-10 sm:p-16">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <SynapseXLogo size={18} className="text-white/70" />
              <span
                className="text-white/70 font-medium tracking-tight"
                style={{ fontSize: 15 }}
              >
                SynapseX
              </span>
            </div>

            <p
              className="text-white/40 leading-relaxed max-w-sm"
              style={{ fontSize: 'clamp(14px, 2vw, 15px)' }}
            >
              The next evolution of human-machine interaction. Built for those who refuse to be
              limited by biology alone.
            </p>
          </div>

          <p className="text-white/25 mt-12" style={{ fontSize: 12 }}>
            &copy; 2026 SynapseX Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
