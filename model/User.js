const mongoose = require("mongoose");

// create a schema for a user/client
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["CLIENT", "ADMIN"],
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;