import MetricCard from "../ui/MetricCard";

export default function StatsCards({ posts }) {
  const avgLength = posts.length
    ? Math.round(posts.reduce((a, b) => a + b.title.length, 0) / posts.length)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard title="Total Posts" value={posts.length} />
      <MetricCard title="Avg Title Length" value={avgLength} />
      <MetricCard title="Users" value="10+" />
    </div>
  );
}
