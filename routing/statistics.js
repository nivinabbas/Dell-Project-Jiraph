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
    console.log("aa")
    let {
        startDate,
        endDate,
    } = req.body; // 4 , 7,10 
    let formatLabel = "%Y-%m-%d";
    let NewArray = [];
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

    let completedTasks22 = await TaskModel.aggregate([
        {
            "$match": {
                "diffItem.updatedTime": {
                    $gte: startDate,
                    $lte: endDate,
                },
                "taskItem.isDone": true
            }
        },
        {
            $project: {
                DifferenceInDays: { $round: { $divide: [{ $subtract: ["$taskItem.updatedTime", "$taskItem.createdTime"] }, 86400000] } }
            }
        }
        , {
            $sort: {
                DifferenceInDays: 1,
            },
        }
    ]);
    let arrayToClint = [];
    let tasksCount = 0;
    let avg = 0;
    completedTasks22.forEach(element => {
        objIndex = arrayToClint.findIndex((obj => obj.date == element.DifferenceInDays));
        if (objIndex >= 0) {
            arrayToClint[objIndex].Done = arrayToClint[objIndex].Done += 1;
            tasksCount += 1;
        }
        else {
            arrayToClint.push({ date: element.DifferenceInDays, Done: 1 })
            avg += element.DifferenceInDays;
            tasksCount += 1;
        }

    });
    console.log(arrayToClint)
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
            $project: {
                DifferenceInDays: { $round: { $divide: [{ $subtract: [new Date(), "$taskItem.createdTime"] }, 86400000] } }
            }
        }
        , {
            $sort: {
                DifferenceInDays: 1,
            },
        }
    ]);
    let arrayToClintNotCompleted = [];
    noTcompletedTasks.forEach(element => {
        objIndex = arrayToClintNotCompleted.findIndex((obj => obj.day == element.DifferenceInDays));
        if (objIndex >= 0) {
            arrayToClintNotCompleted[objIndex].cunt = arrayToClintNotCompleted[objIndex].cunt + 1;
        }
        else {
            arrayToClintNotCompleted.push({ day: element.DifferenceInDays, cunt: 1 })
        }

    });
    let completedTasks = await TaskModel.aggregate([
        {
            "$match": {
                "taskItem.updatedTime":{
                    $gte: startDate,
                    $lte: endDate,
                },"taskItem.createdTime":{
                    $gte: startDate,
                    $lte: endDate,
                },
                "taskItem.isDone": true
            }
        },
        {
            $group: {
                _id: {
                    "diffdate": { $round: { $divide: [{ $subtract: ["$taskItem.updatedTime", "$taskItem.createdTime"] }, 86400000] } }
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
         console.log("element ", element.count)
        resultArray.push({
            date: element._id.diffdate,
            Done: element.count,
            tasks: element.tasks,
         })

    });
    let numOfDays=0,numoftakss=0;
    resultArray.forEach(element => {
        numOfDays+=element.date
        numoftakss+=element.Done
    });
//    let avg1=(numoftakss/numOfDays);
//     console.log(avg1,"asd")
//     resultArray[0].avg=avg1;
    // resultArray.push({
    //     avg:(tasksCount/avg).toFixed(2)})
    function compare( a, b ) {
        if ( a.date < b.date ){
          return -1;
        }
        if ( a.date > b.date ){
          return 1;
        }
        return 0;
      }
      
      resultArray.sort( compare );

    res.send({
        success: true,
        error: null,
        info: resultArray
    });
});







module.exports = router;