import { BarChart3 } from "lucide-react";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-neutral-950 border-b border-neutral-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <BarChart3 className="text-blue-500" />
          PostPulse
        </div>
      </div>
    </div>
  );
}
