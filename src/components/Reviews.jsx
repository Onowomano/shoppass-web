import { useState } from 'react'
import ReviewCard from './ReviewCard'

// Dummy data — replace with real reviews when available
const REVIEWS = [
  {
    id: 1,
    name: 'Ms. Gbemisola, Ogba',
    review:
      "The peppers Shoppass got for me felt like a steal, I thought I be throwing a party with what I got at that price. I'm definitely going to patronize Shoppass again. It was worth it and I would refer them anytime.",
    image: 'https://framerusercontent.com/images/Mjo2HmsPaRupczd7dg6UCriyac.jpeg',
  },
  {
    id: 2,
    name: 'Mr. Abbey, Bariga',
    review:
      'I tried Shoppass for the first time and was really impressed. Everything came fresh and exactly as I listed it. Definitely using them again.',
    image: 'https://framerusercontent.com/images/07kuwlXIYtkohfbhGPwgbV69Fl0.jpeg',
  },
  {
    id: 3,
    name: 'Mr. Mano, Yaba',
    review:
      'Shoppass is a game changer for busy people like me. I just send my list and get my food without leaving home. Reliable, fast, and super convenient.',
    image: 'https://framerusercontent.com/images/fJqBoieYiHIJaK4JDI2PRHXosxo.png?scale-down-to=1024',
  },
]



export default function Reviews() {
  const [index, setIndex] = useState(0)

  const current = REVIEWS[index]
  const canPrev = index > 0
  const canNext = index < REVIEWS.length - 1

  return (
    <section className="bg-bg-static flex flex-col gap-12 items-center px-4 py-12 lg:px-8 lg:py-20">
      <h2 className="text-heading-sm lg:text-heading-md text-text-tertiary text-center">
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
