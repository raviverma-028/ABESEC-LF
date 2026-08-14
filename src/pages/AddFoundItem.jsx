import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AddFoundItem.css";

function AddFoundItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    location: "",
    dateFound: "",
    image: "",
    finderName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // Get login token
    const token = localStorage.getItem("token");

    // =====================================================
    // LOGIN CHECK
    // =====================================================

    if (!token) {
      setMessage("❌ Please login first to report a found item.");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/found",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // =====================================================
      // BACKEND ERROR
      // =====================================================

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Failed to add found item"
        );
      }

      // =====================================================
      // SUCCESS
      // =====================================================

      setMessage(
        "✅ Found item reported successfully!"
      );

      // Reset form
      setFormData({
        itemName: "",
        category: "",
        description: "",
        location: "",
        dateFound: "",
        image: "",
        finderName: "",
        contactEmail: "",
        contactPhone: "",
      });

    } catch (error) {
      console.error(
        "Add Found Item Error:",
        error
      );

      // JWT expired / invalid
      if (
        error.message.toLowerCase().includes("token") ||
        error.message.toLowerCase().includes("unauthorized")
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setMessage(
          "❌ Your login session has expired. Please login again."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

      setMessage(
        "❌ " + error.message
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="add-found-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="add-found-header">

        <div className="add-found-header-container">

          <span className="page-label">
            REPORT FOUND ITEM
          </span>

          <h1>
            Report a Found Item
          </h1>

          <p>
            Found something on campus? Report it here
            so the owner can find it.
          </p>

        </div>

      </section>


      {/* =================================================
          MAIN SECTION
      ================================================= */}

      <section className="add-found-section">

        <div className="add-found-container">


          {/* =================================================
              FORM CARD
          ================================================= */}

          <div className="found-form-card">

            <div className="found-form-heading">

              <h2>
                Found Item Details
              </h2>

              <p>
                Please provide accurate information about
                the item you found.
              </p>

            </div>


            {/* MESSAGE */}

            {message && (
              <div className="found-success-message">
                {message}
              </div>
            )}


            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit}>


              {/* =================================================
                  ITEM NAME
              ================================================= */}

              <div className="found-form-group">

                <label htmlFor="itemName">
                  Item Name <span>*</span>
                </label>

                <input
                  id="itemName"
                  type="text"
                  name="itemName"
                  placeholder="Example: Black Wallet"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* =================================================
                  CATEGORY + LOCATION
              ================================================= */}

              <div className="found-form-row">


                {/* CATEGORY */}

                <div className="found-form-group">

                  <label htmlFor="category">
                    Category <span>*</span>
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Category
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


                {/* LOCATION */}

                <div className="found-form-group">

                  <label htmlFor="location">
                    Found Location <span>*</span>
                  </label>

                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Location
                    </option>

                    <option value="Library">
                      Library
                    </option>

                    <option value="Canteen">
                      Canteen
                    </option>

                    <option value="Block A">
                      Block A
                    </option>

                    <option value="Block B">
                      Block B
                    </option>

                    <option value="Parking">
                      Parking
                    </option>

                    <option value="Playground">
                      Playground
                    </option>

                    <option value="Seminar Hall">
                      Seminar Hall
                    </option>

                    <option value="Classroom">
                      Classroom
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>


              {/* =================================================
                  DATE FOUND
              ================================================= */}

              <div className="found-form-group">

                <label htmlFor="dateFound">
                  Date Found <span>*</span>
                </label>

                <input
                  id="dateFound"
                  type="date"
                  name="dateFound"
                  value={formData.dateFound}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="found-form-group">

                <label htmlFor="description">
                  Item Description <span>*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the item, color, brand, model, identifying details..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

                <small>
                  Do not include passwords or other
                  sensitive information.
                </small>

              </div>


              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="found-form-group">

                <label htmlFor="image">
                  Image URL
                </label>

                <input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="Paste image URL (optional)"
                  value={formData.image}
                  onChange={handleChange}
                />

                <small>
                  Optional: Add an image URL of the
                  found item.
                </small>

              </div>


              {/* =================================================
                  FINDER NAME
              ================================================= */}

              <div className="found-form-group">

                <label htmlFor="finderName">
                  Your Name <span>*</span>
                </label>

                <input
                  id="finderName"
                  type="text"
                  name="finderName"
                  placeholder="Enter your name"
                  value={formData.finderName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* =================================================
                  EMAIL
              ================================================= */}

              <div className="found-form-group">

                <label htmlFor="contactEmail">
                  Email <span>*</span>
                </label>

                <input
                  id="contactEmail"
                  type="email"
                  name="contactEmail"
                  placeholder="Enter your email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* =================================================
                  PHONE
              ================================================= */}

              <div className="found-form-group">

                <label htmlFor="contactPhone">
                  Phone Number
                </label>

                <input
                  id="contactPhone"
                  type="tel"
                  name="contactPhone"
                  placeholder="Enter phone number"
                  value={formData.contactPhone}
                  onChange={handleChange}
                />

              </div>


              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="found-form-buttons">

                <Link
                  to="/found-items"
                  className="found-cancel-btn"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="submit-found-btn"
                  disabled={loading}
                >

                  {loading
                    ? "Submitting..."
                    : "Report Found Item"}

                </button>

              </div>

            </form>

          </div>


          {/* =================================================
              INFORMATION CARD
          ================================================= */}

          <aside className="found-info-card">

            <div className="found-info-icon">
              🔎
            </div>

            <h3>
              Tips for Reporting
            </h3>

            <ul>

              <li>
                Provide a clear item name.
              </li>

              <li>
                Select the exact location where
                you found it.
              </li>

              <li>
                Add identifying details such as
                color, brand and model.
              </li>

              <li>
                Provide correct contact information.
              </li>

            </ul>


            <div className="found-info-divider"></div>


            <p>
              Want to see reported found items?
            </p>

            <Link
              to="/found-items"
              className="view-found-link"
            >
              View Found Items →
            </Link>

          </aside>

        </div>

      </section>

    </div>
  );
}

export default AddFoundItem;