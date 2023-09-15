const mongoose = require('mongoose');

const AddUpdateResultSchema = new mongoose.Schema({
    studentId: String,
    schoolCode: String,
    year: Number,
    studentName: String,
    email: String,
    className: String,
    sectionName: String,
    shiftName: String,
    classRoll: Number,
    term: String,
    subjectMarks: [
        {
            theoryMarks: Number,
            mcqMarks: Number,
            practicalMarks: Number,
            outOf: Number,
        },
    ],
    termAverage: Number,
    termGrade: String,
});

const AddUpdateResult = mongoose.model('AddUpdateResult', AddUpdateResultSchema);

module.exports = AddUpdateResult;