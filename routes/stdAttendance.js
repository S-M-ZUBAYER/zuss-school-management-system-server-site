const express = require('express');
const router = express.Router();
const StdAttendance = require('../models/stdAttendance');
const jwt = require('jsonwebtoken');



// Create a new Attendance
router.post('/', (req, res) => {
    const { schoolCode, schoolName, year, attendance } = req.body;
    const stdAttendances = new StdAttendance({ schoolCode, schoolName, year, attendance });
    stdAttendances.save()
        .then(() => {
            res.status(201).json(stdAttendances);
        })
        .catch((error) => {
            console.error('Error saving attendance:', error);
            res.status(500).json({ error: 'An error occurred while saving attendance.' });
        });
});

// Get all Attendance
// router.get('/', verifyToken, (req, res) => {
router.get('/', (req, res) => {
    StdAttendance.find()
        .then((stAttendances) => {
            res.json(stAttendances);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});


router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params; // Get schoolCode from route parameter
    const { studentId } = req.query; // Get studentId from query parameter
    console.log(schoolCode, studentId)
    StdAttendance.find({ schoolCode }) // Find documents with the given schoolCode
        .then((applications) => {
            if (!applications || applications.length === 0) {
                return res.status(404).json({ error: 'Applications not found' });
            }
            console.log(applications)
            // Search within the attendance array for the specific studentId
            const filteredApplications = applications.filter((application) => {
                return application.attendance.some((entry) => entry.id === studentId);
            });

            if (filteredApplications.length === 0) {
                return res.status(404).json({ error: 'Student not found in any applications' });
            }

            res.json(filteredApplications);
        })
        .catch((error) => {
            console.error('Error fetching application data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

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
