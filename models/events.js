const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    schoolName: String,
    schoolCode: String,
    image: String,
    eventName: String,
    destination: String,
    date: String,
    time: String,
    description: String,
});

const Events = mongoose.model('Events', eventSchema);

module.exports = Events;