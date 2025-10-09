import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import FeedSection from '../component/FeedSection'

export default function Feed() {
  return (
    <>
      <Navbar />
      <FeedSection data-scroll data-scroll-speed="1" />
      <Footer data-scroll data-scroll-speed="1" />
    </>
  )
}
