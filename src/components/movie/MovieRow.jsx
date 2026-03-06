import { Link } from "react-router-dom";
import { getPoster } from "../../utils/helpers";

function MovieRow({ title, movies = [] }) {
  if (!movies.length) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <Link
            key={movie.imdbID}
            to={`/movie/${movie.imdbID}`}
            className="shrink-0 w-[140px] md:w-[170px] group"
          >
            <img
              src={getPoster(movie.Poster, "300x450")}
              alt={movie.Title}
              className="w-full h-[210px] md:h-[255px] object-cover rounded-lg transition duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = getPoster(null, "300x450");
              }}
            />
            <p className="mt-2 text-sm line-clamp-2">{movie.Title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
