import React from 'react'
import PostForm from '../component/PostForm'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

export default function CreatePost() {
  return (
    <>
      <Navbar />

      <section >
        <PostForm />
      </section>

      <section >
        <Footer />
      </section>
    </>
  )
}
