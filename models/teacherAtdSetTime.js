const mongoose = require('mongoose');

const setTimeSchema = new mongoose.Schema({
    schoolCode: { type: String, unique: true },
    startTime: String,
    endTime: String,
});

const teacherAtdTime = mongoose.model('teacherAtdTime', setTimeSchema);

module.exports = teacherAtdTime;