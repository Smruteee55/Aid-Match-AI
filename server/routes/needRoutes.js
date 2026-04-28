const express = require('express');
const router = express.Router();
const Need = require('../models/Need');

// 1. NGO Adds Need (Flowchart Step 2 & 3)
router.post('/add', async (req, res) => {
    try {
        const { description, location, title } = req.body;
        let category = "General Assistance";
        let urgency = 3;
        const text = (description || "").toLowerCase();

        if (text.includes("water")) { category = "Water Supply"; urgency = 5; }
        else if (text.includes("food")) { category = "Food & Nutrition"; urgency = 4; }
        else if (text.includes("medical")) { category = "Healthcare"; urgency = 5; }

        const newNeed = new Need({
            title: title || "Crisis Alert",
            description,
            location,
            category,
            urgencyLevel: urgency,
            status: 'pending'
        });

        await newNeed.save();
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. NGO Assigns Volunteer (Step 4 & 5) - MAKES IT VISIBLE TO VOLUNTEER
router.put('/assign/:id', async (req, res) => {
    try {
        const updatedNeed = await Need.findByIdAndUpdate(
            req.params.id, 
            { status: 'assigned' }, 
            { new: true }
        );
        res.json({ success: true, data: updatedNeed });
    } catch (err) {
        res.status(500).json({ error: "Assignment failed" });
    }
});

// 3. Volunteer Accepts Task (Step 6) - NOTIFIES NGO
router.put('/accept/:id', async (req, res) => {
    try {
        const updatedNeed = await Need.findByIdAndUpdate(
            req.params.id, 
            { status: 'in-progress' }, 
            { new: true }
        );
        res.json({ success: true, data: updatedNeed });
    } catch (err) {
        res.status(500).json({ error: "Acceptance failed" });
    }
});

// 4. Resolve Task (Step 7)
router.put('/resolve/:id', async (req, res) => {
    try {
        const updatedNeed = await Need.findByIdAndUpdate(
            req.params.id, 
            { status: 'resolved', resolvedAt: Date.now() }, 
            { new: true }
        );
        res.json({ success: true, data: updatedNeed });
    } catch (err) {
        res.status(500).json({ message: "Resolution error" });
    }
});

// 5. Fetch all
router.get('/all', async (req, res) => {
    try {
        const needs = await Need.find().sort({ createdAt: -1 });
        res.json(needs);
    } catch (err) {
        res.status(500).json({ error: "Fetch failed" });
    }
});

module.exports = router;