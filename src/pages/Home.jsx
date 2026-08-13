import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

import {
  getLostItems,
  getFoundItems,
} from "../utils/storage";

function Home() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const lost = getLostItems();
    const found = getFoundItems();

    setLostItems(lost);
    setFoundItems(found);
  };

  // Total recovered items
  const recoveredItems = foundItems.filter(
    (item) => item.status === "Recovered"
  ).length;

  return (
    <div className="home-page">

      {/* ================= HERO SECTION ================= */}

      <section className="hero-section">

        <div className="hero-container">

          <div className="hero-content">

            <div className="hero-badge">
              🎓 College Campus Lost & Found
            </div>

            <h1>
              Lost Something?
              <span> Find It Here.</span>
            </h1>

            <p>
              A simple and secure platform for students to report
              lost items, report found items, and reconnect belongings
              with their rightful owners.
            </p>

            <div className="hero-buttons">

              <Link
                to="/add-lost-item"
                className="hero-btn primary-btn"
              >
                🔍 Report Lost Item
              </Link>

              <Link
                to="/add-found-item"
                className="hero-btn secondary-btn"
              >
                📦 Report Found Item
              </Link>

            </div>

          </div>


          {/* ================= HERO VISUAL ================= */}

          <div className="hero-visual">

            <div className="hero-card main-card">

              <div className="search-icon">
                🔎
              </div>

              <h3>
                Find Your Belongings
              </h3>

              <p>
                Search through items reported by students
                across the campus.
              </p>

              <div className="mini-search">

                <span>
                  Search items...
                </span>

                <Link to="/lost-items">
                  Search
                </Link>

              </div>

            </div>


            <div className="floating-card lost-card">

              🔴 Lost Item

              <strong>
                {lostItems.length > 0
                  ? lostItems[0]?.itemName
                  : "Black Wallet"}
              </strong>

            </div>


            <div className="floating-card found-card">

              🟢 Found Item

              <strong>
                {foundItems.length > 0
                  ? foundItems[0]?.itemName
                  : "Blue Bottle"}
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* ================= STATISTICS ================= */}

      <section className="stats-section">

        <div className="stats-container">


          {/* LOST */}

          <div className="stat-card">

            <div className="stat-icon">
              🔍
            </div>

            <h2>
              {lostItems.length}
            </h2>

            <p>
              Lost Items
            </p>

          </div>


          {/* FOUND */}

          <div className="stat-card">

            <div className="stat-icon">
              📦
            </div>

            <h2>
              {foundItems.length}
            </h2>

            <p>
              Found Items
            </p>

          </div>


          {/* RECOVERED */}

          <div className="stat-card">

            <div className="stat-icon">
              🤝
            </div>

            <h2>
              {recoveredItems}
            </h2>

            <p>
              Items Returned
            </p>

          </div>


          {/* STUDENTS */}

          <div className="stat-card">

            <div className="stat-icon">
              🎓
            </div>

            <h2>
              1000+
            </h2>

            <p>
              Students
            </p>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="how-section">

        <div className="section-heading">

          <span>
            HOW IT WORKS
          </span>

          <h2>
            Find or Return an Item
            <br />
            in Three Simple Steps
          </h2>

          <p>
            Our platform makes the lost and found process
            quick and easy for everyone on campus.
          </p>

        </div>


        <div className="steps-container">


          {/* STEP 1 */}

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              📝
            </div>

            <h3>
              Report
            </h3>

            <p>
              Report an item you have lost or found
              on the college campus.
            </p>

          </div>


          {/* STEP 2 */}

          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              🔎
            </div>

            <h3>
              Search
            </h3>

            <p>
              Browse through reported items and
              search for matching belongings.
            </p>

          </div>


          {/* STEP 3 */}

          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              🤝
            </div>

            <h3>
              Reconnect
            </h3>

            <p>
              Connect with the person who found
              or lost the item.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="categories-section">

        <div className="section-heading">

          <span>
            POPULAR CATEGORIES
          </span>

          <h2>
            What Are You Looking For?
          </h2>

          <p>
            Browse common categories to quickly find
            your lost belongings.
          </p>

        </div>


        <div className="categories-container">


          <Link
            to="/lost-items"
            className="category-card"
          >
            <div>📱</div>

            <h3>
              Electronics
            </h3>

            <p>
              Phones, laptops & gadgets
            </p>
          </Link>


          <Link
            to="/lost-items"
            className="category-card"
          >
            <div>📚</div>

            <h3>
              Books
            </h3>

            <p>
              Books, notes & study material
            </p>
          </Link>


          <Link
            to="/lost-items"
            className="category-card"
          >
            <div>👛</div>

            <h3>
              Wallets
            </h3>

            <p>
              Wallets & personal items
            </p>
          </Link>


          <Link
            to="/lost-items"
            className="category-card"
          >
            <div>🎒</div>

            <h3>
              Bags
            </h3>

            <p>
              Bags, backpacks & luggage
            </p>
          </Link>


          <Link
            to="/lost-items"
            className="category-card"
          >
            <div>🔑</div>

            <h3>
              Keys
            </h3>

            <p>
              Keys & keychains
            </p>
          </Link>


          <Link
            to="/lost-items"
            className="category-card"
          >
            <div>👓</div>

            <h3>
              Accessories
            </h3>

            <p>
              Glasses, watches & more
            </p>
          </Link>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="cta-section">

        <div className="cta-container">

          <div>

            <span className="cta-small">
              LOST SOMETHING ON CAMPUS?
            </span>

            <h2>
              Don't Give Up.
              <br />
              Your Item Might Be Here.
            </h2>

            <p>
              Search our lost and found database or
              report your missing item today.
            </p>

          </div>


          <div className="cta-buttons">

            <Link
              to="/lost-items"
              className="cta-btn white-btn"
            >
              Search Lost Items
            </Link>

            <Link
              to="/add-lost-item"
              className="cta-btn outline-btn"
            >
              Report Lost Item
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;