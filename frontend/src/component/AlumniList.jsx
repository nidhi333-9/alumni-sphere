import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AlumniDir from "./AlumniDir";

const AlumniList = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/alumni")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched alumni:", data); // ✅ check keys here
      setAlumni(data);
    })
    .catch((err) => console.error("Error fetching alumni:", err));
}, []);


  return (
    <div className="space-y-4">
      {alumni.map((item) => (
        <div
          key={item.Alumni_ID}
          onClick={() => navigate(`/alumni/${item.Alumni_ID}`)}
          style={{ cursor: "pointer" }}
        >
          <AlumniDir
  name={`${item.User_Fname} ${item.User_Lname}`}   // ✅ combine first + last
  graduationYear={item.Graduation_Year}
  course={`${item.Course} ${item.Department}`}
  jobTitle={item.Job_Title}
  companyName={item.Company_Name}
/>

        </div>
      ))}
    </div>
  );
};

export default AlumniList;
