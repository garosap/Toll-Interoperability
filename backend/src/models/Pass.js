const mongoose = require("mongoose");

const passSchema = new mongoose.Schema({
  passID: {
    type: String,
    unique: true
  },
  timestamp: {
    type: Date,
  },
  stationRef: {
    type: String,
  },
  vehicleRef: {
    type: String,
  },
  charge: {
    type: Number,
    default: 0
  },
  tagAbbr: {
    type: String,
  },
  home: {
    type: String,
  },
});

const Pass = mongoose.model("Pass", passSchema);

module.exports = Pass;
