const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// DNS Fix for MongoDB Atlas 2026
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes - Linking all logic from the Flowchart
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/needs', require('./routes/needRoutes'));
app.use('/api/match', require('./routes/matchRoutes'));

// Database Connection
const URI = process.env.MONGO_URI;
mongoose.connect(URI)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => console.log("❌ Database connection error:", err));

app.get('/', (req, res) => {
    res.send('AidMatch-AI Server is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is sprinting on port ${PORT}`);
});