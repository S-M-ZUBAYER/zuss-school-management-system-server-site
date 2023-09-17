const express = require('express');
const router = express.Router();
const AddUpdateResult = require('../models/AddUpdateResult');



router.patch('/:studentId/:year/:schoolCode/:term', async (req, res) => {

    const { studentId, year, schoolCode, term } = req.params;
    const { studentName, email, className, sectionName, shiftName, classRoll, subjectMarks, allSubjects, termAverage, termGrade } = req.body;
    console.log(studentId, year, schoolCode, term)
    try {
        // Find the student result by studentId, year, and schoolCode, and update it
        const updatedResult = await AddUpdateResult.findOneAndUpdate(
            { studentId, year, schoolCode, term }, // This is the query to find the document
            {
                studentName,
                email,
                className,
                sectionName,
                shiftName,
                classRoll,
                term,
                subjectMarks,
                allSubjects,
                termAverage,
                termGrade,
            },
            { new: true, upsert: true }
        );

        if (!updatedResult) {
            return res.status(404).json({ error: 'Student result not found' });
        }

        res.json(updatedResult);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating student result' });
    }
});




router.get('/:schoolCode', (req, res) => {
    const { schoolCode } = req.params; // Get schoolCode from route parameter
    const { year, studentId } = req.query; // Get studentId from query parameter
    // Get studentId from query parameter
    console.log(schoolCode, year, studentId)
    AddUpdateResult.find({ schoolCode, year, studentId }) // Find documents with the given schoolCode
        .then((termSubjects) => {
            if (!termSubjects || termSubjects.length === 0) {
                return res.status(404).json({ error: 'Student result not found' });
            }


            res.json(termSubjects);
        })
        .catch((error) => {
            console.error('Error fetching Student result data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});





module.exports = router;
