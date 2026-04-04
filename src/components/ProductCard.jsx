import { useState } from 'react'

/**
 * @param {{
 *   name: string
 *   image: string
 *   variant: string
 *   price: string
 *   lastUpdated: string
 * }} props
 *
 * Data will come from a Google Sheet. Pass image as a URL string.
 */

export default function ProductCard({ name, image, variant, price, lastUpdated }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div className="flex flex-col gap-[15px] items-start w-[220px] shrink-0">

      {/* Image */}
      <div className="bg-bg-primary h-[220px] w-full rounded-lg overflow-hidden relative shrink-0">
        {/* Skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
        )}
        <div className="absolute inset-[10px]">
          <img
            src={image}
            alt={`${variant} of ${name}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`size-full object-contain transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-col gap-[3px] w-full">
          <p className="text-body-md leading-[22px] text-text-secondary">
            {variant} of {name}
          </p>
          <p className="text-heading-xs leading-[28px] tracking-[-0.02em] text-text-primary">
            {price}
          </p>
        </div>
        <p className="text-body-md leading-[22px] text-text-tertiary">
          Last changed {lastUpdated}
        </p>
      </div>
    </div>
  )
}
