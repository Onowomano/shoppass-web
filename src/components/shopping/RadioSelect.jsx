import { CircleX } from 'lucide-react'

/**
 * Chip-style radio select. Clicking a selected chip deselects it.
 *
 * @param {{
 *   label: string
 *   selected: boolean
 *   onSelect: () => void
 *   onClear: () => void
 * }} props
 */
export default function RadioSelect({ label, selected, onSelect, onClear }) {
  const handleClick = () => {
    if (selected) onClear()
    else onSelect()
  }

  return (
    <button
      onClick={handleClick}
      className={[
        'inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-body-md-bold transition-colors cursor-pointer shrink-0',
        selected
          ? 'bg-bg-static border-bg-static text-text-on-solid'
          : 'bg-bg-surface border-border-primary text-text-primary hover:bg-bg-primary',
      ].join(' ')}
    >
      <span>{label}</span>
      {selected && <CircleX size={16} className="text-icon-on-solid shrink-0" />}
    </button>
  )
}
