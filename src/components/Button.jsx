/**
 * @param {{
 *   label?: string
 *   showLabel?: boolean
 *   leftIcon?: React.ReactNode
 *   rightIcon?: React.ReactNode
 *   size?: 'lg'
 *   type?: 'Filled' | 'Outline' | 'Transparent' | 'White'
 *   state?: 'Default' | 'Hover' | 'Disabled'
 *   onClick?: () => void
 *   className?: string
 * }} props
 *
 * @example
 * import { Plus, ArrowUpRight } from 'lucide-react'
 * <Button label="Get started" leftIcon={<Plus size={20} />} rightIcon={<ArrowUpRight size={20} />} />
 */
export default function Button({
  label = 'Label',
  showLabel = true,
  leftIcon = null,
  rightIcon = null,
  size = 'lg',
  type = 'Filled',
  state = 'Default',
  onClick,
  className,
}) {
  const isDisabled = state === 'Disabled'

  const bg =
    isDisabled && type !== 'Transparent'
      ? 'bg-bg-disabled'
      : type === 'Filled' && state === 'Hover'
      ? 'bg-bg-accent-orange-hover'
      : type === 'Filled'
      ? 'bg-bg-accent-orange'
      : type === 'White'
      ? 'bg-white'
      : type === 'Transparent' && (state === 'Hover' || isDisabled)
      ? 'bg-[rgba(255,242,230,0.02)]'
      : ''

  const border =
    type === 'Outline' && !isDisabled
      ? 'border border-border-primary'
      : type === 'Transparent'
      ? 'border border-border-on-solid'
      : ''

  // White + Outline active use dark colours; Filled/Transparent/Outline-disabled use on-solid (white)
  const isOnSolid = type === 'Filled' || type === 'Transparent' || (type === 'Outline' && isDisabled)
  const textColor = isOnSolid ? 'text-text-on-solid' : 'text-text-primary'
  const iconColor = isOnSolid ? 'text-icon-on-solid' : 'text-icon-primary'

  const hoverBg =
    !isDisabled && type === 'Filled'
      ? 'hover:bg-bg-accent-orange-hover'
      : !isDisabled && type === 'Transparent'
      ? 'hover:bg-[rgba(255,242,230,0.02)]'
      : !isDisabled && type === 'White'
      ? 'hover:bg-grey-100'
      : ''

  return (
    <button
      className={[
        'inline-flex gap-1 items-center justify-center px-5 py-3 rounded-full transition-colors',
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
        bg,
        hoverBg,
        border,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={isDisabled}
      onClick={onClick}
    >
      {leftIcon && (
        <span className={iconColor}>{leftIcon}</span>
      )}
      {showLabel && (
        <span
          className={[
            'text-body-lg-bold leading-6 tracking-[-0.01em] whitespace-nowrap',
            textColor,
          ].join(' ')}
        >
          {label}
        </span>
      )}
      {rightIcon && (
        <span className={iconColor}>{rightIcon}</span>
      )}
    </button>
  )
}
