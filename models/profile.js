const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    schoolName: String,
    schoolCode: String,
    designation: String,
    phone: String,
    email: String,
    address: String,
    about: String
});

const Profiles = mongoose.model('Profiles', profileSchema);

module.exports = Profiles;