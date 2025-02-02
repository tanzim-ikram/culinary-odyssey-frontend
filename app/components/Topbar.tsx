"use client";

import { HiOutlineSearch } from "react-icons/hi";
import { FaBell, FaRegCommentDots } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

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
        <div className="flex items-center gap-2">
          <div>
            <p className="text-gray-700 font-semibold">John Doe</p>
            <p className="text-sm text-green-500">Online</p>
          </div>
          <button onClick={() => router.push("/profile")}>
            <Image
              src="/co-logo.png" // Replace with actual image path
              alt="User Avatar"
              width={50}
              height={50}
              className="rounded-full cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
