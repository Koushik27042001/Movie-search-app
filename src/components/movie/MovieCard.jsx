import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPoster } from "../../utils/helpers";

function MovieCard({ movie }) {
  const fallbackPoster = getPoster(null, "300x450");
  const posterUrl = getPoster(movie.Poster, "300x450");

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gray-100 dark:bg-gray-800 rounded p-3"
      >
        <img
          src={posterUrl}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackPoster;
          }}
        />
        <h3 className="mt-2 font-semibold">{movie.Title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{movie.Year}</p>
      </motion.div>
    </Link>
  );
}

export default MovieCard;
