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

  const fetchPost = async () => {
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
    setTitle(res.data.title);
    setBody(res.data.body);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    await api.put(`/posts/${id}`, { title, body });
    toast.success("Post updated ✅");
    setEditMode(false);
    fetchPost();
  };

  const handleDelete = async () => {
    await api.delete(`/posts/${id}`);
    toast.success("Post deleted 🗑️");
    navigate("/");
  };

  if (!post) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-white space-y-4">
      {editMode ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-neutral-900 rounded"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 bg-neutral-900 rounded"
          />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p>{post.body}</p>
        </>
      )}

      <div className="flex gap-3">
        {editMode ? (
          <button onClick={handleUpdate} className="bg-green-600 px-3 py-1 rounded">
            Save
          </button>
        ) : (
          <button onClick={() => setEditMode(true)} className="bg-yellow-600 px-3 py-1 rounded">
            Edit
          </button>
        )}
        <button onClick={handleDelete} className="bg-red-600 px-3 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
