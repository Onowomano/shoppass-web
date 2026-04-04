import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * @param {{
 *   name: string
 *   review: string
 *   image: string
 *   onPrev: () => void
 *   onNext: () => void
 *   canPrev: boolean
 *   canNext: boolean
 * }} props
 */

const QuoteIcon = (
  <svg
    width="36"
    height="27"
    viewBox="0 0 36 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 26.8C6.33333 26.8 4.16667 25.7 2.5 23.5C0.833333 21.3 0 18.5667 0 15.3C0 10.5 1.43333 6.76667 4.3 4.1C7.16667 1.43333 11.1 0.0666658 16.1 0V5.8C13.1667 5.86667 10.9667 6.63333 9.5 8.1C8.03333 9.56667 7.3 11.3 7.3 13.3C7.3 13.9 7.33333 14.3333 7.4 14.6C8.26667 13.9333 9.36667 13.6 10.7 13.6C12.4333 13.6 13.8333 14.1667 14.9 15.3C16.0333 16.3667 16.6 17.9333 16.6 20C16.6 21.9333 15.9 23.5667 14.5 24.9C13.1 26.1667 11.2667 26.8 9 26.8ZM28.2 26.8C25.5333 26.8 23.3667 25.7 21.7 23.5C20.0333 21.3 19.2 18.5667 19.2 15.3C19.2 10.5 20.6333 6.76667 23.5 4.1C26.3667 1.43333 30.3 0.0666658 35.3 0V5.8C32.3667 5.86667 30.1667 6.63333 28.7 8.1C27.2333 9.56667 26.5 11.3 26.5 13.3C26.5 13.9 26.5333 14.3333 26.6 14.6C27.4667 13.9333 28.5667 13.6 29.9 13.6C31.6333 13.6 33.0333 14.1667 34.1 15.3C35.2333 16.3667 35.8 17.9333 35.8 20C35.8 21.9333 35.1 23.5667 33.7 24.9C32.3 26.1667 30.4667 26.8 28.2 26.8Z"
      fill="#FF7900"
    />
  </svg>
);

export default function ReviewCard({ name, review, image, onPrev, onNext, canPrev, canNext }) {
  return (
    <div className="bg-bg-surface flex flex-col lg:flex-row items-start justify-between w-full max-w-[1300px] lg:h-[560px] p-6 lg:p-10 rounded-2xl lg:rounded-[40px] gap-8 lg:gap-0">

      {/* Left — quote, review text, name, nav */}
      <div className="flex flex-col justify-between self-stretch w-full lg:w-[500px] lg:shrink-0">

        <div className="flex flex-col gap-8">
          {/* Quote mark */}
          {QuoteIcon}

          {/* Review */}
          <p className="text-heading-sm text-text-primary">
            {review}
          </p>

          {/* Name */}
          <p className="text-sub-heading text-text-primary">
            {name}
          </p>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-3">
          <button
            onClick={onPrev}
            disabled={!canPrev}
            aria-label="Previous review"
            className={[
              'flex items-center justify-center size-[50px] rounded-full border border-border-primary bg-white transition-colors',
              canPrev ? 'cursor-pointer hover:bg-bg-primary' : 'cursor-not-allowed opacity-40',
            ].join(' ')}
          >
            <ChevronLeft size={20} className="text-icon-primary" />
          </button>
          <button
            onClick={onNext}
            disabled={!canNext}
            aria-label="Next review"
            className={[
              'flex items-center justify-center size-[50px] rounded-full border border-border-primary bg-white transition-colors',
              canNext ? 'cursor-pointer hover:bg-bg-primary' : 'cursor-not-allowed opacity-40',
            ].join(' ')}
          >
            <ChevronRight size={20} className="text-icon-primary" />
          </button>
        </div>
      </div>

      {/* Right — image */}
      <div className="w-full aspect-square lg:size-[480px] lg:shrink-0 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={`Photo of ${name}`}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
    </div>
  )
}
