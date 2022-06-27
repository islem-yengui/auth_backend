const User = require("../models/User");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("secret");

exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const existantUser = await User.findOne({ email });
  if (existantUser)
    return res.status(400).json({ msg: "User already exists!" });
  try {
    const newUser = new User({
      fullName,
      email,
      password,
    });
    // generate salt
    var salt = await bcrypt.genSalt(10);
    var hash = await bcrypt.hash(password, salt);
    newUser.password = hash;

    await newUser.save();
    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    console.log(validUser);
    if (!validUser)
      return res.status(400).json({ msg: "Email or password incorrect!" });
    const isMatched = await bcrypt.compare(password, validUser.password);
    if (!isMatched)
      return res.status(400).json({ msg: "Email or password incorrect!" });
    const payload = {
      id: validUser._id,
    };
    const token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        id: validUser._id,
        fullName: validUser.fullName,
        email: validUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getProfile = (req, res) => {
  res.send(req.user);
};
