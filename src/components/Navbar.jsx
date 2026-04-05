import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Button from './Button'
import InstagramIcon from './InstagramIcon'
import ShoppassLogo from './ShoppassLogo'
import WhatsAppIcon from './WhatsAppIcon'

const NAV_LINKS = [
  { label: 'Popular items', href: '#popular-items' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQs', href: '#faqs' },
]

const INSTAGRAM_URL = 'https://instagram.com/shoppass1'
const WHATSAPP_URL = 'http://wa.me/2348080828181'

/**
 * @param {{ variant?: 'transparent' | 'filled' }} props
 *
 * transparent — no background, white text (for use over dark/image hero sections)
 * filled      — white background, dark text, orange CTA
 */
export default function Navbar({ variant = 'transparent', onOpenSheet }) {
  const isFilled = variant === 'filled'
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav
        className={[
          'w-full relative flex items-center justify-between px-4 lg:px-30 py-5',
          'border-b border-border-on-solid',
          isFilled ? 'bg-bg-surface' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Logo */}
        <a href="/" aria-label="Shoppass home" className="shrink-0">
          <ShoppassLogo className={isFilled ? 'text-icon-accent-orange' : 'text-icon-on-solid'} />
        </a>

        {/* Nav links — hidden on mobile, absolutely centred on desktop */}
        <div className="hidden lg:absolute lg:flex left-1/2 -translate-x-1/2 items-center gap-3">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={[
                'flex items-center justify-center px-2.5 py-2.5',
                'text-body-lg whitespace-nowrap',
                'transition-opacity hover:opacity-70',
                isFilled ? 'text-text-primary' : 'text-white',
              ].join(' ')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Button
            showLabel={false}
            leftIcon={<InstagramIcon size={20} />}
            type={isFilled ? 'Outline' : 'Transparent'}
            onClick={() => window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer')}
            aria-label="Follow us on Instagram"
          />
          <Button
            label="Talk to us"
            leftIcon={<WhatsAppIcon size={20} />}
            type={isFilled ? 'Outline' : 'Transparent'}
            onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}
          />
          <Button
            label="Send Shopping List"
            type="Filled"
            onClick={onOpenSheet}
          />
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex items-center justify-center size-10 rounded-full transition-colors hover:bg-white/10 cursor-pointer"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen
            ? <X size={24} className={isFilled ? 'text-text-primary' : 'text-white'} />
            : <Menu size={24} className={isFilled ? 'text-text-primary' : 'text-white'} />
          }
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className={[
            'lg:hidden flex flex-col gap-1 px-4 py-4 border-b border-border-on-solid',
            isFilled ? 'bg-bg-surface' : 'bg-black/85 backdrop-blur-sm',
          ].join(' ')}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={[
                'flex items-center px-2 py-3',
                'text-body-lg]',
                'transition-opacity hover:opacity-70',
                isFilled ? 'text-text-primary' : 'text-white',
              ].join(' ')}
            >
              {label}
            </a>
          ))}
          <div className="flex flex-wrap items-center gap-2 pt-3">
            <Button
              showLabel={false}
              leftIcon={<InstagramIcon size={20} />}
              type={isFilled ? 'Outline' : 'Transparent'}
              onClick={() => { window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer'); setMenuOpen(false) }}
              aria-label="Follow us on Instagram"
            />
            <Button
              label="Talk to us"
              leftIcon={<WhatsAppIcon size={20} />}
              type={isFilled ? 'Outline' : 'Transparent'}
              onClick={() => { window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer'); setMenuOpen(false) }}
            />
            <Button
              label="Send Shopping List"
              type="Filled"
              onClick={() => { onOpenSheet(); setMenuOpen(false) }}
            />
          </div>
        </div>
      )}
    </>
  )
}
