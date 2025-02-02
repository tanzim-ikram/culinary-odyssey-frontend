"use client";

import Sidebar from "../components/Sidebar";

export default function OrderDetails() {
  const orders = [
    { name: "Ahnaf", parcelId: "COA98D", address: "Kuratoli", phone: "017XXXXXXXX", status: "Delivered" },
    { name: "Fariha", parcelId: "CODA2H", address: "Badda", phone: "017XXXXXXXX", status: "Pending" },
    { name: "Noor", parcelId: "CO88ZQ", address: "Khilkhet", phone: "017XXXXXXXX", status: "In Progress" },
    { name: "Ishita", parcelId: "CO90X7", address: "Badda", phone: "017XXXXXXXX", status: "Pending" },
    { name: "Farhana", parcelId: "COU6WZ", address: "Nikunjo", phone: "017XXXXXXXX", status: "In Progress" },
    { name: "Rafsan", parcelId: "COH973", address: "Uttara", phone: "017XXXXXXXX", status: "Pending" },
    { name: "Rahat", parcelId: "COFDT8", address: "Mohammadpur", phone: "017XXXXXXXX", status: "Failed" },
    { name: "Rakib", parcelId: "COFWT5", address: "Kuratoli", phone: "017XXXXXXXX", status: "Delivered" },
    { name: "Foysal", parcelId: "CODD08", address: "Mirpur", phone: "017XXXXXXXX", status: "Pending" },
    { name: "Mamun", parcelId: "COUDI3", address: "Bashundhara", phone: "017XXXXXXXX", status: "Delivered" },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Order Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#464255] mb-6">Order Details</h1>
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
              {orders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.parcelId}</td>
                  <td className="p-3">{order.address}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">
                    {/* ✅ Styled Delivery Status */}
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700 border border-green-400"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 border border-yellow-400"
                          : order.status === "In Progress"
                          ? "bg-blue-100 text-blue-700 border border-blue-400"
                          : "bg-red-100 text-red-700 border border-red-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="px-4 py-1 text-green-600 border border-green-600 rounded-full hover:bg-green-100">
                      Chat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
