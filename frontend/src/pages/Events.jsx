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
        const res = await fetch("http://localhost:5000/events-api"); // fetch all events
        const data = await res.json();
        // optional: sort by Event_Date ascending
        console.log("Fetched events:", data);
        data.sort((a, b) => new Date(a.Event_Date) - new Date(b.Event_Date));
        setEvents(data);
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
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900">
              Upcoming Alumni Events
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Stay connected through reunions, conferences, and networking opportunities. Swipe through to explore all upcoming events!
            </p>
          </div>

          {/* Swiper for all events */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{ delay: 4000 }}
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 150, modifier: 2, slideShadows: false }}
            pagination={{ clickable: true }}
            navigation
            className="pb-12"
          >
            {events.map((event, index) => (
              <SwiperSlide key={index} className="max-w-xs md:max-w-sm lg:max-w-md">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-amber-300 hover:shadow-2xl">
                  <div className="relative overflow-hidden">
                    <img
                      src={event.Event_Image}
                      alt={event.Event_Name}
                      className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{event.Event_Name}</h3>
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
            ))}
          </Swiper>
        </div>
      </section>
      <Footer />
    </>
  );
}
