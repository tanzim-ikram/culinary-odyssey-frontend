import {
  FaChartPie,
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
  FaSignOutAlt,
} 

from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { MdChat } from "react-icons/md";
import Image from "next/image";
import { IconType } from "react-icons";

interface SidebarLinkProps {
  icon: IconType;
  text: string;
  active?: boolean;
}
export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-screen p-6 shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <Image src="/co-logo.png" alt="Logo" width={80} height={80} />
        <h1
          className="text-3xl text-[#C4986A]"
          style={{
            fontFamily: '"Bayon", sans-serif',
            fontWeight: "normal",
            lineHeight: "1.0"
          }}
        >
          Culinary Odyssey
        </h1>
      </div>

      {/* Menu */}
      <nav className="space-y-4">
        <SidebarLink icon={FaChartPie} text="Dashboard" active />
        <SidebarLink icon={IoDocumentText } text="Order Detail" />
        <SidebarLink icon={FaUser} text="Customer" />
        <SidebarLink icon={IoMdAnalytics} text="Analytics" />
        <SidebarLink icon={FaShoppingCart} text="Shopping List" />
        <SidebarLink icon={MdChat} text="Chat" />
        <SidebarLink icon={FaMapMarkerAlt} text="Map" />
        <SidebarLink icon={FaSignOutAlt} text="Logout" />
      </nav>
    </aside>
  );
}

function SidebarLink({ icon: Icon, text, active = false }: SidebarLinkProps) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg ${
        active
          ? "bg-lime-200 text-[#464255] font-bold" // Active state
          : "text-[#464255]"
      } hover:bg-lime-100 cursor-pointer`}
    >
      <Icon className="text-xl" />
      <span>{text}</span>
    </div>
  );
}


//   export default SidebarLink;
