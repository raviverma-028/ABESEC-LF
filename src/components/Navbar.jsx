import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🔎</span>
          <span>ABES<span>EC</span></span>
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-menu ${menuOpen ? "open" : ""}`}>

          <NavLink
            to="/"
            className="nav-link"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/lost-items"
            className="nav-link"
            onClick={closeMenu}
          >
            Lost Items
          </NavLink>

          <NavLink
            to="/found-items"
            className="nav-link"
            onClick={closeMenu}
          >
            Found Items
          </NavLink>

          <NavLink
            to="/add-lost-item"
            className="nav-link report-lost"
            onClick={closeMenu}
          >
            Report Lost
          </NavLink>

          <NavLink
            to="/add-found-item"
            className="nav-link report-found"
            onClick={closeMenu}
          >
            Report Found
          </NavLink>

          <NavLink
            to="/dashboard"
            className="nav-link"
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/about"
            className="nav-link"
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className="nav-link"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          <div className="auth-buttons">

            <NavLink
              to="/login"
              className="login-btn"
              onClick={closeMenu}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="register-btn"
              onClick={closeMenu}
            >
              Register
            </NavLink>

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;