import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

/**
 * @param {{
 *   question: string
 *   answer: string
 *   defaultOpen?: boolean
 * }} props
 */
export default function FAQItem({ question, answer, defaultOpen = false, className = '' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div
      className={`border-b border-border-primary py-6 px-6 cursor-pointer group ${className}`}
      onClick={() => setIsOpen(o => !o)}
      role="button"
      aria-expanded={isOpen}
    >

      {/* Question row */}
      <div className="flex items-center justify-between w-full gap-6">
        <span className="text-sub-heading leading-6 tracking-[-0.01em] text-text-primary group-hover:text-text-secondary transition-colors">
          {question}
        </span>
        <span className="flex items-center justify-center size-8 rounded-full border border-border-primary shrink-0 text-icon-primary transition-colors group-hover:bg-bg-primary">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </div>

      {/* Answer — animates via grid-rows transition */}
      <div
        className={[
          'grid transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        ].join(' ')}
      >
        <div className="overflow-hidden">
          <p className="text-body-lg leading-6 tracking-[-0.01em] text-text-secondary pt-3">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}
