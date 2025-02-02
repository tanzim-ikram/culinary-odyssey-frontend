export default function OrderTable() {
  const orders = [
    { name: "Ahnaf", id: "COA98D", location: "Kuratoli", status: "Delivered" },
    { name: "Fariha", id: "CODA2H", location: "Badda", status: "Pending" },
    { name: "Noor", id: "CO88Z0", location: "Khilkhet", status: "In Progress" },
    { name: "Rahat", id: "COFDT8", location: "Mohammadpur", status: "Failed" },
    { name: "Ahnaf", id: "COA98D", location: "Kuratoli", status: "Delivered" },
    { name: "Fariha", id: "CODA2H", location: "Badda", status: "Pending" },
    { name: "Noor", id: "CO88Z0", location: "Khilkhet", status: "In Progress" },
    { name: "Rahat", id: "COFDT8", location: "Mohammadpur", status: "Failed" },
    { name: "Noor", id: "CO88Z0", location: "Khilkhet", status: "In Progress" },
    { name: "Rahat", id: "COFDT8", location: "Mohammadpur", status: "Failed" },
  ];

  return (
    <table className="w-full border-collapse border rounded-lg shadow-md" style={{ fontFamily: '"Barlow", sans-serif', fontWeight: "normal" }}>
      <thead>
        <tr className="bg-[#EEF4E6] text-left">
          <th className="p-3 font-semibold text-[#464255]">Customer Name</th>
          <th className="p-3 font-semibold text-[#464255]">Parcel ID</th>
          <th className="p-3 font-semibold text-[#464255]">Location</th>
          <th className="p-3 font-semibold text-[#464255]">Delivery Status</th>
        </tr>
      </thead>
      <tbody className="text-center bg-white">
        {orders.map((order, index) => (
          <tr key={index} className="border-t">
            <td className="p-3">{order.name}</td>
            <td className="p-3">{order.id}</td>
            <td className="p-3">{order.location}</td>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
