const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    name: String,
    schoolName: String,
    schoolCode: String,
    date: String,
    phone: String,
    status: String,
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;