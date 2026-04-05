import { CircleX, Search } from 'lucide-react'
import { useState } from 'react'

/**
 * @param {{
 *   value: string
 *   onChange: (value: string) => void
 *   placeholder?: string
 * }} props
 */
export default function SearchInput({ value, onChange, placeholder = 'Search for an item...' }) {
  const [focused, setFocused] = useState(false)

  return (
    <div
      className={[
        'flex items-center gap-3 w-full px-4 py-3 rounded-2xl border bg-bg-surface transition-colors',
        focused ? 'border-border-focused' : 'border-border-primary',
      ].join(' ')}
    >
      <Search size={20} className="text-icon-primary shrink-0" />

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-body-lg text-text-primary placeholder:text-text-tertiary outline-none"
      />

      {value.length > 0 && (
        <button
          onClick={() => onChange('')}
          className="shrink-0 text-icon-primary hover:text-icon-secondary transition-colors cursor-pointer"
          aria-label="Clear search"
          tabIndex={-1}
        >
          <CircleX size={20} />
        </button>
      )}
    </div>
  )
}
