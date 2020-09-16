const express = require("express");
const app = express();
const AuditSchema = require('../schemas/AuditSchema');
const mongoose = require('mongoose');
const UserSchema = require('../schemas/UserSchema');
const UserModel = mongoose.model("UserModel", UserSchema);
const AuditModel = mongoose.model("AuditModel", AuditSchema);
const jwt = require("jsonwebtoken");
var secret = require("../index");
var dateFormat = require('dateformat');
module.exports = async (req, res, next) => {
    const { loginToken } = req.cookies;
    const decodedToken = await jwt.verify(loginToken, secret);

    UserModel.find({ "userInfo.employeeEmail": decodedToken.username }).then(async doc => {

        await AuditModel.insertMany(
            {
                id: doc[0]._id,
                employeeName: decodedToken.name,
                employeeEmail: decodedToken.username,
                employeeRole: decodedToken.role,
                action: req.path,
                timeChange: new Date()
            })
    })
    next();
}