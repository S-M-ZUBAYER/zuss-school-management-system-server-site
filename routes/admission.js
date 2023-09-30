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
router.patch('/update/:schoolCode', async (req, res) => {
    const { schoolCode } = req.params;
    const { admissionNotice, requirement, feeType, applicationFee } = req.body;

    try {
        // Find the school by schoolCode
        let admission = await Admission.findOne({ schoolCode });

        if (!admission) {
            // If admission info doesn't exist, create a new document
            admission = new Admission({
                schoolCode,
                admissionInfo: {
                    admissionNotice,
                    requirement,
                    feeType,
                    applicationFee,
                },
            });

            await admission.save();
            return res.status(201).json(admission);
        }

        // Update the admissionInfo field of the school
        admission.admissionInfo = {
            admissionNotice,
            requirement,
            feeType,
            applicationFee,
        };

        // Save the updated school document
        const updatedAdmission = await admission.save();

        return res.json(updatedAdmission);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
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

    // Use the notice model to find the notices by school code
    Admission.find({ schoolCode })
        .then((admission) => {
            res.json(admission);
        })
        .catch((error) => {
            console.error('Error fetching admission data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


module.exports = router;
