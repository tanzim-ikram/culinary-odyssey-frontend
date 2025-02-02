"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FaDownload } from "react-icons/fa";

interface OrderChartProps {
  dayWiseOrders: Record<string, number>;
}

export default function OrderChart({ dayWiseOrders }: OrderChartProps) {
  // Convert day-wise order data to chart-friendly format
  const data = [
    { day: "Sun", orders: dayWiseOrders["Sunday"] || 0 },
    { day: "Mon", orders: dayWiseOrders["Monday"] || 0 },
    { day: "Tue", orders: dayWiseOrders["Tuesday"] || 0 },
    { day: "Wed", orders: dayWiseOrders["Wednesday"] || 0 },
    { day: "Thu", orders: dayWiseOrders["Thursday"] || 0 },
    { day: "Fri", orders: dayWiseOrders["Friday"] || 0 },
    { day: "Sat", orders: dayWiseOrders["Saturday"] || 0 },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div style={{ fontFamily: '"Barlow", sans-serif' }}>
          <h2 className="text-xl font-bold text-[#464255]">
            Orders per Day
          </h2>
          <p className="text-gray-500 text-sm">Track daily order trends</p>
        </div>

        {/* Save Report Button */}
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-lime-200 text-[#464255] hover:bg-lime-300 hover:border-[#464255]" style={{ fontFamily: '"Barlow", sans-serif', fontWeight: "bold" }}>
          <FaDownload />
          <span>Save Report</span>
        </button>
      </div>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" style={{ fontFamily: '"Barlow", sans-serif', fontWeight: "normal" }} />
          <YAxis style={{ fontFamily: '"Barlow", sans-serif', fontWeight: "normal" }} />
          <Tooltip />
          <Line type="monotone" dataKey="orders" stroke="#4A90E2" strokeWidth={2} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
