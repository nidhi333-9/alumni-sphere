import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
export default function HomeNews() {
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState("latest");
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
<div className="bg-amber-50 py-12 ">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        News and Updates
      </h2>
    </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setActiveTab("latest")}
            className={`px-4 py-2 rounded-full font-medium ${
              activeTab === "latest"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Latest News
          </button>
          <Link to="/all-news" className="text-gray-700 hover:underline">
          <button
            onClick={() => navigate("/all-news")}
            className="px-4 py-2 rounded-full font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            All News
          </button>
          </Link>
        </div>

        {activeTab === "latest" && (
  <div className="relative mt-10">
    <button
      onClick={() => scroll("left")}
      className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 z-10"
    >
      <ChevronLeft className="w-6 h-6 text-gray-600" />
    </button>
    <button
      onClick={() => scroll("right")}
      className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 z-10"
    >
      <ChevronRight className="w-6 h-6 text-gray-600" />
    </button>

    <div
      ref={scrollRef}
      className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth gap-8 px-8 scrollbar-none"
    >
      <article className="flex-none w-80 snap-center flex flex-col items-start justify-between">
        <div className="relative w-full">
          <img
            src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?auto=format&fit=crop&w=800&q=80"
            alt="Career growth"
            className="aspect-[16/9] w-full rounded-2xl object-cover"
          />
        </div>
        <div className="max-w-xl">
          <div className="mt-4 flex items-center gap-x-4 text-xs">
            <time dateTime="2025-03-16" className="text-gray-500">
              Mar 16, 2025
            </time>
            <span className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
              Career
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
            Alumni drives career growth workshop
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Senior alumni conducted a session on resume building and interviews.
          </p>
        </div>
      </article>

      <article className="flex-none w-80 snap-center flex flex-col items-start justify-between">
        <div className="relative w-full">
          <img
            src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?auto=format&fit=crop&w=800&q=80"
            alt="SEO tips"
            className="aspect-[16/9] w-full rounded-2xl object-cover"
          />
        </div>
        <div className="max-w-xl">
          <div className="mt-4 flex items-center gap-x-4 text-xs">
            <time dateTime="2025-03-10" className="text-gray-500">
              Mar 10, 2025
            </time>
            <span className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
              Placement
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
            Record placements for Batch of 2025
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Alumni referrals played a key role in boosting this year’s offers.
          </p>
        </div>
      </article>

      {/* Blog 3 */}
      <article className="flex-none w-80 snap-center flex flex-col items-start justify-between">
        <div className="relative w-full">
          <img
            src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80"
            alt="Customer experience"
            className="aspect-[16/9] w-full rounded-2xl object-cover"
          />
        </div>
        <div className="max-w-xl">
          <div className="mt-4 flex items-center gap-x-4 text-xs">
            <time dateTime="2025-02-12" className="text-gray-500">
              Feb 12, 2025
            </time>
            <span className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
              Business
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
            Startup by alumni raises funding
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Two alumni-founded startups secured seed funding this quarter.
          </p>
        </div>
      </article>

      {/* Blog 4 (new - mentorship) */}
      <article className="flex-none w-80 snap-center flex flex-col items-start justify-between">
        <div className="relative w-full">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
            alt="Mentorship"
            className="aspect-[16/9] w-full rounded-2xl object-cover"
          />
        </div>
        <div className="max-w-xl">
          <div className="mt-4 flex items-center gap-x-4 text-xs">
            <time dateTime="2025-02-05" className="text-gray-500">
              Feb 5, 2025
            </time>
            <span className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
              Mentorship
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
            Alumni mentorship program launched
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Students can now connect with alumni mentors for career guidance.
          </p>
        </div>
      </article>

      {/* Blog 5 (new - reunion) */}
      <article className="flex-none w-80 snap-center flex flex-col items-start justify-between">
        <div className="relative w-full">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
            alt="Reunion"
            className="aspect-[16/9] w-full rounded-2xl object-cover"
          />
        </div>
        <div className="max-w-xl">
          <div className="mt-4 flex items-center gap-x-4 text-xs">
            <time dateTime="2025-01-20" className="text-gray-500">
              Jan 20, 2025
            </time>
            <span className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
              Event
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
            Alumni reunion announced
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            The annual alumni meet will be held on campus this summer.
          </p>
        </div>
      </article>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
