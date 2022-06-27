const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const secret = config.get("secret");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ msg: "invalid token" });

  try {
    const decoded = await jwt.verify(token, secret);
    if (!decoded) return res.status(400).json({ msg: "invalid token" });
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.status(401).json({ msg: "unauthorized" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {}
};

module.exports = isAuth;
