import Button from "./Button";
import FAQItem from "./FAQItem";
import WhatsAppIcon from "./WhatsAppIcon";

const FAQS = [
  {
    question: "What kind of food stuff do you buy?",
    answer:
      "Any food item. From a paint of tomato and peppers, potatoes, tubers of yams, paint of onions, garlic, ginger and many more. Just ask and we'd get it to you.",
  },
  {
    question: "What markets do you go to?",
    answer: "We shop from Ketu and Mile 12 markets mostly.",
  },
  {
    question: "How much is your service fee?",
    answer:
      "We go to the market on Tuesdays and Thursdays for a flat service fee of ₦2,500. If you need us to shop on any other day, the service fee ranges from ₦5,000 to ₦10,000, depending on the length of your list. Delivery fee is charged separately.",
  },
  {
    question: "Why do you charge a service fee?",
    answer:
      "We don't inflate the price of items, we make money by charging you an affordable service fee.",
  },
  {
    question: "Do you do deliveries?",
    answer:
      "Yes! We use trusted delivery services like Uber, and you only pay the delivery cost. Prefer a different dispatch service? We're happy to use the one you choose.",
  },
];

const WHATSAPP_URL = "http://wa.me/2348080828181";

export default function FAQ() {
  return (
    <section
      id="faqs"
      className="bg-bg-surface flex flex-row justify-center px-8 py-20"
    >

      <div className="flex flex-row justify-between max-w-[1300]">

        {/* Left — heading + subtitle + CTA */}
      <div className="flex flex-col flex-1 gap-8 items-start sticky top-24 max-w-[460px]">
        <div className="flex flex-col gap-2">
          <h2 className="text-heading-md leading-[48px] tracking-[-0.01em] text-text-primary mb-2">
            Frequently
            <br />
            Asked Questions
          </h2>
          <p className="text-body-lg leading-6 tracking-[-0.01em] text-text-secondary">
            If you have more questions feel free to talk to us on <br />{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-body-lg underline pr-1"
            >
              0808 082 8181
            </a>
            within 8AM – 5PM
          </p>
        </div>

        <Button
          label="Talk to us"
          leftIcon={<WhatsAppIcon size={20} />}
          type="Filled"
          onClick={() =>
            window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
          }
        />
      </div>

      {/* Right — FAQ list */}
      <div className="flex-1 max-w-[600px] outline outline-border-primary outside rounded-xl overflow-hidden">
        {FAQS.map((faq, i) => (
          <FAQItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            defaultOpen={i === 0}
          />
        ))}
      </div>

      </div>
      
    </section>
  );
}
