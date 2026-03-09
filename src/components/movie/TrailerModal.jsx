import { motion } from "framer-motion";

function TrailerModal({ movie, onClose }) {
  if (!movie) return null;

  // Format the search query
  const searchQuery = encodeURIComponent(`${movie.Title} official trailer`);

  // Use the special YouTube search embed format
  const embedUrl = `https://www.youtube.com/embed?listType=search&list=${searchQuery}&autoplay=1`;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl p-6 bg-gray-900 rounded-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold text-white">{movie.Title} Trailer</h2>

        <iframe
          className="w-full h-64 rounded md:h-80"
          title={`${movie.Title} trailer`}
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 mt-4 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}

export default TrailerModal;