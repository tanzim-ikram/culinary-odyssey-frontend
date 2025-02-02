"use client";

import { HiOutlineSearch } from "react-icons/hi";
import { FaBell, FaRegCommentDots, FaUserCircle } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Search Bar */}
      <div className="relative w-96">
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
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-gray-600 text-2xl" />
          <div>
            <p className="text-gray-700 font-semibold">John</p>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}
