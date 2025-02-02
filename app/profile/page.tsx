"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { FaCamera } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("/co-logo.png");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    gender: "",
    phoneNumber: "",
    country: "",
    dob: "",
    city: "",
    educationalLevel: "",
  });

  // ✅ Fetch user data on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (!storedToken) {
      console.error("No access token found! Redirecting to login...");
      router.push("/login");
      return;
    }

    setToken(storedToken); // ✅ Store Token in State

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
          withCredentials: true,
        });

        const userData = response.data;
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          role: userData.role || "",
          gender: userData.gender || "",
          phoneNumber: userData.phoneNumber || "",
          country: userData.country || "",
          dob: userData.dob || "",
          city: userData.city || "",
          educationalLevel: userData.educationalLevel || "",
        });

        if (userData.profileImage) {
          setProfileImage(userData.profileImage);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setProfileImage(imageUrl);
    }
  };

  // ✅ Handle profile update
  const handleUpdate = async () => {
    setUpdating(true);

    try {
      await axios.patch(
        "http://localhost:5000/profile/me",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
          gender: formData.gender,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          dob: formData.dob,
          city: formData.city,
          educationalLevel: formData.educationalLevel,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Error updating profile!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-xl font-semibold">Loading profile...</p>;
  }
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Topbar Component */}
        <Topbar token={token} />

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
              <h1 className="text-2xl font-bold text-[#464255]">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="text-lg text-gray-600">{formData.role}</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-semibold text-[#464255] mb-4">
            Edit Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name & Last Name */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-[#464255] text-sm font-medium mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleUpdate}
              className="bg-lime-300 text-[#464255] font-bold px-6 py-2 rounded-lg shadow-md hover:bg-lime-200 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
