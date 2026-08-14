import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AddLostItem.css";

function AddLostItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    location: "",
    dateLost: "",
    image: "",
    contactName: "",
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

    setLoading(true);
    setMessage("");

    // ===================================================
    // GET JWT TOKEN
    // ===================================================

    const token = localStorage.getItem("token");

    // ===================================================
    // CHECK LOGIN
    // ===================================================

    if (!token) {
      setMessage(
        "❌ Please login first to report a lost item."
      );

      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 1200);

      return;
    }

    try {
      // =================================================
      // SEND DATA TO BACKEND
      // =================================================

      const response = await fetch(
        "http://localhost:5000/api/lost",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      // =================================================
      // READ RESPONSE
      // =================================================

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      // =================================================
      // TOKEN EXPIRED / INVALID
      // =================================================

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setMessage(
          "❌ Your login session has expired. Please login again."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1200);

        return;
      }

      // =================================================
      // BACKEND ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Failed to report lost item"
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      setMessage(
        "✅ Lost item reported successfully!"
      );

      // =================================================
      // RESET FORM
      // =================================================

      setFormData({
        itemName: "",
        category: "",
        description: "",
        location: "",
        dateLost: "",
        image: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
      });

      // =================================================
      // REDIRECT AFTER SUCCESS
      // =================================================

      setTimeout(() => {
        navigate("/lost-items");
      }, 1500);

    } catch (error) {
      console.error(
        "Add Lost Item Error:",
        error
      );

      setMessage(
        `❌ ${error.message}`
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="add-lost-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="add-lost-header">

        <div className="add-lost-header-container">

          <span className="page-label">
            REPORT LOST ITEM
          </span>

          <h1>
            Report a Lost Item
          </h1>

          <p>
            Lost something on campus? Fill out the form
            below so others can help you find it.
          </p>

        </div>

      </section>


      {/* =================================================
          MAIN SECTION
      ================================================= */}

      <section className="add-lost-section">

        <div className="add-lost-container">


          {/* =================================================
              FORM CARD
          ================================================= */}

          <div className="lost-form-card">

            <div className="lost-form-heading">

              <h2>
                Lost Item Details
              </h2>

              <p>
                Please provide accurate information about
                your lost item.
              </p>

            </div>


            {/* =================================================
                MESSAGE
            ================================================= */}

            {message && (
              <div
                className={
                  message.startsWith("❌")
                    ? "lost-error-message"
                    : "lost-success-message"
                }
              >
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

              <div className="lost-form-group">

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

              <div className="lost-form-row">


                {/* CATEGORY */}

                <div className="lost-form-group">

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

                <div className="lost-form-group">

                  <label htmlFor="location">
                    Lost Location <span>*</span>
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
                  DATE LOST
              ================================================= */}

              <div className="lost-form-group">

                <label htmlFor="dateLost">
                  Date Lost <span>*</span>
                </label>

                <input
                  id="dateLost"
                  type="date"
                  name="dateLost"
                  value={formData.dateLost}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="lost-form-group">

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

              <div className="lost-form-group">

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
                  Optional: Add an image URL of your
                  lost item.
                </small>

              </div>


              {/* =================================================
                  CONTACT NAME
              ================================================= */}

              <div className="lost-form-group">

                <label htmlFor="contactName">
                  Your Name <span>*</span>
                </label>

                <input
                  id="contactName"
                  type="text"
                  name="contactName"
                  placeholder="Enter your name"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* =================================================
                  EMAIL
              ================================================= */}

              <div className="lost-form-group">

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

              <div className="lost-form-group">

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

              <div className="lost-form-buttons">

                <Link
                  to="/lost-items"
                  className="lost-cancel-btn"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="submit-lost-btn"
                  disabled={loading}
                >

                  {loading
                    ? "Submitting..."
                    : "Report Lost Item"}

                </button>

              </div>

            </form>

          </div>


          {/* =================================================
              INFORMATION CARD
          ================================================= */}

          <aside className="lost-info-card">

            <div className="lost-info-icon">
              🔍
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
                you lost it.
              </li>

              <li>
                Add identifying details such as
                color, brand and model.
              </li>

              <li>
                Provide correct contact information.
              </li>

            </ul>


            <div className="lost-info-divider"></div>


            <p>
              Already reported your lost item?
            </p>

            <Link
              to="/lost-items"
              className="view-lost-link"
            >
              View Lost Items →
            </Link>

          </aside>

        </div>

      </section>

    </div>
  );
}

export default AddLostItem;