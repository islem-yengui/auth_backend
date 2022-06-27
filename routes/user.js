const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../controllers/user.controller");
const isAuth = require("../middlewares/auth");
const { registerRules, valid } = require("../middlewares/validator");
const router = express.Router();

router.post("/register", registerRules(), valid, register);
router.post("/login", login);
router.get("/getProfile", isAuth, getProfile);

module.exports = router;
