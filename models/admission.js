const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    schoolName: String,
    schoolCode: String,
    admissionInfo: Object,
});

const Admission = mongoose.model('Admission', admissionSchema);

module.exports = Admission;