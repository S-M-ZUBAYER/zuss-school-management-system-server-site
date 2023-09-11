const mongoose = require('mongoose');

const PayFeesSchema = new mongoose.Schema({
    teacherStatus: Boolean,
    studentId: String,
    Name: String,
    ClassName: String,
    SectionName: String,
    ShiftName: String,
    ClassRoll: String,
    PaidAmount: Number,
    unpaidAmount: Number,
    status: Array
});

const PayFees = mongoose.model('payFees', PayFeesSchema);

module.exports = PayFees;