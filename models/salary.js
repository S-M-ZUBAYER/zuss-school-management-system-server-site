const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    name: String,
    schoolCode: String,
    staffEmail: String,
    staffId: String,
    designation: String,
    basicSalary: Number,
    rent: Number,
    medicalAllowance: Number,
    others: Number,
    totalSalary: Number

});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
