import React, { useState, useEffect } from "react";
import Cta from "./components/Cta";
import Faq from "./components/Faq";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Welcome from "./components/Welcome";
import PortfolioCardStack from "./components/PortfolioCardStack";

// Optional: Loading component for better UX
const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#E5F0FE] z-50">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-700 font-medium">
        Loading amazing things...
      </p>
    </div>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  // Simulate loading time and handle initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Set active section based on scroll position for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.getAttribute("id"));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation - fixed at the top */}
      <header className="md:sticky top-0 z-40 bg-[#E5F0FE] shadow-sm">
        <Nav activeSection={activeSection} onNavClick={scrollToSection} />
      </header>

      <main className="flex-grow">
        {/* Welcome/Hero Section */}
        <section id="welcome" className="relative overflow-hidden">
          <Welcome />
        </section>

        {/* Features Section */}
        <section id="features" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-[#E5F0FE] -z-10"></div>
          <Features />
        </section>

        {/* Portfolio Section */}
        <section
          id="portfolio"
          className="relative"
          style={{
            overflow: "hidden",
            // We're removing the fixed height to let GSAP control the height
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
          <PortfolioCardStack />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="relative bg-[#E5F0FE]">
          <Testimonials />
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative">
          <Pricing />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative bg-[#E5F0FE]">
          <Faq />
        </section>

        {/* CTA Section */}
        <section id="contact" className="relative">
          <Cta />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <Footer />
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors z-30"
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default App;
