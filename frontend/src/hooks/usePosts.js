import { useEffect, useState } from "react";
import { api } from "../services/api";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        await api.post("/posts/init");
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts:", err.message);
      }
    };
    load();
  }, []);

  return [posts, setPosts];
};
