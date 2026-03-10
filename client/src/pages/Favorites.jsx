import { useFavorites } from "../context/FavoritesContext";
import MovieGrid from "../components/movie/MovieGrid";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1 className="text-2xl mb-4">Your Favorites</h1>
      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <p className="text-gray-500">No favorites yet. Search for movies and add them!</p>
      )}
    </div>
  );
}

export default Favorites;
