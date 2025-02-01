export default function OrderTable() {
    const orders = [
      { name: "Ahnaf", id: "COA98D", location: "Kuratoli", status: "Delivered" },
      { name: "Fariha", id: "CODA2H", location: "Badda", status: "Pending" },
      { name: "Noor", id: "CO88Z0", location: "Khilkhet", status: "In Progress" },
      { name: "Rahat", id: "COFDT8", location: "Mohammadpur", status: "Failed" },
    ];
  
    return (
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-lime-200">
            <th className="p-2">Customer Name</th>
            <th className="p-2">Parcel ID</th>
            <th className="p-2">Location</th>
            <th className="p-2">Delivery Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders.map((order, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{order.name}</td>
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.location}</td>
              <td className="p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  