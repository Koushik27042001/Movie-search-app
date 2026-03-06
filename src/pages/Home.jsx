import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/search/SearchBar";
import MovieGrid from "../components/movie/MovieGrid";
import Error from "../components/common/Error";
import Pagination from "../components/common/Pagination";
import useMovies from "../hooks/useMovies";
import HeroBanner from "../components/banner/HeroBanner";
import FilterBar from "../components/filter/FilterBar";
import MovieRow from "../components/movie/MovieRow";
import { searchMovies } from "../services/omdbApi";
import { useFavorites } from "../context/FavoritesContext";
import uiTemplateImage from "../assets/images/ui_template.png";

const ROW_DEFINITIONS = [
  { key: "trending", title: "Trending Today", query: "trending movies" },
  { key: "topRated", title: "Top Rated", query: "top rated imdb" },
  { key: "newReleases", title: "New Releases", query: `${new Date().getFullYear()} movie` },
  { key: "webSeries", title: "Popular Web Series", query: "web series" },
  { key: "hindi", title: "Hindi Movies", query: "hindi movie" },
  { key: "bengali", title: "Bengali Movies", query: "bengali movie" },
  { key: "hollywood", title: "Hollywood Picks", query: "hollywood movie" },
  { key: "action", title: "Action", query: "action movie" },
  { key: "comedy", title: "Comedy", query: "comedy movie" },
];

const FILTER_TO_KEYS = {
  All: ROW_DEFINITIONS.map((row) => row.key),
  "Web Series": ["webSeries"],
  Hindi: ["hindi"],
  Bengali: ["bengali"],
  Hollywood: ["hollywood"],
  Action: ["action"],
  Comedy: ["comedy"],
};

function Home() {
  const { movies, query, page, setPage, totalResults, loading, error, fetchMovies } = useMovies();
  const { favorites } = useFavorites();
  const [filter, setFilter] = useState("All");
  const [rowMovies, setRowMovies] = useState({});
  const [rowsLoading, setRowsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchRows = async () => {
      setRowsLoading(true);
      const entries = await Promise.all(
        ROW_DEFINITIONS.map(async (row) => {
          try {
            const data = await searchMovies(row.query, 1);
            return [row.key, data?.Search || []];
          } catch {
            return [row.key, []];
          }
        })
      );

      if (active) {
        setRowMovies(Object.fromEntries(entries));
        setRowsLoading(false);
      }
    };

    fetchRows();

    return () => {
      active = false;
    };
  }, []);

  const suggestions = useMemo(() => movies.slice(0, 6), [movies]);
  const hasNext = page * 10 < totalResults;

  const heroMovies = useMemo(() => {
    const source = rowMovies.trending || [];
    return source.slice(0, 8);
  }, [rowMovies]);

  const visibleRows = useMemo(() => {
    const selectedKeys = FILTER_TO_KEYS[filter] || FILTER_TO_KEYS.All;
    return ROW_DEFINITIONS.filter((row) => selectedKeys.includes(row.key)).map((row) => ({
      ...row,
      movies: rowMovies[row.key] || [],
    }));
  }, [filter, rowMovies]);

  const handleSearch = (searchText) => {
    fetchMovies(searchText, 1);
  };

  const handlePageChange = (updater) => {
    setPage((prev) => {
      const nextPage = typeof updater === "function" ? updater(prev) : updater;
      if (query && nextPage !== prev) {
        fetchMovies(query, nextPage);
      }
      return nextPage;
    });
  };

  return (
    <div className="space-y-8">
      <section className="relative rounded-2xl overflow-hidden border border-gray-300/70 dark:border-gray-700/70">
        <img
          src={uiTemplateImage}
          alt="OTT homepage layout template"
          className="w-full h-[220px] md:h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent p-6 md:p-8 flex items-end">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-amber-300">Entry Layout</p>
            <h1 className="text-2xl md:text-4xl font-bold text-white mt-2">Discover your next watch</h1>
            <p className="text-sm md:text-base text-gray-200 mt-2">Netflix and Prime inspired browsing with banner, filters, and rows.</p>
          </div>
        </div>
      </section>

      <SearchBar onSearch={handleSearch} suggestions={suggestions} />
      {error && <Error message={error} />}

      {query ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {(loading || movies.length > 0) && (
              <MovieGrid movies={movies} loading={loading} />
            )}
          </motion.div>

          {!loading && !error && movies.length > 0 && (
            <Pagination page={page} setPage={handlePageChange} hasNext={hasNext} />
          )}

          {!loading && !error && query && movies.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-500 mt-8">No movies found for "{query}"</p>
          )}
        </>
      ) : (
        <>
          <HeroBanner movies={heroMovies} />
          <FilterBar filter={filter} setFilter={setFilter} />

          {favorites.length > 0 && (
            <>
              <MovieRow title="Continue Watching" movies={favorites.slice(0, 10)} />
              <MovieRow title="Saved Favorites" movies={favorites} />
            </>
          )}

          {rowsLoading && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-[140px] md:w-[170px] h-[210px] md:h-[255px] rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0" />
              ))}
            </div>
          )}

          {!rowsLoading && visibleRows.map((row) => (
            <MovieRow key={row.key} title={row.title} movies={row.movies} />
          ))}
        </>
      )}

      {!loading && !error && !query && !rowsLoading && visibleRows.every((row) => row.movies.length === 0) && (
        <p className="text-center text-gray-600 dark:text-gray-500 mt-8">No curated content found right now.</p>
      )}
    </div>
  );
}

export default Home;
