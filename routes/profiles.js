const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
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


// Update a profile by email address
router.patch('/:email', (req, res) => {
    const { name, schoolName, schoolCode, designation, phone, email, address, about } = req.body;
    const { email: profileEmail } = req.params;

    // Find the profile by email address
    Profile.findOne({ email: profileEmail })
        .then((profile) => {
            if (!profile) {
                return res.status(404).json({ error: 'Profile not found' });
            }

            // Update the profile fields if provided
            if (name) profile.name = name;
            if (schoolName) profile.schoolName = schoolName;
            if (schoolCode) profile.schoolCode = schoolCode;
            if (designation) profile.designation = designation;
            if (phone) profile.phone = phone;
            if (email) profile.email = email;
            if (address) profile.address = address;
            if (about) profile.about = about;

            // Save the updated profile
            profile.save()
                .then((updatedProfile) => {
                    res.json(updatedProfile); // Respond with the updated profile
                })
                .catch((error) => {
                    console.error('Error updating profile:', error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        })
        .catch((error) => {
            console.error('Error finding profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


// Get all school
// router.get('/', verifyToken, (req, res) => {
router.get('/', (req, res) => {
    Profile.find()
        .then((schools) => {
            res.json(schools);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});


//get the value according to the email address
router.get('/', (req, res) => {
    const { email } = req.query;

    Profile.findOne({ email })
        .then((profile) => {
            if (!profile) {
                return res.status(404).json({ error: 'Profile not found' });
            }
            res.json(profile);
        })
        .catch((error) => {
            console.error('Error fetching profile data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});






module.exports = router;
