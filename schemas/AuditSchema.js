const mongoose = require('mongoose');

const AuditSchema = new mongoose.Schema({
    employeeName: String,
    employeeEmail: String,
    employeeRole: String,
    change:String,
    timeChange:Date
})

module.exports = AuditSchema;