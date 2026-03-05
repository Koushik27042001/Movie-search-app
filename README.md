# MovieApp

A React movie search app powered by the OMDB API.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your OMDB API key to `.env`:
   ```
   VITE_OMDB_KEY=your_api_key
   ```
   Get a free key at [omdbapi.com](https://www.omdbapi.com/apikey.aspx)

3. Start the dev server:
   ```bash
   npm run dev
   ```

## Features

- Search movies with debounced input
- View movie details
- Add/remove favorites (persisted in localStorage)
- Responsive layout with Tailwind CSS
