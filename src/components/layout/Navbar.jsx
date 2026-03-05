import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black py-4 px-6 flex justify-between">
      <Link to="/" className="text-xl font-bold">
        MovieApp
      </Link>

      <Link to="/favorites">Favorites ❤️</Link>
    </nav>
  );
}

export default Navbar;
