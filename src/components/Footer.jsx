import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            🔎 <span>ABES<span>EC</span></span>
          </Link>

          <p>
            The ABES Engineering College Lost & Found Portal is designed to help students,
faculty members, and staff report and recover lost belongings within the campus.

This portal allows users to report lost or found items, search existing records,
and connect with the respective owner or finder.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Twitter">𝕏</a>
          </div>

        </div>


        {/* QUICK LINKS */}
        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/lost-items">Lost Items</Link>
          <Link to="/found-items">Found Items</Link>
          <Link to="/dashboard">Dashboard</Link>

        </div>


        {/* REPORT */}
        <div className="footer-column">

          <h3>Report Item</h3>

          <Link to="/add-lost-item">
            Report Lost Item
          </Link>

          <Link to="/add-found-item">
            Report Found Item
          </Link>

          <Link to="/lost-items">
            Search Items
          </Link>

          <Link to="/about">
            How It Works
          </Link>

        </div>


        {/* CONTACT */}
        <div className="footer-column contact-column">

          <h3>Contact Us</h3>

          <p>📍 ABES-EC Campus</p>

          <p>📧 registrar@abes.ac.in</p>

          <p>📞 +911207135112  ,  +911207135115</p>

          <p>🕐 Mon - Fri: 9 AM - 5 PM</p>

        </div>

      </div>


      {/* BOTTOM FOOTER */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} ABES Engineering College.
          All rights reserved.
        </p>

        <div className="footer-bottom-links">

          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/privacy">
            Privacy Policy
          </Link>

        </div>

      </div>

    </footer>
  );
}

export default Footer;