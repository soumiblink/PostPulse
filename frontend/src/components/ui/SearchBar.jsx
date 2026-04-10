import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      value={query}
      onChange={handleChange}
      placeholder="Search posts..."
      className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 outline-none"
    />
  );
}
