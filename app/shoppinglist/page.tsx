"use client";

import Sidebar from "../components/Sidebar";

export default function ShoppingList() {
  const items = [
    { name: "Chicken", quantity: "10 kg" },
    { name: "Potato", quantity: "15 kg" },
    { name: "Onion", quantity: "5 kg" },
  ];

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
        {/* Sidebar */}
      <Sidebar />
      <h1 className="text-2xl font-bold text-[#464255] mb-4">Shopping List</h1>
      <div className="flex gap-4 mb-4">
        <input type="text" placeholder="Item Name" className="p-2 border rounded-md w-1/2" />
        <input type="text" placeholder="Quantity" className="p-2 border rounded-md w-1/4" />
        <button className="px-4 py-2 bg-[#75A957] text-white rounded-md">Add</button>
      </div>
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-[#EEF4E6] text-left">
            <th className="p-3 font-semibold text-[#464255]">Item Name</th>
            <th className="p-3 font-semibold text-[#464255]">Quantity</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {items.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
