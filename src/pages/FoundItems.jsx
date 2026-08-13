import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FoundItems.css";

import {
  getFoundItems,
  deleteFoundItem,
  recoverFoundItem,
} from "../utils/storage";

function FoundItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    setItems(getFoundItems());
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this found item?")) {
      deleteFoundItem(id);
      loadItems();
    }
  };

  const handleRecover = (id) => {
    if (window.confirm("Mark this item as returned?")) {
      recoverFoundItem(id);
      loadItems();
    }
  };

  const filteredItems = items.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.itemName?.toLowerCase().includes(searchText) ||
      item.description?.toLowerCase().includes(searchText) ||
      item.location?.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="found-items-page">

      {/* HEADER */}

      <section className="found-header">
        <div className="found-header-container">

          <div>
            <span className="page-label">
              CAMPUS FOUND ITEMS
            </span>

            <h1>Found Items</h1>

            <p>
              Browse through items found by students
              across the campus.
            </p>
          </div>

          <Link
            to="/add-found-item"
            className="report-found-btn"
          >
            + Report Found Item
          </Link>

        </div>
      </section>

      {/* FILTER */}

      <section className="found-filter-section">
        <div className="found-filter-container">

          <div className="found-search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Bags">Bags</option>
            <option value="Wallet">Wallet</option>
            <option value="Keys">Keys</option>
            <option value="Accessories">Accessories</option>
            <option value="Documents">Documents</option>
            <option value="Other">Other</option>
          </select>

        </div>
      </section>

      {/* ITEMS */}

      <section className="found-items-section">
        <div className="found-items-container">

          <div className="found-items-top">
            <div>
              <h2>
                {filteredItems.length}{" "}
                {filteredItems.length === 1
                  ? "Item"
                  : "Items"}
              </h2>

              <p>Showing reported found items</p>
            </div>
          </div>

          {filteredItems.length === 0 ? (

            <div className="no-found-items">

              <div className="no-found-icon">
                📦
              </div>

              <h3>No Found Items</h3>

              <p>
                {items.length === 0
                  ? "No items have been reported yet."
                  : "No matching items found."}
              </p>

              {items.length === 0 && (
                <Link
                  to="/add-found-item"
                  className="report-found-btn"
                >
                  Report Found Item
                </Link>
              )}

            </div>

          ) : (

            <div className="found-items-grid">

              {filteredItems.map((item) => (

                <div
                  className="found-item-card"
                  key={item.id}
                >

                  <div className="found-item-image">

                    <div className="found-item-icon">
                      📦
                    </div>

                    <span
                      className={
                        item.status === "Recovered"
                          ? "found-status recovered"
                          : "found-status"
                      }
                    >
                      {item.status === "Recovered"
                        ? "RECOVERED"
                        : "FOUND"}
                    </span>

                  </div>

                  <div className="found-item-content">

                    <div className="found-item-category">
                      {item.category}
                    </div>

                    <h3>{item.itemName}</h3>

                    <p className="found-item-description">
                      {item.description}
                    </p>

                    <div className="found-item-info">

                      <div>
                        📍 <strong>Location:</strong>{" "}
                        {item.location}
                      </div>

                      <div>
                        📅 <strong>Date:</strong>{" "}
                        {item.date}
                      </div>

                    </div>

                    <div className="found-item-footer">

                      <div className="found-reported-by">
                        Found by{" "}
                        <strong>{item.finderName}</strong>
                      </div>

                      <button
                        className="claim-btn"
                        onClick={() =>
                          alert(`Contact: ${item.contact}`)
                        }
                      >
                        Contact Finder
                      </button>

                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "flex-end",
                        marginTop: "15px",
                      }}
                    >

                      {item.status !== "Recovered" && (
                        <button
                          className="recover-found-btn"
                          onClick={() =>
                            handleRecover(item.id)
                          }
                        >
                          Mark as Returned
                        </button>
                      )}

                      <button
                        className="delete-found-btn"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
      </section>

    </div>
  );
}

export default FoundItems;