const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    name: String,
    schoolName: String,
    schoolCode: String,
    heading: String,
    message: String,
    date: String,
    time: String
});

const Notices = mongoose.model('Notices', noticeSchema);

module.exports = Notices;
