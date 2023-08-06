const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    schoolName: String,
    schoolCode: String,
    classInfo: Object,

});

const Classes = mongoose.model('Classes', classSchema);

module.exports = Classes;
