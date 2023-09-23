const express = require('express');
const router = express.Router();
const PaymentNumbers = require('../models/PaymentNumbers');
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

// Create a new notice
router.patch('/:schoolCode', async (req, res) => {

    const { schoolCode, numbers } = req.body;
    try {
        // Find the student result by studentId, year, and schoolCode, and update it
        const updatedPaymentNumbers = await PaymentNumbers.findOneAndUpdate(
            { schoolCode }, // This is the query to find the document
            {
                schoolCode, numbers
            },
            { new: true, upsert: true }
        );

        if (!updatedPaymentNumbers) {
            return res.status(404).json({ error: 'PaymentNumbers not found' });
        }

        res.json(updatedPaymentNumbers);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating upload slider images' });
    }
});



// Get all notice
// router.get('/', verifyToken, (req, res) => {


// Get a single notice by ID
// router.get('/:id', verifyToken, (req, res) => {
router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params;

    // Use the find method with a query object
    PaymentNumbers.find({ schoolCode }) // Assuming schoolCode is a property in your SliderImgs schema
        .then((numbers) => {
            if (!numbers) {
                return res.status(404).json({ error: 'PaymentNumbers not found' });
            }
            res.json(numbers);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});




// // Define the route to fetch notice data by notice code
// router.get('/notice/:schoolCode', (req, res) => {
//     const { schoolCode } = req.params; // Retrieve school code from URL parameter


//     // Use the notice model to find the notice by school code
//     Notice.find({ schoolCode }) // Use `find` instead of `findOne` to get all notices matching the school code
//         .then(notices => {
//             if (!notices || notices.length === 0) {
//                 return res.status(404).json({ error: 'Notices not found' });
//             }

//             // Return the notices as JSON response
//             res.json(notices);
//         })
//         .catch(error => {
//             console.error('Error fetching notice data:', error);
//             res.status(500).json({ error: 'Internal server error' });
//         });
// });




module.exports = router;