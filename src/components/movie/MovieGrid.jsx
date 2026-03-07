import MovieCard from "./MovieCard";
import MovieSkeleton from "./MovieSkeleton";

function MovieGrid({ movies, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {[...Array(8)].map((_, i) => (
          <MovieSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
