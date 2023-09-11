const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    year: String,
    image: String,
    schoolName: String,
    schoolCode: String,
    designation: String,
    className: String,
    section: String,
    shift: String,
    gender: String,
    classRoll: String,
    fatherName: String,
    motherName: String,
    phone: String,
    email: String,
    division: String,
    district: String,
    address: String,
});

const Students = mongoose.model('student', studentSchema);

module.exports = Students;