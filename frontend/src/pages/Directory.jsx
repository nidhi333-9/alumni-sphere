import AlumniList from "../component/AlumniList";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
const Directory = () => {
  return (
    <>
    <Navbar />
      {/* Page Wrapper with Background Gradient */}
      <section className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 pt-20 px-6">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center">
          Alumni Directory
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Explore and connect with alumni across different years and fields.
        </p>

        {/* Alumni List */}
        <AlumniList />
      </section>
      <Footer />
    </>
  );
};

export default Directory;
