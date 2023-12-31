const express = require('express');
const router = express.Router();
const Class = require('../models/classes');
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

// Create a new class
// router.post('/', (req, res) => {

//     const { schoolName, schoolCode, classInfo } = req.body;
//     const classes = new Class({ schoolName, schoolCode, classInfo });

//     classes.save()
//         .then(() => {
//             res.status(201).json(classes);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

router.patch('/:schoolCode', async (req, res) => {

    const { schoolName, schoolCode, classInfo } = req.body;
    try {
        // Find the student result by studentId, year, and schoolCode, and update it
        const updatedClass = await Class.findOneAndUpdate(
            { schoolCode }, // This is the query to find the document
            {
                schoolName,
                schoolCode,
                classInfo
            },
            { new: true, upsert: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ error: 'School not found' });
        }

        res.json(updatedClass);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating school Class List' });
    }
});

// Get all class
// router.get('/', verifyToken, (req, res) => {
router.get('/', (req, res) => {
    Class.find()
        .then((classes) => {
            res.json(classes);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Get a single class by ID
// router.get('/:id', verifyToken, (req, res) => {
router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params;

    Class.findOne({ schoolCode }) // Use findOne with the schoolCode as the query parameter
        .then((classes) => {
            if (!classes) {
                return res.status(404).json({ error: 'classInfo not found' });
            }
            res.json(classes);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Update a class
// router.put('/:id', verifyToken, (req, res) => {
router.put('/:id', (req, res) => {
    const { id } = req.params;

    Class.findByIdAndUpdate(id, req.body, { new: true })
        .then((classes) => {
            if (!classes) {
                return res.status(404).json({ error: 'class not found' });
            }
            res.json(classes);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Delete a class
// router.delete('/:id', verifyToken, (req, res) => {
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // const { id }

    Class.findByIdAndRemove(id)
        .then((classes) => {
            if (!classes) {
                return res.status(404).json({ error: 'class not found' });
            }
            res.json({ message: 'class deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

module.exports = router;
