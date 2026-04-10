export default function RightPanel({ posts = [] }) {
  return (
    <div className="w-80 p-6 hidden xl:block space-y-6">
      <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
        <h2 className="font-semibold mb-3">Stats</h2>
        <p className="text-sm text-neutral-400">Total posts: {posts.length}</p>
      </div>
      <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
        <h2 className="font-semibold mb-3">Live</h2>
        <p className="text-sm text-neutral-400">Real-time updates enabled ⚡</p>
      </div>
    </div>
  );
}
