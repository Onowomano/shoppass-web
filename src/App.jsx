import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PopularItems from "./components/PopularItems";
import HowItWorks from "./components/HowItWorks";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {

   const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hero with transparent navbar overlaid */}
      <div className="relative">
        <div className="fixed top-0 inset-x-0 z-50">
          <Navbar variant={scrolled ? "filled" : "transparent"} />
        </div>
        <Hero />
      </div>

      <PopularItems />
      <HowItWorks />
      <Reviews />
      <FAQ />
      <Footer />
    </>
  );
}

export default App;
