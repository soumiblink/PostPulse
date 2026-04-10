import Navbar from "../components/ui/Navbar";
import MetricCard from "../components/ui/MetricCard";
import PostsChart from "../components/dashboard/PostsChart";
import PostList from "../components/dashboard/PostList";
import { usePosts } from "../hooks/usePosts";

export default function Dashboard() {
  const posts = usePosts();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title="Total Posts" value={posts.length} />
          <MetricCard
            title="Avg Title Length"
            value={
              posts.length
                ? Math.round(
                    posts.reduce((a, b) => a + b.title.length, 0) / posts.length
                  )
                : 0
            }
          />
          <MetricCard title="Users" value="10+" />
        </div>

        {/* CHART + LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PostsChart data={posts} />
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}
