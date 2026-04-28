const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const Need = require('../models/Need');

// Resource Allocation (Flowchart Step 4)
router.get('/find/:location/:category', async (req, res) => {
    try {
        const matches = await Volunteer.find({
            location: req.params.location,
            skills: req.params.category,
            isAvailable: true
        });
        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Assign & Notify (Flowchart Step 5)
router.post('/assign', async (req, res) => {
    try {
        const { needId, volunteerId } = req.body;
        await Need.findByIdAndUpdate(needId, { status: 'assigned' });
        await Volunteer.findByIdAndUpdate(volunteerId, { isAvailable: false });
        res.json({ message: "Volunteer Assigned & Notified!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;