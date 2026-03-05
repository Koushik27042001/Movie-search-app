import SearchBar from "../components/search/SearchBar";
import MovieGrid from "../components/movie/MovieGrid";
import MovieSkeleton from "../components/movie/MovieSkeleton";
import Loader from "../components/common/Loader";
import Error from "../components/common/Error";
import useMovies from "../hooks/useMovies";

function Home() {
  const { movies, loading, error, fetchMovies } = useMovies();

  return (
    <div>
      <SearchBar onSearch={fetchMovies} />
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {[...Array(8)].map((_, i) => (
            <MovieSkeleton key={i} />
          ))}
        </div>
      )}
      {!loading && error && <Error message={error} />}
      {!loading && !error && movies.length > 0 && <MovieGrid movies={movies} />}
      {!loading && !error && movies.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Search for movies to get started</p>
      )}
    </div>
  );
}

export default Home;
