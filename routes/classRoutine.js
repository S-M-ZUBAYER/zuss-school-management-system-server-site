const express = require('express');
const router = express.Router();
const ClassRoutine = require('../models/classRoutine');

// Create a new class routine
router.post('/add', async (req, res) => {
    console.log("click")
    try {
        const { year, schoolName, schoolCode, className, sectionName, shiftName, routine } = req.body;
        console.log("click")
        const newClassRoutine = new ClassRoutine({
            year,
            schoolName,
            schoolCode,
            className,
            sectionName,
            shiftName,
            routine,
        });

        const savedClassRoutine = await newClassRoutine.save();
        res.status(201).json(savedClassRoutine);
    } catch (error) {
        console.error('Error saving class routine:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get class routines by year and schoolCode
router.get('/', async (req, res) => {
    try {
        const { year, schoolCode } = req.query;
        console.log(year, schoolCode)
        // Use Mongoose to query the database for class routines
        const classRoutines = await ClassRoutine.find({ year, schoolCode });

        res.status(200).json(classRoutines);
    } catch (error) {
        console.error('Error fetching class routines:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
