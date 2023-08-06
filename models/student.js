const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    applicationId: String,
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
    address: String,
    image: String,
    gender: String,
    division: String,
    district: String,
    number: String,
    transactionId: String,
    agentName: String,
    amount: String

});

const Students = mongoose.model('students', studentSchema);

module.exports = Students;