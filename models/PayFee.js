const mongoose = require('mongoose');

const PayFeesSchema = new mongoose.Schema({
    teacherStatus: Boolean,
    studentId: String,
    schoolCode: String,
    Name: String,
    ClassName: String,
    SectionName: String,
    ShiftName: String,
    ClassRoll: String,
    proposalAmount: Number,
    selectedPayments: Array,
    paymentMethod: String,
    agentNumber: String,
    transactionId: String,
    PaidAmount: Number,
    unpaidAmount: Number,
    status: Array
});

const PayFees = mongoose.model('payFees', PayFeesSchema);

module.exports = PayFees;