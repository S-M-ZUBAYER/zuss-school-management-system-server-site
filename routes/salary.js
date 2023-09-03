const express = require('express');
const router = express.Router();
const Salary = require('../models/salary');
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
router.post('/', (req, res) => {
    console.log(req.body);
    const newStaff = req.body; // Remove the curly braces
    console.log(newStaff);
    const salary = new Salary(newStaff);
    console.log(salary, "salary");
    salary.save()
        .then(() => {
            res.status(201).json(salary);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
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
    console.log(schoolCode);
    Salary.find({ schoolCode }) // Use findOne with the schoolCode as the query parameter
        .then((salary) => {
            if (!salary) {
                return res.status(404).json({ error: 'classInfo not found' });
            }
            res.json(salary);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

router.get('/staff/:email', (req, res) => {
    const { email } = req.params;

    Salary.findOne({
        staffEmail: email
    }) // Using findOne with the email as the query parameter
        .then((salary) => {
            if (!salary) {
                return res.status(404).json({ error: "This user's salary information not found" });
            }
            res.json(salary);
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
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedSalary = await Salary.findByIdAndDelete(req.params.id);
        if (!deletedSalary) {
            return res.status(404).json({ error: 'Salary not found' });
        }
        res.status(200).json({ message: 'Salary deleted successfully' });
    } catch (error) {
        console.error('Error deleting salary:', error);
        res.status(500).json({ error: 'An error occurred while deleting salary' });
    }
});

module.exports = router;
