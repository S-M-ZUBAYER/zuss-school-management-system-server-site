const express = require('express');
const router = express.Router();
const Notice = require('../models/notice');
const jwt = require('jsonwebtoken');
const Events = require('../models/events');

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

// Create a new notice
router.post('/', (req, res) => {

    const { schoolName, schoolCode, eventName, destination, date, time, description, image } = req.body;
    const event = new Events({ schoolName, schoolCode, eventName, destination, date, time, description, image });

    event.save()
        .then(() => {
            res.status(201).json(event);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Get all notice
// router.get('/', verifyToken, (req, res) => {
// Define the route to fetch notice data by school code
router.get('/', (req, res) => {
    const { schoolCode } = req.query;


    // Use the notice model to find the notices by school code
    Events.find({ schoolCode })
        .then((events) => {
            res.json(events);

        })
        .catch((error) => {
            console.error('Error fetching events data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Get a single notice by ID
// router.get('/:id', verifyToken, (req, res) => {
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Notice.findById(id)
        .then((notice) => {
            if (!notice) {
                return res.status(404).json({ error: 'Notice not found' });
            }
            res.json(notice);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});



// Define the route to fetch notice data by notice code
router.get('/notice/:schoolCode', (req, res) => {
    const { schoolCode } = req.params; // Retrieve school code from URL parameter


    // Use the notice model to find the notice by school code
    Notice.find({ schoolCode }) // Use `find` instead of `findOne` to get all notices matching the school code
        .then(notices => {
            if (!notices || notices.length === 0) {
                return res.status(404).json({ error: 'Notices not found' });
            }

            // Return the notices as JSON response
            res.json(notices);
        })
        .catch(error => {
            console.error('Error fetching notice data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


router.put('/:id', (req, res) => {
    const { id } = req.params;

    Notice.findByIdAndUpdate(id, req.body, { new: true })
        .then((notice) => {
            if (!notice) {
                return res.status(404).json({ error: 'notice not found' });
            }
            res.json(notice);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Delete a notice
// router.delete('/:id', verifyToken, (req, res) => {
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Notice.findByIdAndRemove(id)
        .then((notice) => {
            if (!notice) {
                return res.status(404).json({ error: 'Notice not found' });
            }
            res.json({ message: 'Notice deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

module.exports = router;
