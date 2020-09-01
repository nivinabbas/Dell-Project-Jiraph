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

////////////TEMP FUNCTIONS/////////////

// to get the time format YY-MM-DD
function dateFormat() {
  const d = new Date();
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  return `${ye}-${mo}-${da}`;
}

//////////////////////////////////////

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
                $eq: ["$jiraItem.functionalTest", true],
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
        NotDone: {
          $sum: {
            $cond: [
              {
                $eq: ["$taskItem.isDone", false],
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
        name: "totalTasks/NotDone",
        number: 0 + "/" + 0,
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
        name: "totalTasks/NotDone",
        number: DailyAlerts[0].totalTasks + "/" + DailyAlerts[0].NotDone,
      },
    ];
  }
  res.send({ success: true, error: null, info: DailyAlerts });
});
// End daily status alert !

// start open tasks
router.get("/openTasks", async function (req, res) {
  TaskModel.find({ "taskItem.isDone": false }, function (err, doc) {
    res.send({ success: true, error: null, info: { doc } });
  }).then((err) => console.log(err));
});
// end open tasks

// start openTasksWithFilter
router.post("/openTasksWithFilter", async function (req, res) {
  const { filter } = req.body;
  if (filter.type === "Update") {
    TaskModel.find(
      {
        "diffItem.type": filter.type,
        "diffItem.updatedField.fieldName": filter.fieldName,
        "taskItem.isDone": false,
      },
      function (err, doc) {
        res.send({ success: true, error: null, info: { doc } });
      }
    ).then((err) => console.log(err));
  } else {
    TaskModel.find(
      { "diffItem.type": filter.type, "taskItem.isDone": false },
      function (err, doc) {
        res.send({ success: true, error: null, info: { doc } });
      }
    ).then((err) => console.log(err));
  }
});
// end openTasksWithFilter

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
          error: "This task has already been completed",
          info: { doc },
        });
      res.send({ success: true, error: null, info: { doc } });
    }
  );
});
// end update task

