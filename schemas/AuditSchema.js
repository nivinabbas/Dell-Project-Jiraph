const mongoose = require('mongoose');

const AuditSchema = new mongoose.Schema({
    id: String,
    employeeName: String,
    employeeEmail: String,
    employeeRole: String,
    action: String,
    body:{
        
    },
    timeChange: Date
})

module.exports = AuditSchema;