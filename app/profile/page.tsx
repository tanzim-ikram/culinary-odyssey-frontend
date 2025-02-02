"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import Image from "next/image";

export default function Profile() {
  const [profileImage, setProfileImage] = useState("/co-logo.png");
  const [formData, setFormData] = useState({
    firstName: "John",
    surname: "Doe",
    gender: "",
    phone: "+880 17XXXXXXXX",
    email: "",
    country: "",
    dob: "",
    city: "Dhaka",
    education: "Higher Secondary Certificate (HSC)",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Topbar Component */}
        <Topbar />

        {/* Profile Header */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-6">
            {/* Profile Image with Edit Button */}
            <div className="relative">
              <Image
                src={profileImage}
                alt="User Profile"
                width={100}
                height={100}
                className="rounded-full border-4 border-white shadow-lg"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-lime-300 p-2 rounded-full cursor-pointer shadow-md hover:bg-lime-200 transition"
              >
                <FaCamera className="text-[#464255] text-lg" />
              </label>
              <input
                type="file"
                id="profile-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#464255]">{formData.firstName} {formData.surname}</h1>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-semibold text-[#464255] mb-4">Edit Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name & Surname */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">Surname</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">Country</label>
              <select name="country" value={formData.country} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg">
                <option value="">Select</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">Education Level</label>
              <select name="education" value={formData.education} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg">
                <option>Higher Secondary Certificate (HSC)</option>
                <option>Bachelor’s Degree</option>
                <option>Master’s Degree</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button className="bg-lime-300 text-[#464255] font-bold px-6 py-2 rounded-lg shadow-md hover:bg-lime-200 transition">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
