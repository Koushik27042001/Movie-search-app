import { useState, useCallback } from "react";
import { searchMovies } from "../services/omdbApi";

export default function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async (query) => {
    if (!query?.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query);
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch movies");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, fetchMovies };
}
