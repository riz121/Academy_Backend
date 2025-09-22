const mongoose = require('mongoose');
const { baseSchema } = require('../../libraries/db/base-schema');
const {Schema} =mongoose


const schema = new mongoose.Schema({
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(), // auto-generate unique ObjectId
      unique: true,
      index: true
    },
  studentId: { type: String, required: true, unique: true ,max:24},
  fullNameEnglish: { type: String, required: true ,max:80},
  fullNameKorean: { type: String, required: true,e },
  schoolName: { type: String, required: true },
  schoolName: { type: String, required: true },
  // other properties
});
schema.add(baseSchema);

module.exports = mongoose.model('Student', schema);
