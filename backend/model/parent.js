const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patientSchema = new mongoose.Schema({
  parent_name: {
    type: String,
    required: true
  },
  child_name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  },
  emailid: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  child_photo: {
    type: String, // Will store image path or URL
    required: true
  },
  medical_history_pdf: {
    type: String, // Will store file path or URL
    required: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to hash password
patientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;
