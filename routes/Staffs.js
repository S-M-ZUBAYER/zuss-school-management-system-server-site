const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');
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



// Add new staff
router.post('/', (req, res) => {
    const { name, schoolName, schoolCode, designation, phone, email, address, about } = req.body;
    const staff = new Staff({ name, schoolName, schoolCode, designation, phone, email, address, about });
    console.log(staff)
    staff.save()
        .then(() => {
            res.status(201).json(staff);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});



// Update a staff by email address
router.patch('/:email', (req, res) => {
    const { name, schoolName, schoolCode, designation, phone, email, address, about } = req.body;
    const { email: staffEmail } = req.params;

    // Find the staff by email address
    Staff.findOne({ email: staffEmail })
        .then((staff) => {
            if (!staff) {
                return res.status(404).json({ error: 'staff not found' });
            }

            // Update the staff fields if provided
            if (name) staff.name = name;
            if (schoolName) staff.schoolName = schoolName;
            if (schoolCode) staff.schoolCode = schoolCode;
            if (designation) staff.designation = designation;
            if (phone) staff.phone = phone;
            if (email) staff.email = email;
            if (address) staff.address = address;
            if (about) staff.about = about;

            // Save the updated staff
            staff.save()
                .then((updatedStaff) => {
                    res.json(updatedStaff); // Respond with the updated staff
                })
                .catch((error) => {
                    console.error('Error updating staff:', error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        })
        .catch((error) => {
            console.error('Error finding staff:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


// Get all school
// router.get('/', verifyToken, (req, res) => {
router.get('/', (req, res) => {
    Staff.find()
        .then((staffs) => {
            res.json(staffs);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});


//get the value according to the email address
router.get('/', (req, res) => {
    const { email } = req.query;

    Staff.findOne({ email })
        .then((staff) => {
            if (!staff) {
                return res.status(404).json({ error: 'staff not found' });
            }
            res.json(staff);
        })
        .catch((error) => {
            console.error('Error fetching staff data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});






module.exports = router;
