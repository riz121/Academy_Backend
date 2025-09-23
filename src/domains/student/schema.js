// models/student.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const DAYS = ['M','T','W','Th','F','Sat','Sun'];
const PRESETS = {
  'Mon/Wed/Fri': ['M','W','F'],
  'Tue/Thu': ['T','Th'],
  'Mon–Fri': ['M','T','W','Th','F'],
  'Sat': ['Sat'],
  'Sun': ['Sun']
};

function phoneValidator(v) {
  if (!v) return true;
  // allow +, digits, spaces, hyphens
  return /^[+\d][\d\s-]{0,19}$/.test(v);
}

const StudentSchema = new Schema({
  // custom add_id if needed:
  _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), unique: true },

  studentId: { type: String, required: true, unique: true, maxlength: 24, trim: true },

  // English name: first/last OR full
  englishFirst: { type: String, maxlength: 40, trim: true },
  englishLast:  { type: String, maxlength: 40, trim: true },
  englishFull:  { type: String, maxlength: 80, trim: true },

  // Korean name
  koreanFamily: { type: String, maxlength: 40, trim: true },
  koreanGiven:  { type: String, maxlength: 40, trim: true },
  koreanFull:   { type: String, maxlength: 80, trim: true },

  //school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
  classRef: { type: Schema.Types.ObjectId, ref: 'Class' },

  sex: { type: String, enum: ['M','F'], required: true },

  dateOfEnrollment: { type: Date },
  grade: { type: String, maxlength: 4 }, // K - 12 (store 'K' or '1'..'12')

  birthday: { type: Date },

  // Days attending represented as booleans
  days: {
    M:    { type: Boolean, default: false },
    T:    { type: Boolean, default: false },
    W:    { type: Boolean, default: false },
    Th:   { type: Boolean, default: false },
    F:    { type: Boolean, default: false },
    Sat:  { type: Boolean, default: false },
    Sun:  { type: Boolean, default: false }
  },
  // store the chosen preset name for UI convenience (optional)
  daysPreset: { type: String, enum: Object.keys(PRESETS).concat([null]), default: null },

  // Contacts
  studentPhone: { type: String, maxlength: 20, validate: { validator: phoneValidator, message: 'Invalid phone format' } },
  motherPhone:  { type: String, maxlength: 20, validate: { validator: phoneValidator, message: 'Invalid phone format' } },
  fatherPhone:  { type: String, maxlength: 20, validate: { validator: phoneValidator, message: 'Invalid phone format' } },

  studentEmail: { type: String, maxlength: 120, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
  parentEmail:  { type: String, maxlength: 120, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },

  notes: { type: String, maxlength: 500 },
  
  status: { type: Boolean, default: false },

  // draft flag for autosave behavior
  draft: { type: Boolean, default: false },

}, { timestamps: true });

// Virtuals
StudentSchema.virtual('englishName').get(function() {
  if (this.englishFull) return this.englishFull;
  return [this.englishFirst, this.englishLast].filter(Boolean).join(' ');
});

StudentSchema.virtual('koreanName').get(function() {
  if (this.koreanFull) return this.koreanFull;
  return [this.koreanFamily, this.koreanGiven].filter(Boolean).join('');
});

// Pre-save: normalize phones (keep + and hyphens/spaces but trim repeated spaces)
StudentSchema.pre('save', function(next) {
  const normPhone = (p) => {
    if (!p) return p;
    // collapse multiple spaces, trim
    return p.replace(/\s+/g, ' ').trim();
  };
  this.studentPhone = normPhone(this.studentPhone);
  this.motherPhone  = normPhone(this.motherPhone);
  this.fatherPhone  = normPhone(this.fatherPhone);
  next();
});

// Helper to apply preset to days
StudentSchema.methods.applyDaysPreset = function(presetName) {
  if (!PRESETS[presetName]) return;
  // reset all
  DAYS.forEach(d => this.days[d] = false);
  // set preset
  PRESETS[presetName].forEach(d => this.days[d] = true);
  this.daysPreset = presetName;
};

module.exports = mongoose.model('Student', StudentSchema);
module.exports.PRESETS = PRESETS;
module.exports.DAYS = DAYS;
