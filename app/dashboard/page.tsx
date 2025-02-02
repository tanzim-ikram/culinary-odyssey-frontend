"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import DashboardCard from "@/app/components/DashboardCard";
import OrderChart from "@/app/components/OrderChart";
import MapLocations from "@/app/components/MapLocations";

export default function Dashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [shoppingLists, setShoppingLists] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);

  // Function to check authentication
  const checkAuth = async () => {
    const storedToken = localStorage.getItem("accessToken");

    if (!storedToken) {
      console.warn("No access token found! Redirecting to login...");
      router.push("/login");
      return;
    }

    setToken(storedToken); // ✅ Store Token in State

    try {
      const response = await axios.get("http://localhost:5000/dashboard", {
        headers: { Authorization: `Bearer ${storedToken}` },
        withCredentials: true,
      });

      console.log("Dashboard Data:", response.data);
      setDashboardData(response.data);

      // ✅ FIX: Update shopping list state when dashboard data is fetched
      if (response.data.topShoppingLists) {
        setShoppingLists(response.data.topShoppingLists);
      }
    } catch (error: any) {
      console.error("Authentication failed:", error.response?.data || error.message);
      localStorage.removeItem("accessToken"); // Remove invalid token
      router.push("/login"); // Redirect to login
    }
  };

  // ✅ FIX: Ensure shoppingLists updates when dashboardData changes
  useEffect(() => {
    if (dashboardData?.topShoppingLists) {
      setShoppingLists(dashboardData.topShoppingLists);
    }
  }, [dashboardData]);

  // Function to delete an item from the shopping list
  const handleDeleteItem = async (id: number) => {
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/shoppinglist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      // ✅ FIX: Update shoppingLists state after deletion
      setShoppingLists((prev) => prev.filter((item) => item.id !== id));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Failed to delete item:", error.response?.data || error.message);
      } else {
        console.error("Failed to delete item:", error);
      }
    }
  };

  // Run authentication check when component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  if (!dashboardData) {
    return <p className="text-center mt-10 text-xl font-semibold">Loading dashboard...</p>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="flex-1 p-6"
        style={{ fontFamily: '"Barlow", sans-serif' }}
      >
        {/* Top Navbar */}
        <Topbar token={token} />

        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Hi, {dashboardData?.user?.firstName}! Welcome back to Culinary
            Odyssey!
          </h1>
          <span className="text-gray-600 text-sm">
            User ID: {dashboardData?.user?.userId}
          </span>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Delivered"
            count={dashboardData?.stats?.totalDeliveries?.count || 0}
            icon="/icons/boxes.png"
          />
          <DashboardCard
            title="Pending Delivery"
            count={dashboardData?.stats?.pendingDeliveries?.count || 0}
            icon="/icons/preorder.png"
          />
          <DashboardCard
            title="Delivery in Progress"
            count={dashboardData?.stats?.deliveriesInProgress || 0}
            icon="/icons/delivery-truck.png"
          />
          <DashboardCard
            title="Failed Delivery"
            count={dashboardData?.stats?.failedDeliveries || 0}
            icon="/icons/failed.png"
          />
        </div>

        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Active Orders Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#464255]">
                Active Orders
              </h2>
              <a
                href="/orderdetails"
                className="text-[#75A957] hover:underline"
              >
                View all
              </a>
            </div>
            <table
              className="w-full text-center border border-gray-300 rounded-lg overflow-hidden"
              style={{ fontFamily: '"Barlow", sans-serif' }}
            >
              <thead className="bg-lime-200 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Parcel ID</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.topOrders?.length > 0 ? (
                  dashboardData.topOrders.map((order: any) => (
                    <tr key={order.id} className="border-b">
                      <td className="pt-4 pb-4">{order.customerName}</td>
                      <td className="pt-4 pb-4">{order.parcelId}</td>
                      <td className="p-2">{order.address}</td>
                      <td className="pt-4 pb-4">
                        <span
                          className={`px-3 py-1 text-sm font-bold rounded-lg ${
                            order.deliveryStatus === "DELIVERED"
                              ? "bg-green-100 text-green-500 border-green-500 border"
                              : order.deliveryStatus === "PENDING"
                              ? "bg-yellow-100 text-yellow-500 border-yellow-500 border"
                              : order.deliveryStatus === "IN PROCESS"
                              ? "bg-blue-100 text-blue-500 border-blue-500 border"
                              : "bg-red-100 text-red-500 border-red-500 border"
                          }`}
                        >
                          {order.deliveryStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center p-4 text-gray-500">
                      No active orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Order Chart (Day-wise Orders) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <OrderChart dayWiseOrders={dashboardData?.dayWiseOrders || {}} />
          </div>
        </div>

        {/* Shopping List & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Shopping List */}
          <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-row items-baseline justify-between">
              <h2 className="text-xl font-bold mb-4">Shopping List</h2>
              <a href="/shoppinglist" className="text-[#75A957] hover:underline">
              View all
              </a>
            </div>
            <ul>
              {shoppingLists.length > 0 ? (
                shoppingLists.map((item: any) => (
                  <li key={item.id} className="p-2 border-b">
                    <label className="flex flex-row items-center justify-between">
                      <div className="space-x-2 flex items-center">
                        <input
                          type="checkbox" 
                          className="form-checkbox w-4 h-4"
                          onChange={() => handleDeleteItem(item.id)}
                        />
                        <span>{item.name}</span>
                      </div>

                      <span>
                        {item.quantity} {item.unit}
                      </span>
                    </label>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No shopping lists found.</p>
              )}
            </ul>
          </div>

          {/* Map Locations */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-row items-baseline justify-between">
              <h2 className="text-xl font-bold mb-4">Delivery Locations</h2>
              <a href="/map" className="text-[#75A957] hover:underline">
                Open map
              </a>
            </div>

            <MapLocations locations={dashboardData?.mapLocations || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
