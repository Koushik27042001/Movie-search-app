import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SearchBar from "../components/search/SearchBar";
import MovieGrid from "../components/movie/MovieGrid";
import Error from "../components/common/Error";
import Loader from "../components/common/Loader";
import useMovies from "../hooks/useMovies";

import HeroBanner from "../components/banner/HeroBanner";
import MovieRow from "../components/movie/MovieRow";
import TrailerModal from "../components/movie/TrailerModal";
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
  const [selectedTrailerMovie, setSelectedTrailerMovie] = useState(null);

  const { ref, inView } = useInView({
    rootMargin: "300px",
  });

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

  const handleTrailerOpen = (movie) => setSelectedTrailerMovie(movie);
  const handleTrailerClose = () => setSelectedTrailerMovie(null);

  useEffect(() => {
    if (!inView || !query || loading || !hasNext) {
      return;
    }

    const nextPage = page + 1;
    fetchMovies(query, nextPage, true);
  }, [inView, query, loading, hasNext, page, fetchMovies]);

  const rowsByFilter = {
    all: [
      { title: "Hindi Movies", movies: hindiMovies },
      { title: "Bengali Movies", movies: bengaliMovies },
      { title: "Hollywood Movies", movies: hollywoodMovies },
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
              <MovieGrid
                movies={movies}
                loading={loading}
                onTrailer={handleTrailerOpen}
              />
            )}
          </motion.div>

          {!error && movies.length > 0 && hasNext && <div ref={ref} className="h-10" />}
          {loading && movies.length > 0 && <Loader />}

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
                  className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-lg w-[170px] h-[255px] shrink-0"
                />
              ))}
            </div>
          )}

          {!rowsLoading && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Trending Today</h2>
              <MovieRow
                title="Trending Today"
                movies={trending}
                onTrailer={handleTrailerOpen}
              />
            </section>
          )}

          {/* Movie Rows */}
          {!rowsLoading &&
            visibleRows.map((row) => (
              <MovieRow
                key={row.title}
                title={row.title}
                movies={row.movies}
                onTrailer={handleTrailerOpen}
              />
            ))}
        </>
      )}

      <TrailerModal movie={selectedTrailerMovie} onClose={handleTrailerClose} />
    </div>
  );
}

export default Home;
