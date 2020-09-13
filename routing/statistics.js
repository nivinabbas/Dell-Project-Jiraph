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



//getType start
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


    
    let completedTasks = await TaskModel.aggregate([
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
     completedTasks.forEach(element => {
        objIndex = arrayToClint.findIndex((obj => obj.day == element.DifferenceInDays));
        if (objIndex>=0){
            console.log("objIndex",objIndex)
             arrayToClint[objIndex].cunt =   arrayToClint[objIndex].cunt+1;

            console.log("adding day")
        }
        else{
            arrayToClint.push({ day: element.DifferenceInDays, cunt: 1 })
         }

     });

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
        if (objIndex>=0){
             arrayToClintNotCompleted[objIndex].cunt =   arrayToClintNotCompleted[objIndex].cunt+1;
         }
        else{
            arrayToClintNotCompleted.push({ day: element.DifferenceInDays, cunt: 1 })
         }

     });
      let result = [];
    //   {
    //      completed: "",
    //      noTcompleterd:""
    //   };
     result.push({
        noTcompleterd:arrayToClintNotCompleted})
     result.push({
        completed:arrayToClint})

     res.send({
        success: true,
        error: null,
        info: result
    });
});

//getType end




module.exports = router;