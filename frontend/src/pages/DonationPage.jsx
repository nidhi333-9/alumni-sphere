import React from 'react'
import Donations from '../component/Donations'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

export default function DonationPage() {
  return (
    <div>
      <Navbar />
      
      <section data-scroll data-scroll-speed="1">
        <Donations />
      </section>
      
      <section data-scroll data-scroll-speed="1">
        <Footer />
      </section>
    </div>
  )
}
