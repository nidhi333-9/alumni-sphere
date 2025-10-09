import React from "react";
import Navbar from "../component/Navbar";
import HeroSection from "../component/HeroSection";
import HomeNews from "../component/HomeNews";
import HomeEvent from "../component/HomeEvent";
import Footer from "../component/Footer";

export default function Homepage() {
  return (
    <>
      <Navbar />

      {/* Hero Section with scroll animation */}
      <section data-scroll data-scroll-speed="1" className="relative z-10">
        <HeroSection />
      </section>

      {/* News Section with slower scroll */}
      <section
        data-scroll
        data-scroll-speed="0.5"
        data-scroll-direction="vertical"
        className="py-10"
      >
        <HomeNews />
      </section>

      {/* Event Section with parallax effect */}
      <section
        data-scroll
        data-scroll-speed="1.5"
        data-scroll-direction="vertical"
        className="py-10"
      >
        <HomeEvent />
      </section>

      {/* Footer, fixed scroll speed */}
      <section data-scroll data-scroll-speed="1" className="mt-16">
        <Footer />
      </section>
    </>
  );
}