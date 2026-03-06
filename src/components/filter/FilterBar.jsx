const categories = [
  "All",
  "Web Series",
  "Hindi",
  "Bengali",
  "Hollywood",
  "Action",
  "Comedy",
];

function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex gap-3 overflow-x-auto py-3 scrollbar-thin">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
            filter === cat
              ? "bg-amber-500 text-black"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
