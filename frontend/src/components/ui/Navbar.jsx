import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 border-b border-neutral-800 bg-neutral-950 text-white">
      <h1 className="text-lg font-semibold">PostPulse</h1>
      <button
        onClick={() => navigate("/create")}
        className="bg-blue-600 px-3 py-1 rounded"
      >
        + New Post
      </button>
    </div>
  );
}
