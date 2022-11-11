require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");


async function connect() { // connect to database
  const URI = process.env.DB_URI;
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };