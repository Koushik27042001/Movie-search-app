function MovieSkeleton() {
  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded p-3">
      <div className="bg-gray-300 dark:bg-gray-700 h-64 w-full rounded"></div>
      <div className="bg-gray-300 dark:bg-gray-700 h-4 mt-3 w-3/4 rounded"></div>
      <div className="bg-gray-300 dark:bg-gray-700 h-4 mt-2 w-1/2 rounded"></div>
    </div>
  );
}

export default MovieSkeleton;
