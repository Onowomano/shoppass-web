import { X } from 'lucide-react'
import { useEffect } from 'react'

/**
 * @param {{
 *   isOpen: boolean
 *   onClose: () => void
 *   title?: string
 *   children: React.ReactNode
 * }} props
 */
export default function SideSheet({ isOpen, onClose, title, children }) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={[
          'fixed inset-0 z-[200] bg-bg-overlay transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden="true"
      />

      {/* Panel — full screen on mobile, side sheet on lg+ */}
      <div
        className={[
          'fixed inset-0 lg:inset-auto lg:right-0 lg:top-0 lg:bottom-0 lg:w-[520px]',
          'z-[201] bg-bg-surface flex flex-col',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-primary shrink-0">
          <p className="text-sub-heading text-text-primary">{title}</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center size-9 rounded-full hover:bg-bg-primary transition-colors cursor-pointer text-icon-primary"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  )
}
