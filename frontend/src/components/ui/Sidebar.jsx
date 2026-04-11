import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItem = (label, path) => {
    const active = location.pathname === path;
    return (
      <button
        onClick={() => navigate(path)}
        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
          active
            ? "bg-neutral-800 text-white font-medium"
            : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-60 min-h-screen bg-neutral-950 border-r border-neutral-800 flex flex-col p-5 gap-6 sticky top-0">
      {/* Logo */}
      <div className="text-xl font-bold tracking-tight text-white pt-2">
        PostPulse
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1">
        {navItem("Home", "/")}
        {navItem("Create Post", "/create")}
      </nav>

      {/* CTA at bottom */}
      <div className="mt-auto">
        <button
          onClick={() => navigate("/create")}
          className="w-full bg-white text-black py-2 rounded-full text-sm font-semibold hover:bg-neutral-200 transition"
        >
          + New Post
        </button>
      </div>
    </div>
  );
}
