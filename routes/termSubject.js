const express = require('express');
const router = express.Router();
const TermSubject = require('../models/termSubject');
const jwt = require('jsonwebtoken');


// Create a new Attendance
router.post('/', (req, res) => {
    const { schoolName, schoolCode, ClassName, sectionName, shiftName, year, term, allSubjects } = req.body;
    const termSubject = new TermSubject({ schoolName, schoolCode, ClassName, sectionName, shiftName, year, term, allSubjects });

    termSubject.save()
        .then(() => {
            res.status(201).json(termSubject);
        })
        .catch((error) => {
            console.error('Error saving termSubject:', error);
            res.status(500).json({ error: 'An error occurred while saving termSubject.' });
        });
});

// Get all Attendance
// router.get('/', verifyToken, (req, res) => {
router.get('/', (req, res) => {
    StdPayment.find()
        .then((stdPayments) => {
            res.json(stdPayments);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});


router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params; // Get schoolCode from route parameter
    const { year } = req.query; // Get studentId from query parameter
    console.log(schoolCode, year)
    TermSubject.find({ schoolCode, year }) // Find documents with the given schoolCode
        .then((termSubjects) => {
            if (!termSubjects || termSubjects.length === 0) {
                return res.status(404).json({ error: 'termSubjects not found' });
            }


            res.json(termSubjects);
        })
        .catch((error) => {
            console.error('Error fetching termSubjects data:', error);
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
