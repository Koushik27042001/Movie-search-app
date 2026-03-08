import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { getMovieDetails } from "../services/omdbApi";
import { useFavorites } from "../context/FavoritesContext";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { getPoster } from "../utils/helpers";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((f) => f.imdbID === id);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(id)
      .then(setMovie)
      .finally(() => setLoading(false));
  }, [id]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        Type: movie.Type,
      });
    }
  };

  if (loading) return <Loader />;
  if (!movie) return <p className="text-red-400">Movie not found</p>;

  const fallbackPoster = getPoster(null, "400x600");
  const posterUrl = getPoster(movie.Poster, "400x600");

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={posterUrl}
        alt={movie.Title}
        className="w-full md:w-64 rounded-lg object-cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackPoster;
        }}
      />
      <div className="flex-1">
        <h1 className="text-3xl font-bold">{movie.Title}</h1>
        <p className="text-gray-400 mt-1">
          {movie.Year} - {movie.Runtime}
        </p>
        <p className="mt-4">{movie.Plot}</p>

        {movie.imdbRating !== "N/A" ? (
          <div className="mt-4">
            <ReactStars
              count={5}
              value={Number(movie.imdbRating) / 2}
              size={24}
              edit={false}
              isHalf
              activeColor="#f59e0b"
            />
            <p className="mt-1 text-gray-300">{movie.imdbRating} / 10</p>
          </div>
        ) : (
          <p className="mt-2 text-gray-400">No rating</p>
        )}

        <p className="mt-2 text-gray-400">
          <span className="text-white">Genre:</span> {movie.Genre}
        </p>
        <p className="mt-1 text-gray-400">
          <span className="text-white">Director:</span> {movie.Director}
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant={isFavorite ? "danger" : "primary"} onClick={handleToggleFavorite}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Link to="/">
            <Button variant="secondary">Back to Search</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
