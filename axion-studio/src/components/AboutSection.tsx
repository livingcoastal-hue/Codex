import { ArrowRight } from 'lucide-react'

const EASE = 'cubic-bezier(0.25,0.1,0.25,1)'

const SMALL_IMG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85'
const LARGE_IMG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85'

function OrangeButton({ text }: { text: string }) {
  return (
    <button className="about-orange-btn group flex items-center gap-2 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors w-fit">
      <span className="overflow-hidden h-[20px] flex flex-col">
        <span
          className="about-orange-text flex flex-col transition-transform duration-500"
          style={{ transitionTimingFunction: EASE }}
        >
          <span>{text}</span>
          <span aria-hidden>{text}</span>
        </span>
      </span>
      <span className="bg-white w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0">
        <ArrowRight
          size={14}
          className="about-orange-arrow text-[#F26522] transition-transform duration-500"
          style={{ transitionTimingFunction: EASE }}
        />
      </span>
      <style>{`
        .about-orange-btn:hover .about-orange-text {
          transform: translateY(-50%);
        }
        .about-orange-btn:hover .about-orange-arrow {
          transform: rotate(-45deg);
        }
      `}</style>
    </button>
  )
}

export default function AboutSection() {
  return (
    <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Badge row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[11px] sm:text-[12px] font-semibold">1</span>
          </div>
          <span className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Introducing Axion
          </span>
        </div>

        {/* Heading */}
        <h2
          className="px-5 sm:px-8 lg:px-12 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
        >
          Strategy-led creatives, delivering
          <br />
          results in digital and beyond.
        </h2>

        {/* Mobile / Tablet layout (lg:hidden) */}
        <div className="lg:hidden px-5 sm:px-8">
          <div className="mb-8">
            <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900 mb-6">
              Through research, creative thinking and iteration we help growing brands realize
              their digital full potential.
            </p>
            <OrangeButton text="About our studio" />
          </div>

          {/* Images */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <div className="sm:w-[45%]">
              <div className="aspect-[438/346]">
                <img
                  src={SMALL_IMG}
                  alt="Studio interior"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                />
              </div>
            </div>
            <div className="sm:w-[55%]">
              <div className="aspect-[900/600]">
                <img
                  src={LARGE_IMG}
                  alt="Team at work"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8 px-5 sm:px-8 lg:px-12">
          {/* Left: small image */}
          <div className="self-end">
            <div className="aspect-[438/346]">
              <img
                src={SMALL_IMG}
                alt="Studio interior"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Center: paragraph + button */}
          <div className="self-start flex justify-end">
            <div>
              <p className="text-[16px] sm:text-[18px] leading-[1.65] font-medium text-gray-900 whitespace-nowrap mb-8">
                Through research, creative thinking
                <br />
                and iteration we help growing brands
                <br />
                realize their digital full potential.
              </p>
              <OrangeButton text="About our studio" />
            </div>
          </div>

          {/* Right: large image */}
          <div className="self-end">
            <div className="aspect-[3/2]">
              <img
                src={LARGE_IMG}
                alt="Team at work"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
