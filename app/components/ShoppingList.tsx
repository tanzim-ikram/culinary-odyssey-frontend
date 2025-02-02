"use client";

export default function ShoppingList() {
  const items = [
    { name: "Chicken", quantity: "10 kg" },
    { name: "Potato", quantity: "10 kg" },
    { name: "Onion", quantity: "5 kg" },
    { name: "Lentils", quantity: "2 kg" },
    { name: "Chicken", quantity: "10 kg" },
    { name: "Potato", quantity: "10 kg" },
    { name: "Onion", quantity: "5 kg" },
    { name: "Lentils", quantity: "2 kg" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Header with "View all" link */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#464255]" style={{ fontFamily: '"Barlow", sans-serif' }}>
          Shopping list
        </h2>
        <a href="/shoppinglist" className="text-[#75A957] hover:underline" style={{ fontFamily: '"Barlow", sans-serif' }}>
          View all
        </a>
      </div>

      {/* Shopping List Items */}
      <ul className="space-y-2" style={{ fontFamily: '"Barlow", sans-serif' }}>
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
              {item.name}
            </label>
            <span className="text-gray-500">{item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
