import React from 'react'
import PostForm from '../component/PostForm'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

export default function CreatePost() {
  return (
    <>
      <Navbar />

      <section data-scroll data-scroll-speed="1">
        <PostForm />
      </section>

      <section data-scroll data-scroll-speed="1">
        <Footer />
      </section>
    </>
  )
}
