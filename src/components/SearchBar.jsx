import "./../styles/SearchBar.css";

function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="searchbar">

      <div className="search-input">

        <span>🔍</span>

        <input
          type="text"
          placeholder="Search by item, description or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="All">
          All Categories
        </option>

        <option value="Electronics">
          Electronics
        </option>

        <option value="Books">
          Books
        </option>

        <option value="Bags">
          Bags
        </option>

        <option value="Wallet">
          Wallet
        </option>

        <option value="Keys">
          Keys
        </option>

        <option value="Accessories">
          Accessories
        </option>

        <option value="Documents">
          Documents
        </option>

        <option value="Other">
          Other
        </option>
      </select>

    </div>
  );
}

export default SearchBar;