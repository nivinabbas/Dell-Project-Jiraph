const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    employeeEmail:String,
    keyTime:Date,
    key:String
})

module.exports = KeySchema;