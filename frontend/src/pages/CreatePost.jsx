import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await api.post("/posts", { title, body });
    navigate("/");
  };

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-white space-y-4">
      <h1 className="text-xl font-semibold">Create Post</h1>
      <input
        placeholder="Title"
        className="w-full p-3 bg-neutral-900 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        className="w-full p-3 bg-neutral-900 rounded"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 rounded">
        Create
      </button>
    </div>
  );
}
