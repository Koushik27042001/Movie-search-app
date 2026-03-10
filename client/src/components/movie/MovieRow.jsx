import MovieCard from "./MovieCard";

function MovieRow({ title, movies = [], onTrailer }) {
  if (!movies.length) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onTrailer={onTrailer}
            containerClassName="shrink-0 w-[140px] md:w-[170px]"
            imageClassName="w-[140px] md:w-[170px] h-[210px] md:h-[255px] object-cover rounded-lg"
            showBaseMeta={false}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
