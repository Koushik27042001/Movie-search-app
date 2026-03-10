import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import SearchSuggestions from "./SearchSuggestions";

function SearchBar({ onSearch, suggestions }) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounced = useDebounce(query);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full p-3 rounded bg-gray-100 text-gray-900 border border-gray-300 focus:border-amber-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
      />

      {showSuggestions && query && suggestions?.length > 0 && (
        <SearchSuggestions
          suggestions={suggestions}
          onSelect={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}

export default SearchBar;
