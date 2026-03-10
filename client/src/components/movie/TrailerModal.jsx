import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function TrailerModal({ movie, onClose }) {
  const [trailerId, setTrailerId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. PASTE YOUR TMDB API KEY HERE
  const API_KEY = "62ad706be1fd55aafadc4d2f8d15d883";

  useEffect(() => {
    // If no movie is provided, do nothing
    if (!movie) return;

    const fetchTrailer = async () => {
      setIsLoading(true);
      try {
        // IMPORTANT: This assumes your movie object has a TMDB 'id' (e.g. movie.id)
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          // Look specifically for an official YouTube Trailer
          const officialTrailer = data.results.find(
            (vid) => vid.site === "YouTube" && vid.type === "Trailer"
          );
          
          // If no "Trailer" is found, fallback to any available YouTube video (like a Teaser)
          const fallbackVideo = data.results.find((vid) => vid.site === "YouTube");

          const finalVideo = officialTrailer || fallbackVideo;

          if (finalVideo) {
            setTrailerId(finalVideo.key); // This sets the exact YouTube ID
          } else {
            setTrailerId(null);
          }
        } else {
          setTrailerId(null);
        }
      } catch (error) {
        console.error("Error fetching trailer from TMDB:", error);
        setTrailerId(null);
      } finally {
        setIsLoading(false); // Stop the loading spinner
      }
    };

    fetchTrailer();
  }, [movie]); // Re-run this effect if the selected movie changes

  if (!movie) return null;

  // This handles both 'movie.title' (TMDB format) and 'movie.Title' (OMDB format)
  const displayTitle = movie.title || movie.Title;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
          <h2 className="text-xl font-bold text-white">{displayTitle} Trailer</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 transition-colors hover:text-white"
            title="Close"
          >
            &times;
          </button>
        </div>

        {/* Video Player Area */}
        <div className="p-4 md:p-6">
          {isLoading ? (
            // Loading State
            <div className="flex items-center justify-center w-full bg-black rounded-lg h-64 md:h-[450px]">
              <p className="text-lg text-gray-400 animate-pulse">Loading Trailer...</p>
            </div>
          ) : trailerId ? (
            // Success State: The Iframe
            <div className="relative w-full overflow-hidden bg-black rounded-lg pt-[56.25%] shadow-lg shadow-black/50 border border-slate-700">
              {/* pt-[56.25%] creates a perfect 16:9 aspect ratio */}
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&origin=${window.location.origin}`}
                title={`${displayTitle} trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            // Error/Not Found State
            <div className="flex flex-col items-center justify-center w-full bg-slate-800 rounded-lg h-64 md:h-[450px]">
              <svg className="w-16 h-16 mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium text-gray-400">Official trailer not available</p>
            </div>
          )}

          {/* Footer Close Button */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-2.5 font-semibold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-500 w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TrailerModal;