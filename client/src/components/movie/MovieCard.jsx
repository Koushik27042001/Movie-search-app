import { motion } from "framer-motion";
import { useState } from "react";
import { FaHeart, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { getPoster } from "../../utils/helpers";

function MovieCard({
  movie,
  onTrailer,
  containerClassName = "",
  imageClassName = "w-full h-64 object-cover rounded-lg",
  showBaseMeta = true,
}) {
  const [hover, setHover] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const fallbackPoster = getPoster(null, "300x450");
  const posterUrl = getPoster(movie.Poster, "300x450");

  const handleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isFavorite) {
      removeFavorite(movie.imdbID);
      return;
    }

    addFavorite({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Type: movie.Type,
      imdbRating: movie.imdbRating,
    });
  };

  const handleTrailer = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onTrailer?.(movie);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative overflow-hidden rounded-lg cursor-pointer ${containerClassName}`}
    >
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <img
          src={posterUrl}
          alt={movie.Title}
          className={imageClassName}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackPoster;
          }}
        />
      </Link>

      {hover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/80 flex flex-col justify-end p-3"
        >
          <h3 className="text-sm font-semibold text-white line-clamp-2">{movie.Title}</h3>

          <p className="text-xs text-gray-300 mt-1">
            Rating: {movie.imdbRating || "N/A"}
          </p>

          <div className="flex gap-3 mt-3">
            {onTrailer && (
              <button
                type="button"
                onClick={handleTrailer}
                className="flex items-center gap-1 text-xs bg-white text-black px-2 py-1 rounded"
              >
                <FaPlay /> Trailer
              </button>
            )}

            <button
              type="button"
              onClick={handleFavorite}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                isFavorite ? "bg-red-600 text-white" : "bg-red-500 text-white"
              }`}
            >
              <FaHeart /> {isFavorite ? "Saved" : "Favorite"}
            </button>
          </div>
        </motion.div>
      )}

      {showBaseMeta && (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-b p-3">
          <h3 className="font-semibold line-clamp-2">{movie.Title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{movie.Year}</p>
        </div>
      )}
    </motion.div>
  );
}

export default MovieCard;
