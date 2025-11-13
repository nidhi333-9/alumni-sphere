import { useState, useEffect } from "react";
import { Briefcase, MapPin, Calendar, Plus } from "lucide-react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/jobs-api"); // Backend API
        const data = await res.json();
        console.log("Fetched jobs:", data); // 👈 Add this


        const formattedJobs = data.map((job) => ({
          id: job.Job_ID,
          title: job.Job_Title,
          company: job.Company_Name,
          location: job.Location,
          postedDate: new Date(job.Created_At).toISOString().split("T")[0],
          description: job.Description,
          applyLink: job.Application_Link,
        }));

        setJobs(formattedJobs);
        setFilteredJobs(formattedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Search filter
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600 animate-pulse">
          Loading job postings…
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6 relative mt-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-3">
          Job Opportunities
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Discover career opportunities shared by alumni and companies.
        </p>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search by title, company, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-gray-500">No jobs found.</p>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex items-center justify-between p-6"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Briefcase className="text-blue-600" size={20} />
                    {job.title}
                  </h2>
                  <p className="text-gray-700 font-medium mt-1">{job.company}</p>
                  <p className="flex items-center text-gray-500 text-sm mt-2 gap-1">
                    <MapPin size={16} className="text-blue-500" />
                    {job.location}
                  </p>
                  <p className="flex items-center text-gray-400 text-xs mt-1 gap-1">
                    <Calendar size={14} /> Posted on: {job.postedDate}
                  </p>
                  <p className="mt-3 text-gray-600 text-sm">{job.description}</p>
                </div>

                <div className="ml-6">
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        className="fixed bottom-8 right-8 flex items-center bg-blue-600 text-white 
        rounded-full shadow-lg overflow-hidden transition-all duration-300 ease-in-out 
        group hover:pr-5"
      >
        <div className="p-4 flex items-center justify-center">
          <Plus size={22} />
        </div>

        <span
          className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs 
          group-hover:opacity-100 transition-all duration-300 text-sm font-medium"
        >
          Post Job
        </span>
      </button>
    </section>
  );
}
