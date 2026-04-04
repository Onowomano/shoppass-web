import { FilePen, MessageCircle, Truck } from 'lucide-react'
import HIWCard from './HIWCard'

const STEPS = [
  {
    icon: <FilePen size={24} />,
    title: 'Make Your List',
    description:
      'Write out the food items you want us to buy, anything from rice and oil to tomatoes and pepper. No item is too small.',
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'Send It To Us',
    description:
      "If you're shopping on Tuesday or Thursday, the service fee is a flat ₦2,500. For other days, the fee ranges from ₦5,000–₦10,000, depending on your list.",
  },
  {
    icon: <Truck size={24} />,
    title: "We'll Shop and Dispatch",
    description:
      'We do the market runs and send it your way with a trusted dispatch rider like Uber. You just pay our fee and the delivery.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-bg-accent-blue-light flex flex-col gap-10 items-start px-4 py-12 lg:px-30 lg:py-25">
      <h2 className="text-heading-sm lg:text-heading-md text-text-primary w-full">
        How This Works
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {STEPS.map(step => (
          <HIWCard key={step.title} {...step} />
        ))}
      </div>
    </section>
  )
}
