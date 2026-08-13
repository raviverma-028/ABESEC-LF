import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/LostItems.css";

import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";

import {
  getLostItems,
  deleteLostItem,
} from "../utils/storage";

function LostItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    setItems(getLostItems());
  };

  const handleDelete = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this lost item?"
      )
    ) {
      return;
    }

    deleteLostItem(id);
    loadItems();
  };

  const filteredItems = items.filter((item) => {
    const text = search.toLowerCase();

    const matchesSearch =
      item.itemName?.toLowerCase().includes(text) ||
      item.description?.toLowerCase().includes(text) ||
      item.location?.toLowerCase().includes(text);

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="lost-items-page">

      {/* HEADER */}

      <section className="lost-items-header">

        <div className="lost-items-header-container">

          <span className="page-label">
            CAMPUS LOST ITEMS
          </span>

          <h1>Lost Items</h1>

          <p>
            Search through items reported by
            students across the campus.
          </p>

        </div>

      </section>

      {/* BODY */}

      <section className="lost-items-section">

        <div className="lost-items-container">

          <SearchBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />

          <div className="lost-items-topbar">

            <div>

              <h2>
                {filteredItems.length}{" "}
                {filteredItems.length === 1
                  ? "Item"
                  : "Items"}
              </h2>

              <p>
                Showing reported lost items
              </p>

            </div>

            <Link
              to="/add-lost-item"
              className="add-lost-item-btn"
            >
              + Report Lost Item
            </Link>

          </div>

          {filteredItems.length === 0 ? (

            <div className="empty-lost-items">

              <div className="empty-icon">
                🔍
              </div>

              <h2>No Lost Items Found</h2>

              <p>

                {items.length === 0
                  ? "No items have been reported yet."
                  : "Try another search."}

              </p>

            </div>

          ) : (

            <div className="lost-items-grid">

              {filteredItems.map((item) => (

                <ItemCard
                  key={item.id}
                  item={item}
                  type="lost"
                  onDelete={handleDelete}
                  onAction={(item) =>
                    alert(
                      `Contact: ${item.contact}`
                    )
                  }
                />

              ))}

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default LostItems;