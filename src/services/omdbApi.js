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
