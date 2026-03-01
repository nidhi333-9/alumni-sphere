import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.User_Type_ID === 3) {
          navigate("/admin-dashboard");
        } else {
          navigate("/homepage");
        }
      } else if (res.status === 403 && data.needsVerification) {
        // Email not verified — redirect to OTP page
        navigate("/verify-otp", { state: { email: data.email } });
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Signin error:", err);
      setError("Something went wrong, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 lg:grid lg:grid-cols-2">
      <div className="hidden bg-indigo-700 text-white lg:flex flex-col justify-center items-center p-10">
        <img
          src={logo}
          alt="Alumni Logo"
          className="h-32 w-32 mb-6 drop-shadow-lg"
        />
        <h1 className="text-3xl font-bold text-center">Welcome Back to Alumni Sphere</h1>
        <p className="text-center mt-4 text-indigo-100 max-w-sm">
          Reconnect with your network, stay updated, and continue your journey with us.
        </p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Sign In</h2>
          <p className="text-sm text-gray-500 text-center mb-8">Access your Alumni Sphere account.</p>

          <form onSubmit={handleSignin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">
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



            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold text-lg shadow-md hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transform transition"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-indigo-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
