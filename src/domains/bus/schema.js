const mongoose = require('mongoose');
const { baseSchema } = require('../../libraries/db/base-schema');

const schema = new mongoose.Schema({
  busName: { type: String, required: true },
  busNumber: { type: String, required: true },
  status: { type: Boolean, default: false },
});
schema.add(baseSchema);

module.exports = mongoose.model('Bus', schema);

