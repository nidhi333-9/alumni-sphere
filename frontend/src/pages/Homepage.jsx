import React from "react";
import Navbar from "../component/Navbar";
import HeroSection from "../component/HeroSection";
import HomeNews from "../component/HomeNews";
import HomeEvent from "../component/HomeEvent";
import Footer from "../component/Footer";

export default function Homepage() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <HomeNews></HomeNews>
      <HomeEvent />
      {/* <Footer/> */}
    </>
  );
}
