const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: String,
  company: String,
  username: { type: String, unique: true },
  password: String,
  role: Number
});
module.exports = model("user", userSchema);
