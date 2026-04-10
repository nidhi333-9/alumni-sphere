import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Jobs from '../components/jobs/Jobs';
export default function JobsPage() {
  return (
    <div>
      <Navbar />
      <Jobs />
      <Footer />
    </div>
  )
}
