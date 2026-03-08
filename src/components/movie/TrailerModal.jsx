import { motion } from "framer-motion";

function TrailerModal({ movie, onClose }) {
  if (!movie) return null;

  const trailerQuery = encodeURIComponent(`${movie.Title} trailer`);

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

        <iframe
          className="w-full h-64 md:h-80 rounded"
          title={`${movie.Title} trailer`}
          src={`https://www.youtube.com/embed?listType=search&list=${trailerQuery}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

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
