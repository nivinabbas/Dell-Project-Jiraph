const router = express.Router();

const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();
const UserSchema = require('../schemas/UserSchema');
const UserModel = mongoose.model("UserModel", UserSchema)

//app.get/post/put/delete => router.get/post/put/delete


module.exports = router;

