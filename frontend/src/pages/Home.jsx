import { useEffect, useState } from "react";
import { getPosts, initPosts } from "../api/postApi";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import useWebSocket from "../hooks/useWebSocket";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // WebSocket
  const { sendMessage } = useWebSocket((data) => {
    setPosts(data);
  });

  useEffect(() => {
    const fetchData = async () => {
      await initPosts(); // fetch & save from API
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    sendMessage({ query });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>PostPulse 🚀</h1>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <Loader />
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "15px"
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