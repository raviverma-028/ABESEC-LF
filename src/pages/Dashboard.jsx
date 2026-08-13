import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

import {
  getLostItems,
  getFoundItems,
} from "../utils/storage";

function Dashboard() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    setLostItems(getLostItems());
    setFoundItems(getFoundItems());
  };

  const recoveredItems = foundItems.filter(
    (item) => item.status === "Recovered"
  );

  const pendingItems = foundItems.filter(
    (item) => item.status !== "Recovered"
  );

  // Latest items
  const recentLostItems = [...lostItems].reverse().slice(0, 5);
  const recentFoundItems = [...foundItems].reverse().slice(0, 5);

  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}

      <section className="dashboard-header">

        <div className="dashboard-header-container">

          <div>

            <span className="dashboard-label">
              CAMPUS LOST & FOUND
            </span>

            <h1>
              Dashboard
            </h1>

            <p>
              Manage and track lost and found items
              across your college campus.
            </p>

          </div>

          <div className="dashboard-actions">

            <Link
              to="/add-lost-item"
              className="dashboard-lost-btn"
            >
              + Report Lost
            </Link>

            <Link
              to="/add-found-item"
              className="dashboard-found-btn"
            >
              + Report Found
            </Link>

          </div>

        </div>

      </section>


      {/* ================= STATISTICS ================= */}

      <section className="dashboard-stats-section">

        <div className="dashboard-container">

          <div className="dashboard-stats-grid">


            {/* LOST */}

            <div className="dashboard-stat-card">

              <div className="dashboard-stat-icon lost-icon">
                🔍
              </div>

              <div>

                <span>
                  Total Lost
                </span>

                <h2>
                  {lostItems.length}
                </h2>

              </div>

            </div>


            {/* FOUND */}

            <div className="dashboard-stat-card">

              <div className="dashboard-stat-icon found-icon">
                📦
              </div>

              <div>

                <span>
                  Total Found
                </span>

                <h2>
                  {foundItems.length}
                </h2>

              </div>

            </div>


            {/* RECOVERED */}

            <div className="dashboard-stat-card">

              <div className="dashboard-stat-icon recovered-icon">
                🤝
              </div>

              <div>

                <span>
                  Recovered
                </span>

                <h2>
                  {recoveredItems.length}
                </h2>

              </div>

            </div>


            {/* PENDING */}

            <div className="dashboard-stat-card">

              <div className="dashboard-stat-icon pending-icon">
                ⏳
              </div>

              <div>

                <span>
                  Pending
                </span>

                <h2>
                  {pendingItems.length}
                </h2>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MAIN ================= */}

      <section className="dashboard-main">

        <div className="dashboard-container">

          <div className="dashboard-columns">


            {/* ====================================
                RECENT LOST ITEMS
            ==================================== */}

            <div className="dashboard-panel">

              <div className="dashboard-panel-header">

                <div>

                  <span className="panel-label">
                    RECENT
                  </span>

                  <h2>
                    Lost Items
                  </h2>

                </div>

                <Link to="/lost-items">
                  View All →
                </Link>

              </div>


              {recentLostItems.length === 0 ? (

                <div className="dashboard-empty">

                  <div>
                    🔍
                  </div>

                  <p>
                    No lost items reported yet.
                  </p>

                  <Link to="/add-lost-item">
                    Report Lost Item
                  </Link>

                </div>

              ) : (

                <div className="dashboard-item-list">

                  {recentLostItems.map((item) => (

                    <div
                      className="dashboard-item"
                      key={item.id}
                    >

                      <div className="dashboard-item-icon">
                        🔍
                      </div>

                      <div className="dashboard-item-info">

                        <h3>
                          {item.itemName}
                        </h3>

                        <p>
                          📍 {item.location}
                        </p>

                      </div>

                      <span className="lost-badge">
                        LOST
                      </span>

                    </div>

                  ))}

                </div>

              )}

            </div>


            {/* ====================================
                RECENT FOUND ITEMS
            ==================================== */}

            <div className="dashboard-panel">

              <div className="dashboard-panel-header">

                <div>

                  <span className="panel-label">
                    RECENT
                  </span>

                  <h2>
                    Found Items
                  </h2>

                </div>

                <Link to="/found-items">
                  View All →
                </Link>

              </div>


              {recentFoundItems.length === 0 ? (

                <div className="dashboard-empty">

                  <div>
                    📦
                  </div>

                  <p>
                    No found items reported yet.
                  </p>

                  <Link to="/add-found-item">
                    Report Found Item
                  </Link>

                </div>

              ) : (

                <div className="dashboard-item-list">

                  {recentFoundItems.map((item) => (

                    <div
                      className="dashboard-item"
                      key={item.id}
                    >

                      <div className="dashboard-item-icon found-item-dashboard-icon">
                        📦
                      </div>

                      <div className="dashboard-item-info">

                        <h3>
                          {item.itemName}
                        </h3>

                        <p>
                          📍 {item.location}
                        </p>

                      </div>


                      <span
                        className={
                          item.status === "Recovered"
                            ? "recovered-badge"
                            : "found-badge"
                        }
                      >

                        {item.status === "Recovered"
                          ? "RECOVERED"
                          : "FOUND"}

                      </span>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>


          {/* ================= QUICK ACTIONS ================= */}

          <div className="quick-actions-panel">

            <div className="dashboard-panel-header">

              <div>

                <span className="panel-label">
                  QUICK ACTIONS
                </span>

                <h2>
                  What would you like to do?
                </h2>

              </div>

            </div>


            <div className="quick-actions-grid">


              <Link
                to="/add-lost-item"
                className="quick-action-card"
              >

                <div className="quick-action-icon">
                  🔍
                </div>

                <div>

                  <h3>
                    Report Lost Item
                  </h3>

                  <p>
                    Tell the campus about an item
                    you have lost.
                  </p>

                </div>

                <span>
                  →
                </span>

              </Link>


              <Link
                to="/add-found-item"
                className="quick-action-card"
              >

                <div className="quick-action-icon">
                  📦
                </div>

                <div>

                  <h3>
                    Report Found Item
                  </h3>

                  <p>
                    Help someone find their
                    missing belongings.
                  </p>

                </div>

                <span>
                  →
                </span>

              </Link>


              <Link
                to="/lost-items"
                className="quick-action-card"
              >

                <div className="quick-action-icon">
                  🔎
                </div>

                <div>

                  <h3>
                    Search Lost Items
                  </h3>

                  <p>
                    Browse items reported lost
                    around campus.
                  </p>

                </div>

                <span>
                  →
                </span>

              </Link>


              <Link
                to="/found-items"
                className="quick-action-card"
              >

                <div className="quick-action-icon">
                  🤝
                </div>

                <div>

                  <h3>
                    Browse Found Items
                  </h3>

                  <p>
                    Check whether someone found
                    your belongings.
                  </p>

                </div>

                <span>
                  →
                </span>

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;