//stackedChart start
router.post("/stackedChart", async function (req, res) {
  let { label, datefrom, dateTo } = req.body;
  let DailyAlerts;
  if (datefrom == null && dateTo == null) {
    //default, label daily
    datefrom = new Date("2020-08-01T00:00:00.00Z");
    dateTo = new Date();
    let stackedChartDone = await TaskModel.aggregate([
      {
        $match: {
          "taskItem.updatedTime": { $gte: datefrom, $lte: dateTo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$taskItem.updatedTime",
              format: "%Y-%m-%d",
            },
          },
          count: { $sum: 1 },
          done: {
            $sum: {
              $cond: [{ $eq: ["$taskItem.isDone", true] }, 1, 0],
            },
          },
          notDone: {
            $sum: {
              $cond: [{ $eq: ["$taskItem.isDone", false] }, 1, 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    // adding to Done Array
    let DoneArray = [],
      NotDone = [];
    let tempDate = [],
      date1 = [];
    let tempCountDone = [],
      tempCountNotDone = [];
    stackedChartDone.forEach((element) => {
      //load data
      tempCountDone.push(element.done);
      tempCountNotDone.push(element.notDone);
      tempDate.push(element._id);
    });
    DoneArray.push({ name: "done" }, { data: tempCountDone });
    NotDone.push({ name: "notDone" }, { data: tempCountNotDone });
    tempCountDone = [];
    tempCountNotDone = [];
    tempCountDone.push(DoneArray); // final array
    tempCountDone.push(NotDone);
    tempCountNotDone.push({ series: tempCountDone });
    tempCountNotDone.push({ categories: tempDate });
    finalArray = tempCountNotDone;
    res.send({ success: true, error: null, info: finalArray });
  } else {
    datefrom = new Date(time1 + "T00:00:00.00Z");
    dateTo = new Date(time2 + "T23:59:59.0099Z");
    let stackedChartDone = await TaskModel.aggregate([
      {
        $match: {
          "taskItem.updatedTime": { $gte: datefrom, $lte: dateTo },
        },
      },

      {
        $group: {
          _id: {
            $dateToString: {
              date: "$taskItem.updatedTime",
              format: "%Y-%m-%d",
            },
          },
          count: { $sum: 1 },
          done: {
            $sum: {
              $cond: [{ $eq: ["$taskItem.isDone", true] }, 1, 0],
            },
          },
          notDone: {
            $sum: {
              $cond: [{ $eq: ["$taskItem.isDone", false] }, 1, 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // adding to Done Array
    let DoneArray = [],
      NotDone = [];
    let tempDate = [],
      date1 = [];
    let tempCountDone = [],
      tempCountNotDone = [];
    stackedChartDone.forEach((element) => {
      //load data
      tempCountDone.push(element.done);
      tempCountNotDone.push(element.notDone);
      tempDate.push(element._id);
    });
    DoneArray.push({ name: "done" }, { data: tempCountDone });
    NotDone.push({ name: "notDone" }, { data: tempCountNotDone });
    tempCountDone = [];
    tempCountNotDone = [];
    tempCountDone.push(DoneArray); // final array
    tempCountDone.push(NotDone);
    tempCountNotDone.push({ series: tempCountDone });
    tempCountNotDone.push({ categories: tempDate });
    finalArray = tempCountNotDone;

    res.send({ success: true, error: null, info: finalArray });
  }
  res.send({ success: false, error: null, info: null });
});

//fieldName start
router.get("/getFieldName", async function (req, res) {
  TaskModel.distinct("diffItem.updatedField.fieldName", function (err, doc) {
    // success:T/F,error:string,info{TaskItem[Task]

    res.send({ success: true, error: null, info: { doc } });
  }).then((err) => console.log(err));
});
//fieldName end

//getType start
router.get("/getType", async function (req, res) {
  TaskModel.distinct("diffItem.type", function (err, doc) {
    // success:T/F,error:string,info{TaskItem[Task]
    res.send({ success: true, error: null, info: { doc } });
  }).then((err) => console.log(err));
});
//getType end

async function test123test(time1, time2) {
  datefrom = new Date(time1 + "T00:00:00.00Z");
  dateTo = new Date(time2 + "T23:59:59.0099Z");
  let stackedChartDone = await TaskModel.aggregate([
    {
      $match: {
        "taskItem.updatedTime": { $gte: datefrom, $lte: dateTo },
      },
    },

    {
      $group: {
        _id: {
          $dateToString: {
            date: "$taskItem.updatedTime",
            format: "%Y-%m-%d",
          },
        },
        count: { $sum: 1 },
        done: {
          $sum: {
            $cond: [{ $eq: ["$taskItem.isDone", true] }, 1, 0],
          },
        },
        notDone: {
          $sum: {
            $cond: [{ $eq: ["$taskItem.isDone", false] }, 1, 0],
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // adding to Done Array
  let DoneArray = [],
    NotDone = [];
  let tempDate = [],
    date1 = [];
  let tempCountDone = [],
    tempCountNotDone = [];
  stackedChartDone.forEach((element) => {
    //load data
    tempCountDone.push(element.done);
    tempCountNotDone.push(element.notDone);
    tempDate.push(element._id);
  });
  DoneArray.push({ name: "done" }, { data: tempCountDone });
  NotDone.push({ name: "notDone" }, { data: tempCountNotDone });
  tempCountDone = [];
  tempCountNotDone = [];
  tempCountDone.push(DoneArray); // final array
  tempCountDone.push(NotDone);
  tempCountNotDone.push({ series: tempCountDone });
  tempCountNotDone.push({ categories: tempDate });
  console.log(tempCountNotDone);
}

// test123test("2020-08-25", "2020-08-31");
//stackedChart end

//////////////////////

function openTasksWithFilter(type, fieldName) {
  if (type === "Update") {
    TaskModel.find(
      {
        "diffItem.type": type,
        "diffItem.updatedField.fieldName": fieldName,
        "taskItem.isDone": false,
      },
      function (err, doc) {
        console.log(doc);
      }
    );
  } else {
    TaskModel.find(
      { "diffItem.type": type, "taskItem.isDone": false },
      function (err, doc) {
        console.log(doc);
      }
    );
  }
}
openTasksWithFilter("Create", "qaRepresentative");

module.exports = router;
