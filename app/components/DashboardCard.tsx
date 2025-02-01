import Image from "next/image";

interface DashboardCardProps {
  title: string;
  count: string;
  icon: string;
}

export default function DashboardCard({ title, count, icon }: DashboardCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
      <Image src={icon} alt={title} width={50} height={50} />
      <div>
        <h3 className="text-3xl font-bold">{count}</h3>
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
  );
}
