const mongoose = require('mongoose');
const { baseSchema } = require('../../libraries/db/base-schema');

const schema = new mongoose.Schema({
  busName: { type: String, required: true },
  busNumber: { type: String, required: true },
  status: { type: Boolean, default: false },
  driverName :{type: String},
  driverAge :{type: String},
  driverArcNumber :{type: String},
  driverLicenceNumber :{type: String},
  helperName :{type: String},
  helperNumber :{type: String},
  helperAge :{type: String},
  helperArcNumber :{type: String},
});
schema.add(baseSchema);

module.exports = mongoose.model('Bus', schema);

