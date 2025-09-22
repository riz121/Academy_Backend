const mongoose = require('mongoose');
const { baseSchema } = require('../../libraries/db/base-schema');
const { required } = require('joi');
const bcrypt = require('bcrypt');
const {Schema} = mongoose

const  UserSchema = new mongoose.Schema({
   _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), // auto-generate ObjectId
    unique: true,
    index: true,
  },
  fullname: { type: String, required: true },
  //username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "student","teacher","parent"], default: "" ,required :true},

  // other properties
});

UserSchema.add(baseSchema);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.add(baseSchema);

module.exports = mongoose.model('User', UserSchema);
