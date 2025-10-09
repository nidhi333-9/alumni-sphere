import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dpMale from "../Images/dp-male.png"; // ✅ default profile image
import Navbar from "./Navbar";
import Footer from "./Footer";
const AlumniProfile = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);

  useEffect(() => {
  fetch("http://localhost:5000/alumni")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched alumni data:", data); // 👈 check field names here
      const found = data.find((a) => String(a.Alumni_ID) === String(id));
      setAlumni(found);
    })
    .catch((err) => console.error(err));
}, [id]);


  if (!alumni) {
    return (
      <div className="flex items-center justify-center  min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100">
        <div className="text-lg font-medium text-gray-700 animate-pulse">
          Loading alumni profile…
        </div>
      </div>
    );
  }

  // ✅ Build full name safely
  const fullName = `${alumni.User_Fname || ""} ${alumni.User_Lname || ""}`.trim();

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 py-16 px-6 mt-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center gap-6 p-8 border-b bg-amber-50">
          <img
            src={dpMale}
            alt={fullName}
            className="w-28 h-28 rounded-full object-cover shadow-md ring-4 ring-amber-200"
          />
          <div>
            <h1 className="text-3xl font-bold text-amber-900">
              {fullName || "Unnamed Alumni"}
            </h1>
            <p className="text-gray-600 text-sm">
              {alumni.Graduation_Year} • {alumni.Course} {alumni.Department}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Job Title</h3>
            <p className="text-gray-600">{alumni.Job_Title || "—"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Company</h3>
            <p className="text-gray-600">{alumni.Company_Name || "—"}</p>
          </div>
          <div>
  <h3 className="text-lg font-semibold text-gray-800">Current City</h3>
  <p className="text-gray-600">{alumni.currentCity || "—"}</p>
</div>
<div>
  <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
  <p className="text-gray-600">{alumni.skills || "—"}</p>
</div>

        </div>

        {/* Call to Action */}
        <div className="p-8 border-t flex justify-end bg-amber-50">
          <button className="bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 
            text-white text-sm font-medium px-6 py-2 rounded-full shadow-md 
            hover:shadow-lg transition">
            Connect
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AlumniProfile;
