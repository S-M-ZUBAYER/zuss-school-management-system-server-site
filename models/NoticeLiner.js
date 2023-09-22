
const mongoose = require('mongoose');

const noticeLinerSchema = new mongoose.Schema({
    schoolCode: String,
    message: String,

});

const NoticesLiner = mongoose.model('NoticesLiner', noticeLinerSchema);

module.exports = NoticesLiner;
