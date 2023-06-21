const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: String,
    schoolName: String,
    schoolCode: String,
    designation: String,
    phone: String,
    email: String,
    address: String,
    about: String
});

const Staffs = mongoose.model('staffs', staffSchema);

module.exports = Staffs;