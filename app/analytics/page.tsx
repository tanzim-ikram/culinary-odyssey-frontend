"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { BarChart, Bar } from "recharts";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";

interface Stats {
  totalParcels: string;
  successfulDeliveries: string;
  failedDeliveries: string;
  customersByLocation: { location: string; count: string }[];
  successfulVsFailedByMonth: { year: string; month: string; successful: string; failed: string }[];
  dayWiseOrders: Record<string, string>;
}

export default function Analytics() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Stats Data from API
  const fetchStats = async (authToken: string) => {
    try {
      const response = await axios.get<Stats>("http://localhost:5000/stats", {
        headers: { Authorization: `Bearer ${authToken}` },
        withCredentials: true,
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch token & stats on component mount
  useEffect(() => {
    const authToken = localStorage.getItem("accessToken");

    if (!authToken) {
      console.warn("No access token found! Redirecting to login...");
      return;
    }

    setToken(authToken); // ✅ Store Token
    fetchStats(authToken); // ✅ Fetch Analytics Data
  }, []);

  // ✅ Export Data to Excel
  const handleSaveReport = () => {
    if (!stats) return;

    const workbook = XLSX.utils.book_new();

    // ✅ Sheet 1: Overview
    const overviewData = [
      ["Total Parcels", stats.totalParcels],
      ["Successful Deliveries", stats.successfulDeliveries],
      ["Failed Deliveries", stats.failedDeliveries],
    ];
    const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(workbook, overviewSheet, "Overview");

    // ✅ Sheet 2: Orders Per Day
    const ordersPerDay = [["Day", "Orders"]];
    Object.entries(stats.dayWiseOrders).forEach(([day, count]) => {
      ordersPerDay.push([day, count]);
    });
    const ordersSheet = XLSX.utils.aoa_to_sheet(ordersPerDay);
    XLSX.utils.book_append_sheet(workbook, ordersSheet, "Orders Per Day");

    // ✅ Sheet 3: Successful vs Failed Deliveries by Month
    const successfulVsFailed = [["Year", "Month", "Successful", "Failed"]];
    stats.successfulVsFailedByMonth.forEach((entry) => {
      successfulVsFailed.push([
        entry.year,
        entry.month,
        entry.successful,
        entry.failed,
      ]);
    });
    const deliverySheet = XLSX.utils.aoa_to_sheet(successfulVsFailed);
    XLSX.utils.book_append_sheet(workbook, deliverySheet, "Deliveries by Month");

    // ✅ Sheet 4: Customers by Location
    const customerData = [["Location", "Number of Customers"]];
    stats.customersByLocation.forEach((entry) => {
      customerData.push([entry.location, entry.count]);
    });
    const customerSheet = XLSX.utils.aoa_to_sheet(customerData);
    XLSX.utils.book_append_sheet(workbook, customerSheet, "Customers by Location");

    // ✅ Save File
    XLSX.writeFile(workbook, "Analytics_Report.xlsx");
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-xl font-semibold">
        Loading analytics...
      </p>
    );
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
        {/* ✅ Pass token to Topbar */}
        {token && <Topbar token={token} />}

        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-baseline mb-4">
            <h1 className="text-2xl font-bold text-[#464255] mb-6">Analytics</h1>
            <button
              onClick={handleSaveReport}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-lime-200 text-[#464255] font-bold hover:bg-lime-300 hover:border-[#464255]"
            >
              <FaDownload />
              <span>Save Report</span>
            </button>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ✅ Pie Chart (Total Orders, Successful, Failed) */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 border">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold">Delivery Overview</h2>
                <p className="text-gray-500 text-sm">Monitor overall parcel delivery performance</p>
            </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart className="mt-6">
                  <Pie
                    data={[
                      { name: "Total Orders", value: stats?.totalParcels || 0, color: "#4A90E2" },
                      { name: "Successful Deliveries", value: stats?.successfulDeliveries || 0, color: "#50B83C" },
                      { name: "Failed Deliveries", value: stats?.failedDeliveries || 0, color: "#F44336" },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    <Cell fill="#4A90E2" />
                    <Cell fill="#50B83C" />
                    <Cell fill="#F44336" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* ✅ Order Chart (Day-wise Orders) */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 border">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold">Orders per Day</h2>
                <p className="text-gray-500 text-sm">Track daily order trends</p>
            </div>
              <ResponsiveContainer width="100%" height={200} className="mt-7">
                <LineChart
                  data={Object.entries(stats?.dayWiseOrders || {}).map(([day, count]) => ({ day, orders: count }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#4A90E2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* ✅ Successful vs Failed Deliveries */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 border">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">Successful vs Failed Deliveries</h2>
                <p className="text-gray-500 text-sm">Compare delivery success rates over time</p>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart className="mt-6" data={stats?.successfulVsFailedByMonth || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="successful" stroke="#4A90E2" strokeWidth={2} />
                  <Line type="monotone" dataKey="failed" stroke="#F44336" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* ✅ Customer Map (Bar Chart) */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 border">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">Customer by Location</h2>
                <p className="text-gray-500 text-sm">Visualize customer distribution across regions</p>
              </div>
              <ResponsiveContainer width="100%" height={230} className="mt-10">
                <BarChart data={stats?.customersByLocation || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
