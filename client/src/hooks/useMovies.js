import { useState, useCallback } from "react";
import { searchMovies } from "../services/omdbApi";

export default function useMovies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async (queryText, pageNumber = 1, append = false) => {
    const cleanQuery = queryText?.trim() || "";
    if (!cleanQuery) {
      setQuery("");
      setPage(1);
      setMovies([]);
      setTotalResults(0);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setQuery(cleanQuery);
    setPage(pageNumber);

    try {
      const data = await searchMovies(cleanQuery, pageNumber);
      if (data.Search) {
        setMovies((prev) => {
          if (!append) return data.Search;

          const seen = new Set(prev.map((movie) => movie.imdbID));
          const merged = [...prev];

          for (const movie of data.Search) {
            if (!seen.has(movie.imdbID)) {
              seen.add(movie.imdbID);
              merged.push(movie);
            }
          }

          return merged;
        });
        setTotalResults(Number(data.totalResults || 0));
      } else {
        if (!append) {
          setMovies([]);
        }
        setTotalResults(0);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch movies");
      if (!append) {
        setMovies([]);
        setTotalResults(0);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, query, page, setPage, totalResults, loading, error, fetchMovies };
}
