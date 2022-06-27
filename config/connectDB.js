const mongoose = require("mongoose");
const config = require("config");
const x = config.get("db");

const connectDB = async () => {
  try {
    await mongoose.connect(x);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
