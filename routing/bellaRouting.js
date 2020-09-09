/**
 * @author Marshood Ayoub <Marshood.ayoub@gmail.com>
 * @data 25/08/2020
 */
const express = require("express");
const router = express.Router();
const UserSchema = require('../schemas/UserSchema')
const TaskModel = require('../schemas/TaskSchema');
const mongoose = require('mongoose');

let newData = [];
const UserModel = mongoose.model("UserModel", UserSchema)


async function addTaskItem(lst) {
    await lst.map((item, index) => {
        item.diffItem.updateTime = new Date(item.diffItem.updateTime)
        item.taskItem =
        {
            user: null,
            isDone: false,
            updatedTime: null,
            createdTime: new Date()
        }
    })
}

// TaskModel.insertMany(Data1);


router.post("/GetBellaData", async function (req, res) {
    newData = [];
    const { user_id, user_pass, Data } = req.body;
    if (req.body.key == "QYZNRVlzTAzJjWJLxobY24hGYcoclsaf4ZX5BLhGSi0Xa4cMC1APBoN") {
        newData = Data;
        addTaskItem(newData);
        TaskModel.insertMany(newData).then(console.log("Adding Success.!"));
        res.send({ "success": "true" });
    } else {
        res.send({ "success": "false" });
    };
});


async function insertToDB() {
    console.log("insertToDb")
    await TaskModel.insertMany(newData).then(console.log("Adding Success..!"));

}
//insertToDB();






module.exports = router;