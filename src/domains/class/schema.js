const mongoose = require('mongoose');
const { baseSchema } = require('../../libraries/db/base-schema');

const schema = new mongoose.Schema({
  className: { type: String, required: true },
  classCode: { type: String, required: true },
  grade: { type: Number, required: true },
});
schema.add(baseSchema);

module.exports = mongoose.model('Classes', schema);

