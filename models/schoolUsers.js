const mongoose = require('mongoose');

const schoolUserSchema = new mongoose.Schema({
    name: String,
    image: String,
    schoolName: String,
    schoolCode: String,
    email: String,
    teacher: Boolean,
    admin: Boolean,
    mainAdmin: Boolean
});

const SchoolUsers = mongoose.model('SchoolUsers', schoolUserSchema);

module.exports = SchoolUsers;
