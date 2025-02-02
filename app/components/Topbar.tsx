"use client";

import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaBell, FaRegCommentDots } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

interface TopbarProps {
  token: string | null;
}

export default function Topbar({ token }: TopbarProps) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("User");

  // Fetch User Profile Data
  const fetchProfile = async () => {
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:5000/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const { firstName, lastName } = response.data;
      setUserName(`${firstName} ${lastName}`);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Search Bar */}
      <div className="relative w-full lg:w-1/2">
        <input
          type="text"
          placeholder="Search here"
          className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none"
        />
        <HiOutlineSearch className="absolute left-3 top-3 text-gray-500 text-lg" />
      </div>

      {/* Notifications, Messages & Profile */}
      <div className="flex items-center gap-6">
        <FaBell className="text-gray-600 text-xl cursor-pointer" />
        <FaRegCommentDots className="text-gray-600 text-xl cursor-pointer" />

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/profile")}>
          <div>
            <p className="text-gray-700 font-semibold">{userName}</p>
            <p className="text-sm text-green-500">Online</p>
          </div>
          <Image
            src="/co-logo.png" // Replace with actual user profile image path
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
