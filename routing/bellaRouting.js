const express = require("express");
const router = express.Router();
const UserSchema = require('../schemas/UserSchema')
const TaskModel = require('../schemas/TaskSchema');
const mongoose = require('mongoose');

// const url = "mongodb+srv://nimer:N1N1N1N1@cluster0.tejcy.mongodb.net/test";
// const mongoose = require('mongoose');
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

let newDwata = [{
    "diffItem": {
        "updateTime": 1568309401000,
        "type": "Update",
        "updatedField": {
            "fieldName": "status",
            "newValue": "In Progress",
            "oldValue": "Done"
        }
    },
    "jiraItem": {
        "priority": "P00",
        "status": "Backlog",
        "jiraType": "Epic",
        "jiraName": "PSI 41: SAR Support for FSCK/Recovery",
        "qaRepresentative": null,
        "functionalTest": "Yes",
        "fixVersion": "PSI_41",
        "jiraId": "TRIES-41773",
        "jiraParentId": "TRIF-842"
    },
    "qcItem": {
        "status": "Backlog",
        "requirementType": "Epic",
        "requirementId": "2164"
    }
}];


const UserModel = mongoose.model("UserModel", UserSchema)

// const user = new UserModel({
//     userInfo: {
//         employeeName: "Yousef",
//         employeeEmail: "yousef@gmail.com",
//         employeeRole: "Admin",
//         password: "1111"
//     }
// })



async function addTaskItem(lst) {
    await lst.map((item, index) => {
        item.diffItem.updateTime = new Date(item.diffItem.updateTime)
        item.taskItem =
        {
            user: user,
            isDone: false,
            updatedTime: new Date(),
            createdTime: new Date()
        }
    })
}

// addTaskItem(newDwata)
// TaskModel.insertMany(newDwata).then(doc=>{
//     console.log('inserted')
// })

// router.post("/GetBellaData", async function (req, res) {

//     const { user_id, user_pass, Data } = req.body;
//     if (req.body.key == "QYZNRVlzTAzJjWJLxobY24hGYcoclsaf4ZX5BLhGSi0Xa4cMC1APBoN") {
//         console.log("true" + Data)
//         newDwata = Data;
//         addTaskItem(newDwata);
//         // TaskModel.insertMany(newDwata);
//         printData()
//         res.send({ "success": "ture" });
//     } else {
//         (console.log("false"))
//         res.send({ "success": "false" });
//     };
// });
// to check the new data 
// function printData() {
//     console.log("printData:- ");
//     // console.log(newDwata);
//     console.log("newDwata:- ");

//     newDwata.forEach(element => {
//         console.log(element)

//     });
// }




module.exports = router;

