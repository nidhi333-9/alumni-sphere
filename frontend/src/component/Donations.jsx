import React, { useState } from "react";
import { Heart, Search } from "lucide-react";

export default function Donations() {
  // Example donations data
  const donationCauses = [
    {
      id: 1,
      title: "Scholarship Fund",
      description:
        "Support meritorious students from underprivileged backgrounds by contributing to the alumni scholarship fund.",
      image:
        "https://images.unsplash.com/photo-1603575448364-48bcded5e2ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60",
      raised: 35000,
      target: 50000,
      supporters: 120,
      category: "Education",
    },
    {
      id: 2,
      title: "Library Modernization",
      description:
        "Help upgrade our college library with digital resources, new books, and study equipment for students.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60",
      raised: 18000,
      target: 40000,
      supporters: 85,
      category: "Infrastructure",
    },
    {
      id: 3,
      title: "Green Campus Initiative",
      description:
        "Join hands to make our campus eco-friendly by funding tree plantations, solar energy, and recycling programs.",
      image:
        "https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60",
      raised: 22000,
      target: 30000,
      supporters: 64,
      category: "Environment",
    },
    {
      id: 4,
      title: "Sports Development",
      description:
        "Support the growth of sports and athletics by contributing towards equipment and training facilities.",
      image:
        "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60",
      raised: 12000,
      target: 25000,
      supporters: 50,
      category: "Sports",
    },
    {
      id: 5,
      title: "Healthcare Facilities",
      description:
        "Contribute towards building better healthcare support and medical facilities for students and staff.",
      image:
        "https://images.unsplash.com/photo-1588776814546-ec9ecf4f4f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60",
      raised: 27000,
      target: 45000,
      supporters: 95,
      category: "Health",
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const handleDonate = (title) => {
    alert(`🤎 Thank you for choosing to donate to "${title}"`);
  };

  // ✅ Category color mapping
  const categoryColors = {
    Education: "bg-blue-600",
    Infrastructure: "bg-purple-600",
    Environment: "bg-green-600",
    Sports: "bg-red-600",
    Health: "bg-pink-600",
  };

  const categoryLightColors = {
    Education: "bg-blue-100",
    Infrastructure: "bg-purple-100",
    Environment: "bg-green-100",
    Sports: "bg-red-100",
    Health: "bg-pink-100",
  };

  // Search + Filter
  const filteredCauses = donationCauses.filter((cause) => {
    const matchesSearch =
      cause.title.toLowerCase().includes(search.toLowerCase()) ||
      cause.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || cause.category.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 py-12 px-6 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-amber-900 text-center mb-4">
          Alumni Donations
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Contribute towards meaningful causes that support our college and students.
        </p>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <div className="relative w-full sm:w-2/3 lg:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search donation causes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-full shadow-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="sm:w-48 w-full border border-amber-200 rounded-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm"
          >
            <option value="all">All Categories</option>
            <option value="Education">Education</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Environment">Environment</option>
            <option value="Sports">Sports</option>
            <option value="Health">Health</option>
          </select>
        </div>

        {/* Donations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCauses.map((cause) => {
            const progress = Math.min((cause.raised / cause.target) * 100, 100);

            return (
              <div
                key={cause.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-amber-300 hover:shadow-2xl"
              >
                {/* Banner */}
                <div className="relative">
                  <img
                    src={cause.image}
                    alt={cause.title}
                    className="h-40 w-full object-cover"
                  />
                  {/* Category Badge */}
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md ${
                      categoryColors[cause.category] || "bg-gray-600"
                    }`}
                  >
                    {cause.category}
                  </span>
                </div>

                {/* Cause Info */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {cause.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {cause.description}
                  </p>

                  {/* Progress Bar */}
                  <div
                    className={`w-full rounded-full h-3 mb-4 ${
                      categoryLightColors[cause.category] || "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`h-3 rounded-full ${
                        categoryColors[cause.category] || "bg-gray-600"
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>₹{cause.raised.toLocaleString()} raised</span>
                    <span>Target: ₹{cause.target.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">
                    {cause.supporters} alumni have contributed
                  </p>

                  {/* Donate Button */}
                  <button
                    onClick={() => handleDonate(cause.title)}
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-full bg-amber-600 text-white font-medium shadow-md hover:bg-amber-700 transition"
                  >
                    <Heart size={18} className="fill-white" />
                    Donate Now
                  </button>
                </div>
              </div>
            );
          })}

          {/* No results */}
          {filteredCauses.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No donation causes found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
