"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import DashboardCard from "@/app/components/DashboardCard";
import OrderTable from "@/app/components/OrderTable";
import OrderChart from "@/app/components/OrderChart";
import ShoppingList from "@/app/components/ShoppingList";
import MapLocations from "@/app/components/MapLocations";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  // Function to check authentication
  const checkAuth = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("No access token found! Redirecting to login...");
      router.push("/login");
      return;
    }

    try {
      const response = await axios.get("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Ensures cookies are sent
      });

      console.log("Dashboard Data:", response.data);
      setDashboardData(response.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Authentication failed:", error.response?.data || error.message);
      localStorage.removeItem("accessToken"); // Remove invalid token
      router.push("/login"); // Redirect to login
    }
  };

  // Run authentication check when component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <p className="text-center mt-10 text-xl font-semibold">Redirecting to login...</p>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navbar */}
        <Topbar />

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Total Delivered" count="357" icon="/icons/boxes.png" />
          <DashboardCard title="Pending Delivery" count="75" icon="/icons/preorder.png" />
          <DashboardCard title="Delivery in Progress" count="28" icon="/icons/delivery-truck.png" />
          <DashboardCard title="Failed Delivery" count="65" icon="/icons/failed.png" />
        </div>

        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Active Orders Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#464255]" style={{ fontFamily: '"Barlow", sans-serif' }}>
                Active Orders
              </h2>
              <a href="/orderdetails" className="text-[#75A957] hover:underline" style={{ fontFamily: '"Barlow", sans-serif' }}>
                View all
              </a>
            </div>
            <OrderTable />
          </div>

          {/* Order Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <OrderChart />
          </div>
        </div>

        {/* Shopping List & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ShoppingList />
          <MapLocations />
        </div>
      </div>
    </div>
  );
}
