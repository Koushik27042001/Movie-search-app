import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.imdbID === movie.imdbID)) return prev;
      const updated = [...prev, movie];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => {
      const updated = prev.filter((m) => m.imdbID !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
