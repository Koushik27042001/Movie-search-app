import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const posterUrl = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="bg-gray-800 rounded p-3 hover:scale-105 transition">
        <img
          src={posterUrl}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded"
        />
        <h3 className="mt-2 font-semibold">{movie.Title}</h3>
        <p className="text-gray-400">{movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
