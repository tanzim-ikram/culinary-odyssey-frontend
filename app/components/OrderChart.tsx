"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FaDownload } from "react-icons/fa";

const data = [
  { day: "Sun", orders: 120 },
  { day: "Mon", orders: 200 },
  { day: "Tue", orders: 456 },
  { day: "Wed", orders: 320 },
  { day: "Thu", orders: 410 },
  { day: "Fri", orders: 380 },
  { day: "Sat", orders: 450 },
];

export default function OrderChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div style={{ fontFamily: '"Barlow", sans-serif' }}>
          <h2 className="text-xl font-bold text-[#464255]">
            Order Chart
          </h2>
          <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adip</p>
        </div>

        {/* Save Report Button */}
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-lime-200 text-[#464255]  hover:bg-lime-300 hover:border-[#464255]" style={{ fontFamily: '"Barlow", sans-serif', fontWeight: "bold" }}>
          <FaDownload />
          <span>Save Report</span>
        </button>
      </div>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={460}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4A90E2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" style={{ fontFamily: '"Barlow", sans-serif', fontWeight: "normal" }}/>
          <YAxis style={{ fontFamily: '"Barlow", sans-serif', fontWeight: "normal" }}/>
          <Tooltip />
          <Line type="monotone" dataKey="orders" stroke="#4A90E2" strokeWidth={2} fill="url(#colorBlue)" dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
