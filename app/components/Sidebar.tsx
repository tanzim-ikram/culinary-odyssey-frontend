import { FaChartPie, FaShoppingCart, FaUser, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdOutlineChat } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
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
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <h1 className="text-lg font-bold text-[#C09659]">Culinary Odyssey</h1>
      </div>

      {/* Menu */}
      <nav className="space-y-4">
        <SidebarLink icon={FaChartPie} text="Dashboard" active />
        <SidebarLink icon={IoDocumentTextOutline} text="Order Detail" />
        <SidebarLink icon={FaUser} text="Customer" />
        <SidebarLink icon={IoAnalyticsOutline} text="Analytics" />
        <SidebarLink icon={FaShoppingCart} text="Shopping List" />
        <SidebarLink icon={MdOutlineChat} text="Chat" />
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
          active ? "bg-green-100 text-green-700" : "text-gray-700"
        } hover:bg-green-50 cursor-pointer`}
      >
        <Icon className="text-xl" />
        <span>{text}</span>
      </div>
    );
  }
  
//   export default SidebarLink;