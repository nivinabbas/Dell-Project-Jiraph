/**
 * @author Marshood Ayoub <Marshood.ayoub@gmail.com> , Lina Nijem <nijemlina@gmail.com>
 * @data 25/08/2020
 */
const express = require("express");
const router = express.Router();
const UserSchema = require("../schemas/UserSchema");
const TaskModel = require("../schemas/TaskSchema");
const mongoose = require("mongoose");
const { obj } = require("../schemas/UserSchema");



router.post("/getStatistics", async function (req, res) {
    console.log("getStatistics")
    let {
        startDate,
        endDate,
    } = req.body; // 4 , 7,10 
    let formatLabel = "%Y-%m-%d";
    if (startDate === "" && endDate === "") {
        startDate = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
        endDate = new Date();
    } else if (startDate != "" && endDate != "") {
        startDate = new Date(startDate + "T00:00:00.00Z");
        endDate = new Date(endDate + "T23:59:59.0099Z");
    } else if (startDate != "" && endDate === "") {
        startDate = new Date(startDate + "T00:00:00.00Z");
        endDate = new Date();
    } else {
        startDate = new Date(0);
        endDate = new Date();
    }

    let completedTaskstest = await TaskModel.aggregate([
        {
            "$match": {
                "taskItem.updatedTime": {
                    $gte: startDate,
                    $lte: endDate,
                },
                "taskItem.isDone": true
            }
        },
        {
            $project: {
                DifferenceInDays: { $floor: { $divide: [{ $subtract: ["$taskItem.updatedTime", "$taskItem.createdTime"] }, 86400000] } }
            }
        }
        , {
            $sort: {
                DifferenceInDays: 1,
            },
        }
    ]);
    let completedTasks = await TaskModel.aggregate([
        {
            "$match": {
                "taskItem.updatedTime": {
                    $gte: startDate,
                    $lte: endDate,
                }, "taskItem.createdTime": {
                    $gte: startDate,
                    $lte: endDate,
                },
                "taskItem.isDone": true,
             }
        },
        {
            $group: {
                _id: {
                    "diffdate":   { $floor: {$divide: [{ $subtract: ["$taskItem.updatedTime", "$taskItem.createdTime"] }, 86400000] } }
                },
                tasks: { $push: '$$ROOT' },
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    let resultArray = [];
    completedTasks.forEach(element => {
        objIndex = resultArray.findIndex((obj => obj.date == element._id));
        console.log("element ", element.count,"element._id.diffdate ",element._id.diffdate)
        if( element._id.diffdate>=0){
        resultArray.push({
            date: element._id.diffdate,
            Done: element.count,
            tasks: element.tasks
        })}
        else if( element._id.diffdate>=-1&& element._id.diffdate<0){
         let   objIndexNew=resultArray.findIndex((obj => obj.date == 0))
            resultArray[objIndexNew].Done+=element.count;
            resultArray[objIndexNew].tasks+=element.tasks;
        }

    });
    console.log("resultArray",resultArray)
    let numOfDays = 0, numoftakss = 0, avg = 0;
    resultArray.forEach(element => {
        numOfDays += element.date
        numoftakss += element.Done
    });
    avg = (numoftakss / numOfDays);
    resultArray.push({
        avg: avg.toFixed(2)
    })
    function compare(a, b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    }

    resultArray.sort(compare);

    res.send({
        success: true,
        error: null,
        info: resultArray
    });
});




router.post("/getStatisticsNotDone", async function (req, res) {
    console.log("aa")
    let {
        startDate,
        endDate,
    } = req.body; // 4 , 7,10 
    if (startDate === "" && endDate === "") {
        startDate = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
        endDate = new Date();
    } else if (startDate != "" && endDate != "") {
        startDate = new Date(startDate + "T00:00:00.00Z");
        endDate = new Date(endDate + "T23:59:59.0099Z");
    } else if (startDate != "" && endDate === "") {
        startDate = new Date(startDate + "T00:00:00.00Z");
        endDate = new Date();
    } else {
        startDate = new Date(0);
        endDate = new Date();
    }
    let noTcompletedTasks = await TaskModel.aggregate([
        {
            "$match": {
                "diffItem.updatedTime": {
                    $gte: startDate,
                    $lte: endDate,
                },
                "taskItem.isDone": false
            }
        },
        {
            $group: {
                _id: {
                    "diffdate": { $round: { $divide: [{ $subtract: [new Date(), "$taskItem.createdTime"] }, 86400000] } }
                },
                tasks: { $push: '$$ROOT' },
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    let resultArray = [];
    noTcompletedTasks.forEach(element => {
        objIndex = resultArray.findIndex((obj => obj.date == element._id));
        console.log("element ", element.count)
        resultArray.push({
            date: element._id.diffdate,
            Done: element.count,
            tasks: element.tasks
        })

    });
    let numOfDays = 0, numoftakss = 0, avg = 0;
    resultArray.forEach(element => {
        numOfDays += element.date
        numoftakss += element.Done
    });
    avg = (numoftakss / numOfDays);
    resultArray.push({
        avg: avg.toFixed(2)
    })
    function compare(a, b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    }
    resultArray.sort(compare);
    res.send({
        success: true,
        error: null,
        info: resultArray
    });
});






module.exports = router;