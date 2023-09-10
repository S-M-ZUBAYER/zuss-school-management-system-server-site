const express = require('express');
const router = express.Router();
const StdPayment = require('../models/paymentSystem');
const jwt = require('jsonwebtoken');


// Create a new Attendance
router.post('/', (req, res) => {
    const { schoolName, schoolCode, className, sectionName, shiftName, year, allFees, totalAmount } = req.body;
    const stdPayments = new StdPayment({ schoolName, schoolCode, className, sectionName, shiftName, year, allFees, totalAmount });
    console.log(req.body, className, "className")
    stdPayments.save()
        .then(() => {
            res.status(201).json(stdPayments);
        })
        .catch((error) => {
            console.error('Error saving attendance:', error);
            res.status(500).json({ error: 'An error occurred while saving attendance.' });
        });
});

router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params; // Get schoolCode from route parameter
    const { year } = req.query; // Get studentId from query parameter
    console.log(schoolCode, year)
    StdPayment.find({ schoolCode, year }) // Find documents with the given schoolCode
        .then((payments) => {
            if (!payments || payments.length === 0) {
                return res.status(404).json({ error: 'payments not found' });
            }


            res.json(payments);
        })
        .catch((error) => {
            console.error('Error fetching payments data:', error);
            res.status(500).json({ error: 'Internal server error' });
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
