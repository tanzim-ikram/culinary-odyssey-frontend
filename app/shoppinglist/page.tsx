"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

export default function ShoppingList() {
  const [items, setItems] = useState([
    { name: "Chicken", quantity: "20 kg", bought: false },
    { name: "Potato", quantity: "15 kg", bought: false },
    { name: "Onion", quantity: "15 kg", bought: false },
    { name: "Lentils", quantity: "5 kg", bought: false },
    { name: "Chili", quantity: "2 kg", bought: false },
    { name: "Rice", quantity: "25 kg", bought: false },
    { name: "Wheat", quantity: "20 kg", bought: false },
    { name: "Eggs", quantity: "30 pieces", bought: false },
    { name: "Tomatoes", quantity: "5 kg", bought: false },
  ]);

  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const addItem = () => {
    if (newItem.trim() && newQuantity.trim()) {
      setItems([
        ...items,
        { name: newItem, quantity: newQuantity, bought: false },
      ]);
      setNewItem("");
      setNewQuantity("");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Topbar Component */}
        <Topbar />

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6" style={{ fontFamily: '"Barlow", sans-serif' }}>
          <h1 className="text-2xl font-bold text-[#464255] mb-2">
            Shopping List
          </h1>
          <p className="text-gray-500 mb-6">
            Hi, John. Welcome back to Culinary Odyssey!
          </p>

          {/* Top Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 flex items-center gap-4 border-gray-300 border">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name:
              </label>
              <input
                type="text"
                placeholder="Enter item name"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity:
              </label>
              <input
                type="text"
                placeholder="Enter quantity"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <button
              onClick={addItem}
              className="mt-6 px-6 py-3 bg-lime-200 text-[#464255] font-semibold rounded-md shadow-md hover:bg-lime-300 transition"
            >
              Add
            </button>
          </div>

          {/* Shopping List Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 border">
            <table className="w-full border border-gray-300 rounded-lg" style={{ fontFamily: '"Barlow", sans-serif' }}>
              <thead>
                <tr className="bg-lime-200 text-center">
                  <th className="p-3 font-bold text-[#464255]">
                    Bought/ Not Bought
                  </th>
                  <th className="p-3 font-bold text-[#464255]">
                    Item Name
                  </th>
                  <th className="p-3 font-bold text-[#464255]">Quantity</th>
                </tr>
              </thead>
              <tbody className="bg-white text-center">
                {items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={item.bought}
                        onChange={() => {
                          const updatedItems = [...items];
                          updatedItems[index].bought =
                            !updatedItems[index].bought;
                          setItems(updatedItems);
                        }}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </td>
                    <td
                      className={`p-3 ${
                        item.bought ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {item.name}
                    </td>
                    <td
                      className={`p-3 ${
                        item.bought ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
