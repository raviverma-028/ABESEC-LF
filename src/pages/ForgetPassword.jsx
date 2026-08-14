import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rollNumber: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { rollNumber, email } = formData;

    if (!rollNumber || !email) {
      setError("Please enter your University Roll Number and Email ID.");
      return;
    }

    if (!/^[0-9]+$/.test(rollNumber)) {
      setError("University Roll Number must contain only numbers.");
      return;
    }

    if (!/^[^\s@]+@abes\.ac\.in$/i.test(email)) {
      setError("Please enter a valid ABES email ID.");
      return;
    }

    /*
      Backend OTP functionality will be connected later.
    */

    console.log("Forgot Password Data:", formData);

    setSuccess("OTP has been sent to your registered ABES email.");

    setTimeout(() => {
      navigate("/verify-otp", {
        state: {
          rollNumber,
          email,
        },
      });
    }, 1500);
  };

  return (
    <div className="forgot-page">

      <div className="forgot-container">

        {/* Header Icon */}
        <div className="forgot-icon">
          🔐
        </div>

        <div className="forgot-header">

          <h1>Forgot Password?</h1>

          <p>
            Don't worry! Enter your registered details and we will help you
            reset your password.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="forgot-message forgot-error">
            ⚠️ {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="forgot-message forgot-success">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Roll Number */}
          <div className="forgot-form-group">

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
            />

          </div>

          {/* Email */}
          <div className="forgot-form-group">

            <label htmlFor="email">
              ABES Email ID
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@abes.ac.in"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          {/* Send OTP */}
          <button
            type="submit"
            className="send-otp-button"
          >
            Send OTP
          </button>

        </form>

        {/* Back to Login */}
        <div className="back-login">

          <Link to="/login">
            ← Back to Login
          </Link>

        </div>

        <div className="forgot-note">
          For security reasons, OTP will only be sent to the email address
          registered with your account.
        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;