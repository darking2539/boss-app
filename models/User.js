const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  firstname: {
    type: String,
    default: "firstname"
  },
  lastname: {
    type: String,
    default: "lastname"
  },
  education: {
    type: String,
    default: "edit your education"
  },
  location: {
    type: String,
    default: "edit your location"
  },
  skills: {
    type: String,
    default: "edit your Skills"
  },
  notes: {
    type: String,
    default: "edit your Notes"
  },
  birthdate: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: "demo.jpg"
  },
});
module.exports = User = mongoose.model("users", UserSchema);