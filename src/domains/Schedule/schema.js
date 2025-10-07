// models/student.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScheduleSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  weekNumber: { type: Number, required: true },
  startDate: Date,
  endDate: Date,
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }], // includes homeroom + others
  scheduleSlots: [
    {
      day: String, // e.g., "Monday"
      time: String // e.g., "10:00 - 11:00"
    }
  ]
});
module.exports = mongoose.model('Schedule', ScheduleSchema);
