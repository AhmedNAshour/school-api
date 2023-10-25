// models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  dateOfBirth: { type: Date },
  contactInfo: {
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  // Add other properties like parent/guardian information, performance, or extracurricular activities.
});

// Define a pre-save middleware to check if the referenced classroom exists in the school.
studentSchema.pre('save', async function (next) {
  try {
    const Classroom = mongoose.model('Classroom');
    const classroomId = this.classroom;
    const schoolId = this.school;

    // Query the Classroom model to check if the classroom exists in the specified school.
    const classroom = await Classroom.findOne({
      _id: classroomId,
      school: schoolId,
    });

    if (!classroom) {
      // If the classroom doesn't exist in the school, prevent saving the student.
      const error = new Error(
        'Classroom does not exist in the specified school.'
      );
      return next(error);
    }

    // If the classroom exists, you can proceed with saving the student.
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Student', studentSchema);
