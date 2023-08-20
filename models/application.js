const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    applicationId: String,
    name: String,
    date: String,
    schoolName: String,
    schoolCode: String,
    designation: String,
    phone: String,
    email: String,
    previousClass: String,
    averageMark: String,
    className: String,
    className: String,
    section: String,
    shift: String,
    classRoll: String,
    fatherName: String,
    motherName: String,
    extraInfo: String,
    address: String,
    image: String,
    gender: String,
    division: String,
    district: String,
    accept: Boolean,
    admitCard: Boolean,
    waiting: Boolean,
    number: String,
    transactionId: String,
    agentName: String,
    amount: String

});

const Applications = mongoose.model('application', applicationSchema);

module.exports = Applications;