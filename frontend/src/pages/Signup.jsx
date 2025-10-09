import React, { useState } from "react";
import logo from "../Images/logo.png"; // ✅ Your alumni logo
import { useNavigate } from "react-router-dom";   // ✅ import navigation
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

// Reusable Input Field
const InputField = ({ ...props }) => (
  <input
    {...props}
    className="block w-full rounded-lg border-2 border-gray-400 bg-white px-4 py-3 text-base text-gray-800 
               shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 
               transition-all duration-200 ease-in-out mb-3"
  />
);

// Reusable Select Box
const SelectBox = ({ children, ...props }) => (
  <select
    {...props}
    className="block w-full rounded-lg border-2 border-gray-400 bg-white px-4 py-3 text-base text-gray-800 
               shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 
               transition-all duration-200 ease-in-out mb-3"
  >
    {children}
  </select>
);

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    scholarId: "",
    email: "",
    primaryPhone: "",
    secondaryPhone: "",
    department: "",
    branch: "",
    endYear: "",
    currentYear: "",
    semester: "",
    jobTitle: "",
    companyName: "",
    city: "",
    country: "",
    sector: "",
    skills: "",
    address: "",
    password: "",
  });

  const [message, setMessage] = useState("");
const [isSuccess, setIsSuccess] = useState(false); // ✅ added
const navigate = useNavigate(); // ✅ added
  const currentYear = new Date().getFullYear();
  const isAlumni = formData.endYear && parseInt(formData.endYear) < currentYear;
  const isStudent = formData.endYear && parseInt(formData.endYear) >= currentYear;

  const semesterOptions = {
    "1st": [1, 2],
    "2nd": [3, 4],
    "3rd": [5, 6],
    "4th": [7, 8],
    "5th": [9, 10],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
  setIsSuccess(true);
  setMessage("🎉 Your account has been created successfully!");
  setFormData({
    firstName: "",
    lastName: "",
    gender: "",
    scholarId: "",
    email: "",
    primaryPhone: "",
    secondaryPhone: "",
    department: "",
    branch: "",
    endYear: "",
    currentYear: "",
    semester: "",
    jobTitle: "",
    companyName: "",
    city: "",
    country: "",
    sector: "",
    skills: "",
    address: "",
    password: "",
  });

  // ✅ Redirect after 2s
  setTimeout(() => {
    navigate("/signin");
  }, 2000);
} else {
  setIsSuccess(false);
  setMessage(data.message || "❌ Signup failed. Please try again.");
}

    } catch (error) {
      console.error("Error:", error);
      setIsSuccess(false);
      setMessage("⚠️ Server error. Please try later.");
    }
  };


  return (
    <div className="flex h-screen w-full">
      {/* LEFT SIDE - Logo with Background */}
      <div className="w-1/2 bg-indigo-700 text-white flex flex-col justify-center items-center p-10">
        <img
          src={logo}
          alt="Alumni Logo"
          className="h-32 w-32 mb-6 drop-shadow-lg"
        />
        <h1 className="text-3xl font-bold text-center">
          Welcome to the Alumni Network
        </h1>
        <p className="text-center mt-4 text-indigo-100 max-w-sm">
          Connect with fellow students and alumni. Share, grow, and stay
          connected with your alma mater.
        </p>
      </div>

      {/* RIGHT SIDE - Signup Form */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center p-10 pt-80 overflow-y-auto">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 ">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>
{message && (
  <div
    className={`flex items-center gap-3 mt-4 mb-2 px-4 py-3 rounded-lg shadow-md text-sm font-medium
      ${isSuccess 
        ? "bg-green-100 text-green-800 border border-green-300" 
        : "bg-red-100 text-red-800 border border-red-300"
      }`}
  >
    {isSuccess ? (
      <CheckCircleIcon className="h-5 w-5 text-green-600" />
    ) : (
      <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
    )}
    <span>{message}</span>
  </div>
)}

          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                e.preventDefault();
              }
            }}
            className="space-y-6"
          >
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <InputField
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender + Scholar ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectBox
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </SelectBox>
              <InputField
                type="text"
                name="scholarId"
                placeholder="Scholar ID"
                value={formData.scholarId}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <InputField
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Phones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                type="tel"
                name="primaryPhone"
                placeholder="Primary Phone"
                value={formData.primaryPhone}
                onChange={handleChange}
                required
              />
              <InputField
                type="tel"
                name="secondaryPhone"
                placeholder="Secondary Phone"
                value={formData.secondaryPhone}
                onChange={handleChange}
              />
            </div>

            {/* Department + Branch */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
              />
              <InputField
                type="text"
                name="branch"
                placeholder="Branch"
                value={formData.branch}
                onChange={handleChange}
                required
              />
            </div>

            {/* Graduation Year */}
            <InputField
              type="number"
              name="endYear"
              placeholder="Graduation Year (e.g. 2026)"
              value={formData.endYear}
              onChange={handleChange}
              required
            />

            {/* Student Section */}
            {isStudent && (
              <>
               <h3 className="text-lg font-semibold text-gray-700">
                Alumni Details
              </h3>
                <SelectBox
                  name="currentYear"
                  value={formData.currentYear}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                </SelectBox>

                <SelectBox
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  disabled={!formData.currentYear}
                >
                  <option value="">Select Semester</option>
                  {formData.currentYear &&
                    semesterOptions[formData.currentYear]?.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                </SelectBox>
              </>
            )}

            {/* Alumni Section */}
            {isAlumni && (
              <>
               <h3 className="text-lg font-semibold text-gray-700">
                Alumni Details
              </h3>
                <InputField
                  type="text"
                  name="jobTitle"
                  placeholder="Job Title"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
                <InputField
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
                <InputField
                  type="text"
                  name="city"
                  placeholder="Current City"
                  value={formData.city}
                  onChange={handleChange}
                />
                <InputField
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
                <InputField
                  type="text"
                  name="sector"
                  placeholder="Sector (IT, Finance, etc.)"
                  value={formData.sector}
                  onChange={handleChange}
                />
                <InputField
                  type="text"
                  name="skills"
                  placeholder="Skills (React, SQL, etc.)"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </>
            )}

            {/* Address */}
            <textarea
              name="address"
              rows="3"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="block w-full rounded-lg border-2 border-gray-400 bg-white px-4 py-3 text-base text-gray-800 
                         shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 
                         transition-all duration-200 ease-in-out mb-3 resize-none"
            />

            {/* Password */}
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-indigo-600 text-white font-semibold text-lg shadow-md 
                         hover:bg-indigo-700 hover:scale-[1.02] transform transition"
            >
              Sign Up
            </button>


          </form>
        </div>
      </div>
    </div>
  );
}
