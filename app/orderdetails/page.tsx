"use client";

import OrderTable from "@/app/components/OrderTable";
import Sidebar from "../components/Sidebar";

export default function OrderDetails() {
  return (
    <div className="flex bg-gray-100 min-h-screen ">
      {/* Sidebar */}
      <Sidebar />
      <div>
        <h1 className="text-2xl font-bold text-[#464255] mb-4">Order Detail</h1>
        <OrderTable />
      </div>
    </div>
  );
}
