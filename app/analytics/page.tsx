"use client";

import OrderChart from "@/app/components/OrderChart";
import Sidebar from "../components/Sidebar";

export default function Analytics() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
    {/* Sidebar */}
      <Sidebar />
      <h1 className="text-2xl font-bold text-[#464255] mb-4">Analytics</h1>
      <OrderChart />
    </div>
  );
}
