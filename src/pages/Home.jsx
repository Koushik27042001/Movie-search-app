import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/search/SearchBar";
import MovieGrid from "../components/movie/MovieGrid";
import Error from "../components/common/Error";
import Pagination from "../components/common/Pagination";
import useMovies from "../hooks/useMovies";
import HeroBanner from "../components/banner/HeroBanner";
import MovieRow from "../components/movie/MovieRow";
import FilterDropdown from "../components/filter/FilterDropdown";
import { getTrendingMovies, searchMovies } from "../services/omdbApi";
import uiTemplateImage from "../assets/images/ui_template.png";

function Home() {
  const { movies, query, page, setPage, totalResults, loading, error, fetchMovies } = useMovies();

  const [filter, setFilter] = useState("all");
  const [rowsLoading, setRowsLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [hindiMovies, setHindiMovies] = useState([]);
  const [bengaliMovies, setBengaliMovies] = useState([]);
  const [webSeries, setWebSeries] = useState([]);
  const [hollywoodMovies, setHollywoodMovies] = useState([]);

  useEffect(() => {
    let active = true;

    const fetchHomeRows = async () => {
      setRowsLoading(true);

      const [trendingData, hindiData, bengaliData, seriesData, hollywoodData] = await Promise.all([
        getTrendingMovies(),
        searchMovies("hindi movie", 1),
        searchMovies("bengali movie", 1),
        searchMovies("web series", 1),
        searchMovies("hollywood movie", 1),
      ]);

      if (!active) return;

      setTrending(trendingData || []);
      setHindiMovies(hindiData?.Search || []);
      setBengaliMovies(bengaliData?.Search || []);
      setWebSeries(seriesData?.Search || []);
      setHollywoodMovies(hollywoodData?.Search || []);
      setRowsLoading(false);
    };

    fetchHomeRows();

    return () => {
      active = false;
    };
  }, []);

  const suggestions = useMemo(() => movies.slice(0, 6), [movies]);
  const hasNext = page * 10 < totalResults;

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

  const rowsByFilter = {
    all: [
      { title: "Trending Movies", movies: trending },
      { title: "Hindi Movies", movies: hindiMovies },
      { title: "Bengali Movies", movies: bengaliMovies },
      { title: "Web Series", movies: webSeries },
    ],
    series: [{ title: "Web Series", movies: webSeries }],
    hindi: [{ title: "Hindi Movies", movies: hindiMovies }],
    bengali: [{ title: "Bengali Movies", movies: bengaliMovies }],
    hollywood: [{ title: "Hollywood Movies", movies: hollywoodMovies }],
  };

  const visibleRows = rowsByFilter[filter] || rowsByFilter.all;

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
            <p className="text-sm md:text-base text-gray-200 mt-2">Netflix-style homepage with hero slider, filters, and curated rows.</p>
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
          <HeroBanner movies={trending} />
          <FilterDropdown filter={filter} setFilter={setFilter} />

          {rowsLoading && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-[140px] md:w-[170px] h-[210px] md:h-[255px] rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0" />
              ))}
            </div>
          )}

          {!rowsLoading && visibleRows.map((row) => (
            <MovieRow key={row.title} title={row.title} movies={row.movies} />
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
