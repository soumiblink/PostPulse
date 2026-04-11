import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
      setTitle(res.data.title);
      setBody(res.data.body);
    } catch (err) {
      setError("Failed to load post.");
      console.error(err);
    }
  };

  useEffect(() => { fetchPost(); }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/posts/${id}`, { title, body });
      toast.success("Post updated ✅");
      setEditMode(false);
      fetchPost();
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`);
      toast.success("Post deleted 🗑️");
      navigate("/");
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  if (error) return <div className="p-6 text-red-400">{error}</div>;
  if (!post) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-white space-y-4">
      {editMode ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-neutral-900 rounded border border-neutral-700 outline-none"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="w-full p-3 bg-neutral-900 rounded border border-neutral-700 outline-none"
          />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-neutral-300 leading-relaxed">{post.body}</p>
        </>
      )}

      <div className="flex gap-3 pt-2">
        {editMode ? (
          <button onClick={handleUpdate} className="bg-green-600 px-4 py-2 rounded-lg text-sm font-medium">
            Save
          </button>
        ) : (
          <button onClick={() => setEditMode(true)} className="bg-yellow-600 px-4 py-2 rounded-lg text-sm font-medium">
            Edit
          </button>
        )}
        <button onClick={handleDelete} className="bg-red-600 px-4 py-2 rounded-lg text-sm font-medium">
          Delete
        </button>
        <button onClick={() => navigate("/")} className="bg-neutral-700 px-4 py-2 rounded-lg text-sm font-medium">
          ← Back
        </button>
      </div>
    </div>
  );
}
