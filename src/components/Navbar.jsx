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
export default function Navbar({ variant = 'transparent' }) {
  const isFilled = variant === 'filled'

  return (
    <nav
      className={[
        'w-full relative flex items-center justify-between px-30 py-5',
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

      {/* Nav links — absolutely centred in the bar */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className={[
              'flex items-center justify-center px-2.5 py-2.5',
              'text-body-md-bold tracking-[-0.03em] whitespace-nowrap',
              'transition-opacity hover:opacity-70',
              isFilled ? 'text-text-primary' : 'text-white',
            ].join(' ')}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Instagram — icon-only pill */}
        <Button
          showLabel={false}
          leftIcon={<InstagramIcon size={20} />}
          type={isFilled ? 'Outline' : 'Transparent'}
          onClick={() => window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer')}
          aria-label="Follow us on Instagram"
        />

        {/* WhatsApp — Talk to us */}
        <Button
          label="Talk to us"
          leftIcon={<WhatsAppIcon size={20} />}
          type={isFilled ? 'Filled' : 'Transparent'}
          onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}
        />
      </div>
    </nav>
  )
}
