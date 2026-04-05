import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PopularItems from "./components/PopularItems";
import HowItWorks from "./components/HowItWorks";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ShoppingListSheet from "./components/shopping/ShoppingListSheet";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

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
          <Navbar variant={scrolled ? "filled" : "transparent"} onOpenSheet={() => setSheetOpen(true)} />
        </div>
        <Hero onOpenSheet={() => setSheetOpen(true)} />
      </div>

      <PopularItems />
      <HowItWorks />
      <Reviews />
      <FAQ />
      <Footer />

      <ShoppingListSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} />

      <ToastContainer
        position="bottom-center"
        hideProgressBar
        closeOnClick={false}
        pauseOnHover
        toastClassName="!rounded-2xl !shadow-md !bg-bg-surface !p-4 !min-h-0"
        bodyClassName="!p-0 !m-0"
      />
    </>
  );
}

export default App;
