"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  href: string;
  active?: boolean;
}

export default function Sidebar() {
  const pathname = usePathname(); // Get current route to highlight active menu item

  return (
    <aside className="w-64 bg-white p-6 shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <Image src="/co-logo.png" alt="Logo" width={80} height={80} />
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
      </div>

      {/* Menu */}
      <nav
        className="flex flex-col space-y-4"
        style={{ fontFamily: '"Barlow", sans-serif', fontWeight: "normal" }}
      >
        <SidebarLink icon={FaChartPie} text="Dashboard" href="/dashboard" active={pathname === "/dashboard"} />
        <SidebarLink icon={IoDocumentText} text="Order Detail" href="/orderdetails" active={pathname === "/orderdetails"} />
        <SidebarLink icon={FaUser} text="Customer" href="/customer" active={pathname === "/customer"} />
        <SidebarLink icon={IoMdAnalytics} text="Analytics" href="/analytics" active={pathname === "/analytics"} />
        <SidebarLink icon={FaShoppingCart} text="Shopping List" href="/shoppinglist" active={pathname === "/shoppinglist"} />
        <SidebarLink icon={MdChat} text="Chat" href="/chat" active={pathname === "/chat"} />
        <SidebarLink icon={FaMapMarkerAlt} text="Map" href="/map" active={pathname === "/map"} />
        <SidebarLink icon={FaSignOutAlt} text="Logout" href="/logout" active={pathname === "/logout"} />
      </nav>
    </aside>
  );
}

// Fix: Add 'active' prop to SidebarLink component
function SidebarLink({ icon: Icon, text, href, active = false }: SidebarLinkProps) {
  return (
    <Link href={href} passHref>
      <div
        className={`flex items-center gap-3 p-2 rounded-lg ${
          active
            ? "bg-lime-200 text-[#464255] font-bold" // Active state highlighted
            : "text-[#464255]"
        } hover:bg-lime-100 cursor-pointer`}
      >
        <Icon className="text-xl" />
        <span>{text}</span>
      </div>
    </Link>
  );
}
