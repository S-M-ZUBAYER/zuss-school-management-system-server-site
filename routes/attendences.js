const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');
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

// Create a new Attendance
router.post('/', (req, res) => {
    const { name, schoolName, schoolCode, date, status } = req.body;
    const attendances = new Attendance({ name, schoolName, schoolCode, date, status });
    attendances.save()
        .then(() => {
            res.status(201).json(attendances);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Get all Attendance
// router.get('/', verifyToken, (req, res) => {
router.get('/', (req, res) => {
    Attendance.find()
        .then((attendances) => {
            res.json(attendances);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Get a single Attendance by ID
// router.get('/:id', verifyToken, (req, res) => {
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Attendance.findById(id)
        .then((attendances) => {
            if (!attendances) {
                return res.status(404).json({ error: 'Attendance not found' });
            }
            res.json(attendances);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Update a Attendance
// router.put('/:id', verifyToken, (req, res) => {
router.put('/:id', (req, res) => {
    const { id } = req.params;

    Attendance.findByIdAndUpdate(id, req.body, { new: true })
        .then((attendances) => {
            if (!attendances) {
                return res.status(404).json({ error: 'Attendance not found' });
            }
            res.json(attendances);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Delete a Attendance
// router.delete('/:id', verifyToken, (req, res) => {
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // const { id }

    Attendance.findByIdAndRemove(id)
        .then((attendances) => {
            if (!attendances) {
                return res.status(404).json({ error: 'Attendance not found' });
            }
            res.json({ message: 'Attendance deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

module.exports = router;
