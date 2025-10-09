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
      <section>
        <HeroSection />
      </section>

      {/* News Section with slower scroll */}
      <section>
        <HomeNews />
      </section>

      {/* Event Section with parallax effect */}
      <section>
        <HomeEvent />
      </section>

      {/* Footer, fixed scroll speed */}
      <section>
        <Footer />
      </section>
    </>
  );
}
