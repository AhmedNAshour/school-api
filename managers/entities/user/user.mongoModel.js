// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['superadmin', 'schooladmin'],
    required: true, // Role is always required
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: function () {
      // Make 'school' field required if the role is 'schooladmin'
      return this.role === 'schooladmin';
    },
  },
});
module.exports = mongoose.model('User', userSchema);
