import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { FaHeart, FaBars, FaTimes, FaSearch } from "react-icons/fa";

import {
  applyTheme,
  getInitialTheme,
  persistTheme,
} from "../../utils/theme";

import logo from "../../assets/logo/logo_film.png";

function Navbar() {
  const [dark, setDark] = useState(() => getInitialTheme() === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    applyTheme(theme);
    persistTheme(theme);
  }, [dark]);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 dark:border-gray-700">

      <div className="flex items-center justify-between px-6 py-3 mx-auto max-w-7xl">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">

          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="p-1 bg-white rounded shadow"
          >
            <img
              src={logo}
              alt="MovieApp Logo"
              className="object-contain w-9 h-9"
            />
          </motion.div>

          <span className="text-xl font-bold text-gray-900 dark:text-white">
            MovieApp
          </span>

        </Link>

        {/* Desktop Search */}
        <div className="items-center hidden px-3 py-1 bg-gray-100 rounded-lg md:flex dark:bg-gray-800">

          <FaSearch className="mr-2 text-gray-500" />

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm text-gray-800 bg-transparent outline-none dark:text-white"
          />

        </div>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-6 md:flex">

          <Link
            to="/favorites"
            className="flex items-center gap-2 transition hover:text-red-500"
          >
            <FaHeart />
            Favorites
          </Link>

          <button
            onClick={() => setDark((prev) => !prev)}
            className="px-3 py-1 text-sm bg-gray-200 rounded dark:bg-gray-700"
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xl md:hidden"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="px-6 pb-4 space-y-4 md:hidden">

          {/* Mobile Search */}
          <div className="flex items-center px-3 py-2 bg-gray-100 rounded-lg dark:bg-gray-800">

            <FaSearch className="mr-2 text-gray-500" />

            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm text-gray-800 bg-transparent outline-none dark:text-white"
            />

          </div>

          <Link
            to="/favorites"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <FaHeart />
            Favorites
          </Link>

          <button
            onClick={() => setDark((prev) => !prev)}
            className="block w-full px-3 py-2 text-left bg-gray-200 rounded dark:bg-gray-700"
          >
            {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

        </div>
      )}

    </nav>
  );
}

export default Navbar;