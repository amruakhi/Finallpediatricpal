const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const pediatricSchema = new mongoose.Schema({
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
    name: {
        type: String,
        required: true
    },
    license_number: {
        type: String,
        required: true
    },
    license_pdf: {
        type: String, // Path or URL to the uploaded license PDF
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Pre-save middleware to hash password
pediatricSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const Pediatrician = mongoose.model('pediatric', pediatricSchema);

module.exports = Pediatrician;

