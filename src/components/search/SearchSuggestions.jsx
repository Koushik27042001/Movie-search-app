import { Link } from "react-router-dom";

function SearchSuggestions({ suggestions = [], onSelect }) {
  if (!suggestions.length) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded shadow-lg z-10 max-h-64 overflow-y-auto">
      {suggestions.map((movie) => (
        <Link
          key={movie.imdbID}
          to={`/movie/${movie.imdbID}`}
          className="block px-4 py-2 hover:bg-gray-700 flex items-center gap-3"
          onClick={onSelect}
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/40?text=?"}
            alt={movie.Title}
            className="w-10 h-14 object-cover rounded"
          />
          <span>{movie.Title} ({movie.Year})</span>
        </Link>
      ))}
    </div>
  );
}

export default SearchSuggestions;
