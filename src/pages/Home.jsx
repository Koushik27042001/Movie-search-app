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
import uiTemplate1 from "../assets/images/ui_1.webp";
import uiTemplate2 from "../assets/images/ui_2.webp";
import uiTemplate3 from "../assets/images/ui_3.webp";

function Home() {
  const {
    movies,
    query,
    page,
    setPage,
    totalResults,
    loading,
    error,
    fetchMovies,
  } = useMovies();

  const [filter, setFilter] = useState("all");
  const [rowsLoading, setRowsLoading] = useState(true);

  const [trending, setTrending] = useState([]);
  const [hindiMovies, setHindiMovies] = useState([]);
  const [bengaliMovies, setBengaliMovies] = useState([]);
  const [webSeries, setWebSeries] = useState([]);
  const [hollywoodMovies, setHollywoodMovies] = useState([]);

  // UI template cards
  const templates = [
    {
      id: 1,
      image: uiTemplateImage,
      title: "OTT Homepage Layout",
      description: "Modern streaming platform interface",
    },
    {
      id: 2,
      image: uiTemplate1,
      title: "Movie Discovery UI",
      description: "Browse trending movies easily",
    },
    {
      id: 3,
      image: uiTemplate2,
      title: "Search & Explore UI",
      description: "Find your next watch quickly",
    },
    {
      id: 4,
      image: uiTemplate3,
      title: "Content Detail UI",
      description: "Showcase movie and series information",
    }
  ];

  useEffect(() => {
    let active = true;

    const fetchHomeRows = async () => {
      setRowsLoading(true);

      const [
        trendingData,
        hindiData,
        bengaliData,
        seriesData,
        hollywoodData,
      ] = await Promise.all([
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
      const nextPage =
        typeof updater === "function" ? updater(prev) : updater;

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
    <div className="space-y-10">

      {/* UI Inspiration Section */}
      <section>
        <h2 className="mb-4 text-xl font-bold">
          UI Inspirations
        </h2>

        <div className="flex gap-5 pb-3 overflow-x-auto scrollbar-hide">

          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.05 }}
              className="relative min-w-[260px] md:min-w-[320px] rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700"
            >
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-[200px] md:h-[220px] object-cover"
              />

              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {template.title}
                  </h3>

                  <p className="text-sm text-gray-200">
                    {template.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* Search Bar */}
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
            <Pagination
              page={page}
              setPage={handlePageChange}
              hasNext={hasNext}
            />
          )}

          {!loading && !error && query && movies.length === 0 && (
            <p className="mt-8 text-center text-gray-600 dark:text-gray-500">
              No movies found for "{query}"
            </p>
          )}
        </>
      ) : (
        <>
          {/* Hero Banner */}
          <HeroBanner movies={trending} />

          {/* Filter */}
          <FilterDropdown filter={filter} setFilter={setFilter} />

          {/* Loading Skeleton */}
          {rowsLoading && (
            <div className="flex gap-4 pb-2 overflow-x-auto">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-[140px] md:w-[170px] h-[210px] md:h-[255px] rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0"
                />
              ))}
            </div>
          )}

          {/* Movie Rows */}
          {!rowsLoading &&
            visibleRows.map((row) => (
              <MovieRow
                key={row.title}
                title={row.title}
                movies={row.movies}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default Home;