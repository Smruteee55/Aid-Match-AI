const mongoose = require('mongoose');

const NeedSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'General' }, 
    location: { type: String, required: true },
    urgencyLevel: { type: Number, default: 3 },    
    status: { 
        type: String, 
        enum: ['pending', 'assigned', 'resolved'], 
        default: 'pending' 
    },
    // NEW: Link to the User who is assigned (Step 4 & 6 of Flowchart)
    assignedVolunteer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    // NEW: Track when it was finished (Step 7: History & Reports)
    resolvedAt: {
        type: Date
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Need', NeedSchema);