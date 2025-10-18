import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
export default function DonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cause, setCause] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCause = async () => {
      try {
        const res = await fetch(`http://localhost:5000/donations/${id}`);
        if (!res.ok) throw new Error("Failed to fetch cause details");
        const data = await res.json();
        setCause(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCause();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!cause)
    return <p className="text-center mt-10 text-gray-500">Cause not found.</p>;

  return (
    <> <Navbar/>
    <section className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 py-6 px-6 mt-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-12">
        <div className="relative">
          <img
            src={cause.image}
            alt={cause.title}
            className="h-64 w-full object-cover"
          />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/70 hover:bg-white text-amber-800 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {cause.title}
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {cause.description}
          </p>

          <div className="flex justify-between items-center mb-6">
            <p className="text-amber-700 font-medium">
              Raised: ₹{cause.raised?.toLocaleString()} / ₹
              {cause.target?.toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm">
              {cause.supporters} alumni have supported this cause
            </p>
          </div>

          <button
            onClick={() =>
              alert(`Thank you for donating to "${cause.title}" 🤎`)
            }
            className="w-full py-3 rounded-full bg-amber-600 text-white font-semibold hover:bg-amber-700 transition"
          >
            Proceed to Donate
          </button>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
