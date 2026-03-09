import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { getPoster } from "../../utils/helpers";

/* ── Custom cursor that follows mouse ── */
function CustomCursor({ hovering }) {
  const cursorRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const tick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }}
    >
      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "rgba(245,140,30,0.18)",
              border: "1.5px solid rgba(245,140,30,0.7)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#F58C1E",
              textTransform: "uppercase",
            }}
          >
            View
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Skeleton loader for a single slide ── */
function SkeletonSlide() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(110deg, #0f1117 30%, #1a1d26 50%, #0f1117 70%)",
      backgroundSize: "200% 100%",
      animation: "skeletonShimmer 1.6s infinite linear",
      borderRadius: 0,
    }} />
  );
}

/* ── Main HeroBanner ── */
function HeroBanner({ movies = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [hovering, setHovering] = useState(false);
  const [imgError, setImgError] = useState({});

  // Preload images
  useEffect(() => {
    movies.forEach((m, i) => {
      const url = getPoster(m.Poster, "1280x720");
      if (!url || url === "N/A") { setImgError(p => ({ ...p, [i]: true })); return; }
      const img = new Image();
      img.onload = () => setLoaded(p => ({ ...p, [i]: true }));
      img.onerror = () => setImgError(p => ({ ...p, [i]: true }));
      img.src = url;
    });
  }, [movies]);

  if (!movies.length) return null;

  const activeMovie = movies[activeIdx];
  const posterUrl = getPoster(activeMovie?.Poster, "1280x720");
  const isLoaded = loaded[activeIdx];
  const hasError = imgError[activeIdx];

  const genres = activeMovie?.Genre?.split(",").slice(0, 3) || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes skeletonShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0;   }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .hb-root {
          position: relative;
          width: 100%;
          height: clamp(480px, 82vh, 780px);
          overflow: hidden;
          background: #080a0f;
          font-family: 'DM Sans', sans-serif;
          cursor: none;
        }
        @media (max-width: 640px) {
          .hb-root { height: 520px; cursor: auto; }
        }

        /* Cinematic scanline effect */
        .hb-scanline {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          overflow: hidden;
        }
        .hb-scanline::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(245,140,30,0.08), transparent);
          animation: scanline 6s linear infinite;
        }

        /* Noise grain overlay */
        .hb-grain {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px;
        }

        /* BG image */
        .hb-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 20%;
          transition: opacity 0.9s ease;
          will-change: opacity;
        }
        .hb-bg-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right,  rgba(5,7,12,0.92) 0%, rgba(5,7,12,0.55) 55%, rgba(5,7,12,0.15) 100%),
            linear-gradient(to top,    rgba(5,7,12,0.98) 0%, rgba(5,7,12,0.4) 40%, transparent 70%);
        }

        /* FEATURED badge */
        .hb-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px 5px 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, #F58C1E, #e07010);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 14px;
          animation: fadeUp 0.5s ease both;
        }
        .hb-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #fff;
          position: relative;
        }
        .hb-badge-dot::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.5);
          animation: pulseRing 1.4s ease-out infinite;
        }

        /* Title */
        .hb-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(42px, 6vw, 88px);
          line-height: 0.95;
          letter-spacing: 0.02em;
          color: #fff;
          margin: 0 0 12px 0;
          text-shadow: 0 4px 32px rgba(0,0,0,0.6);
          animation: fadeUp 0.55s 0.1s ease both;
        }

        /* Meta row */
        .hb-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 16px;
          animation: fadeUp 0.55s 0.2s ease both;
        }
        .hb-year {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.06em;
        }
        .hb-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.3); }
        .hb-genre {
          padding: 3px 9px;
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.15);
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.05em;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(4px);
        }
        .hb-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 600;
          color: #F58C1E;
        }

        /* CTA */
        .hb-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          border-radius: 6px;
          background: linear-gradient(135deg, #F58C1E 0%, #e07010 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-decoration: none;
          text-transform: uppercase;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 8px 28px rgba(245,140,30,0.35);
          animation: fadeUp 0.55s 0.3s ease both;
        }
        .hb-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(245,140,30,0.5);
        }
        .hb-cta-play {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 8px;
          padding-left: 2px;
        }

        /* Thumbnail strip */
        .hb-strip {
          position: absolute;
          right: 28px;
          bottom: 32px;
          top: 32px;
          width: 200px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow: hidden;
          z-index: 10;
        }
        @media (max-width: 900px) { .hb-strip { display: none; } }

        .hb-thumb {
          flex: 1;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          border: 2px solid transparent;
          transition: border-color 0.25s, transform 0.25s;
          min-height: 0;
        }
        .hb-thumb.active {
          border-color: #F58C1E;
          box-shadow: 0 0 20px rgba(245,140,30,0.35);
        }
        .hb-thumb:hover { transform: scale(1.03); }
        .hb-thumb-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: filter 0.25s;
          filter: brightness(0.65);
        }
        .hb-thumb.active .hb-thumb-img { filter: brightness(0.9); }
        .hb-thumb-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 8px 8px;
          background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
          font-size: 11px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 0.02em;
        }
        .hb-thumb-active-bar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #F58C1E, #e07010);
          border-radius: 0 2px 2px 0;
        }

        /* Progress bar */
        .hb-progress-wrap {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: rgba(255,255,255,0.08);
          z-index: 10;
        }
        .hb-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #F58C1E, #2EC4B6);
          transition: width 0.1s linear;
        }

        /* Swiper pagination override */
        .hb-root .swiper-pagination {
          bottom: 16px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
          right: auto !important;
        }
        .hb-root .swiper-pagination-bullet {
          width: 6px; height: 6px;
          background: rgba(255,255,255,0.3);
          opacity: 1;
          transition: all 0.3s;
          border-radius: 3px;
        }
        .hb-root .swiper-pagination-bullet-active {
          width: 24px;
          background: #F58C1E;
          border-radius: 3px;
        }

        /* Loading skeleton pulse */
        .hb-skeleton {
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, #0d0f18 30%, #161926 50%, #0d0f18 70%);
          background-size: 200% 100%;
          animation: skeletonShimmer 1.8s infinite linear;
          z-index: 5;
          display: flex;
          align-items: flex-end;
          padding: 48px;
          gap: 16px;
          flex-direction: column;
          justify-content: flex-end;
        }
        .hb-skel-line {
          border-radius: 4px;
          background: rgba(255,255,255,0.06);
          height: 16px;
        }
      `}</style>

      <CustomCursor hovering={hovering} />

      <div
        className="hb-root"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Grain + scanline cinematic overlays */}
        <div className="hb-grain" />
        <div className="hb-scanline" />

        {/* Skeleton while loading */}
        <AnimatePresence>
          {!isLoaded && !hasError && (
            <motion.div
              className="hb-skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hb-skel-line" style={{ width: "60px" }} />
              <div className="hb-skel-line" style={{ width: "320px", height: "52px", borderRadius: "6px" }} />
              <div className="hb-skel-line" style={{ width: "200px" }} />
              <div className="hb-skel-line" style={{ width: "140px", height: "44px", borderRadius: "6px" }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* BG image with crossfade */}
        <AnimatePresence mode="sync">
          <motion.div
            key={activeIdx}
            className="hb-bg"
            style={{ backgroundImage: isLoaded && !hasError ? `url(${posterUrl})` : "none" }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <div className="hb-bg-overlay" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${activeIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 8,
              display: "flex",
              alignItems: "flex-end",
              padding: "clamp(24px, 5vw, 56px)",
              paddingRight: "clamp(24px, 5vw, 260px)",
              paddingBottom: "clamp(32px, 5vh, 64px)",
            }}
          >
            <Link
              to={`/movie/${activeMovie?.imdbID}`}
              style={{ textDecoration: "none", color: "inherit", maxWidth: 560 }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {/* Featured badge */}
              <div className="hb-badge">
                <span className="hb-badge-dot" />
                Now Featured
              </div>

              {/* Title */}
              <h2 className="hb-title">{activeMovie?.Title}</h2>

              {/* Meta */}
              <div className="hb-meta">
                <span className="hb-year">{activeMovie?.Year}</span>
                {genres.length > 0 && <span className="hb-dot" />}
                {genres.map((g, i) => (
                  <span key={i} className="hb-genre">{g.trim()}</span>
                ))}
                {activeMovie?.imdbRating && activeMovie.imdbRating !== "N/A" && (
                  <>
                    <span className="hb-dot" />
                    <span className="hb-rating">
                      ★ {activeMovie.imdbRating}
                    </span>
                  </>
                )}
              </div>

              {/* CTA */}
              <div className="hb-cta">
                <span className="hb-cta-play">▶</span>
                Watch Now
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail strip (desktop) */}
        <div className="hb-strip">
          {movies.slice(0, 5).map((m, i) => {
            const thumbUrl = getPoster(m.Poster, "300x450");
            return (
              <div
                key={m.imdbID}
                className={`hb-thumb${i === activeIdx ? " active" : ""}`}
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => setHovering(false)}
                onMouseLeave={() => setHovering(true)}
              >
                {i === activeIdx && <div className="hb-thumb-active-bar" />}
                <img
                  src={thumbUrl}
                  alt={m.Title}
                  className="hb-thumb-img"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <div className="hb-thumb-label">{m.Title}</div>
              </div>
            );
          })}
        </div>

        {/* Bottom progress dots via Swiper hidden — use custom pill dots */}
        <div style={{
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 6,
        }}>
          {movies.slice(0, 5).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                width: i === activeIdx ? 28 : 7,
                height: 7,
                borderRadius: 4,
                background: i === activeIdx
                  ? "linear-gradient(90deg,#F58C1E,#2EC4B6)"
                  : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.35s cubic-bezier(.34,1.56,.64,1)",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HeroBanner;