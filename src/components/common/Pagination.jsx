function Pagination({ page, setPage, hasNext }) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        className="px-4 py-2 text-gray-900 bg-gray-200 rounded dark:bg-gray-700 dark:text-white disabled:opacity-50"
        disabled={page === 1}
      >
        Prev
      </button>

      <span className="px-4 py-2">{page}</span>

      <button
        onClick={() => setPage((p) => p + 1)}
        className="px-4 py-2 text-gray-900 bg-gray-200 rounded dark:bg-gray-700 dark:text-white disabled:opacity-50"
        disabled={!hasNext}
      >
        
        Next
      </button>
    </div>
  );
}

export default Pagination;
