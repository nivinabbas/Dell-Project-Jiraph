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

async function addTaskItem(lst) {
    await lst.map((item, index) => {
        item.diffItem.updateTime = new Date(item.diffItem.updateTime)
        item.taskItem =
        {
            user: null,
            isDone: false,
            updatedTime: new Date(),
            createdTime: new Date()
        }
    })
}
router.post("/GetBellaData", async function (req, res) {
    const { user_id, user_pass, Data } = req.body;
    if (req.body.key == "QYZNRVlzTAzJjWJLxobY24hGYcoclsaf4ZX5BLhGSi0Xa4cMC1APBoN") {
        newDwata = Data;
        addTaskItem(newDwata);
        TaskModel.insertMany(newDwata).then(console.log("Adding Success.!"));
        res.send({ "success": "ture" });
    } else {
        res.send({ "success": "false" });
    };
});





function convertUpdatedFields(data) {
    let newData = [];
    data.forEach(ticket => {
        let jiraItem = ticket.jiraItem;
        let qcItem = ticket.qcItem;
        let updatedFields = ticket.diffItem.updatedFields;
        let diffItem = ticket.diffItem;
        updatedFields.forEach(field => {
            newData.push({
                jiraItem,
                qcItem,
                diffItem: {
                    updatedField: {
                        fieldName: field.fieldName,
                        newValue: field.newValue,
                        oldValue: field.oldValue
                    },
                    updatedTime: diffItem.updateTime,
                    type: diffItem.type
                }
            })
        })
    });
    return newData;
}




module.exports = router;