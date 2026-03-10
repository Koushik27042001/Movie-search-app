import { motion } from "framer-motion";
import { useMemo, useState } from "react";

function TrailerModal({ movie, onClose }) {
  if (!movie) return null;

  const [showFallback, setShowFallback] = useState(false);

  const trailerQuery = useMemo(
    () => encodeURIComponent(`${movie.Title} official trailer`),
    [movie.Title]
  );

  const youtubeSearchUrl = useMemo(
    () => `https://www.youtube.com/results?search_query=${trailerQuery}`,
    [trailerQuery]
  );

  const embedUrl = useMemo(
    () =>
      `https://www.youtube-nocookie.com/embed?autoplay=1&rel=0&modestbranding=1&listType=search&list=${trailerQuery}`,
    [trailerQuery]
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <div
        className="bg-gray-900 p-6 rounded-lg max-w-2xl w-full"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-white">{movie.Title} Trailer</h2>

        {!showFallback ? (
          <iframe
            className="w-full h-64 md:h-80 rounded"
            title={`${movie.Title} trailer`}
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onError={() => setShowFallback(true)}
          />
        ) : (
          <div className="w-full h-64 md:h-80 rounded bg-gray-800 flex flex-col items-center justify-center gap-3 text-center px-4">
            <p className="text-sm text-gray-200">
              Embedded trailer is unavailable for this title.
            </p>
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black px-4 py-2 rounded font-medium"
            >
              Open on YouTube
            </a>
          </div>
        )}

        <a
          href={youtubeSearchUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-sm text-amber-400 underline"
        >
          If video does not play, watch trailer on YouTube
        </a>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 bg-red-500 px-4 py-2 rounded text-white"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}

export default TrailerModal;
