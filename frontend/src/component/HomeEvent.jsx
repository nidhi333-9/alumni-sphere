import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [latestEvents, setLatestEvents] = useState([]);

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/events-api?type=latest");
        const data = await res.json();
        setLatestEvents(data);
      } catch (err) {
        console.error("Error fetching latest events:", err);
      }
    };
    fetchLatestEvents();
  }, []);

  return (
    <div className="bg-blue-50 py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Upcoming Events
          </h2>
        </div>

        <div className="mt-4 flex gap-4">
          <button
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Latest Events
          </button>
          <Link to="/events">
            <button className="px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-xl shadow hover:bg-gray-300 transition">
              All Events
            </button>
          </Link>
        </div>

        <div className="mt-10 space-y-12">
          {latestEvents.map((event) => (
            <article key={event.Event_ID} className="flex flex-col lg:flex-row items-start gap-6">
              <div className="w-full lg:w-1/4">
                <img
                  src={event.Event_Image}
                  alt={event.Event_Name}
                  className="rounded-xl object-cover w-full h-40"
                />
              </div>
              <div className="w-full lg:w-2/3">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <time dateTime={event.Event_Date}>
                    {new Date(event.Event_Date).toLocaleDateString()}
                  </time>
                  <span className="font-medium text-indigo-600">
                    {event.Event_Type ? "Online" : "Offline"}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-semibold leading-7 text-gray-900">
                  {event.Event_Name}
                </h3>
                <p className="mt-2 text-gray-600">{event.Event_Description}</p>

                
                  <a
                    href={event.Event_Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
                  >
                    Register
                  </a>
                
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
