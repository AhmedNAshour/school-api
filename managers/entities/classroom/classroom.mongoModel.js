// models/classroom.js
const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  capacity: { type: Number, required: true },
  classTeacher: { type: String },
  // Add other properties like schedule, equipment, or class-specific details.
});

module.exports = mongoose.model('Classroom', classroomSchema);
