const mongoose = require('mongoose');

const classRoutineSchema = new mongoose.Schema({
    year: Number,
    schoolName: String,
    schoolCode: String,
    className: String,
    sectionName: String,
    shiftName: String,
    routine: Object, // Assuming you want to store the routine as an object
});

const ClassRoutine = mongoose.model('ClassRoutine', classRoutineSchema);

module.exports = ClassRoutine;
