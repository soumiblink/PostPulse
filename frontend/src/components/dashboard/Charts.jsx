import PostsChart from "./PostsChart";

export default function Charts({ posts }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <PostsChart data={posts} />
    </div>
  );
}
