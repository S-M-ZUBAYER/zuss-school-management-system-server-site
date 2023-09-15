const express = require('express');
const router = express.Router();
const TeacherAtdSetTime = require('../models/teacherAtdSetTime');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // req.userId = decoded.id;
        req.schoolId = decoded.id;
        next();
    });
};

// Create a new school
router.patch('/:schoolCode', async (req, res) => {
    const { schoolCode } = req.params;
    const { startTime, endTime } = req.body;
    console.log(startTime, schoolCode)
    try {
        // Try to find a school with the given schoolCode
        let teacherAtdSetTime = await TeacherAtdSetTime.findOne({ schoolCode });

        if (!teacherAtdSetTime) {
            // If the school doesn't exist, create a new one
            teacherAtdSetTime = new TeacherAtdSetTime({ schoolCode, startTime, endTime });
            await teacherAtdSetTime.save();
            res.status(201).json({ message: 'Start time and end time created successfully.' });
        } else {
            // If the school exists, update the start and end times
            teacherAtdSetTime.startTime = startTime;
            teacherAtdSetTime.endTime = endTime;
            await teacherAtdSetTime.save();
            res.status(200).json({ message: 'Start time and end time updated successfully.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// Get a single school by ID
// router.get('/:id', verifyToken, (req, res) => {
router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params;
    console.log(schoolCode)

    TeacherAtdSetTime.findOne({ schoolCode }) // Corrected: Pass an object to findOne
        .then((teacherAtdSetTime) => {
            if (!teacherAtdSetTime) {
                return res.status(404).json({ error: 'TeacherAtdSetTime not found' });
            }
            res.json(teacherAtdSetTime);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});









module.exports = router;
