import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/logo/logo_film.png";

const getInitialTheme = () => {
  try { return localStorage.getItem("theme") || "dark"; } catch { return "dark"; }
};
const applyTheme = (t) => document.documentElement.classList.toggle("dark", t === "dark");
const persistTheme = (t) => { try { localStorage.setItem("theme", t); } catch {} };

export default function Navbar() {
  const [dark, setDark] = useState(() => getInitialTheme() === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    applyTheme(theme);
    persistTheme(theme);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .fx-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          font-family: 'DM Sans', sans-serif;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          background: rgba(255,255,255,0.95);
          border-bottom: 1px solid rgba(0,0,0,0.07);
          transition: box-shadow 0.3s, background 0.3s;
        }
        .dark .fx-nav {
          background: rgba(10,12,16,0.95);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .fx-nav.scrolled {
          box-shadow: 0 4px 32px rgba(0,0,0,0.13);
        }
        .dark .fx-nav.scrolled {
          box-shadow: 0 4px 32px rgba(0,0,0,0.55);
        }

        /* ?????? LAYOUT ?????? */
        .fx-inner {
          width: 100%;
          padding: 0 32px 0 0;
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        /* ?????? LOGO ?????? */
        .fx-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
          /* Dark pill background so logo is always visible */
          background: #0a0c10;
          padding: 8px 24px 8px 32px;
          height: 86px;
          border-right: 1px solid rgba(255,255,255,0.07);
          transition: background 0.3s;
        }
        .fx-logo-link:hover {
          background: #111318;
        }
        .fx-logo-img {
          height: 62px;
          width: 220px;
          object-fit: contain;
          object-position: left center;
          /* No blend mode ??? always render normally on dark pill */
          mix-blend-mode: normal;
          filter: brightness(1.05);
          transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), filter 0.3s;
          display: block;
        }
        .fx-logo-link:hover .fx-logo-img {
          transform: scale(1.04);
          filter: brightness(1.2) drop-shadow(0 0 12px rgba(245,140,30,0.5));
        }

        /* ?????? SEARCH ?????? */
        .fx-search {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 16px;
          height: 44px;
          border-radius: 999px;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: rgba(0,0,0,0.04);
          transition: border-color 0.2s, box-shadow 0.2s, width 0.3s ease;
          width: 250px;
          cursor: text;
        }
        .dark .fx-search {
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
        }
        .fx-search.focused {
          border-color: #F58C1E;
          box-shadow: 0 0 0 3px rgba(245,140,30,0.14);
          width: 310px;
        }
        .fx-search-icon {
          font-size: 13px;
          color: #aaa;
          flex-shrink: 0;
          transition: color 0.2s;
        }
        .fx-search.focused .fx-search-icon { color: #F58C1E; }
        .fx-search-input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 14px;
          width: 100%;
          color: #111;
          font-family: 'DM Sans', sans-serif;
        }
        .dark .fx-search-input { color: #f0f0f0; }
        .fx-search-input::placeholder { color: #aaa; }

        /* ?????? DESKTOP ACTIONS ?????? */
        .fx-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .fx-link {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 500;
          color: #555;
          text-decoration: none;
          transition: background 0.18s, color 0.18s;
        }
        .dark .fx-link { color: #bbb; }
        .fx-link:hover {
          background: rgba(245,140,30,0.1);
          color: #F58C1E;
        }
        .fx-link svg { font-size: 13px; }

        .fx-divider {
          width: 1px;
          height: 24px;
          background: rgba(0,0,0,0.1);
          flex-shrink: 0;
        }
        .dark .fx-divider { background: rgba(255,255,255,0.1); }

        .fx-theme-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: transparent;
          color: #555;
          cursor: pointer;
          transition: all 0.2s;
        }
        .dark .fx-theme-btn {
          border-color: rgba(255,255,255,0.12);
          color: #aaa;
        }
        .fx-theme-btn:hover {
          border-color: #2EC4B6;
          color: #2EC4B6;
          background: rgba(46,196,182,0.07);
        }

        /* ?????? HAMBURGER ?????? */
        .fx-ham {
          display: none;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 9px;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: transparent;
          color: #444;
          cursor: pointer;
          font-size: 17px;
          transition: all 0.2s;
          margin-right: 8px;
        }
        .dark .fx-ham {
          border-color: rgba(255,255,255,0.12);
          color: #ccc;
        }
        .fx-ham:hover {
          border-color: #F58C1E;
          color: #F58C1E;
        }

        /* ?????? MOBILE PANEL ?????? */
        .fx-mobile-panel {
          overflow: hidden;
          border-top: 1px solid rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(18px);
        }
        .dark .fx-mobile-panel {
          border-top-color: rgba(255,255,255,0.06);
          background: rgba(10,12,16,0.98);
        }
        .fx-mobile-inner {
          padding: 14px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .fx-mob-search {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 14px;
          height: 46px;
          border-radius: 10px;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: rgba(0,0,0,0.03);
        }
        .dark .fx-mob-search {
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
        }
        .fx-mob-row { display: flex; gap: 8px; }
        .fx-mob-link, .fx-mob-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 12px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #555;
          text-decoration: none;
          background: rgba(0,0,0,0.03);
          border: 1.5px solid rgba(0,0,0,0.08);
          cursor: pointer;
          transition: all 0.18s;
        }
        .dark .fx-mob-link, .dark .fx-mob-btn {
          color: #bbb;
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.09);
        }
        .fx-mob-link:hover { border-color: #F58C1E; color: #F58C1E; background: rgba(245,140,30,0.07); }
        .fx-mob-btn:hover  { border-color: #2EC4B6; color: #2EC4B6; background: rgba(46,196,182,0.07); }

        /* ?????? RESPONSIVE ?????? */
        @media (max-width: 768px) {
          .fx-search, .fx-actions { display: none !important; }
          .fx-ham { display: flex !important; }
          .fx-inner { height: 74px; }
          .fx-logo-link { height: 74px; padding: 6px 18px 6px 20px; }
          .fx-logo-img { height: 52px; width: 180px; }
        }
      `}</style>

      <nav className={`fx-nav${scrolled ? " scrolled" : ""}`}>
        <div className="fx-inner">

          {/* Logo flush to the left edge inside dark pill */}
          <Link to="/" className="fx-logo-link">
            <motion.img
              src={logo}
              alt="Flixor ??? Movies & Series"
              className="fx-logo-img"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
            />
          </Link>

          {/* Desktop Search */}
          <div
            className={`fx-search${searchFocused ? " focused" : ""}`}
            onClick={() => inputRef.current?.focus()}
          >
            <FaSearch className="fx-search-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search movies & series..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="fx-search-input"
            />
          </div>

                    {/* Desktop Actions */}
          <div className="fx-actions">
            <Link to="/favorites" className="fx-link">
              <FaHeart /> Favorites
            </Link>
            <div className="fx-divider" />
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="fx-link">
                  Dashboard
                </Link>
                <button
                  className="fx-link"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="fx-link">
                  Login
                </Link>
                <Link to="/register" className="fx-link">
                  Sign up
                </Link>
              </>
            )}
            <button className="fx-theme-btn" onClick={() => setDark(p => !p)}>
              {dark ? "??? Light" : "???? Dark"}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button className="fx-ham" onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fx-mobile-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              <div className="fx-mobile-inner">
                <div className="fx-mob-search">
                  <FaSearch className="fx-search-icon" />
                  <input
                    type="text"
                    placeholder="Search movies & series..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="fx-search-input"
                    style={{ width: "100%" }}
                  />
                </div>
                                <div className="fx-mob-row">
                  <Link to="/favorites" className="fx-mob-link" onClick={() => setMenuOpen(false)}>
                    <FaHeart /> Favorites
                  </Link>
                  {isAuthenticated ? (
                    <button
                      className="fx-mob-btn"
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                        navigate("/login");
                      }}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" className="fx-mob-link" onClick={() => setMenuOpen(false)}>
                      Login
                    </Link>
                  )}
                </div>
                <div className="fx-mob-row">
                  {isAuthenticated ? (
                    <Link to="/dashboard" className="fx-mob-link" onClick={() => setMenuOpen(false)}>
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/register" className="fx-mob-link" onClick={() => setMenuOpen(false)}>
                      Sign up
                    </Link>
                  )}
                  <button className="fx-mob-btn" onClick={() => setDark(p => !p)}>
                    {dark ? "??? Light" : "???? Dark"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
