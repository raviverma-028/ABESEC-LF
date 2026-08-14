const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // Authorization header check
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Please login first",
      });
    }

    // Expected format:
    // Authorization: Bearer TOKEN

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        error: "Invalid authorization format",
      });
    }

    const token = parts[1];

    // JWT secret
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        success: false,
        error: "JWT_SECRET is not configured",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, secret);

    // Store user information in request
    req.user = decoded;

    next();

  } catch (error) {
    console.log("Auth Middleware Error:", error.message);

    return res.status(401).json({
      success: false,
      error: "Invalid or expired token. Please login again.",
    });
  }
};

module.exports = protect;