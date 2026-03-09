import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SearchBar from "../components/search/SearchBar";
import MovieGrid from "../components/movie/MovieGrid";
import Error from "../components/common/Error";
import Loader from "../components/common/Loader";
import useMovies from "../hooks/useMovies";

import HeroBanner from "../components/banner/HeroBanner";
import MovieRow from "../components/movie/MovieRow";
import TrailerModal from "../components/movie/TrailerModal";
import FilterBar from "../components/filter/FilterBar";

import { getTrendingMovies, searchMovies } from "../services/omdbApi";

import uiTemplateImage from "../assets/images/ui_template.png";
import uiTemplate1 from "../assets/images/ui_1.webp";
import uiTemplate2 from "../assets/images/ui_2.webp";
import uiTemplate3 from "../assets/images/ui_3.webp";

/* ─── section header with animated accent line ─── */
function SectionHeader({ label, title, action }) {
  return (
    <div className="hp-section-header">
      <div className="hp-section-left">
        <span className="hp-section-label">{label}</span>
        <h2 className="hp-section-title">{title}</h2>
      </div>
      {action && (
        <a href="#" className="hp-section-action" onClick={(e) => e.preventDefault()}>
          {action} <span>→</span>
        </a>
      )}
    </div>
  );
}

/* ─── skeleton shimmer strip ─── */
function SkeletonRow() {
  return (
    <div className="hp-skeleton-row">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="hp-skeleton-card" style={{ animationDelay: `${i * 0.09}s` }} />
      ))}
    </div>
  );
}

/* ─── spotlight card for UI inspirations ─── */
function SpotlightCard({ image, title, description, index }) {
  return (
    <motion.div
      className="hp-spotlight-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
    >
      <div className="hp-spotlight-img-wrap">
        <img src={image} alt={title} className="hp-spotlight-img" />
        <div className="hp-spotlight-overlay" />
        <div className="hp-spotlight-badge">UI</div>
      </div>
      <div className="hp-spotlight-info">
        <h3 className="hp-spotlight-title">{title}</h3>
        <p className="hp-spotlight-desc">{description}</p>
      </div>
    </motion.div>
  );
}

/* ─── floating search pill that expands ─── */
function SearchSection({ onSearch, suggestions }) {
  return (
    <div className="hp-search-section">
      <div className="hp-search-eyebrow">
        <span className="hp-search-dot" />
        Discover Something New
      </div>
      <SearchBar onSearch={onSearch} suggestions={suggestions} />
    </div>
  );
}

