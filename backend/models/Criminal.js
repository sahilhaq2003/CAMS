const mongoose = require('mongoose');

const arrestSchema = new mongoose.Schema({
  date: Date,
  location: String,
  notes: String,
});

const criminalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aliases: [String],
  crimes: [String],
  arrestHistory: [arrestSchema],
  linkedCases: [String],
  photo: { type: String, default: '' }
});

module.exports = mongoose.model('Criminal', criminalSchema);
