/**
 * @author Marshood Ayoub <Marshood.ayoub@gmail.com>
 * @data 25/08/2020
 */
const express = require("express");
const router = express.Router();
const UserSchema = require('../schemas/UserSchema')
const TaskModel = require('../schemas/TaskSchema');
const mongoose = require('mongoose');

let newDwata = [];
const UserModel = mongoose.model("UserModel", UserSchema)

 function addTaskItem(lst) {
    lst.map((item, index) => {
        item.diffItem.updatedTime = new Date(item.diffItem.updatedTime)
        item.taskItem =
        {
            user: null,
            isDone: false,
            updatedTime: new Date(),
            createdTime: new Date()
        }
    })
}

// TaskModel.insertMany(Data1);


router.post("/GetBellaData", async function (req, res) {
    newDwata = [];
    const { user_id, user_pass, Data } = req.body;
    if (req.body.key == "QYZNRVlzTAzJjWJLxobY24hGYcoclsaf4ZX5BLhGSi0Xa4cMC1APBoN") {
        newDwata = Data;
        console.log("data length",Data.length)
        console.log("befor")
         addTaskItem(newDwata);
        console.log("after")
        try{
        TaskModel.insertMany(newDwata).then(console.log("Adding Success..!"));
        }catch{
            console.error("error: ",e)
        }
        res.send({ "success": "ture"});
    } else {
        res.send({ "success": "false" });
    };
});


async function insertToDB() {
    console.log("insertToDb")
    await TaskModel.insertMany(newDwata).then(console.log("Adding Success..!"));

}
//insertToDB();






module.exports = router;