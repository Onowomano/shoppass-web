import { Minus, Plus } from 'lucide-react'

/**
 * @param {{
 *   value: number
 *   onChange: (value: number) => void
 *   min?: number
 * }} props
 */
export default function Stepper({ value, onChange, min = 1 }) {
  const canDecrement = value > min

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={() => canDecrement && onChange(value - 1)}
        disabled={!canDecrement}
        aria-label="Decrease quantity"
        className={[
          'flex items-center justify-center size-8 rounded-full border transition-colors',
          canDecrement
            ? 'border-border-primary text-icon-primary hover:bg-bg-primary cursor-pointer'
            : 'border-border-primary text-icon-disabled cursor-not-allowed opacity-40',
        ].join(' ')}
      >
        <Minus size={14} />
      </button>

      <span className="text-body-lg-bold text-text-primary min-w-[20px] text-center">
        {value}
      </span>

      <button
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className="flex items-center justify-center size-8 rounded-full border border-border-primary text-icon-primary hover:bg-bg-primary cursor-pointer transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
