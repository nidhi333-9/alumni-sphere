import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AlumniDir from "./AlumniDir";

const AlumniList = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    fetch("http://localhost:5000/alumni", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/signin");
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => setAlumni(data))
      .catch((err) => console.error("Error fetching alumni:", err));
  }, [navigate]);

  return (
    <div className="space-y-4">
      {alumni.map((item) => (
        <div
          key={item.Alumni_ID}
          onClick={() => navigate(`/alumni/${item.Alumni_ID}`)}
          style={{ cursor: "pointer" }}
        >
          <AlumniDir
            name={`${item.User_Fname} ${item.User_Lname}`}
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
