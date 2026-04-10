import { useEffect, useState } from "react";
import { api } from "../services/api";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      await api.post("/posts/init");
      const res = await api.get("/posts");
      setPosts(res.data);
    };
    load();
  }, []);

  return posts;
};
