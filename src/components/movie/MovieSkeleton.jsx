function MovieSkeleton() {
  return (
    <div className="bg-gray-800 rounded p-3 animate-pulse">
      <div className="w-full h-64 bg-gray-700 rounded" />
      <div className="mt-2 h-5 bg-gray-700 rounded w-3/4" />
      <div className="mt-2 h-4 bg-gray-700 rounded w-1/4" />
    </div>
  );
}

export default MovieSkeleton;
