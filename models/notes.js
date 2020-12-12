const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const moment = require('moment-timezone');
//const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

const NoteSchema = new Schema({
  userid: { type: String, required: true },
  title: { type: String, trim: true },
  body: String,
  created_date  : { type: Date, default: Date.now() },
  modify_date  : { type: Date, default: Date.now() }
});


module.exports = note = mongoose.model("note", NoteSchema);
