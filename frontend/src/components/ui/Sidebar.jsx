import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 p-6 hidden lg:flex flex-col gap-6">
      <h1 className="text-xl font-bold">PostPulse</h1>
      <nav className="space-y-3">
        <button
          onClick={() => navigate("/")}
          className="block text-left hover:text-white text-neutral-400"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/create")}
          className="block text-left hover:text-white text-neutral-400"
        >
          Create
        </button>
      </nav>
      <button
        onClick={() => navigate("/create")}
        className="mt-6 bg-white text-black py-2 rounded-full font-medium hover:scale-105 transition"
      >
        + Post
      </button>
    </div>
  );
}
