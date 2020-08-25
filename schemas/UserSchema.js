const mongoose = require('mongoose');

const User = new mongoose.Schema({
    userInfo: {
        employeeName: String,
        employeeEmail: String,
        employeeRole: String,
        password: String
    }
})

module.exports = mongoose.model('User', User);
