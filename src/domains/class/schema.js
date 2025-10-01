const mongoose = require('mongoose');
const { baseSchema } = require('../../libraries/db/base-schema');

const schema = new mongoose.Schema({
  className: { type: String, required: true },
  classCode: { type: String, required: true },
  grade: { type: Number, required: true },
  status: { type: Boolean, default: false },
});
schema.add(baseSchema);

module.exports = mongoose.model('Class', schema);

