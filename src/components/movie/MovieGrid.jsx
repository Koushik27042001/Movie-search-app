import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
