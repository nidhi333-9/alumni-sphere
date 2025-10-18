import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function EventSection() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/events-api");
        const data = await res.json();
        console.log("Fetched events:", data);
        if (Array.isArray(data)) {
          data.sort((a, b) => new Date(a.Event_Date) - new Date(b.Event_Date));
          setEvents(data);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900">Upcoming Alumni Events</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Stay connected through reunions, conferences, and networking opportunities.
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            navigation
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 2,
              slideShadows: false,
            }}
            className="pb-12"
          >
            {events.length > 0 ? (
              events.map((event, index) => (
                <SwiperSlide key={index} className="!w-[350px] sm:!w-[400px] lg:!w-[480px]">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img
                      src={event.Event_Image}
                      alt={event.Event_Name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {event.Event_Name}
                      </h3>
                      <p className="text-sm text-amber-700 font-medium mb-2">
                        {new Date(event.Event_Date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {event.Event_Description}
                      </p>
                      <a
                        href={event.Event_Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center py-2 rounded-full bg-amber-600 text-white font-medium shadow-md hover:bg-amber-700 transition"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="text-center py-10 text-gray-500">Loading events...</div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </section>
      <Footer />
    </>
  );
}
