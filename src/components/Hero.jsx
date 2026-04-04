import { ArrowUpRight } from 'lucide-react'
import Button from './Button'
import WhatsAppIcon from './WhatsAppIcon'

const WHATSAPP_URL = 'http://wa.me/2348080828181'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background image + overlays */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img
          src="/market.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      {/* Centre content */}
      <div className="relative z-10 flex flex-col gap-10 items-center text-center max-w-[475px] w-full px-6">

        {/* Heading + subtext */}
        <div className="flex flex-col gap-3 text-white w-full">
          <h1 className="text-heading-lg leading-[60px] tracking-[-0.02em]">
            Let's Go To<br />The Market For You
          </h1>
          <p className="text-body-lg-bold leading-6 tracking-[-0.01em]">
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
          rightIcon={<ArrowUpRight size={16} />}
          onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}
        />
      </div>

      {/* Disclaimer */}
      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center text-body-md-bold leading-[22px] tracking-[-0.01em] w-[390px] max-w-[90vw]">
        *Our service fee ranges from ₦5,000 to ₦10,000, based on how long your
        shopping list is. Delivery fee is separate.
      </p>
    </section>
  )
}
