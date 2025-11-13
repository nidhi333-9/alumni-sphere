import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [search, setSearch] = useState("");
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
const res = await fetch("http://localhost:5000/alumni-hero", {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});        const data = await res.json();
        setAlumni(data);
        setFilteredAlumni(data);
        console.log(data);

      } catch (err) {
        console.error("Error fetching alumni:", err);
      }
    };
    fetchAlumni();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredAlumni(alumni);
    } else {
      setFilteredAlumni(
        alumni.filter(
          (m) =>
            m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.course.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, alumni]);

  const handleToggleConnect = (index) => {
    if (sentRequests.includes(index)) {
      setSentRequests(sentRequests.filter((i) => i !== index));
    } else {
      setSentRequests([...sentRequests, index]);
    }
  };

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-600 pl-10 pr-4 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-12 overflow-x-auto">
          <ul
            role="list"
            className="flex space-x-8 snap-x snap-mandatory overflow-x-scroll pb-4"
          >
            {filteredAlumni.map((member, index) => {
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
