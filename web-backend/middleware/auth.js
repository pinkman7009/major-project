const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.protect = asyncHandler(async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token , authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = await User.findById(decoded.user.id);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User with role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
