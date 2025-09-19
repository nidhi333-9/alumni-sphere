import { useState, useEffect } from "react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      // Mock API data
      const mockJobs = [
        {
          id: 1,
          title: "Software Engineer",
          company: "TechCorp",
          location: "Bhopal, India",
          postedDate: "2025-09-15",
          description: "Looking for a full-stack developer with 2+ years experience."
        },
        {
          id: 2,
          title: "Data Analyst",
          company: "DataSolutions",
          location: "Remote",
          postedDate: "2025-09-14",
          description: "We need a data analyst proficient in SQL and Python."
        },
      ];
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    };

    fetchJobs();
  }, []);

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

  if (loading) return <div className="text-center mt-10">Loading jobs...</div>;

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Job Postings</h1>

      {/* Search Bar */}
      <div className="flex mb-5">
        <input
          type="text"
          placeholder="Search by title, company, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {filteredJobs.length === 0 ? (
        <p>No jobs match your search.</p>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} - {job.location}</p>
            <p className="text-gray-500 text-sm">Posted on: {job.postedDate}</p>
            <p className="mt-2">{job.description}</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Apply Now
            </button>
          </div>
        ))
      )}
    </div>
  );
}
