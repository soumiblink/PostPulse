import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Title and body are required");
      return;
    }
    try {
      setLoading(true);
      await api.post("/posts", { title, body });
      toast.success("Post created ✅");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-white space-y-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold">Create Post</h1>
      <input
        placeholder="Title"
        className="w-full p-3 bg-neutral-900 rounded border border-neutral-700 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        rows={6}
        className="w-full p-3 bg-neutral-900 rounded border border-neutral-700 outline-none"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-neutral-700 rounded-lg text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
