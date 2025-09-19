import React, { useState } from "react";
import img from "../Images/logo.png";

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
  const currentYear = new Date().getFullYear();
  const isAlumni = formData.endYear && parseInt(formData.endYear) < currentYear;
  const isStudent =
    formData.endYear && parseInt(formData.endYear) >= currentYear;

  // Dynamic semester options
  const semesterOptions = {
    "1st": [1, 2],
    "2nd": [3, 4],
    "3rd": [5, 6],
    "4th": [7, 8],
    "5th": [9, 10],
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
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
        setMessage("Signup successful! You can now log in.");
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
      } else {
        setMessage(data.message || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Please try later.");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center items-center px-6 py-2 lg:px-8">
      {/* Header */}
      <div className="w-full max-w-3xl bg-[#BBDCE5] px-6 py-6 rounded-md flex flex-col items-center">
        <img src={img} alt="AlumniSphere Logo" className="h-24 w-auto mb-4" />
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-700">
          Alumni Sphere
        </h2>
      </div>

      {/* Form */}
      <div className="mt-8 w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-3xl bg-white p-6 rounded-lg shadow"
        >
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Gender + Scholar ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Scholar ID
              </label>
              <input
                type="text"
                name="scholarId"
                value={formData.scholarId}
                onChange={handleChange}
                required
                placeholder="Scholar ID"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </div>

          {/* Phones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Primary Phone
              </label>
              <input
                type="tel"
                name="primaryPhone"
                value={formData.primaryPhone}
                onChange={handleChange}
                required
                placeholder="Primary Phone"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Secondary Phone
              </label>
              <input
                type="tel"
                name="secondaryPhone"
                value={formData.secondaryPhone}
                onChange={handleChange}
                placeholder="Secondary Phone"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Department + Branch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                placeholder="Department"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Branch
              </label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                placeholder="Branch"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Ending Year */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Graduation Year
            </label>
            <input
              type="number"
              name="endYear"
              value={formData.endYear}
              onChange={handleChange}
              min="1900"
              max="2100"
              required
              placeholder="e.g. 2026"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </div>

          {/* Student Section */}
          {isStudent && (
            <div className="space-y-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Student Details
              </h3>

              {/* Current Year */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Current Year
                </label>
                <select
                  name="currentYear"
                  value={formData.currentYear}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                </select>
              </div>

              {/* Semester */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Semester
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  disabled={!formData.currentYear}
                >
                  <option value="">Select Semester</option>
                  {formData.currentYear &&
                    semesterOptions[formData.currentYear].map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}

          {/* Alumni Section */}
          {isAlumni && (
            <div className="space-y-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Alumni Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Software Engineer"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Google"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Current City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="San Francisco"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Current Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="USA"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Sector
                  </label>
                  <input
                    type="text"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    placeholder="IT / Finance / Education"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="JavaScript, React, SQL"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Enter your address"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
            ></textarea>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="********"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-600 focus:border-indigo-600"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Sign up
            </button>
          </div>

          {/* Message */}
          {message && (
            <p className="text-center text-sm text-red-600 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
