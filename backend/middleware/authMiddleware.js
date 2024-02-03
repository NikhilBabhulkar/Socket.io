const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Make sure the path is correct
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Decode the token to get the user's id
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Find the user based on the decoded id and exclude the password field
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Move to the next middleware
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, error: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ success: false, error: "Not authorized, no token" });
  }
});

module.exports = {protect};
