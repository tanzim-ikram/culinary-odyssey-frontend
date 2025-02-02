"use client";

import Sidebar from "../components/Sidebar";

export default function Customer() {
  const customers = [
    { name: "Ahnaf", address: "Kuratoli", phone: "017XXXXXXXX" },
    { name: "Fariha", address: "Badda", phone: "017XXXXXXXX" },
    { name: "Noor", address: "Khilkhet", phone: "017XXXXXXXX" },
    { name: "Ishita", address: "Badda", phone: "017XXXXXXXX" },
    { name: "Farhana", address: "Nikunjo", phone: "017XXXXXXXX" },
    { name: "Rafsan", address: "Uttara", phone: "017XXXXXXXX" },
    { name: "Rahat", address: "Mohammadpur", phone: "017XXXXXXXX" },
    { name: "Rakib", address: "Kuratoli", phone: "017XXXXXXXX" },
    { name: "Foysal", address: "Mirpur", phone: "017XXXXXXXX" },
    { name: "Mamun", address: "Bashundhara", phone: "017XXXXXXXX" },
    { name: "Abir", address: "Mohammadpur", phone: "017XXXXXXXX" },
    { name: "Saba", address: "Uttara", phone: "017XXXXXXXX" },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        

        {/* Customer Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#464255] mb-6">
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
      </div>
    </div>
  );
}
