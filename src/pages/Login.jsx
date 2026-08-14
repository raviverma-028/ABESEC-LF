import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rollNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { rollNumber, password } = formData;

    // Empty field validation
    if (!rollNumber || !password) {
      setError(
        "Please enter your University Roll Number and Password."
      );
      return;
    }

    // Roll number validation
    if (!/^[0-9]+$/.test(rollNumber)) {
      setError(
        "University Roll Number must contain only numbers."
      );
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    setLoading(true);

    // Get registered users from localStorage
    const registeredUsers =
      JSON.parse(localStorage.getItem("abesUsers")) || [];

    // Find matching user
    const user = registeredUsers.find(
      (registeredUser) =>
        registeredUser.rollNumber === rollNumber &&
        registeredUser.password === password
    );

    // Wrong credentials
    if (!user) {
      setLoading(false);

      setError(
        "Invalid University Roll Number or Password."
      );

      return;
    }

    // Save logged-in user
    localStorage.setItem(
      "abesCurrentUser",
      JSON.stringify(user)
    );

    // Login successful
    setTimeout(() => {
      setLoading(false);

      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* =========================
            LEFT SECTION
        ========================== */}

        <div className="login-info">

          <div className="college-logo">
            ABES
          </div>

          <h1>
            ABES Engineering College
          </h1>

          <h2>
            Lost & Found Portal
          </h2>

          <p>
            Login to your student account to report lost
            items, discover found belongings, and manage
            your lost & found activities.
          </p>

          <div className="login-features">

            {/* Feature 1 */}
            <div className="login-feature">

              <span>🔎</span>

              <div>
                <h3>
                  Find Lost Items
                </h3>

                <p>
                  Search through reported found belongings.
                </p>
              </div>

            </div>

            {/* Feature 2 */}
            <div className="login-feature">

              <span>📢</span>

              <div>
                <h3>
                  Report an Item
                </h3>

                <p>
                  Report your lost or found belongings.
                </p>
              </div>

            </div>

            {/* Feature 3 */}
            <div className="login-feature">

              <span>🎓</span>

              <div>
                <h3>
                  ABES Student Portal
                </h3>

                <p>
                  Built for the ABES campus community.
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            RIGHT SECTION
        ========================== */}

        <div className="login-form-section">

          <div className="login-header">

            <h1>
              Welcome Back!
            </h1>

            <p>
              Login to your ABES Lost & Found account
            </p>

          </div>


          {/* Error Message */}

          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}


          {/* Login Form */}

          <form onSubmit={handleSubmit}>

            {/* =========================
                UNIVERSITY ROLL NUMBER
            ========================== */}

            <div className="login-form-group">

              <label htmlFor="rollNumber">
                University Roll Number
              </label>

              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                placeholder="Enter your university roll number"
                value={formData.rollNumber}
                onChange={handleChange}
                autoComplete="username"
              />

            </div>


            {/* =========================
                PASSWORD
            ========================== */}

            <div className="login-form-group">

              <div className="password-label-row">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>


              <div className="login-password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>


            {/* =========================
                LOGIN BUTTON
            ========================== */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>


          {/* =========================
              REGISTER
          ========================== */}

          <div className="register-account">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create Account
            </Link>

          </div>


          {/* =========================
              DISCLAIMER
          ========================== */}

          <div className="login-disclaimer">

            This is a mini project created by
            RAVI VERMA (2503215300153), student of
            ABES Engineering College.

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;