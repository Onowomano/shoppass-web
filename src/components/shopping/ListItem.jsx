import { Trash2 } from 'lucide-react'
import Stepper from './Stepper'

/**
 * @param {{
 *   name: string
 *   variant?: string
 *   price?: string
 *   qty: number
 *   onQtyChange: (qty: number) => void
 *   onDelete: () => void
 * }} props
 */
export default function ListItem({ name, variant, price, qty, onQtyChange, onDelete }) {
  return (
    <div className="flex items-center gap-3 py-4 border-b border-border-primary last:border-b-0">

      {/* Name + variant */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-body-lg-bold text-text-primary truncate">{name}</p>
        {variant && (
          <p className="text-body-md text-text-secondary">{variant}</p>
        )}
      </div>

      {/* Stepper */}
      <Stepper value={qty} onChange={onQtyChange} />

      {/* Price */}
      <div className="text-body-lg-bold text-text-primary min-w-[72px] text-right shrink-0">
        {price ? (
          qty > 1 ? (
            <span>{multiplyPrice(price, qty)}</span>
          ) : (
            <span>{price}</span>
          )
        ) : (
          <span className="text-text-tertiary">TBD</span>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={onDelete}
        aria-label={`Remove ${name}`}
        className="flex items-center justify-center size-8 rounded-full text-icon-primary hover:bg-bg-primary hover:text-icon-error transition-colors cursor-pointer shrink-0"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

/** Multiplies a formatted price string (e.g. "₦6,000") by qty */
function multiplyPrice(price, qty) {
  const raw = parseInt(price.replace(/[^\d]/g, ''), 10)
  if (isNaN(raw)) return price
  const total = raw * qty
  return '₦' + total.toLocaleString('en-NG')
}
