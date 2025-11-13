import { useState, useEffect } from "react";
import { Heart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Donations() {
  const navigate = useNavigate();
  const [donationCauses, setDonationCauses] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch donation causes from backend
  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const res = await fetch("http://localhost:5000/donations");
        if (!res.ok) throw new Error("Failed to fetch donation causes");
        const data = await res.json();
        setDonationCauses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCauses();
  }, []);

  const handleDonate = (id) => {
    navigate(`/donations/${id}`);
  };

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

  // Searchbar
  const filteredCauses = donationCauses.filter((cause) => {
    const matchesSearch =
      cause.title.toLowerCase().includes(search.toLowerCase()) ||
      cause.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      cause.category?.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br  via-white py-12 px-6 mt-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 text-center mb-4">
          Alumni Donations
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Contribute towards meaningful causes that support our college and
          students.
        </p>

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

        {loading && (
          <p className="text-center text-gray-500">Loading donation causes…</p>
        )}
        {error && (
          <p className="text-center text-red-500 mb-4">
            Error: {error}. Please try again later.
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCauses.map((cause) => {
              const progress = Math.min(
                (cause.raised / cause.target) * 100,
                100
              );

              return (
                <div
                  key={cause.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-amber-300 hover:shadow-2xl"
                >
                  <div className="relative">
                    <img
                      src={cause.image}
                      alt={cause.title}
                      className="h-40 w-full object-cover"
                    />
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md ${
                        categoryColors[cause.category] || "bg-gray-600"
                      }`}
                    >
                      {cause.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {cause.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {cause.description}
                    </p>

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

                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>₹{cause.raised?.toLocaleString()} raised</span>
                      <span>Target: ₹{cause.target?.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">
                      {cause.supporters} alumni have contributed
                    </p>

                    <button
                      onClick={() => handleDonate(cause.id)}
                      className="flex items-center justify-center gap-2 w-full py-2 rounded-full bg-amber-600 text-white font-medium shadow-md hover:bg-amber-700 transition"
                    >
                      <Heart size={18} className="fill-white" />
                      Donate Now
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredCauses.length === 0 && (
              <p className="text-center text-gray-500 col-span-full">
                No donation causes found.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
