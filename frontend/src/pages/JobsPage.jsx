import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Jobs from '../component/Jobs';
export default function JobsPage() {
  return (
    <div>
      <Navbar/>
        <Jobs/>
        <Footer/>
    </div>
  )
}
