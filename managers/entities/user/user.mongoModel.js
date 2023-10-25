const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['superadmin', 'schooladmin'],
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: function () {
      return this.role === 'schooladmin';
    },
    validate: {
      // Custom validation function
      validator: async function () {
        if (this.role === 'schooladmin') {
          // Check if the school with the provided ID exists
          const school = await mongoose
            .model('School')
            .findOne({ _id: this.school });
          return !!school;
        }
        // For other roles, no validation is required
        return true;
      },
      message: 'Invalid school reference for schooladmin role',
    },
  },
});

module.exports = mongoose.model('User', userSchema);
