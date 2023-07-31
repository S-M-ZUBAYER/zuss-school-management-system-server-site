const express = require('express');
const router = express.Router();
const Class = require('../models/classes');
const jwt = require('jsonwebtoken');
const SchoolUsers = require('../models/schoolUsers');

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

// Create a new user
router.post('/add', (req, res) => {
    console.log(req.body);
    const { name, image, schoolName, schoolCode, email } = req.body;
    const users = new SchoolUsers({ name, image, schoolName, schoolCode, email });
    console.log(users);
    users.save() // Call the save() method on the users object, not on the SchoolUsers model
        .then(() => {
            res.status(201).json(users);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});



// Get all class
// router.get('/', verifyToken, (req, res) => {
router.get('/', (req, res) => {
    SchoolUsers.find()
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Get a single class by ID
// router.get('/:id', verifyToken, (req, res) => {
router.get('/:email', (req, res) => {
    const { email } = req.params; // Access the email parameter from the request URL

    SchoolUsers.findOne({ email }) // Find the Class document with the matching email
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// // Update a class
// // router.put('/:id', verifyToken, (req, res) => {
// router.put('/:id', (req, res) => {
//     const { id } = req.params;

//     Class.findByIdAndUpdate(id, req.body, { new: true })
//         .then((classes) => {
//             if (!classes) {
//                 return res.status(404).json({ error: 'class not found' });
//             }
//             res.json(classes);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// // Delete a class
// // router.delete('/:id', verifyToken, (req, res) => {
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     // const { id }

//     Class.findByIdAndRemove(id)
//         .then((classes) => {
//             if (!classes) {
//                 return res.status(404).json({ error: 'class not found' });
//             }
//             res.json({ message: 'class deleted successfully' });
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

module.exports = router;
