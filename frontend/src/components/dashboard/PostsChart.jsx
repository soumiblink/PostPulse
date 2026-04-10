import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PostsChart({ data }) {
  const chartData = data.slice(0, 20).map((p, i) => ({
    name: i,
    length: p.title.length,
  }));

  return (
    <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 w-full">
      <h2 className="mb-4 text-lg font-semibold">Post Trends</h2>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="length" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
