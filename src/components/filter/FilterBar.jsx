import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { label: "All", icon: "⚡" },
  { label: "Web Series", icon: "📺" },
  { label: "Hindi", icon: "🎬" },
  { label: "Bengali", icon: "🎭" },
  { label: "Hollywood", icon: "🌟" },
  { label: "Action", icon: "💥" },
  { label: "Comedy", icon: "😄" },
];

function FilterBar({ filter, setFilter }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 160, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .fb-root {
          position: relative;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          padding: 4px 0;
        }

        /* fade edges */
        .fb-fade-left, .fb-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 72px;
          z-index: 2;
          pointer-events: none;
          transition: opacity 0.25s;
        }
        .fb-fade-left  { left: 0;  background: linear-gradient(to right, var(--fb-bg, #fff) 0%, transparent 100%); }
        .fb-fade-right { right: 0; background: linear-gradient(to left,  var(--fb-bg, #fff) 0%, transparent 100%); }
        .dark .fb-fade-left  { --fb-bg: #080a0f; }
        .dark .fb-fade-right { --fb-bg: #080a0f; }

        /* arrow btns */
        .fb-arrow {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          z-index: 3;
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: rgba(255,255,255,0.95);
          color: #444;
          font-size: 13px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          transition: all 0.2s;
        }
        .dark .fb-arrow {
          background: rgba(20,23,32,0.95);
          border-color: rgba(255,255,255,0.1);
          color: #ccc;
        }
        .fb-arrow:hover {
          border-color: #F58C1E;
          color: #F58C1E;
          box-shadow: 0 2px 16px rgba(245,140,30,0.25);
        }
        .fb-arrow-left  { left:  4px; }
        .fb-arrow-right { right: 4px; }

        /* scroll strip */
        .fb-strip {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 6px 4px;
          scroll-behavior: smooth;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .fb-strip::-webkit-scrollbar { display: none; }

        /* pill button */
        .fb-pill {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 999px;
          border: 1.5px solid rgba(0,0,0,0.08);
          background: rgba(0,0,0,0.03);
          color: #555;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          outline: none;
          flex-shrink: 0;
          letter-spacing: 0.01em;
        }
        .dark .fb-pill {
          border-color: rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          color: #aaa;
        }
        .fb-pill:hover:not(.active) {
          border-color: rgba(245,140,30,0.4);
          color: #F58C1E;
          background: rgba(245,140,30,0.06);
        }
        .fb-pill.active {
          color: #fff;
          border-color: transparent;
        }

        /* active bg fill */
        .fb-pill-bg {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #F58C1E 0%, #e07010 100%);
          box-shadow: 0 4px 18px rgba(245,140,30,0.38);
          z-index: 0;
        }
        .fb-pill-icon, .fb-pill-label {
          position: relative;
          z-index: 1;
        }
        .fb-pill-icon {
          font-size: 14px;
          line-height: 1;
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1);
        }
        .fb-pill:hover .fb-pill-icon,
        .fb-pill.active .fb-pill-icon {
          transform: scale(1.2);
        }

        /* count badge */
        .fb-count {
          position: relative;
          z-index: 1;
          font-size: 10px;
          font-weight: 600;
          padding: 1px 6px;
          border-radius: 99px;
          background: rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.04em;
        }
        .fb-pill:not(.active) .fb-count {
          background: rgba(0,0,0,0.07);
          color: #888;
        }
        .dark .fb-pill:not(.active) .fb-count {
          background: rgba(255,255,255,0.08);
          color: #777;
        }

        /* bottom indicator line */
        .fb-line-wrap {
          margin-top: 4px;
          height: 2px;
          border-radius: 1px;
          background: rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .dark .fb-line-wrap { background: rgba(255,255,255,0.05); }
        .fb-line-fill {
          height: 100%;
          border-radius: 1px;
          background: linear-gradient(90deg, #F58C1E, #2EC4B6);
          transition: width 0.4s cubic-bezier(.4,0,.2,1);
        }
      `}</style>

      <div className="fb-root">
        {/* Fade + arrow — left */}
        {showLeft && (
          <>
            <div className="fb-fade-left" />
            <button className="fb-arrow fb-arrow-left" onClick={() => scroll(-1)}>‹</button>
          </>
        )}

        {/* Scrollable strip */}
        <div className="fb-strip" ref={scrollRef}>
          {categories.map((cat, idx) => {
            const isActive = filter === cat.label;
            const pct = Math.round(((idx + 1) / categories.length) * 100);

            return (
              <button
                key={cat.label}
                className={`fb-pill${isActive ? " active" : ""}`}
                onClick={() => setFilter(cat.label)}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      className="fb-pill-bg"
                      layoutId="activePill"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </AnimatePresence>

                <span className="fb-pill-icon">{cat.icon}</span>
                <span className="fb-pill-label">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Fade + arrow — right */}
        {showRight && (
          <>
            <div className="fb-fade-right" />
            <button className="fb-arrow fb-arrow-right" onClick={() => scroll(1)}>›</button>
          </>
        )}

        {/* Progress indicator */}
        <div className="fb-line-wrap">
          <div
            className="fb-line-fill"
            style={{
              width: `${Math.round(
                ((categories.findIndex((c) => c.label === filter) + 1) / categories.length) * 100
              )}%`,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default FilterBar;