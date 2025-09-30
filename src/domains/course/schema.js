const mongoose = require('mongoose');
const { baseSchema } = require('../../libraries/db/base-schema');

const schema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true },
  status: { type: Boolean, default: false },
});
schema.add(baseSchema);

module.exports = mongoose.model('Course', schema);

