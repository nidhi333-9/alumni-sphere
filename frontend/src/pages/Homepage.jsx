import React from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/alumni/HeroSection";
import HomeNews from "../components/news/HomeNews";
import HomeEvent from "../components/events/HomeEvent";
import Footer from "../components/layout/Footer";

export default function Homepage() {
  return (
    <>
      <Navbar />

      <section>
        <HeroSection />
      </section>

      <section>
        <HomeNews />
      </section>

      <section>
        <HomeEvent />
      </section>

      <section>
        <Footer />
      </section>
    </>
  );
}
