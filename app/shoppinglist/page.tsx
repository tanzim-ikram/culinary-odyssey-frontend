"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { FaTimes } from "react-icons/fa";

export default function ShoppingList() {
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [token, setToken] = useState<string | null>(null);

  // ✅ Fetch shopping list from API
  const fetchShoppingList = async (authToken: string) => {
    try {
      const response = await axios.get("http://localhost:5000/shoppinglist", {
        headers: { Authorization: `Bearer ${authToken}` },
        withCredentials: true,
      });
      // Sort: PENDING first, BOUGHT last
      setItems(response.data.sort((a: any, b: any) => (a.status === "BOUGHT" ? 1 : -1)));
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  };

  // ✅ Fetch token & shopping list on component mount
  useEffect(() => {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      console.warn("No access token found! Redirecting to login...");
      return;
    }
    setToken(authToken);
    fetchShoppingList(authToken);
  }, []);

  // ✅ Add item to shopping list
  const addItem = async () => {
    if (!newItem.trim() || !newQuantity.trim() || !newUnit.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/shoppinglist",
        {
          name: newItem,
          quantity: newQuantity,
          unit: newUnit,
          status: "PENDING", // Default status
        },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      setItems([...items, response.data].sort((a, b) => (a.status === "BOUGHT" ? 1 : -1)));
      setNewItem("");
      setNewQuantity("");
      setNewUnit("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // ✅ Toggle Bought Status (Checked = BOUGHT, Unchecked = PENDING)
  const toggleBoughtStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "PENDING" ? "BOUGHT" : "PENDING"; // Toggle status

    try {
      await axios.put(
        `http://localhost:5000/shoppinglist/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      setItems((prevItems) =>
        prevItems
          .map((item) => (item.id === id ? { ...item, status: newStatus } : item))
          .sort((a, b) => (a.status === "BOUGHT" ? 1 : -1))
      );
    } catch (error) {
      console.error("Error updating item status:", error);
    }
  };

  // ✅ Delete item from database & frontend
  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/shoppinglist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setItems(items.filter((item) => item.id !== id)); // Remove from frontend
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* ✅ Pass token to Topbar */}
        {token && <Topbar token={token} />}

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6" style={{ fontFamily: '"Barlow", sans-serif' }}>
          <h1 className="text-2xl font-bold text-[#464255] mb-2">Shopping List</h1>
          <p className="text-gray-500 mb-6">Hi, Welcome back to Culinary Odyssey!</p>

          {/* ✅ Top Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 flex items-center gap-4 border-gray-300 border">
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-700 mb-1">Item Name:</label>
              <input
                type="text"
                placeholder="Enter item name"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-1/4">
              <label className="block text-lg font-medium text-gray-700 mb-1">Quantity:</label>
              <input
                type="text"
                placeholder="Enter quantity"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* ✅ Select Unit */}
            <div className="w-1/4">
              <label className="block text-lg font-medium text-gray-700 mb-1">Unit:</label>
              <select
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Unit</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="liters">liters</option>
                <option value="piece">piece</option>
              </select>
            </div>

            <button
              onClick={addItem}
              className="mt-6 px-6 py-3 bg-lime-200 text-[#464255] font-bold rounded-md shadow-md hover:bg-lime-300 transition"
            >
              Add
            </button>
          </div>

          {/* ✅ Shopping List Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 border">
            <table className="w-full border border-gray-300 rounded-lg" style={{ fontFamily: '"Barlow", sans-serif' }}>
              <thead>
                <tr className="bg-lime-200 text-center">
                  <th className="p-3 font-bold text-[#464255]">Bought</th>
                  <th className="p-3 font-bold text-[#464255]">Item Name</th>
                  <th className="p-3 font-bold text-[#464255]">Quantity</th>
                  <th className="p-3 font-bold text-[#464255]">Unit</th>
                  <th className="p-3 font-bold text-[#464255]">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white text-center">
                {items.map((item) => (
                  <tr key={item.id} className="border-t">
                    {/* ✅ Checkbox to mark as Bought */}
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={item.status === "BOUGHT"}
                        onChange={() => toggleBoughtStatus(item.id, item.status)}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </td>

                    <td className={`p-3 ${item.status === "BOUGHT" ? "line-through text-gray-400" : ""}`}>{item.name}</td>
                    <td className={`p-3 ${item.status === "BOUGHT" ? "line-through text-gray-400" : ""}`}>{item.quantity}</td>
                    <td className={`p-3 ${item.status === "BOUGHT" ? "line-through text-gray-400" : ""}`}>{item.unit}</td>

                    {/* ✅ Delete Button */}
                    <td className="p-3 text-center">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <FaTimes />
                      </button>
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
