import { api } from "../services/api";

export const getPosts = () => api.get("/posts").then((r) => r.data);
export const initPosts = () => api.post("/posts/init").then((r) => r.data);
export const getPostById = (id) => api.get(`/posts/${id}`).then((r) => r.data);
