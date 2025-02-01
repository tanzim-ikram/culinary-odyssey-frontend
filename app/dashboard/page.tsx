import Image from "next/image";
import { FaBell, FaRegCommentDots, FaUserCircle } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
// import { IoDocumentTextOutline } from "react-icons/io5";
import Sidebar from "@/app/components/Sidebar";
import DashboardCard from "@/app/components/DashboardCard";
import OrderTable from "@/app/components/OrderTable";
// import OrderChart from "@/components/OrderChart";
// import ShoppingList from "@/components/ShoppingList";
// import MapLocations from "@/components/MapLocations";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navbar */}
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

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Delivered"
            count="357"
            icon="/icons/boxes.png"
          />
          <DashboardCard
            title="Pending Delivery"
            count="75"
            icon="/icons/preorder.png"
          />
          <DashboardCard
            title="Delivery in Progress"
            count="28"
            icon="/icons/delivery-truck.png"
          />
          <DashboardCard
            title="Failed Delivery"
            count="65"
            icon="/icons/failed.png"
          />
        </div>

        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Active Orders Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            {/* Header with Title and "View all" Link */}
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-xl font-bold text-[#464255]"
                style={{ fontFamily: '"Barlow", sans-serif' }}
              >
                Active Orders
              </h2>

              <a
                href="#"
                className="text-[#75A957] hover:underline"
                style={{ fontFamily: '"Barlow", sans-serif', fontWeight: "normal" }}
              >
                View all
              </a>
            </div>

            {/* Orders Table */}
            <OrderTable />
          </div>

          {/* Order Chart */}
          {/* <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Chart</h2>
            <OrderChart />
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
}
