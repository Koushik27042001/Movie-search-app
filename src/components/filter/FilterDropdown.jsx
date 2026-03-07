function FilterDropdown({ filter, setFilter }) {
  return (
    <select
      className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded mb-6"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="series">Web Series</option>
      <option value="hindi">Hindi Movies</option>
      <option value="bengali">Bengali Movies</option>
      <option value="hollywood">Hollywood</option>
    </select>
  );
}

export default FilterDropdown;
