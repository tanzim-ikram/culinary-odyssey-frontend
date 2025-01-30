"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Updated import
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // Using the updated next/navigation useRouter

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("/api/signin", {
        //   const response = await fetch('http://localhost:5000/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, redirect to dashboard
        router.push("/dashboard");
      } else {
        // Handle login error
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      {/* Nav Bar */}
      <Navbar />
      <hr />

      {/* Login Card */}
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Log In to Your Account
          </h2>
          <p className="text-center text-gray-500 mt-2 mb-8">
            Delivery Man Log In
          </p>
          {errorMessage && (
            <p className="text-center text-red-500 mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            {/* Email Address */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#C4986A] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#a87c56] transition duration-200"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
