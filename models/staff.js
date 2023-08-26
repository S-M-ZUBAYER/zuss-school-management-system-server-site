const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    teacherId: String,
    name: String,
    schoolName: String,
    schoolCode: String,
    designation: String,
    phone: String,
    email: String,
    image: String,
    bloodGroup: String,
    district: String,
    division: String,
    address: String,
    about: String
});

const Staffs = mongoose.model('staffs', staffSchema);

module.exports = Staffs;