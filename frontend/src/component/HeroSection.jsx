import React, { useState } from "react";
import { Search } from "lucide-react";

export default function HeroSection() {
  // Track clicked buttons by index
  const [sentRequests, setSentRequests] = useState([]);

  const handleToggleConnect = (index) => {
    if (sentRequests.includes(index)) {
      // If already sent, remove from list (back to Connect)
      setSentRequests(sentRequests.filter((i) => i !== index));
    } else {
      // Otherwise, add to list (Sent)
      setSentRequests([...sentRequests, index]);
    }
  };

  // Alumni data
  const members = [
    {
      name: "Michael Foster",
      course: "MCA 2003",
      img: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      name: "Dries Vincent",
      course: "CSE 1999",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      name: "Lindsay Walton",
      course: "ECE 2005",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      name: "Courtney Henry",
      course: "Civil 2015",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      name: "Tom Cook",
      course: "Mtech 2001",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      name: "Whitney Francis",
      course: "MCA 2015",
      img: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      name: "Leonard Krasner",
      course: "MCA 2022",
      img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      name: "Floyd Miles",
      course: "IT 2020",
      img: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      name: "Floyd Miles",
      course: "EE 2022",
      img: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
  ];

  return (
<section className="bg-gray-50 py-16 mt-10">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    {/* Title */}
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Stay Connected with your Batchmates
      </h2>
    </div>

        {/* Search Bar */}
        <div className="w-full max-w-md mx-auto mt-5">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search by Graduation Year or Course name"
              className="w-full rounded-xl border border-gray-600 pl-10 pr-4 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Horizontal Scrollable Members */}
        <div className="mt-12 overflow-x-auto">
          <ul
            role="list"
            className="flex space-x-8 snap-x snap-mandatory overflow-x-scroll pb-4"
          >
            {members.map((member, index) => {
              const isSent = sentRequests.includes(index);
              return (
                <li
                  key={index}
                  className="flex flex-col items-center text-center snap-center min-w-[120px]"
                >
                  <img
                    className="h-20 w-20 rounded-full object-cover shadow-sm"
                    src={member.img}
                    alt={member.name}
                  />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-600">{member.course}</p>

                  {/* Toggle Button */}
<button
  onClick={() => handleToggleConnect(index)}
  className={`mt-2 px-4 py-1.5 text-xs font-semibold rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
    isSent
      ? "bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg focus:ring-amber-500"
      : "bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg focus:ring-amber-500"
  }`}
>
  {isSent ? "Sent" : "Connect"}
</button>

                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
