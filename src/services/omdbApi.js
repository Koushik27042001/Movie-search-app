import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, page = 1) => {
  const res = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
      page
    }
  });

  return res.data;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id
    }
  });

  return res.data;
};

export const getTrendingMovies = async () => {
  const keywords = ["avengers", "batman", "marvel", "spiderman", "top"];

  const responses = await Promise.all(
    keywords.map(async (keyword) => {
      try {
        const data = await searchMovies(keyword, 1);
        return data?.Search || [];
      } catch {
        return [];
      }
    })
  );

  const merged = responses.flat();
  const unique = [];
  const seen = new Set();

  for (const movie of merged) {
    if (!seen.has(movie.imdbID)) {
      seen.add(movie.imdbID);
      unique.push(movie);
    }
  }

  return unique.slice(0, 20);
};
