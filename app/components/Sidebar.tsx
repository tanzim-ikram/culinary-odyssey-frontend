"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import {
  FaChartPie,
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { MdChat } from "react-icons/md";
import Image from "next/image";
import { IconType } from "react-icons";

interface SidebarLinkProps {
  icon: IconType;
  text: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Sidebar() {
  const pathname = usePathname(); // Get current route to highlight active menu item
  const router = useRouter();

  // ✅ Handle Logout
  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("No access token found!");
      router.push("/login");
      return;
    }

    try {
      await axios.post("http://localhost:5000/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      // ✅ Remove token and redirect to login
      localStorage.removeItem("accessToken");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <aside className="w-64 bg-white p-6 shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <a href="/">
          <Image src="/co-logo.png" alt="Logo" width={180} height={180} />
        </a>
        <a href="/">
          <h1
            className="text-3xl text-[#C4986A]"
            style={{
              fontFamily: '"Bayon", sans-serif',
              fontWeight: "normal",
              lineHeight: "1.0",
            }}
          >
            Culinary Odyssey
          </h1>
        </a>
      </div>

      {/* Menu */}
      <nav
        className="flex flex-col space-y-4"
        style={{ fontFamily: '"Barlow", sans-serif', fontWeight: "normal" }}
      >
        <SidebarLink
          icon={FaChartPie}
          text="Dashboard"
          href="/dashboard"
          active={pathname === "/dashboard"}
        />
        <SidebarLink
          icon={IoDocumentText}
          text="Order Detail"
          href="/orderdetails"
          active={pathname === "/orderdetails"}
        />
        <SidebarLink
          icon={FaUser}
          text="Customer"
          href="/customer"
          active={pathname === "/customer"}
        />
        <SidebarLink
          icon={IoMdAnalytics}
          text="Analytics"
          href="/analytics"
          active={pathname === "/analytics"}
        />
        <SidebarLink
          icon={FaShoppingCart}
          text="Shopping List"
          href="/shoppinglist"
          active={pathname === "/shoppinglist"}
        />
        {/* <SidebarLink
          icon={MdChat}
          text="Chat"
          href="/chat"
          active={pathname === "/chat"}
        /> */}
        <SidebarLink
          icon={FaMapMarkerAlt}
          text="Map"
          href="/map"
          active={pathname === "/map"}
        />

        {/* ✅ Logout Button */}
        <SidebarLink
          icon={FaSignOutAlt}
          text="Logout"
          onClick={handleLogout} // ✅ Calls logout function
        />
      </nav>
    </aside>
  );
}

// ✅ Sidebar Link Component
function SidebarLink({ icon: Icon, text, href, active = false, onClick }: SidebarLinkProps) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-3 p-2 rounded-lg w-full text-left ${
          active
            ? "bg-lime-200 text-[#464255] font-bold"
            : "text-[#464255]"
        } hover:bg-lime-300 cursor-pointer hover:font-bold`}
      >
        <Icon className="text-xl" />
        <span>{text}</span>
      </button>
    );
  }

  return (
    <Link href={href || "#"} passHref>
      <div
        className={`flex items-center gap-3 p-2 rounded-lg ${
          active
            ? "bg-lime-200 text-[#464255] font-bold"
            : "text-[#464255]"
        } hover:bg-lime-300 cursor-pointer hover:font-bold`}
      >
        <Icon className="text-xl" />
        <span>{text}</span>
      </div>
    </Link>
  );
}
