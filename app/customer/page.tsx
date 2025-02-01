"use client";

import Sidebar from "../components/Sidebar";

export default function Customer() {
  const customers = [
    { name: "Ahnaf", address: "Kuratoli", phone: "017XXXXXXXX" },
    { name: "Fariha", address: "Badda", phone: "017XXXXXXXX" },
    { name: "Noor", address: "Khilkhet", phone: "017XXXXXXXX" },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      <h1 className="text-2xl font-bold text-[#464255] mb-4">
        Customer Detail
      </h1>
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-[#EEF4E6] text-left">
            <th className="p-3 font-semibold text-[#464255]">Customer Name</th>
            <th className="p-3 font-semibold text-[#464255]">Address</th>
            <th className="p-3 font-semibold text-[#464255]">Phone Number</th>
            <th className="p-3 font-semibold text-[#464255]">Contact</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {customers.map((customer, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{customer.name}</td>
              <td className="p-3">{customer.address}</td>
              <td className="p-3">{customer.phone}</td>
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
  );
}
