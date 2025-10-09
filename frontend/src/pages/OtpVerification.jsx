import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtpVerification() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Email verified successfully!");
        navigate("/login"); // Redirect to login after success
      } else {
        setMessage(data.message || "❌ Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Server error. Please try later.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify Your Email
        </h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            maxLength="6"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="block w-full rounded-lg border-2 border-gray-400 px-4 py-3"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Verify OTP
          </button>
          {message && (
            <p className="text-center text-sm text-red-600 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
