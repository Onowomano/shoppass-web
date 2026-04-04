import { Phone } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import WhatsAppIcon from './WhatsAppIcon'

const WHATSAPP_URL = 'http://wa.me/2348080828181'
const INSTAGRAM_URL = 'https://instagram.com/shoppass1'
const PHONE_URL = 'tel:2349032385225'

const ICON_LINK_CLASS = [
  'flex items-center justify-center size-12 rounded-full',
  'border border-border-primary text-icon-primary bg-bg-surface',
  'hover:bg-bg-primary transition-colors cursor-pointer shrink-0',
].join(' ')

export default function Footer() {
  return (
    <footer className="relative bg-bg-accent-orange px-12 py-14 overflow-hidden">

      {/* Background watermark */}
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/shoppass-logo.svg"
          alt=""
          className="w-[560px] opacity-10 brightness-0 invert"
        />
      </div>

      {/* Cards */}
      <div className="relative z-10 flex gap-5 max-w-[1200px] mx-auto">

        {/* Left — brand card */}
        <div className="bg-bg-surface rounded-3xl p-10 flex flex-col justify-between gap-16 flex-[4]">
          <h2 className="text-heading-lg leading-[60px] tracking-[-0.02em] text-text-primary">
            Na We<br />Shoppass!
          </h2>
          <div className="flex flex-col gap-2">
            <img src="/shoppass-logo.svg" alt="Shoppass" className="h-6 w-auto object-contain object-left" />
            <p className="text-body-md leading-[22px] text-text-secondary">
              © {new Date().getFullYear()} All Rights Reserved, Shoppass
            </p>
          </div>
        </div>

        {/* Right — two stacked cards */}
        <div className="flex flex-col gap-5 flex-[6]">

          {/* Got Questions card */}
          <div className="bg-bg-surface rounded-3xl p-8 flex flex-col gap-5">
            <p className="text-sub-heading leading-6 tracking-[-0.01em] text-text-primary">
              Got Questions?
            </p>
            <div className="flex items-center gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={ICON_LINK_CLASS}>
                <WhatsAppIcon size={20} />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={ICON_LINK_CLASS}>
                <InstagramIcon size={20} />
              </a>
              <a href={PHONE_URL} aria-label="Call us" className={ICON_LINK_CLASS}>
                <Phone size={20} />
              </a>
            </div>
            <p className="text-body-lg leading-6 tracking-[-0.01em] text-text-secondary">
              We're open for calls or messages from 8AM – 5PM daily.
            </p>
          </div>

          {/* About card */}
          <div className="bg-bg-surface rounded-3xl p-8 flex flex-col gap-5">
            <p className="text-body-lg leading-6 tracking-[-0.01em] text-text-secondary">
              Shoppass is your personal food shopper, taking the stress out of food shopping.
              Send us your list, and we'll pick fresh items directly from the market.
              Your order is then delivered straight to your door via trusted dispatch services like Uber.
            </p>
            <div className="flex items-center gap-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-md-bold text-text-primary underline underline-offset-4 hover:text-text-secondary transition-colors"
              >
                Whatsapp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-md-bold text-text-primary underline underline-offset-4 hover:text-text-secondary transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
