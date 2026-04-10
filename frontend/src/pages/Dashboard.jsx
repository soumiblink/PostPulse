import { useState } from "react";
import Navbar from "../components/ui/Navbar";
import SearchBar from "../components/ui/SearchBar";
import PostList from "../components/dashboard/PostList";
import StatsCards from "../components/dashboard/StatsCards";
import Charts from "../components/dashboard/Charts";
import Sidebar from "../components/ui/Sidebar";
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
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="max-w-4xl mx-auto w-full p-6 space-y-6">
          <SearchBar onSearch={setQuery} />
          <StatsCards posts={posts} />
          <Charts posts={posts} />
          <PostList posts={displayPosts} />
        </div>
      </div>
      <RightPanel posts={posts} />
    </div>
  );
}
