import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const rollNumber = location.state?.rollNumber || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!rollNumber) {
      setError(
        "Password reset session expired. Please start again."
      );
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("abesUsers")) || [];

    const userIndex = users.findIndex(
      (user) => user.rollNumber === rollNumber
    );

    if (userIndex === -1) {
      setError("User account not found.");
      return;
    }

    users[userIndex].password = newPassword;

    localStorage.setItem(
      "abesUsers",
      JSON.stringify(users)
    );

    setSuccess(
      "Password reset successfully! Redirecting to login..."
    );

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="reset-password-page">

      <div className="reset-password-container">

        <div className="reset-password-icon">
          🔐
        </div>

        <div className="reset-password-header">
          <h1>Reset Password</h1>

          <p>
            Create a new password for your ABES
            Lost & Found account.
          </p>
        </div>

        {error && (
          <div className="reset-password-error">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="reset-password-success">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* New Password */}
          <div className="reset-password-group">

            <label htmlFor="newPassword">
              New Password
            </label>

            <div className="reset-password-input-wrapper">

              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                id="newPassword"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
                autoComplete="new-password"
              />

              <button
                type="button"
                className="reset-password-toggle"
                onClick={() =>
                  setShowNewPassword(
                    (prev) => !prev
                  )
                }
              >
                {showNewPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>


          {/* Confirm Password */}
          <div className="reset-password-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="reset-password-input-wrapper">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm new password"
                autoComplete="new-password"
              />

              <button
                type="button"
                className="reset-password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>


          <button
            type="submit"
            className="reset-password-button"
          >
            Reset Password
          </button>

        </form>


        <div className="reset-password-login">

          <Link to="/login">
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;