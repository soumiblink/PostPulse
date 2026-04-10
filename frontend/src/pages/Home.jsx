import { useEffect, useState } from "react";
import { getPosts, initPosts } from "../api/postApi";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import SearchBar from "../components/ui/SearchBar";
import { useWebSocket } from "../hooks/useWebSocket";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useWebSocket((data) => {
    if (Array.isArray(data)) setPosts(data);
  });

  useEffect(() => {
    const fetchData = async () => {
      await initPosts();
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>PostPulse 🚀</h1>
      <SearchBar onSearch={() => {}} />
      {loading ? (
        <Loader />
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "15px",
        }}>
          {posts.map((post) => (
            <PostCard key={post._id || post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
