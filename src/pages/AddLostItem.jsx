import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "../styles/AddLostItem.css";
import { addLostItem } from "../utils/storage";

function AddLostItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    location: "",
    date: "",
    description: "",
    ownerName: "",
    contact: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addLostItem(formData);

    setSubmitted(true);

    setFormData({
      itemName: "",
      category: "",
      location: "",
      date: "",
      description: "",
      ownerName: "",
      contact: "",
    });

    // 1.5 seconds ke baad Lost Items page par
    // automatically redirect hoga
    setTimeout(() => {
      navigate("/lost-items");
    }, 1500);
  };

  return (
    <div className="add-lost-page">

      {/* ================= HEADER ================= */}

      <section className="add-lost-header">

        <div className="add-lost-header-container">

          <span className="page-label">
            REPORT LOST ITEM
          </span>

          <h1>
            Report Your Lost Item
          </h1>

          <p>
            Provide some details about your lost item
            so that other students can help you find it.
          </p>

        </div>

      </section>


      {/* ================= MAIN ================= */}

      <section className="add-lost-section">

        <div className="add-lost-container">

          {/* ================= FORM ================= */}

          <div className="lost-form-card">

            <div className="lost-form-heading">

              <h2>
                Lost Item Details
              </h2>

              <p>
                Fill in the details below as accurately
                as possible.
              </p>

            </div>


            {/* SUCCESS MESSAGE */}

            {submitted && (
              <div className="lost-success-message">
                ✅ Lost item reported successfully!
                Redirecting to Lost Items...
              </div>
            )}


            <form onSubmit={handleSubmit}>

              {/* ITEM NAME */}

              <div className="lost-form-group">

                <label htmlFor="itemName">
                  Item Name <span>*</span>
                </label>

                <input
                  id="itemName"
                  type="text"
                  name="itemName"
                  placeholder="Example: Black Backpack"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* CATEGORY + LOCATION */}

              <div className="lost-form-row">

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


                <div className="lost-form-group">

                  <label htmlFor="location">
                    Last Seen Location <span>*</span>
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


              {/* DATE */}

              <div className="lost-form-group">

                <label htmlFor="date">
                  Date Lost <span>*</span>
                </label>

                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* DESCRIPTION */}

              <div className="lost-form-group">

                <label htmlFor="description">
                  Item Description <span>*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the item, color, brand, identifying details..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

                <small>
                  Don't include passwords or other sensitive
                  information.
                </small>

              </div>


              {/* OWNER NAME */}

              <div className="lost-form-group">

                <label htmlFor="ownerName">
                  Your Name <span>*</span>
                </label>

                <input
                  id="ownerName"
                  type="text"
                  name="ownerName"
                  placeholder="Enter your name"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* CONTACT */}

              <div className="lost-form-group">

                <label htmlFor="contact">
                  Contact Information <span>*</span>
                </label>

                <input
                  id="contact"
                  type="text"
                  name="contact"
                  placeholder="Phone number or college email"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* BUTTONS */}

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
                >
                  Report Lost Item
                </button>

              </div>

            </form>

          </div>


          {/* ================= INFO CARD ================= */}

          <aside className="lost-info-card">

            <div className="lost-info-icon">
              🔎
            </div>

            <h3>
              Tips for Finding Your Item
            </h3>

            <ul>

              <li>
                Give a clear description of the item.
              </li>

              <li>
                Mention the last place where you saw it.
              </li>

              <li>
                Add identifying details such as color
                or brand.
              </li>

              <li>
                Keep your contact information updated.
              </li>

            </ul>

            <div className="lost-info-divider"></div>

            <p>
              Want to check already reported items?
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