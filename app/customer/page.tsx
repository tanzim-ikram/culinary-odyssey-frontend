"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Customer() {
  const router = useRouter();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Fetch Customers from API
  const fetchCustomers = async (authToken: string) => {
    try {
      const response = await axios.get("http://localhost:5000/customers", {
        headers: { Authorization: `Bearer ${authToken}` },
        withCredentials: true,
      });

      setCustomers(response.data); // ✅ Set API Response Data
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.error("Unauthorized: Redirecting to login.");
        localStorage.removeItem("accessToken"); // Remove invalid token
        router.push("/login"); // Redirect to login
      } else {
        console.error("Customer fetch error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch token & customers on component mount
  useEffect(() => {
    const authToken = localStorage.getItem("accessToken");

    if (!authToken) {
      console.warn("No access token found! Redirecting to login...");
      router.push("/login");
      return;
    }

    setToken(authToken); // ✅ Set token state
    fetchCustomers(authToken); // ✅ Fetch customers
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-xl font-semibold">Loading customers...</p>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* ✅ Pass token to Topbar */}
        {token && <Topbar token={token} />}

        {/* Customer Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-[#464255] mb-6" style={{ fontFamily: '"Barlow", sans-serif' }}>
            Customer Details
          </h1>
          <table className="w-full border border-gray-300 rounded-lg" style={{ fontFamily: '"Barlow", sans-serif' }}>
            <thead>
              <tr className="bg-lime-200 text-left">
                <th className="p-3 font-bold text-[#464255]">Customer Name</th>
                <th className="p-3 font-bold text-[#464255]">Address</th>
                <th className="p-3 font-bold text-[#464255]">Phone Number</th>
                <th className="p-3 font-bold text-[#464255]">Contact</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers.length > 0 ? (
                customers.map((customer, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{customer.customerName}</td>
                    <td className="p-3">{customer.address}</td>
                    <td className="p-3">{customer.phoneNumber}</td>
                    <td className="p-3">
                      <button className="px-4 py-1 text-green-600 border border-green-600 rounded-full hover:bg-green-100">
                        Chat
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    No customers found.
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
