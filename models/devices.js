const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const moment = require('moment-timezone');
//const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

const deviceSchema = new Schema({
  userid: { type: String, required: true },
  deveui: { type: String, required: true },
  devaddr: { type: String, required: true },
  projectcode: { type: String, required: true },
  projectname: { type: String, required: true },
  created_date  : { type: Date, default: Date.now() },
  modify_date  : { type: Date, default: Date.now() }
});


module.exports = device = mongoose.model("device", deviceSchema);
