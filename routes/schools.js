const express = require('express');
const router = express.Router();
const School = require('../models/school');
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
router.post('/', (req, res) => {

    const { name, schoolEmail, schoolCode, schoolLocation, aboutSchool, schoolBannerImg, schoolBackgroundImg } = req.body;
    const school = new School({ name, schoolEmail, schoolCode, schoolLocation, aboutSchool, schoolBannerImg, schoolBackgroundImg });

    school.save()
        .then(() => {
            res.status(201).json(school);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Get all school
// router.get('/', verifyToken, (req, res) => {
router.get('/', (req, res) => {
    School.find()
        .then((schools) => {
            res.json(schools);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Get a single school by ID
// router.get('/:id', verifyToken, (req, res) => {
router.get('/:id', (req, res) => {
    const { id } = req.params;

    School.findById(id)
        .then((school) => {
            if (!school) {
                return res.status(404).json({ error: 'School not found' });
            }
            res.json(school);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});



// Define the route to fetch school data by school code
router.get('/school/:schoolCode', (req, res) => {
    const { schoolCode } = req.params;


    // Use the School model to find the school by school code
    School.findOne({ schoolCode })
        .then(school => {
            if (!school) {
                return res.status(404).json({ error: 'School not found' });
            }

            // Return the school data as JSON response
            res.json(school);
        })
        .catch(error => {
            console.error('Error fetching school data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});
router.get('/url/:schoolName', (req, res) => {
    const { schoolName } = req.params;

    const name = schoolName
    // Use the School model to find the school by school code
    School.findOne({ name })
        .then(school => {
            if (!school) {
                return res.status(404).json({ error: 'School not found' });
            }

            // Return the school data as JSON response
            res.json(school);
        })
        .catch(error => {
            console.error('Error fetching school data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});



// Update a School
// router.put('/:id', verifyToken, (req, res) => {
router.put('/:id', (req, res) => {
    const { id } = req.params;

    School.findByIdAndUpdate(id, req.body, { new: true })
        .then((school) => {
            if (!school) {
                return res.status(404).json({ error: 'School not found' });
            }
            res.json(school);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Delete a school
// router.delete('/:id', verifyToken, (req, res) => {
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    School.findByIdAndRemove(id)
        .then((school) => {
            if (!school) {
                return res.status(404).json({ error: 'School not found' });
            }
            res.json({ message: 'School deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

module.exports = router;
