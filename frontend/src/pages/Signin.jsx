import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.png"; // ✅ Your alumni logo

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
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
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Signin error:", err);
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* LEFT SIDE - Logo and background */}
      <div className="w-1/2 bg-indigo-700 text-white flex flex-col justify-center items-center p-10">
        <img
          src={logo}
          alt="Alumni Logo"
          className="h-32 w-32 mb-6 drop-shadow-lg"
        />
        <h1 className="text-3xl font-bold text-center">
          Welcome Back to Alumni Sphere
        </h1>
        <p className="text-center mt-4 text-indigo-100 max-w-sm">
          Reconnect with your network, stay updated, and continue your journey with us.
        </p>
      </div>

      {/* RIGHT SIDE - Signin Form */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Sign In to Your Account
          </h2>

          <form onSubmit={handleSignin} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/Forgot-password")}
                className="text-sm text-indigo-700 hover:underline focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Signin Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold text-lg shadow-md hover:bg-indigo-700 hover:scale-[1.02] transform transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
