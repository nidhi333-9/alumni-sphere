import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault(); // prevent form refresh
    setError("");

    try {
      const res = await fetch("http://localhost:5000/auth/signin", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});


      const data = await res.json();
if (res.ok) {
  localStorage.setItem("token", data.token);
  navigate("/homepage");
} else {
  console.error("Backend error:", data); // 👈 log backend response
  setError(data.error || "Login failed");
}

    } catch (err) {
      console.error("Signin error:", err);
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-[640px]">
        {/* Logo + Title */}
        <div className="w-160 bg-[#BBDCE5] px-0 py-6 h-58 flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="630"
            height="120"
            viewBox="0 0 156 104"
            fill="none"
            flex="true"
            justify-center="true"
          >
            <path
              d="M119.809 47.8157L121.025 69.1572C121.205 72.2638 119.359 75.1453 115.487 77.8018C111.615 80.4583 106.324 82.5632 99.6159 84.1165C92.9073 85.6698 85.6359 86.4464 77.8017 86.4464C69.9675 86.4464 62.6961 85.6698 55.9875 84.1165C49.2789 82.5631 43.9885 80.4582 40.1165 77.8018C36.2444 75.1453 34.3984 72.2638 34.5785 69.1572L35.7942 47.8157L74.56 60.0398C75.5505 60.355 76.631 60.5125 77.8017 60.5125C78.9723 60.5125 80.0529 60.355 81.0434 60.0398L119.809 47.8157ZM155.603 25.934C155.603 26.9696 155.108 27.6674 154.118 28.0276L78.4771 51.8005C78.297 51.8455 78.0719 51.868 77.8017 51.868C77.5315 51.868 77.3064 51.8455 77.1263 51.8005L33.0928 37.888C31.1567 39.4188 29.5584 41.9289 28.2977 45.4183C27.037 48.9077 26.2716 52.9261 26.0014 57.4735C28.8379 59.0944 30.2562 61.5482 30.2562 64.8349C30.2562 67.9416 28.9505 70.3504 26.3392 72.0613L30.2561 101.304C30.3462 101.935 30.1661 102.498 29.7158 102.993C29.3106 103.488 28.7703 103.736 28.095 103.736H15.1281C14.4528 103.736 13.9125 103.488 13.5073 102.993C13.057 102.498 12.8769 101.935 12.9669 101.304L16.884 72.0612C14.2727 70.3503 12.967 67.9415 12.967 64.8349C12.967 61.5481 14.4303 59.0493 17.3568 57.3384C17.852 48.0184 20.0582 40.5894 23.9753 35.0514L1.48579 28.0276C0.495262 27.6675 0 26.9696 0 25.934C0 24.8984 0.495262 24.2005 1.48579 23.8404L77.1263 0.0675542C77.3064 0.0225172 77.5315 0 77.8017 0C78.0719 0 78.297 0.0225172 78.4771 0.0675542L154.118 23.8403C155.108 24.2005 155.603 24.8984 155.603 25.934Z"
              fill="white"
            />
          </svg>
          <h2 className="mt-5 mb-5 text-center text-4xl font-bold tracking-tight text-gray-700">
            Alumni Sphere
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSignin} className="space-y-6 mt-10">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
