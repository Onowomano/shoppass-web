import { useState } from 'react'
import ReviewCard from './ReviewCard'

// Dummy data — replace with real reviews when available
const REVIEWS = [
  {
    id: 1,
    name: 'Mr. Abbey, Bariga',
    review:
      "Shoppass is very quick and reliable. I've been using them for 1 year now and they have never disappointed me.",
    image: 'https://placehold.co/480x480/faf9f9/a19e99?text=Photo',
  },
  {
    id: 2,
    name: 'Mrs. Adaeze, Surulere',
    review:
      'I was sceptical at first but they delivered everything exactly as I listed. Fresh tomatoes, good onions — no shortcuts. Will keep using them!',
    image: 'https://placehold.co/480x480/faf9f9/a19e99?text=Photo',
  },
  {
    id: 3,
    name: 'Chidi O., Yaba',
    review:
      'The Tuesday market price is a steal. I send my list on Monday night and everything is at my door by afternoon. Highly recommend.',
    image: 'https://placehold.co/480x480/faf9f9/a19e99?text=Photo',
  },
]



export default function Reviews() {
  const [index, setIndex] = useState(0)

  const current = REVIEWS[index]
  const canPrev = index > 0
  const canNext = index < REVIEWS.length - 1

  return (
    <section className="bg-bg-static flex flex-col gap-12 items-center px-8 py-20">
      <h2 className="text-heading-md leading-[48px] tracking-[-0.01em] text-text-tertiary text-center">
        What our customers say...
      </h2>

      <ReviewCard
        key={current.id}
        name={current.name}
        review={current.review}
        image={current.image}
        canPrev={canPrev}
        canNext={canNext}
        onPrev={() => setIndex(i => i - 1)}
        onNext={() => setIndex(i => i + 1)}
      />
    </section>
  )
}
