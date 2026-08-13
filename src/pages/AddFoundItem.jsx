import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AddFoundItem.css";
import { addFoundItem } from "../utils/storage";

function AddFoundItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    location: "",
    date: "",
    description: "",
    finderName: "",
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

    addFoundItem(formData);

    setSubmitted(true);

    setFormData({
      itemName: "",
      category: "",
      location: "",
      date: "",
      description: "",
      finderName: "",
      contact: "",
    });

    setTimeout(() => {
      navigate("/found-items");
    }, 1500);
  };

  return (
    <div className="add-found-page">

      {/* ================= HEADER ================= */}

      <section className="add-found-header">

        <div className="add-found-header-container">

          <span className="page-label">
            REPORT FOUND ITEM
          </span>

          <h1>
            Report a Found Item
          </h1>

          <p>
            Found something on campus? Report it here so
            the rightful owner can find it.
          </p>

        </div>

      </section>


      {/* ================= MAIN ================= */}

      <section className="add-found-section">

        <div className="add-found-container">

          {/* ================= FORM ================= */}

          <div className="found-form-card">

            <div className="found-form-heading">

              <h2>
                Found Item Details
              </h2>

              <p>
                Provide accurate information about the
                item you found.
              </p>

            </div>


            {/* SUCCESS MESSAGE */}

            {submitted && (
              <div className="found-success-message">
                ✅ Found item reported successfully!
                Redirecting to Found Items...
              </div>
            )}


            <form onSubmit={handleSubmit}>

              {/* ITEM NAME */}

              <div className="found-form-group">

                <label htmlFor="itemName">
                  Item Name <span>*</span>
                </label>

                <input
                  id="itemName"
                  type="text"
                  name="itemName"
                  placeholder="Example: Blue Water Bottle"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* CATEGORY + LOCATION */}

              <div className="found-form-row">

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


              {/* DATE */}

              <div className="found-form-group">

                <label htmlFor="date">
                  Date Found <span>*</span>
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

              <div className="found-form-group">

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
                  Do not include passwords or other sensitive
                  information.
                </small>

              </div>


              {/* FINDER NAME */}

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


              {/* CONTACT */}

              <div className="found-form-group">

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
                >
                  Report Found Item
                </button>

              </div>

            </form>

          </div>


          {/* ================= INFO CARD ================= */}

          <aside className="found-info-card">

            <div className="found-info-icon">
              🤝
            </div>

            <h3>
              Help Return the Item
            </h3>

            <ul>

              <li>
                Give an accurate description of the item.
              </li>

              <li>
                Mention exactly where you found it.
              </li>

              <li>
                Include useful identifying details.
              </li>

              <li>
                Keep your contact information updated.
              </li>

            </ul>

            <div className="found-info-divider"></div>

            <p>
              Want to check already reported items?
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