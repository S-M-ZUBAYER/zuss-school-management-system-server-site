const mongoose = require('mongoose');

const stdAttendanceSchema = new mongoose.Schema({
    schoolCode: String,
    schoolName: String,
    year: String,
    attendance: Array,
});

const StdAttendance = mongoose.model('StdAttendance', stdAttendanceSchema);

module.exports = StdAttendance;