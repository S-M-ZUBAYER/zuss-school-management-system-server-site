const mongoose = require('mongoose');

const stdPaymentSchema = new mongoose.Schema({
    schoolName: String,
    schoolCode: String,
    className: String,
    sectionName: String,
    shiftName: String,
    year: String,
    allFees: Array,
    totalAmount: Number,
});

const StdPayment = mongoose.model('StdPayment', stdPaymentSchema);

module.exports = StdPayment;