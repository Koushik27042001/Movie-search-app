import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { applyTheme, getInitialTheme, persistTheme } from "../../utils/theme";

function Navbar() {
  const [dark, setDark] = useState(() => getInitialTheme() === "dark");

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    applyTheme(theme);
    persistTheme(theme);
  }, [dark]);

  return (
    <nav className="bg-gray-200 dark:bg-gray-900 py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        MovieApp
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/favorites">Favorites</Link>
        <button
          onClick={() => setDark((prev) => !prev)}
          className="bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white px-3 py-1 rounded"
        >
          Switch to {dark ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
