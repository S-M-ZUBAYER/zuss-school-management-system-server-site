const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    color: String,
    date: Date,
    id: String,
    name: String,
});

const calendarSchema = new mongoose.Schema({
    calendarImg: String,
    year: Number,
    schoolName: String,
    currentSchoolCode: Number,
    startMonth: Number,
    endMonth: Number,
    events: [eventSchema],
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
