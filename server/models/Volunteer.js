const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    skills: { 
        type: [String], 
        enum: ['Food', 'Health', 'Education', 'Sanitation', 'Shelter', 'Logistics'],
        required: true 
    },
    location: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);