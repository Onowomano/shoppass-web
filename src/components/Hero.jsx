import { useEffect, useState } from 'react'
import Button from './Button'
import WhatsAppIcon from './WhatsAppIcon'
import { FLAT_SERVICE_FEE, MARKET_DAYS, VARIABLE_SERVICE_FEE } from '../config/business'

const WHATSAPP_URL = 'http://wa.me/2348080828181'

const STAGES = [
  { emoji: '🍅', text: 'Getting your tomatoes ready...' },
  { emoji: ['🌶️', '🫑'], text: 'Checking the peppers...' },
  { emoji: '🧅', text: 'Slicing the onions...' },
  { emoji: '🥕', text: 'Almost done...' },
]

function EmojiLoader() {
  const [stageIndex, setStageIndex] = useState(0)
  const [pepperFlip, setPepperFlip] = useState(false)

  // Cycle through stages every 500ms
  useEffect(() => {
    const id = setInterval(() => setStageIndex(i => (i + 1) % STAGES.length), 500)
    return () => clearInterval(id)
  }, [])

  // Alternate pepper emoji every 200ms when on the pepper stage
  useEffect(() => {
    if (stageIndex !== 1) return
    const id = setInterval(() => setPepperFlip(f => !f), 200)
    return () => clearInterval(id)
  }, [stageIndex])

  const stage = STAGES[stageIndex]
  const emoji = Array.isArray(stage.emoji)
    ? stage.emoji[pepperFlip ? 1 : 0]
    : stage.emoji

  return (
    <div className="flex flex-col items-center gap-4">
      <span style={{ fontSize: 64, lineHeight: 1 }}>{emoji}</span>
      <p className="text-body-lg-bold text-text-primary">{stage.text}</p>
    </div>
  )
}

export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)
  const ready = imgLoaded && fontsLoaded && minTimeElapsed

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true))
    const id = setTimeout(() => setMinTimeElapsed(true), 2600)
    return () => clearTimeout(id)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Full-screen loader — fades out once the hero image and fonts are ready */}
      <div
        aria-hidden="true"
        className={[
          'fixed inset-0 z-[100] bg-bg-surface flex items-center justify-center',
          'transition-opacity duration-500 pointer-events-none',
          ready ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
      >
        <EmojiLoader />
      </div>

      {/* Background image */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img
          src="/market.jpg"
          alt=""
          onLoad={() => setImgLoaded(true)}
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      {/* Centre content */}
      <div className="relative z-10 flex flex-col gap-10 items-center text-center max-w-[500px] w-full px-6">

        {/* Heading + subtext */}
        <div className="flex flex-col gap-3 text-white w-full">
          <h1 className="text-heading-md lg:text-heading-lg">
            Let's Go To<br />The Market For You
          </h1>
          <p className="text-body-lg-bold">
            Send us your shopping list—we'll head to the market, pick everything
            up, and get it delivered straight to your door.
            <br />No stress, no wasted time.
          </p>
        </div>

        {/* CTA */}
        <Button
          type="White"
          label="Talk to us"
          leftIcon={<WhatsAppIcon size={20} />}
          onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}
        />
      </div>

      {/* Disclaimer */}
      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center text-body-md-bold leading-[22px] tracking-[-0.01em] w-[390px] max-w-[90vw]">
       *We shop on {MARKET_DAYS} for a flat service fee of {FLAT_SERVICE_FEE}. If you need us to shop outside those days, a higher service fee applies—{VARIABLE_SERVICE_FEE}, depending on the length of your list. Delivery fees are separate.
      </p>
    </section>
  )
}
