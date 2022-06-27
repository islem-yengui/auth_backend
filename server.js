const express = require("express");
const connectDB = require("./config/connectDB");
const user = require("./routes/user");

const app = express();
app.use(express.json());

const PORT = 5000;

app.use("/user", user);

connectDB();

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server running on port ${PORT}`)
);
