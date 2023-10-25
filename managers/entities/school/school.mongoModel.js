const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  // Add other properties like contact information, principal, or other relevant details.
});

module.exports = mongoose.model('School', schoolSchema);
