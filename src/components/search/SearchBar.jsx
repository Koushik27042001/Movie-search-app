import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query);

  useEffect(() => {
    if (debounced) onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search movies..."
      className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-amber-500 focus:outline-none"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default SearchBar;
