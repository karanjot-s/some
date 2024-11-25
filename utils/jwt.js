const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.createJWT = (email, userId, duration) => {
  const payload = {
    email,
    userId,
    duration,
  };

  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      message: "Token is required",
    });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        message: "Token invalid",
      });

    req.user = user;
    next();
  });
};

exports.verifyAccessToken = async (token, res) => {
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(406).json({ message: "Invalid token" });

    User.findById(user.userId)
      .then((doc) => {
        return res.status(200).json({ success: true, user: doc });
      })
      .catch((err) => {
        return res.status(500).json({ message: "Something went wrong" });
      });
  });
};

exports.verifyToken = async (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};
