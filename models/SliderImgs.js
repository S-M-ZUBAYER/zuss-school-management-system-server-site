const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
    schoolName: String,
    schoolCode: String,
    link: String
});

const SliderImgs = mongoose.model('SliderImgs', SliderSchema);

module.exports = SliderImgs;