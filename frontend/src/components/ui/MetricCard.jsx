export default function MetricCard({ title, value }) {
  return (
    <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
      <p className="text-sm text-neutral-400">{title}</p>
      <h2 className="text-2xl font-semibold mt-2">{value}</h2>
    </div>
  );
}
