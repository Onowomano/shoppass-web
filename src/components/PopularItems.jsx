import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingBasket } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "../hooks/useProducts";

const ITEMS_PER_PAGE = 5;

const SkeletonCard = () => (
  <div className="flex flex-col gap-[15px] items-start w-[220px] shrink-0 animate-pulse">
    
    {/* Image skeleton */}
    <div className="bg-gray-200 h-[220px] w-full rounded-lg" />

    {/* Text skeleton */}
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-gray-200 h-4 w-3/4 rounded" />
      <div className="bg-gray-200 h-5 w-1/2 rounded" />
      <div className="bg-gray-200 h-4 w-2/3 rounded" />
    </div>
  </div>
)

export default function PopularItems() {
  const [startIndex, setStartIndex] = useState(0);
  const { products, loading, error } = useProducts();

  const canPrev = startIndex > 0;
  const canNext = startIndex + ITEMS_PER_PAGE < products.length;
  const visible = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section
      id="popular-items"
      className="bg-bg-surface flex flex-col gap-12 items-center px-4 py-12 lg:px-30 lg:py-16"
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-heading-sm lg:text-heading-md text-text-primary">
          Popular Items
        </h2>
        <div className="flex items-center justify-center size-[56px] lg:size-[72px] rounded-full border-[1.5px] border-border-primary">
          <ShoppingBasket size={32} className="text-icon-primary" />
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-between w-full">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {error && <p className="text-body-md text-text-tertiary">{error}</p>}

      {/* Carousel */}
      {!loading && !error && products.length > 0 && (
        <div className="flex flex-col gap-12 items-center w-full">

          {/* Mobile: horizontal scroll through all products */}
          <div className="flex lg:hidden gap-4 overflow-x-auto w-full pb-2 -mx-4 px-4 snap-x snap-mandatory">
            {products.map((product) => (
              <div key={product.id} className="snap-start shrink-0">
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* Desktop: paginated carousel */}
          <div className="hidden lg:flex items-center gap-20 w-full">
            {visible.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Prev / Next — desktop only */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setStartIndex((i) => i - 1)}
              disabled={!canPrev}
              aria-label="Previous items"
              className={[
                "flex items-center justify-center size-[50px] rounded-full border border-border-primary transition-colors",
                canPrev
                  ? "cursor-pointer hover:bg-bg-primary"
                  : "cursor-not-allowed opacity-40",
              ].join(" ")}
            >
              <ChevronLeft size={20} className="text-icon-primary" />
            </button>
            <button
              onClick={() => setStartIndex((i) => i + 1)}
              disabled={!canNext}
              aria-label="Next items"
              className={[
                "flex items-center justify-center size-[50px] rounded-full border border-border-primary transition-colors",
                canNext
                  ? "cursor-pointer hover:bg-bg-primary"
                  : "cursor-not-allowed opacity-40",
              ].join(" ")}
            >
              <ChevronRight size={20} className="text-icon-primary" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
