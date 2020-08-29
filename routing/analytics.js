const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const UserSchema = require('../schemas/UserSchema');
const UserModel = mongoose.model("UserModel", UserSchema);
const TaskModel = require('../schemas/TaskSchema');

//app.get/post/put/delete => router.get/post/put/delete



router.post('/modificationByField', async (req, res) => {
    console.log('hello')
    const { fieldName, values, label,qaRepresentative} = req.body;
    if(fieldName.length == 0 ){
        let tasks = await TaskModel.aggregate([
            { $match: {}},
            {$group: {_id:null , fieldNames: "$diffItem.updatedField.fieldName"}}





        ])
    }
    res.send(tasks)
})


module.exports = router;

