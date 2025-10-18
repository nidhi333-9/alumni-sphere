import AlumniList from "../component/AlumniList";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
const Directory = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 pt-20 px-6">
        <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center">
          Alumni Directory
        </h1>
        <p className="text-gray-600 text-center mb-10">
          
          Explore and connect with alumni across different years and fields.
        </p>

        <AlumniList data-scroll data-scroll-speed="1.5" />
      </section>
      <Footer data-scroll data-scroll-speed="2" />
    </>
  );
};
export default Directory;
