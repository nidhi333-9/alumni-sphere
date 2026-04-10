import React from 'react'
import PostForm from '../components/feed/PostForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

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
