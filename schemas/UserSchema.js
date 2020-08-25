const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userInfo: {
        employeeName: String,
        employeeEmail: String,
        employeeRole: String,
        password: String
    }
})

module.exports = UserSchema;
