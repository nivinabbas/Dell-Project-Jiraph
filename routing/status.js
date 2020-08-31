/**
 * @author Marshood Ayoub <Marshood.ayoub@gmail.com> , Lina Nijem <nijemlina@gmail.com>
 * @data 25/08/2020
 */
const express = require("express");
const router = express.Router();
const UserSchema = require("../schemas/UserSchema");
const TaskModel = require("../schemas/TaskSchema");
const mongoose = require("mongoose");
let Today;

// Start daily status alert !
router.get("/dailyalerts", async function (req, res) {
  let Today = dateFormat();
  console.log("***************&&&&&&&&&*****");
  let DailyAlerts = await TaskModel.aggregate([
    {
      $match: {
        $expr: {
          $eq: [
            Today,
            {
              $dateToString: {
                date: "$diffItem.updatedTime",
                format: "%Y-%m-%d",
              },
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: "DailyAlerts",
        functionalTest: {
          $sum: {
            $cond: [
              {
                $eq: ["$jiraItem.specialFields.functionalTest", true],
              },
              1,
              0,
            ],
          },
        },
        deletedTicktes: {
          $sum: {
            $cond: [
              {
                $eq: ["$diffItem.type", "Delete"],
              },
              1,
              0,
            ],
          },
        },
        fixVersionTicktes: {
          $sum: {
            $cond: [
              {
                $eq: ["$diffItem.updatedField.fieldName", "fixVersion"],
              },
              1,
              0,
            ],
          },
        },
        totalTasks: {
          $sum: 1,
        },
      },
    },
  ]);
  if (DailyAlerts.length == 0 || DailyAlerts == []) {
    DailyAlerts = [
      {
        name: "functionalTest",
        number: 0,
      },
      {
        name: "deletedTicktes",
        number: 0,
      },
      {
        name: "fixVersionTicktes",
        number: 0,
      },
      {
        name: "totalTasks",
        number: 0,
      },
    ];
  } else {
    DailyAlerts = [
      {
        name: "functionalTest",
        number: DailyAlerts[0].functionalTest,
      },
      {
        name: "deletedTicktes",
        number: DailyAlerts[0].deletedTicktes,
      },
      {
        name: "fixVersionTicktes",
        number: DailyAlerts[0].fixVersionTicktes,
      },
      {
        name: "totalTasks",
        number: DailyAlerts[0].totalTasks,
      },
    ];
  }
  console.log("DailyAlertsStart");
  console.log(DailyAlerts);
  console.log("DailyAlertsFinal");

  res.send({ success: true, error: null, info: DailyAlerts });
});

// to get the time format YY-MM-DD
function dateFormat() {
  const d = new Date();
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  return `${ye}-${mo}-${da}`;
}

async function teststau() {
  // let Today = new Date().toLocaleDateString();
  // var milliseconds = Today.getTime();
  Today = dateFormat();
  console.log("123 ", Today);
  Today = dateFormat();
  let DailyAlerts = await TaskModel.aggregate([
    {
      $match: {
        $expr: {
          $eq: [
            Today,
            {
              $dateToString: {
                date: "$diffItem.updatedTime",
                format: "%Y-%m-%d",
              },
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: "DailyAlerts",
        functionalTest: {
          $sum: {
            $cond: [
              {
                $eq: ["$jiraItem.specialFields.functionalTest", true],
              },
              1,
              0,
            ],
          },
        },
        deletedTicktes: {
          $sum: {
            $cond: [
              {
                $eq: ["$diffItem.type", "Delete"],
              },
              1,
              0,
            ],
          },
        },
        fixVersionTicktes: {
          $sum: {
            $cond: [
              {
                $eq: ["$diffItem.updatedField.fieldName", "fixVersion"],
              },
              1,
              0,
            ],
          },
        },
        TotalTasks: {
          $sum: 1,
        },
      },
    },
  ]);
  if (DailyAlerts.length == 0 || DailyAlerts == []) {
    DailyAlerts = {
      _id: "DailyAlerts",
      functionalTest: 0,
      deletedTicktes: 0,
      fixVersionTicktes: 0,
      TotalTasks: 0,
    };
  }
  console.log("DailyAlerts");
  console.log(DailyAlerts);
  console.log("DailyAlertsFF");
}
// teststau();
// End daily status alert !

// start open tasks
router.get("/openTasks", async function (req, res) {
  TaskModel.find(
    {
      "taskItem.isDone": false,
    },
    function (err, doc) {
      // success:T/F,error:string,info{TaskItem[Task]

      res.send({
        success: true,
        error: null,
        info: {
          doc,
        },
      });
    }
  ).then((err) => console.log(err));
});
// end open tasks

// start update task
router.post("/updateTasks", (req, res) => {
  console.log(req.body.jiraId);
  const { jiraId, userId } = req.body;

  TaskModel.updateOne(
    { "jiraItem.jiraId": jiraId, "taskItem.user._id": userId },
    { $set: { "taskItem.isDone": true } },
    function (err, doc) {
      if (err)
        res.send({
          success: false,
          error: "This task has already been completed", // or return err
          info: { doc },
        });
      res.send({ success: true, error: null, info: { doc } });
    }
  );
});
// end update task

async function testdate(startDate) {
  console.log(startDate);
  console.log("the test work");

  let donetasks = await TaskModel.aggregate([
    {
    
      $match: {
        "taskItem.updatedTime": { $gte: new Date( '2020-08-26'), $lte:new Date( '2020-08-27') },
      },
    },
  ]);

  console.log("donetasks");
  console.log(donetasks);
  console.log("donetasksFF");
}

// testdate("2020-08-26T10:04:35.204+00:00", "2020-08-30T10:23:58.116+00:00");
testdate(new Date("1945-01-01"));

module.exports = router;
