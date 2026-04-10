const BASE_URL = "http://localhost:5000/api/posts";

export const getPosts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const initPosts = async () => {
  const res = await fetch(`${BASE_URL}/init`, {
    method: "POST",
  });
  return res.json();
};