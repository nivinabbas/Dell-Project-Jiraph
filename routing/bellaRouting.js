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


 function addTaskItem(lst) {
    let updateData = convertUpdatedFields(lst)

    // remove irrelevant tasks
     updateData.map((item,index)=>{
        if(item.diffItem.type == "Update"){
            if(((item.diffItem.updatedField.oldValue == null) ||(item.diffItem.updatedField.oldValue == ""))
            && ((item.diffItem.updatedField.newValue == null) ||(item.diffItem.updatedField.newValue == ""))){
                updateData.splice(index, 1);
            }
        }
    })

     updateData.map((item, index) => {

        // adding 3 zeros to the end of the timestamp
        item.diffItem.updatedTime = item.diffItem.updatedTime * 1000

        // add task Item
        item.taskItem =
        {
            user: null,
            isDone: false,
            updatedTime: null,
            createdTime: new Date()
        }

        // functional test yes/no => true/false
        item.jiraItem.functionalTest == "Yes" ? item.jiraItem.functionalTest = true : item.jiraItem.functionalTest = false

        //type updated => update
        if (item.diffItem.type == "Updated") {
            item.diffItem.type = "Update"
        }
    })

    return updateData;
}

//updatedfields[] => field.
function convertUpdatedFields(data) {
    let newData = [];
    data.forEach(ticket => {
        let jiraItem = ticket.jiraItem;
        let qcItem = ticket.qcItem;
        let updatedFields = ticket.diffItem.updatedFields;
        let diffItem = ticket.diffItem;
        updatedFields.forEach(field => {
            newData.push({
                jiraItem: {
                    id: jiraItem.jiraId,
                    name: jiraItem.jiraName,
                    type: jiraItem.jiraType,
                    priority: jiraItem.priority,
                    status: jiraItem.status,
                    parentId: jiraItem.jiraParentId,
                    functionalTest: jiraItem.functionalTest,
                    qaRepresentative: jiraItem.qaRepresentative,
                    fixVersion: jiraItem.fixVersion
                },
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


router.post("/GetBellaData", async function (req, res) {
    const { user_id, user_pass, Data } = req.body;
    if (req.body.key == "QYZNRVlzTAzJjWJLxobY24hGYcoclsaf4ZX5BLhGSi0Xa4cMC1APBoN") {
        let updatedData = addTaskItem(Data);
        TaskModel.insertMany(updatedData).then(console.log("Adding Success.!"));
        res.send({ "success": "true" });
    } else {
        res.send({ "success": "false" });
    };
});



//date * 1000---------------------------------------------------------------
//task item-----------------------------------------------------------------
// functional test yes/no => true/false-------------------------------------
// type updated => type update ---------------------------------------------
//updatedfields[] => field -------------------------------------------------
//check for nulls ----------------------------------------------------------
//updateTime => updatedTime ------------------------------------------------
// remove "jira" prefix|||||||||||||||||||||||||||||||||||||||||||||||||||||

module.exports = router;