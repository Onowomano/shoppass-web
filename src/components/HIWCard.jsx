/**
 * @param {{
 *   icon: React.ReactNode
 *   title: string
 *   description: string
 * }} props
 */
export default function HIWCard({ icon, title, description }) {
  return (
    <div className="bg-bg-surface flex flex-1 flex-col items-start justify-between min-h-[320px] p-6 rounded-3xl">

      {/* Icon */}
      <div className="flex items-center justify-center size-14 rounded-full border border-border-primary shrink-0 text-icon-primary">
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 w-full">
        <p className="text-sub-heading leading-6 tracking-[-0.01em] text-text-primary">
          {title}
        </p>
        <p className="text-body-lg leading-6 tracking-[-0.01em] text-text-secondary">
          {description}
        </p>
      </div>
    </div>
  )
}
