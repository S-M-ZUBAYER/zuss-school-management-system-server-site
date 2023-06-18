const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: String,
    schoolName: String,
    schoolCode: String,
    section: String,
    shift: String,
});

const Classes = mongoose.model('Classes', classSchema);

module.exports = Classes;
