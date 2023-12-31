const express = require('express');
const router = express.Router();
const TermSubject = require('../models/termSubject');
const jwt = require('jsonwebtoken');


// Create a new Attendance
router.post('/', (req, res) => {
    const { schoolName, schoolCode, className, sectionName, shiftName, year, term, allSubjects } = req.body;
    const termSubject = new TermSubject({ schoolName, schoolCode, className, sectionName, shiftName, year, term, allSubjects });
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

    // Extract only the fields you want to update from req.body
    const { term, allSubjects } = req.body;

    // Create an object to hold the updated fields
    const updatedFields = {};

    if (term !== undefined) {
        updatedFields.term = term;
    }

    if (allSubjects !== undefined) {
        updatedFields.allSubjects = allSubjects;
    }

    // Use findByIdAndUpdate to update the document
    TermSubject.findByIdAndUpdate(id, updatedFields, { new: true })
        .then((termSubject) => {
            if (!termSubject) {
                return res.status(404).json({ error: 'TermSubject not found' });
            }
            res.json(termSubject);
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

    TermSubject.findByIdAndRemove(id)
        .then((termSubject) => {
            if (!termSubject) {
                return res.status(404).json({ error: 'termSubject not found' });
            }
            res.json({ message: 'termSubject deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

module.exports = router;
