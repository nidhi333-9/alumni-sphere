import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Alumni Reunion 2025",
      date: "July 15-17, 2025",
      description:
        "Reconnect with old friends and make new connections at the Alumni Reunion 2025. Featuring keynote speakers, networking sessions, and campus tours.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
      article: "Full article text about Alumni Reunion 2025...",
    },
    {
      id: 2,
      title: "Tech Innovation Summit",
      date: "September 10, 2025",
      description:
        "Join alumni innovators and industry leaders as they share insights on the future of technology, AI, and entrepreneurship.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      article: "Full article text about Tech Innovation Summit...",
    },
    {
      id: 3,
      title: "Scholarship Gala Dinner",
      date: "November 22, 2025",
      description:
        "A night to celebrate generosity and student success. All proceeds support the alumni scholarship fund.",
      image:
        "https://images.unsplash.com/photo-1503424886300-4f83d73a8f62?q=80&w=1200&auto=format&fit=crop",
      article: "Full article text about Scholarship Gala Dinner...",
    },
    {
      id: 4,
      title: "Career Development Workshop",
      date: "March 3, 2026",
      description:
        "Interactive sessions with top recruiters, resume reviews, and career coaching exclusively for alumni and students.",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
      article: "Full article text about Career Development Workshop...",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Upcoming Alumni Events</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
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
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="pb-12"
      >
        {events.map((event) => (
          <SwiperSlide
            key={event.id}
            className="max-w-xs md:max-w-sm lg:max-w-md"
          >
            <div className="bg-[#BBDCE5] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 md:h-48 object-cover"
              />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                <p className="text-gray-700 mt-2 text-sm md:text-base line-clamp-2">
                  {event.description}
                </p>
                <Link
                  to={`/eventsDetails/${event.id}`}
                  state={event} // pass data to new page
                  className="mt-3 inline-block px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
