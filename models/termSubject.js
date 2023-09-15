const mongoose = require('mongoose');

const termSubjectSchema = new mongoose.Schema({
    schoolName: String,
    schoolCode: String,
    className: String,
    sectionName: String,
    shiftName: String,
    year: String,
    term: String,
    allSubjects: Array,
});

const termSubject = mongoose.model('termSubject', termSubjectSchema);

module.exports = termSubject;

