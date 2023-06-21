const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    schoolName: String,
    schoolCode: String,
    designation: String,
    phone: String,
    email: String,
    className: String,
    section: String,
    shift: String,
    classRoll: String,
    fatherName: String,
    motherName: String,
    address: String
});

const Students = mongoose.model('students', studentSchema);

module.exports = Students;