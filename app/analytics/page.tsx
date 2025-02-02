"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { BarChart, Bar } from "recharts";
import { FaDownload } from "react-icons/fa";

export default function Analytics() {
  // Pie Chart Data
  const pieData = [
    { name: "Total Order", value: 81, color: "#4A90E2" },
    { name: "Successful Delivery", value: 22, color: "#50B83C" },
    { name: "Failed Delivery", value: 62, color: "#F44336" },
  ];

  // Order Chart Data
  const orderData = [
    { day: "Sun", orders: 120 },
    { day: "Mon", orders: 200 },
    { day: "Tue", orders: 456 },
    { day: "Wed", orders: 320 },
    { day: "Thu", orders: 410 },
    { day: "Fri", orders: 380 },
    { day: "Sat", orders: 450 },
  ];

  // Successful vs Failed Deliveries
  const deliveryData = [
    { month: "Jan", success: 400, failed: 200 },
    { month: "Feb", success: 600, failed: 300 },
    { month: "Mar", success: 500, failed: 250 },
    { month: "Apr", success: 700, failed: 400 },
    { month: "May", success: 880, failed: 450 },
    { month: "Jun", success: 620, failed: 370 },
    { month: "Jul", success: 500, failed: 300 },
    { month: "Aug", success: 760, failed: 420 },
    { month: "Sep", success: 680, failed: 410 },
    { month: "Oct", success: 720, failed: 285 },
    { month: "Nov", success: 650, failed: 380 },
    { month: "Dec", success: 800, failed: 460 },
  ];

  // Customer Map Data (Bar Chart)
  const customerData = [
    { location: "Kuratoli", count: 50 },
    { location: "Bashundhara", count: 60 },
    { location: "Khilkhet", count: 45 },
    { location: "Nikunjo", count: 30 },
    { location: "Badda", count: 40 },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      
      {/* Main Content */}
      <div className="flex-1 p-6" style={{ fontFamily: '"Barlow", sans-serif' }}>
        {/* Topbar Component */}
        <Topbar />
        
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">

          <h1 className="text-2xl font-bold text-[#464255] mb-6">Analytics</h1>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Charts */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 border">
              <h2 className="text-lg font-semibold text-[#464255] mb-4">Pie Chart</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Order Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#464255]">Order Chart</h2>
                <button className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-lime-200 text-[#464255] font-bold hover:bg-lime-300 hover:border-[#464255]">
                  <FaDownload />
                  <span>Save Report</span>
                </button>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={orderData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#4A90E2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Successful vs Failed Delivery */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 border">
              <h2 className="text-lg font-semibold text-[#464255] mb-4">
                Successful Delivery vs Failed Delivery
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={deliveryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="success" stroke="#4A90E2" strokeWidth={2} />
                  <Line type="monotone" dataKey="failed" stroke="#F44336" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Customer Map (Bar Chart) */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 border">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-lg font-semibold text-[#464255]">Customer Map</h2>
                <button className="border px-4 py-2 rounded-lg bg-lime-200 text-[#464255] font-bold hover:bg-lime-300 hover:border-[#464255]">Monthly ▼</button>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={customerData}>
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