function Home() {
  const { movies, query, page, totalResults, loading, error, fetchMovies } = useMovies();

  const [filter, setFilter] = useState("All");
  const [rowsLoading, setRowsLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [hindiMovies, setHindiMovies] = useState([]);
  const [bengaliMovies, setBengaliMovies] = useState([]);
  const [webSeries, setWebSeries] = useState([]);
  const [hollywoodMovies, setHollywoodMovies] = useState([]);
  const [selectedTrailerMovie, setSelectedTrailerMovie] = useState(null);
  const [pageReady, setPageReady] = useState(false);

  const { ref, inView } = useInView({ rootMargin: "300px" });

  const templates = [
    { id: 1, image: uiTemplateImage, title: "OTT Homepage Layout",   description: "Modern streaming platform interface" },
    { id: 2, image: uiTemplate1,     title: "Movie Discovery UI",    description: "Browse trending movies easily"       },
    { id: 3, image: uiTemplate2,     title: "Search & Explore UI",   description: "Find your next watch quickly"        },
    { id: 4, image: uiTemplate3,     title: "Content Detail UI",     description: "Showcase movie and series info"      },
  ];

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
      setTimeout(() => setPageReady(true), 100);
    };
    fetchHomeRows();
    return () => { active = false; };
  }, []);

  const suggestions = useMemo(() => movies.slice(0, 6), [movies]);
  const hasNext = page * 10 < totalResults;
  const handleSearch = (text) => fetchMovies(text, 1);
  const handleTrailerOpen = (movie) => setSelectedTrailerMovie(movie);
  const handleTrailerClose = () => setSelectedTrailerMovie(null);

  useEffect(() => {
    if (!inView || !query || loading || !hasNext) return;
    fetchMovies(query, page + 1, true);
  }, [inView, query, loading, hasNext, page, fetchMovies]);

  const rowsByFilter = {
    All:        [
      { title: "Hindi Movies",      movies: hindiMovies,    label: "Desi Picks"     },
      { title: "Bengali Movies",    movies: bengaliMovies,  label: "Regional Gems"  },
      { title: "Hollywood Movies",  movies: hollywoodMovies,label: "International"  },
      { title: "Web Series",        movies: webSeries,      label: "Binge-worthy"   },
    ],
    "Web Series": [{ title: "Web Series",       movies: webSeries,       label: "Binge-worthy"  }],
    Hindi:        [{ title: "Hindi Movies",     movies: hindiMovies,     label: "Desi Picks"    }],
    Bengali:      [{ title: "Bengali Movies",   movies: bengaliMovies,   label: "Regional Gems" }],
    Hollywood:    [{ title: "Hollywood Movies", movies: hollywoodMovies, label: "International" }],
    Action:       [
      { title: "Hindi Movies",      movies: hindiMovies,    label: "Action"    },
      { title: "Hollywood Movies",  movies: hollywoodMovies,label: "Action"    },
    ],
    Comedy:       [
      { title: "Web Series",        movies: webSeries,      label: "Comedy"    },
      { title: "Hindi Movies",      movies: hindiMovies,    label: "Comedy"    },
    ],
  };
  const visibleRows = rowsByFilter[filter] || rowsByFilter.All;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

        /* ── PAGE ── */
        .hp-root {
          min-height: 100vh;
          background: #07090f;
          color: #e8e8e8;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }
        .light .hp-root, .hp-root.light {
          background: #f2f3f7;
          color: #111;
        }

        /* subtle page-level noise */
        .hp-root::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 150px;
        }

        .hp-page {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
        }

        /* ── HERO wraps edge-to-edge ── */
        .hp-hero-wrap {
          width: 100%;
          margin-bottom: 0;
        }

        /* ── CONTENT AREA ── */
        .hp-content {
          padding: 0 clamp(16px, 3vw, 48px);
        }

        /* ── SECTION SPACING ── */
        .hp-section {
          margin-top: clamp(40px, 5vw, 72px);
        }

        /* ── SECTION HEADER ── */
        .hp-section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 12px;
        }
        .hp-section-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hp-section-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F58C1E;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hp-section-label::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 2px;
          background: linear-gradient(90deg, #F58C1E, #2EC4B6);
          border-radius: 1px;
        }
        .hp-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px, 3vw, 32px);
          letter-spacing: 0.04em;
          color: #fff;
          margin: 0;
          line-height: 1;
        }
        .dark .hp-section-title { color: #fff; }
        .hp-section-action {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: color 0.2s;
          white-space: nowrap;
          padding-bottom: 2px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .hp-section-action:hover { color: #F58C1E; border-bottom-color: #F58C1E; }

        /* ── DIVIDER ── */
        .hp-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent);
          margin: clamp(32px, 4vw, 56px) 0;
        }

        /* ── SEARCH SECTION ── */
        .hp-search-section {
          padding: clamp(24px, 3vw, 40px) clamp(20px, 3vw, 40px);
          background: linear-gradient(135deg,
            rgba(245,140,30,0.06) 0%,
            rgba(46,196,182,0.04) 50%,
            rgba(245,140,30,0.04) 100%);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          margin-top: clamp(32px, 4vw, 56px);
        }
        .hp-search-section::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,140,30,0.1), transparent 70%);
          pointer-events: none;
        }
        .hp-search-section::after {
          content: '';
          position: absolute;
          bottom: -40px; left: -40px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(46,196,182,0.07), transparent 70%);
          pointer-events: none;
        }
        .hp-search-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }
        .hp-search-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #F58C1E;
          box-shadow: 0 0 8px rgba(245,140,30,0.6);
          animation: hpPulse 2s ease-in-out infinite;
        }
        @keyframes hpPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.3); }
        }

        /* ── FILTER ── */
        .hp-filter-wrap {
          margin-top: clamp(28px, 3vw, 44px);
        }
        .hp-filter-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 10px;
        }

        /* ── SKELETON ── */
        .hp-skeleton-row {
          display: flex;
          gap: 12px;
          overflow: hidden;
        }
        .hp-skeleton-card {
          flex-shrink: 0;
          width: 160px;
          height: 240px;
          border-radius: 10px;
          background: linear-gradient(110deg, #111420 30%, #1c2030 50%, #111420 70%);
          background-size: 200% 100%;
          animation: hpShimmer 1.7s infinite linear;
        }
        @keyframes hpShimmer {
          0%   { background-position:  200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── TRENDING ROW SPECIAL ── */
        .hp-trending-wrap {
          position: relative;
        }
        .hp-trending-glow {
          position: absolute;
          top: -40px; left: 10%;
          width: 300px; height: 200px;
          background: radial-gradient(ellipse, rgba(245,140,30,0.07), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── SPOTLIGHT (UI templates) ── */
        .hp-spotlight-strip {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hp-spotlight-strip::-webkit-scrollbar { display: none; }

        .hp-spotlight-card {
          flex-shrink: 0;
          width: clamp(220px, 22vw, 300px);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .hp-spotlight-card:hover {
          border-color: rgba(245,140,30,0.4);
          box-shadow: 0 8px 32px rgba(245,140,30,0.12);
        }
        .hp-spotlight-img-wrap {
          position: relative;
          overflow: hidden;
          height: 170px;
        }
        .hp-spotlight-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .hp-spotlight-card:hover .hp-spotlight-img {
          transform: scale(1.06);
        }
        .hp-spotlight-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7,9,15,0.85), transparent 60%);
        }
        .hp-spotlight-badge {
          position: absolute;
          top: 10px; right: 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 3px 8px;
          border-radius: 4px;
          background: linear-gradient(135deg, #F58C1E, #e07010);
          color: #fff;
          text-transform: uppercase;
        }
        .hp-spotlight-info {
          padding: 14px 16px 16px;
        }
        .hp-spotlight-title {
          font-size: 14px;
          font-weight: 600;
          color: #eee;
          margin: 0 0 4px;
          letter-spacing: 0.01em;
        }
        .hp-spotlight-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }

        /* ── SEARCH RESULTS ── */
        .hp-results-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .hp-results-query {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          letter-spacing: 0.04em;
          color: #fff;
          margin: 0;
          line-height: 1;
        }
        .hp-results-query span { color: #F58C1E; }
        .hp-results-count {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 3px 10px;
          border-radius: 99px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .hp-no-results {
          text-align: center;
          padding: 80px 20px;
          color: rgba(255,255,255,0.3);
          font-size: 15px;
          letter-spacing: 0.02em;
        }
        .hp-no-results-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
          opacity: 0.5;
        }

        /* ── EMPTY STATE FOR ROWS ── */
        .hp-row-section {
          position: relative;
          z-index: 1;
        }

        /* ── STAGGER ENTER ── */
        @keyframes hpFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .hp-stagger > * {
          animation: hpFadeUp 0.55s ease both;
        }
        .hp-stagger > *:nth-child(1) { animation-delay: 0.05s; }
        .hp-stagger > *:nth-child(2) { animation-delay: 0.12s; }
        .hp-stagger > *:nth-child(3) { animation-delay: 0.19s; }
        .hp-stagger > *:nth-child(4) { animation-delay: 0.26s; }
        .hp-stagger > *:nth-child(5) { animation-delay: 0.33s; }
        .hp-stagger > *:nth-child(6) { animation-delay: 0.40s; }

        @media (max-width: 640px) {
          .hp-content { padding: 0 14px; }
        }
      `}</style>

      <div className="hp-root dark">
        <div className="hp-page">

          {/* ── HERO (full width, no padding) ── */}
          <div className="hp-hero-wrap">
            <HeroBanner movies={trending} />
          </div>

          <div className="hp-content">

            {/* ── SEARCH ── */}
            <SearchSection onSearch={handleSearch} suggestions={suggestions} />

            {error && (
              <div style={{ marginTop: 24 }}>
                <Error message={error} />
              </div>
            )}

            {/* ══════════════ SEARCH RESULTS VIEW ══════════════ */}
            <AnimatePresence mode="wait">
              {query ? (
                <motion.div
                  key="search-results"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="hp-section"
                >
                  <div className="hp-results-header">
                    <h2 className="hp-results-query">
                      Results for <span>"{query}"</span>
                    </h2>
                    {!loading && movies.length > 0 && (
                      <span className="hp-results-count">{totalResults} titles</span>
                    )}
                  </div>

                  {(loading || movies.length > 0) && (
                    <MovieGrid
                      movies={movies}
                      loading={loading}
                      onTrailer={handleTrailerOpen}
                    />
                  )}

                  {!error && movies.length > 0 && hasNext && <div ref={ref} className="h-10" />}
                  {loading && movies.length > 0 && <Loader />}

                  {!loading && !error && query && movies.length === 0 && (
                    <div className="hp-no-results">
                      <span className="hp-no-results-icon">🎬</span>
                      No titles found for "{query}"
                    </div>
                  )}
                </motion.div>
              ) : (

                /* ══════════════ HOME VIEW ══════════════ */
                <motion.div
                  key="home-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >

                  {/* ── TRENDING ── */}
                  <div className="hp-section hp-row-section">
                    <div className="hp-trending-glow" />
                    <SectionHeader label="Hot Right Now" title="Trending Today" action="See All" />
                    {rowsLoading
                      ? <SkeletonRow />
                      : <MovieRow title="Trending Today" movies={trending} onTrailer={handleTrailerOpen} />
                    }
                  </div>

                  <div className="hp-divider" />

                  {/* ── FILTER ── */}
                  <div className="hp-filter-wrap">
                    <div className="hp-filter-label">Browse by category</div>
                    <FilterBar filter={filter} setFilter={setFilter} />
                  </div>

                  {/* ── FILTERED ROWS ── */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={filter}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="hp-stagger"
                    >
                      {rowsLoading
                        ? [...Array(2)].map((_, i) => (
                            <div key={i} className="hp-section hp-row-section">
                              <div className="hp-section-header">
                                <div style={{ width: 140, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.05)" }} />
                              </div>
                              <SkeletonRow />
                            </div>
                          ))
                        : visibleRows.map((row) => (
                            <div key={row.title} className="hp-section hp-row-section">
                              <SectionHeader label={row.label} title={row.title} action="View All" />
                              <MovieRow
                                title={row.title}
                                movies={row.movies}
                                onTrailer={handleTrailerOpen}
                              />
                            </div>
                          ))
                      }
                    </motion.div>
                  </AnimatePresence>

                  <div className="hp-divider" />

                  {/* ── UI INSPIRATIONS ── */}
                  <div className="hp-section">
                    <SectionHeader label="Design Showcase" title="UI Inspirations" />
                    <div className="hp-spotlight-strip">
                      {templates.map((t, i) => (
                        <SpotlightCard
                          key={t.id}
                          image={t.image}
                          title={t.title}
                          description={t.description}
                          index={i}
                        />
                      ))}
                    </div>
                  </div>

                  {/* bottom breathing room */}
                  <div style={{ height: "clamp(48px, 6vw, 80px)" }} />

                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>

      <TrailerModal movie={selectedTrailerMovie} onClose={handleTrailerClose} />
    </>
  );
}

export default Home;