/**
 * @author Marshood Ayoub <Marshood.ayoub@gmail.com> , Lina Nijem <nijemlina@gmail.com>
 * @data 25/08/2020
 */
const express = require("express");
const router = express.Router();
const UserSchema = require('../schemas/UserSchema')
const TaskModel = require('../schemas/TaskSchema');
const mongoose = require('mongoose');
let Today;



// Start daily status alert !

router.get("/dailyAlerts", async function (req, res) {

 
    let Today = dateFormat();
    let DailyAlerts = await TaskModel.aggregate([
        {
            "$match": {
                "$expr": {
                    $eq: [
                        Today,
                        {
                            "$dateToString": {
                                "date": "$diffItem.updatedTime",
                                "format": "%Y-%m-%d"
                            }
                        }
                    ]
                }
            }
        },
        {
            $group: {
                _id: "DailyAlerts",
                "functionalTests": {
                    $sum: {
                        $cond: [
                            { $eq: ['$jiraItem.specialFields.functionalTest', true] },
                            1,
                            0
                        ]
                    }
                },
                "deletedTicktes": {
                    $sum: {
                        $cond: [
                            { $eq: ['$diffItem.type', "Delete"] },
                            1,
                            0
                        ]
                    }
                },
                "fixVersionTicktes": {
                    $sum: {
                        $cond: [
                            { $eq: ['$diffItem.updatedField.fieldName', "fixVersion"] },
                            1,
                            0
                        ]
                    }
                },
            },
            "totalTasks": 
                 { "$sum": 1 },
        },
    ]);
    if(DailyAlerts.length==0||DailyAlerts==[])
    {
        res.send({ success: true, error: null, info: {  _id: 'DailyAlerts',
        functionalTest: 0,
        deletedTicktes: 0,
        fixVersionTicktes: 0,
        TotalTasks: 0 } });

    }
    console.log("DailyAlertsStart");
    console.log(DailyAlerts)
    console.log("DailyAlertsFinal");

    res.send({ success: true, error: null, info: { DailyAlerts } });
})
// to get the time format YY-MM-DD
function dateFormat() {
    const d = new Date()
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

    return (`${ye}-${mo}-${da}`)
}

async function teststau() {
    // let Today = new Date().toLocaleDateString();
    // var milliseconds = Today.getTime();
    console.log("123 ", Today);
    Today = dateFormat();
    let DailyAlerts = await TaskModel.aggregate([
        {
            "$match": {
                "$expr": {
                    $eq: [
                        Today,
                        {
                            "$dateToString": {
                                "date": "$diffItem.updatedTime",
                                "format": "%Y-%m-%d"
                            }
                        }
                    ]
                }
            }
        },
        {
            $group: {
                _id: "DailyAlerts",
                "functionalTest": {
                    $sum: {
                        $cond: [
                            { $eq: ['$jiraItem.specialFields.functionalTest', true] },
                            1,
                            0
                        ]
                    }
                },
                "deletedTicktes": {
                    $sum: {
                        $cond: [
                            { $eq: ['$diffItem.type', "Delete"] },
                            1,
                            0
                        ]
                    }
                },
                "fixVersionTicktes": {
                    $sum: {
                        $cond: [
                            { $eq: ['$diffItem.updatedField.fieldName', "fixVersion"] },
                            1,
                            0
                        ]
                    }
                },
                "TotalTasks": 
                { "$sum": 1 },
            },
        },
    ]);
    if(DailyAlerts.length==0||DailyAlerts==[])
    {
        DailyAlerts=  {  _id: 'DailyAlerts',
        functionalTest: 0,
        deletedTicktes: 0,
        fixVersionTicktes: 0,
        TotalTasks: 0 } ;

    }
    console.log("DailyAlerts");
    console.log(DailyAlerts)
    console.log("DailyAlertsFF");

}
 teststau();
// End daily status alert !

// start open tasks 


router.get("/api/status/openTasks", async function (req, res) {

    TaskModel.find({ "taskItem.isDone": false }, function (err, doc) {
        //success:T/F,error:string,info{TaskItem[Task]

        res.send({ success: true, error: null, info: { doc } });
    }).then(err => console.log(err))









})


// end open tasks



module.exports = router;

