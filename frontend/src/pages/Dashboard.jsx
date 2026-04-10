import { useState } from "react";
import Navbar from "../components/ui/Navbar";
import SearchBar from "../components/ui/SearchBar";
import PostList from "../components/dashboard/PostList";
import StatsCards from "../components/dashboard/StatsCards";
import Charts from "../components/dashboard/Charts";
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
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <SearchBar onSearch={setQuery} />
        <StatsCards posts={posts} />
        <Charts posts={posts} />
        <PostList posts={displayPosts} />
      </div>
    </div>
  );
}
