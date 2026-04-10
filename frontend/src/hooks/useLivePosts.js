import { useWebSocket } from "./useWebSocket";

export const useLivePosts = (posts, setPosts) => {
  useWebSocket((data) => {
    if (data.type === "NEW_POST") {
      setPosts((prev) => [data.post, ...prev]);
    }
    if (data.type === "UPDATE_POST") {
      setPosts((prev) =>
        prev.map((p) => (p.id === data.post.id ? data.post : p))
      );
    }
    if (data.type === "DELETE_POST") {
      setPosts((prev) => prev.filter((p) => p.id !== Number(data.id)));
    }
  });
};
