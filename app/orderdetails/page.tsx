"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function OrderDetails() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Fetch Orders from API
  const fetchOrders = async (authToken: string) => {
    try {
      const response = await axios.get("http://localhost:5000/orderdetails", {
        headers: { Authorization: `Bearer ${authToken}` },
        withCredentials: true,
      });

      setOrders(response.data); // ✅ Set API Response Data
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.error("Unauthorized: Redirecting to login.");
        localStorage.removeItem("accessToken"); // Remove invalid token
        router.push("/login"); // Redirect to login
      } else {
        console.error("Order fetch error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch token & orders on component mount
  useEffect(() => {
    const authToken = localStorage.getItem("accessToken");

    if (!authToken) {
      console.warn("No access token found! Redirecting to login...");
      router.push("/login");
      return;
    }

    setToken(authToken); // ✅ Set token state
    fetchOrders(authToken); // ✅ Fetch orders
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-xl font-semibold">Loading orders...</p>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* ✅ Pass token to Topbar */}
        {token && <Topbar token={token} />}

        {/* Order Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-[#464255] mb-6" style={{ fontFamily: '"Barlow", sans-serif' }}>
            Order Details
          </h1>
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-lime-200 text-left">
                <th className="p-3 font-bold text-[#464255]">Customer Name</th>
                <th className="p-3 font-bold text-[#464255]">Parcel ID</th>
                <th className="p-3 font-bold text-[#464255]">Address</th>
                <th className="p-3 font-bold text-[#464255]">Phone Number</th>
                <th className="p-3 font-bold text-[#464255]">Delivery Status</th>
                <th className="p-3 font-bold text-[#464255]">Contact</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{order.customerName}</td>
                    <td className="p-3">{order.parcelId}</td>
                    <td className="p-3">{order.address}</td>
                    <td className="p-3">{order.phoneNumber}</td>
                    <td className="p-3">
                      {/* ✅ Styled Delivery Status */}
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          order.deliveryStatus === "DELIVERED"
                            ? "bg-green-100 text-green-700 border border-green-400"
                            : order.deliveryStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-700 border border-yellow-400"
                            : order.deliveryStatus === "IN PROCESS"
                            ? "bg-blue-100 text-blue-700 border border-blue-400"
                            : "bg-red-100 text-red-700 border border-red-400"
                        }`}
                      >
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="px-4 py-1 text-green-600 border border-green-600 rounded-full hover:bg-green-100">
                        Chat
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
