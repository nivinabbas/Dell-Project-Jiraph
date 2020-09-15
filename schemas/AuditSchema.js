const mongoose = require('mongoose');

const AuditSchema = new mongoose.Schema({
    id: String,
    employeeName: String,
    employeeEmail: String,
    employeeRole: String,
    action: String,
    body:String,
    timeChange: Date
})

module.exports = AuditSchema;