const express = require('express');
const router = express.Router();
const Need = require('../models/Need');

// 1. NGO Adds Need
router.post('/add', async (req, res) => {
    try {
        const { description, location, title } = req.body;
        const newNeed = new Need({
            title: title || "Crisis Alert",
            description,
            location,
            status: 'pending',
            category: description.toLowerCase().includes('water') ? 'Water' : 'General'
        });
        await newNeed.save();
        res.status(201).json({ success: true });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// 2. CRITICAL FIX: Route to Assign Volunteer
router.put('/assign/:id', async (req, res) => {
    try {
        const updatedNeed = await Need.findByIdAndUpdate(
            req.params.id, 
            { status: 'assigned' }, 
            { new: true }
        );
        res.json({ success: true, data: updatedNeed });
    } catch (err) { res.status(500).json({ error: "Assignment failed" }); }
});

// 3. Volunteer Accepts Task
router.put('/accept/:id', async (req, res) => {
    try {
        const updatedNeed = await Need.findByIdAndUpdate(
            req.params.id, 
            { status: 'in-progress' }, 
            { new: true }
        );
        res.json(updatedNeed);
    } catch (err) { res.status(500).json({ error: "Failed to accept" }); }
});

// 4. Resolve Task
router.put('/resolve/:id', async (req, res) => {
    try {
        await Need.findByIdAndUpdate(req.params.id, { status: 'resolved' });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: "Failed to resolve" }); }
});

// 5. Fetch all
router.get('/all', async (req, res) => {
    try {
        const needs = await Need.find().sort({ createdAt: -1 });
        res.json(needs);
    } catch (err) { res.status(500).json({ error: "Fetch failed" }); }
});

module.exports = router;