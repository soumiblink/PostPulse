import { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import SearchBar from "../components/ui/SearchBar";
import PostList from "../components/dashboard/PostList";
import StatsCards from "../components/dashboard/StatsCards";
import Charts from "../components/dashboard/Charts";
import RightPanel from "../components/ui/RightPanel";
import { usePosts } from "../hooks/usePosts";
import { useLivePosts } from "../hooks/useLivePosts";

export default function Dashboard() {
  const [posts, setPosts] = usePosts();
  const [query, setQuery] = useState("");

  useLivePosts(posts, setPosts);

  const displayPosts = query.length > 0
    ? posts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    : posts;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <SearchBar onSearch={setQuery} />
        <StatsCards posts={posts} />
        <Charts posts={posts} />
        <PostList posts={displayPosts} />
      </div>
      <RightPanel posts={posts} />
    </div>
  );
}
