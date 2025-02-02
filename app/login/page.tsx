"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/signin", {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { message, accessToken, user } = response.data;
        const { id: userId, role } = user;
  
        console.log("Login successful:", message);
        console.log("Access Token:", accessToken);
        console.log("User ID:", userId, "Role:", role);
  
        if (!accessToken) {
          console.error("No access token received!");
          setErrorMessage("Authentication failed. No access token.");
          return;
        }
  
        // Store token & user data in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId.toString());
        localStorage.setItem("userRole", role);
  
        // Verify stored token
        console.log("Stored Access Token:", localStorage.getItem("accessToken"));
  
        // Redirect user to dashboard
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Invalid credentials");
      } else {
        setErrorMessage("An error occurred while logging in. Please try again.");
      }
      console.error("Login error:", error);
    }
  };
const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found!");

    const response = await axios.post("http://localhost:5000/signin", {
      email,
      password,
    }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });    

    console.log("Dashboard Data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Dashboard API error:", error.response || error.message);
  }
};  

  return (
    <div>
      {/* Nav Bar */}
      <Navbar />
      <hr />

      {/* Login Card */}
      <div className="flex justify-center items-center min-h-screen bg-gray-50" style={{ fontFamily: '"Poppins", sans-serif' }}>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <a href="/" className="flex justify-center mb-6">
            <Image src="/user-1.png" alt="Logo" width={120} height={120} />
          </a>
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
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-lime-200"
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
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-lime-200"
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
