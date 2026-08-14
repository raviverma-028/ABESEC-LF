import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    section: "",
    password: "",
    confirmPassword: "",
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

    const {
      fullName,
      rollNumber,
      email,
      phone,
      department,
      year,
      section,
      password,
      confirmPassword,
    } = formData;

    // Required fields
    if (
      !fullName ||
      !rollNumber ||
      !email ||
      !phone ||
      !department ||
      !year ||
      !section ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all the required fields.");
      return;
    }

    // Roll number validation
    if (!/^[0-9]+$/.test(rollNumber)) {
      setError("University Roll Number must contain only numbers.");
      return;
    }

    // Email validation
    if (!/^[^\s@]+@abes\.ac\.in$/i.test(email)) {
      setError("Please use your official ABES email ID.");
      return;
    }

    // Phone validation
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    // Check existing users
    const existingUsers =
      JSON.parse(localStorage.getItem("abesUsers")) || [];

    const userExists = existingUsers.some(
      (user) =>
        user.rollNumber === rollNumber ||
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      setError(
        "An account with this University Roll Number or Email already exists."
      );
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),

      fullName,
      rollNumber,
      email,
      phone,
      department,
      year,
      section,

      // Demo authentication only
      password,
    };

    // Save user
    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem(
      "abesUsers",
      JSON.stringify(updatedUsers)
    );

    setSuccess(
      "Registration successful! Redirecting to Login..."
    );

    // Clear form
    setFormData({
      fullName: "",
      rollNumber: "",
      email: "",
      phone: "",
      department: "",
      year: "",
      section: "",
      password: "",
      confirmPassword: "",
    });

    // Go to login
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="register-page">

      <div className="register-container">

        {/* Header */}
        <div className="register-header">

          <h1>Create Account</h1>

          <p>
            Register for the ABES Engineering College
            Lost & Found Portal
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="register-error">
            ⚠️ {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="register-success">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="register-form-group">

            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />

          </div>

          {/* University Roll Number */}
          <div className="register-form-group">

            <label htmlFor="rollNumber">
              University Roll Number
            </label>

            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              placeholder="Enter university roll number"
              value={formData.rollNumber}
              onChange={handleChange}
            />

          </div>

          {/* Email */}
          <div className="register-form-group">

            <label htmlFor="email">
              Email ID
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

          {/* Phone */}
          <div className="register-form-group">

            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              maxLength="10"
            />

          </div>

          {/* Department */}
          <div className="register-form-group">

            <label htmlFor="department">
              Department
            </label>

            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">
                Select Department
              </option>

              <option value="CSE">
                Computer Science Engineering
              </option>

              <option value="CSE-AIML">
                CSE - Artificial Intelligence & Machine Learning
              </option>

              <option value="CSE-DS">
                CSE - Data Science
              </option>

              <option value="ECE">
                Electronics & Communication Engineering
              </option>

              <option value="ME">
                Mechanical Engineering
              </option>

              <option value="CE">
                Civil Engineering
              </option>
            </select>

          </div>

          {/* Year + Section */}
          <div className="register-row">

            <div className="register-form-group">

              <label htmlFor="year">
                Year
              </label>

              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
              >
                <option value="">
                  Select Year
                </option>

                <option value="1st Year">
                  1st Year
                </option>

                <option value="2nd Year">
                  2nd Year
                </option>

                <option value="3rd Year">
                  3rd Year
                </option>

                <option value="4th Year">
                  4th Year
                </option>
              </select>

            </div>

            <div className="register-form-group">

              <label htmlFor="section">
                Section
              </label>

              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
              >
                <option value="">
                  Select Section
                </option>

                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>

            </div>

          </div>

          {/* Password */}
          <div className="register-form-group">

            <label htmlFor="password">
              Create Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          {/* Confirm Password */}
          <div className="register-form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="register-button"
          >
            Create Account
          </button>

        </form>

        {/* Login Link */}
        <div className="login-account">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Login
          </Link>

        </div>

        <div className="register-disclaimer">
          ABES Engineering College Lost & Found Portal
        </div>

      </div>

    </div>
  );
}

export default Register;