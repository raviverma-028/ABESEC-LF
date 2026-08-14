import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./VerifyOTP.css";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const rollNumber = location.state?.rollNumber || "";
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(60);

  // Demo OTP
  const DEMO_OTP = "123456";

  // Countdown
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (e) => {
    const value = e.target.value;

    if (/^[0-9]*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError("");
      setSuccess("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must contain exactly 6 digits.");
      return;
    }

    if (otp !== DEMO_OTP) {
      setError("Invalid OTP. Please enter the correct OTP.");
      return;
    }

    setSuccess("OTP verified successfully!");

    setTimeout(() => {
      navigate("/reset-password", {
        state: {
          rollNumber,
          email,
        },
      });
    }, 1000);
  };

  const handleResend = () => {
    if (timer > 0) return;

    setOtp("");
    setError("");
    setSuccess("A new OTP has been sent.");

    setTimer(60);

    // Demo OTP remains 123456
    console.log("Demo OTP:", DEMO_OTP);
  };

  return (
    <div className="otp-page">

      <div className="otp-container">

        {/* Icon */}
        <div className="otp-icon">
          🔐
        </div>

        {/* Header */}
        <div className="otp-header">

          <h1>Verify OTP</h1>

          <p>
            Enter the 6-digit OTP sent to your registered
            ABES email address.
          </p>

          {email && (
            <div className="otp-email">
              {email}
            </div>
          )}

        </div>

        {/* Error */}
        {error && (
          <div className="otp-message otp-error">
            ⚠️ {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="otp-message otp-success">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* OTP */}
          <div className="otp-form-group">

            <label htmlFor="otp">
              Enter OTP
            </label>

            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              inputMode="numeric"
              autoComplete="one-time-code"
            />

          </div>

          {/* Verify */}
          <button
            type="submit"
            className="verify-otp-button"
          >
            Verify OTP
          </button>

        </form>

        {/* Resend */}
        <div className="resend-section">

          {timer > 0 ? (
            <p>
              Resend OTP in{" "}
              <strong>{timer}s</strong>
            </p>
          ) : (
            <button
              type="button"
              className="resend-button"
              onClick={handleResend}
            >
              Resend OTP
            </button>
          )}

        </div>

        {/* Demo Information */}
        <div className="demo-otp">

          <strong>Demo OTP:</strong> 123456

        </div>

        {/* Back */}
        <div className="otp-back">

          <Link to="/forgot-password">
            ← Back to Forgot Password
          </Link>

        </div>

      </div>

    </div>
  );
}

export default VerifyOTP;