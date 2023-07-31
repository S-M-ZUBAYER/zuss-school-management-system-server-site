const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admission = require('../models/admission');

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

router.patch('/update/:schoolCode', (req, res) => {
    const { schoolCode } = req.params;
    const { admissionInfo } = req.body;

    Admission.findOneAndUpdate(
        { schoolCode },
        { admissionInfo },
        { new: true, upsert: true }
    )
        .then((admission) => {
            if (admission) {
                return res.status(404).json({ error: 'Admission not found' });
            }
            res.json(admission);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});



router.post('/', (req, res) => {
    const { schoolName, schoolCode, admissionInfo } = req.body;
    console.log(req.body)
    const admission = new Admission({ schoolName, schoolCode, admissionInfo });
    console.log(admission)
    admission.save()
        .then(() => {
            res.status(201).json(admission);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});



router.get('/:schoolCode', (req, res) => {
    const { schoolCode, } = req.params; // Remove the extra comma after schoolCode

    Admission.findOne({ schoolCode })
        .then((admission) => {
            if (admission) {
                return res.json({ mes: true });
            }
            return res.json({ msg: false })
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });

});

router.get('/', (req, res) => {
    const { schoolCode } = req.query;
    console.log(schoolCode)

    // Use the notice model to find the notices by school code
    Admission.find({ schoolCode })
        .then((admission) => {
            res.json(admission);
            console.log(admission)
        })
        .catch((error) => {
            console.error('Error fetching admission data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


module.exports = router;
