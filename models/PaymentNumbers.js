
const mongoose = require('mongoose');

const paymentNumbersSchema = new mongoose.Schema({
    schoolCode: String,
    numbers: Array,

});

const PaymentNumbers = mongoose.model('PaymentNumbers', paymentNumbersSchema);

module.exports = PaymentNumbers;
