const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: String,
    schoolEmail: String,
    schoolCode: Number,
    schoolLocation: String,
    aboutSchool: String,
    schoolBannerImg: String,
    schoolBackgroundImg: String,
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
