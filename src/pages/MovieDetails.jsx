import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/omdbApi";
import { useFavorites } from "../context/FavoritesContext";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

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
        Type: movie.Type
      });
    }
  };

  if (loading) return <Loader />;
  if (!movie) return <p className="text-red-400">Movie not found</p>;

  const posterUrl = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <img src={posterUrl} alt={movie.Title} className="w-full md:w-64 rounded-lg object-cover" />
      <div className="flex-1">
        <h1 className="text-3xl font-bold">{movie.Title}</h1>
        <p className="text-gray-400 mt-1">{movie.Year} • {movie.Runtime}</p>
        <p className="mt-4">{movie.Plot}</p>
        <p className="mt-2">{movie.imdbRating !== "N/A" ? `⭐ ${movie.imdbRating}` : "No rating"}</p>
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
