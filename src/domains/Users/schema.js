const mongoose = require('mongoose');
const { baseSchema } = require('../../libraries/db/base-schema');
const { required } = require('joi');
const bcrypt = require('bcrypt');
const {Schema} = mongoose

const  UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username:{ type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "student","teacher","parent"], default: "" ,required :true},
  teacherType : { type: String, enum: ["Home", "Native","PartTime"], default: "",  required: false },

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
