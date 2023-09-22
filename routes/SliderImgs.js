const express = require('express');
const router = express.Router();
const SliderImgs = require('../models/SliderImgs');
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
// router.patch('/:schoolCode', async (req, res) => {

//     const { schoolName, schoolCode, links } = req.body;
//     try {
//         // Find the student result by studentId, year, and schoolCode, and update it
//         const updatedSliderImgs = await SliderImgs.findOneAndUpdate(
//             { schoolCode }, // This is the query to find the document
//             {
//                 schoolName, schoolCode, links
//             },
//             { new: true, upsert: true }
//         );

//         if (!updatedSliderImgs) {
//             return res.status(404).json({ error: 'Slider images not found' });
//         }

//         res.json(updatedSliderImgs);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while updating upload slider images' });
//     }
// });

// Create a new class
router.post('/:schoolCode', (req, res) => {
    const { schoolName, schoolCode, link } = req.body
    console.log(link)
    const sliderImgs = new SliderImgs({ schoolName, schoolCode, link });
    sliderImgs.save()
        .then(() => {
            res.status(201).json(sliderImgs);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

// Get all notice
// router.get('/', verifyToken, (req, res) => {


// Get a single notice by ID
// router.get('/:id', verifyToken, (req, res) => {
router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params;

    // Use the find method with a query object
    SliderImgs.find({ schoolCode }) // Assuming schoolCode is a property in your SliderImgs schema
        .then((slider) => {
            if (!slider) {
                return res.status(404).json({ error: 'Slider not found' });
            }
            res.json(slider);
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

    SliderImgs.findByIdAndRemove(id)
        .then((SliderImg) => {
            if (!SliderImg) {
                return res.status(404).json({ error: 'SliderImg not found' });
            }
            res.json({ message: 'SliderImg deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred' });
        });
});

module.exports = router;
