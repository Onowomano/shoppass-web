import { Phone } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import WhatsAppIcon from "./WhatsAppIcon";

const WHATSAPP_URL = "http://wa.me/2348080828181";
const INSTAGRAM_URL = "https://instagram.com/shoppass1";
const PHONE_URL = "tel:2349032385225";

const ICON_LINK_CLASS = [
  "flex items-center justify-center size-12 rounded-full",
  "border border-border-primary text-icon-primary bg-bg-surface",
  "hover:bg-bg-primary transition-colors cursor-pointer shrink-0",
].join(" ");

const ShoppassMark = (
  <svg
    width="880"
    height="636"
    viewBox="0 0 880 636"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M862.027 -46.3798C885.653 -22.7541 885.653 15.5507 862.027 39.1764L445.326 455.877C413.239 487.965 361.214 487.965 329.127 455.877L202.271 329.021C178.645 305.396 178.645 267.091 202.271 243.465C225.897 219.839 264.202 219.839 287.827 243.465L370.933 326.571C379.932 335.569 394.521 335.569 403.52 326.571L776.471 -46.3798C800.096 -70.0055 838.401 -70.0055 862.027 -46.3798Z"
      fill="#FF8B22"
    />
    <path
      d="M376.874 -53.4126C455.298 -53.4126 528.126 -29.4589 588.443 11.5311C617.651 31.3802 617.81 72.4991 592.84 97.4701C568.682 121.627 529.952 121.305 500.201 104.512C463.77 83.947 421.692 72.2121 376.874 72.2121C238.113 72.2121 125.625 184.7 125.625 323.461C125.625 462.223 238.113 574.711 376.874 574.711C505.175 574.711 611.015 478.543 626.243 354.358C628.652 334.707 636.096 315.656 650.243 301.806L659.201 293.036C694.395 258.58 753.748 274.209 753.748 323.461C753.748 531.603 585.016 700.336 376.874 700.336C168.732 700.336 0 531.603 0 323.461C0 115.32 168.732 -53.4126 376.874 -53.4126Z"
      fill="#FF8B22"
    />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-bg-accent-orange px-4 py-10 lg:px-12 lg:py-14 overflow-hidden">
      {/* Background watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
       {ShoppassMark}

      </div>

      {/* Cards */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-5 max-w-[1200px] mx-auto">
        {/* Left — brand card */}
        <div className="bg-bg-surface rounded-3xl p-10 flex flex-col justify-between gap-16 lg:flex-[4]">
          <h2 className="text-heading-sm lg:text-heading-md text-text-primary">
            Na We
            <br />
            Shoppass!
          </h2>
          <div className="flex flex-col gap-4">
            <img
              src="/shoppass-logo.svg"
              alt="Shoppass"
              loading="lazy"
              className="h-6 w-auto object-contain object-left"
            />
            <p className="text-body-md leading-[22px] text-text-secondary">
              © {new Date().getFullYear()} All Rights Reserved, Shoppass
            </p>
          </div>
        </div>

        {/* Right — two stacked cards */}
        <div className="flex flex-col gap-5 lg:flex-[6]">
          {/* Got Questions card */}
          <div className="bg-bg-surface rounded-3xl p-8 flex flex-col gap-5">
            <p className="text-heading-sm leading-6 tracking-[-0.01em] text-text-primary">
              Got Questions?
            </p>
            <div className="flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={ICON_LINK_CLASS}
              >
                <WhatsAppIcon size={20} />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={ICON_LINK_CLASS}
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={PHONE_URL}
                aria-label="Call us"
                className={ICON_LINK_CLASS}
              >
                <Phone size={20} />
              </a>
            </div>
            <p className="text-body-lg leading-6 tracking-[-0.01em] text-text-secondary">
              We're open for calls or messages from 8AM – 5PM daily.
            </p>
          </div>

          {/* About card */}
          <div className="bg-bg-surface rounded-3xl p-8 flex flex-col gap-5">
            <p className="text-body-lg leading-6 tracking-[-0.01em] text-text-secondary">
              Shoppass is your personal food shopper, taking the stress out of
              food shopping. Send us your list, and we'll pick fresh items
              directly from the market. Your order is then delivered straight to
              your door via trusted dispatch services like Uber.
            </p>
            <div className="flex items-center gap-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-md-bold text-text-primary underline underline-offset-4 hover:text-text-secondary transition-colors"
              >
                Whatsapp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-md-bold text-text-primary underline underline-offset-4 hover:text-text-secondary transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
