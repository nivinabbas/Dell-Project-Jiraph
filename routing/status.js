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
  const ye = new Intl.DateTimeFormat("en", {
    year: "numeric",
  }).format(d);
  const mo = new Intl.DateTimeFormat("en", {
    month: "2-digit",
  }).format(d);
  const da = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(d);

  return `${ye}-${mo}-${da}`;
}

function lastMonth(date) {
  let d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() - 1);
  console.log("*************", d)
  return d;
}
//////////////////////////////////////

// Start daily status alert !
router.get("/dailyalerts", async function (req, res) {
  let Today = dateFormat();
  let DailyAlerts = await TaskModel.aggregate([{
      $match: {
        $expr: {
          $eq: [
            Today,
            {
              $dateToString: {
                date: "$taskItem.createdTime",
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
            $cond: [{
                $eq: ["$jiraItem.functionalTest", true],
              },
              1,
              0,
            ],
          },
        },
        deletedTicktes: {
          $sum: {
            $cond: [{
                $eq: ["$diffItem.type", "Delete"],
              },
              1,
              0,
            ],
          },
        },
        fixVersionTicktes: {
          $sum: {
            $cond: [{
                $eq: ["$diffItem.updatedField.fieldName", "fixVersion"],
              },
              1,
              0,
            ],
          },
        },
        NotDone: {
          $sum: {
            $cond: [{
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
    DailyAlerts = [{
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
    DailyAlerts = [{
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
  res.send({
    success: true,
    error: null,
    info: DailyAlerts,
  });
});
// End daily status alert !

// start open tasks
router.get("/openTasks", async function (req, res) {
  TaskModel.find({
      "taskItem.isDone": false,
    },
    function (err, doc) {
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

// start openTasksWithFilter
router.post("/openTasksWithFilter", async function (req, res) {
  const {
    filter
  } = req.body;
  if (
    filter.type === "Update" &&
    filter.fieldName != "" &&
    filter.fieldName != "All"
  ) {
    TaskModel.find({
        "diffItem.type": filter.type,
        "diffItem.updatedField.fieldName": filter.fieldName,
        "taskItem.isDone": false,
      },
      function (err, doc) {
        res.send({
          success: true,
          error: null,
          info: {
            doc,
          },
        });
      }
    ).then((err) => console.log(err));
  } else {
    TaskModel.find({
        "diffItem.type": filter.type,
        "taskItem.isDone": false,
      },
      function (err, doc) {
        res.send({
          success: true,
          error: null,
          info: {
            doc,
          },
        });
      }
    ).then((err) => console.log(err));
  }
});
// end openTasksWithFilter

// start update task
router.post("/updateTasks", (req, res) => {
  const {
    jiraId,
    userId,
    isDone
  } = req.body;


  TaskModel.updateOne({
      "_id": jiraId,
      "taskItem.user._id": userId,
    }, {
      $set: {
        "taskItem.isDone": !isDone,
        "taskItem.updatedTime": new Date()
      },
    },
    function (err, doc) {
      if (err)
        res.send({
          success: false,
          error: "This task has already been completed",
          info: {
            doc,
          },
        });
      res.send({
        success: true,
        error: null,
        info: {
          doc,
        },
      });
    }
  );
});
// end update task

// start PieChart
router.post("/PieChart", (req, res) => {
  const {
    jiraId,
    userId
  } = req.body;

  TaskModel.updateOne({
      "jiraItem.id": jiraId,
      "taskItem.user._id": userId,
    }, {
      $set: {
        "taskItem.isDone": true,
      },
    },
    function (err, doc) {
      if (err)
        res.send({
          success: false,
          error: "This task has already been completed",
          info: {
            doc,
          },
        });
      res.send({
        success: true,
        error: null,
        info: {
          doc,
        },
      });
    }
  );
});
// end update task
//stackedChart start
router.post("/stackedChart", async function (req, res) {
  let {
    label,
    startDate,
    endDate
  } = req.body;
  let dataFromServer = [];
  let formatLabel;
  if (label == "daily" || label == "" || label == undefined) {
    formatLabel = "%Y-%m-%d";
  } else if (label == "monthly") {
    formatLabel = "%Y-%m";
  } else if (label == "weekly") {
    formatLabel = "weekly"
  } else {
    formatLabel = "%Y";
  }
  if (formatLabel != "weekly") {
    if (startDate == "" && endDate == "") {
      //default, label daily
      // startDate = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
      startDate = lastMonth(new Date());
      endDate = new Date(dateFormat() + "T23:59:59.59Z");
      let stackedChartDone = await TaskModel.aggregate([{
          $match: {
            "taskItem.createdTime": {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                date: "$taskItem.createdTime",
                format: formatLabel,
              },
            },
            count: {
              $sum: 1,
            },
            done: {
              $sum: {
                $cond: [{
                    $eq: ["$taskItem.isDone", true],
                  },
                  1,
                  0,
                ],
              },
            },
            notDone: {
              $sum: {
                $cond: [{
                    $eq: ["$taskItem.isDone", false],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
      // adding to Done Array
      stackedChartDone.forEach((element) => {
        //load data
        dataFromServer.push({
          done: element.done,
          notDone: element.notDone,
          date: element._id,
        });
      });

      res.send({
        success: true,
        error: null,
        info: dataFromServer,
      });
    } else if (startDate != "" && endDate == "") {
      //default, label daily
      startDate = new Date(startDate + "T00:00:00.00Z"); //new Date("2020-08-01T00:00:00.00Z");
      endDate = new Date(dateFormat() + "T23:59:59.59Z");
      let stackedChartDone = await TaskModel.aggregate([{
          $match: {
            "taskItem.createdTime": {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                date: "$taskItem.createdTime",
                format: formatLabel,
              },
            },
            count: {
              $sum: 1,
            },
            done: {
              $sum: {
                $cond: [{
                    $eq: ["$taskItem.isDone", true],
                  },
                  1,
                  0,
                ],
              },
            },
            notDone: {
              $sum: {
                $cond: [{
                    $eq: ["$taskItem.isDone", false],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
      // adding to Done Array
      stackedChartDone.forEach((element) => {
        //load data
        dataFromServer.push({
          done: element.done,
          notDone: element.notDone,
          date: element._id,
        });
      });

      res.send({
        success: true,
        error: null,
        info: dataFromServer,
      });
    } else if (startDate == "" && endDate != "") {
      //default, label daily
      // startDate = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
      startDate = lastMonth(new Date());
      endDate = new Date(dateFormat() + "T23:59:59.59Z");
      let stackedChartDone = await TaskModel.aggregate([{
          $match: {
            "taskItem.createdTime": {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                date: "$taskItem.createdTime",
                format: formatLabel,
              },
            },
            count: {
              $sum: 1,
            },
            done: {
              $sum: {
                $cond: [{
                    $eq: ["$taskItem.isDone", true],
                  },
                  1,
                  0,
                ],
              },
            },
            notDone: {
              $sum: {
                $cond: [{
                    $eq: ["$taskItem.isDone", false],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
      // adding to Done Array
      stackedChartDone.forEach((element) => {
        //load data
        dataFromServer.push({
          done: element.done,
          notDone: element.notDone,
          date: element._id,
        });
      });

      res.send({
        success: true,
        error: null,
        info: dataFromServer,
      });
    } else {
      startDate = new Date(startDate + "T00:00:00.00Z");
      endDate = new Date(endDate + "T23:59:59.0099Z");

      let stackedChartDone = await TaskModel.aggregate([{
          $match: {
            "taskItem.createdTime": {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                date: "$taskItem.createdTime",
                format: formatLabel, //"%Y-%m-%d",
              },
            },
            count: {
              $sum: 1,
            },
            done: {
              $sum: {
                $cond: [{
                    $eq: ["$taskItem.isDone", true],
                  },
                  1,
                  0,
                ],
              },
            },
            notDone: {
              $sum: {
                $cond: [{
                    $eq: ["$taskItem.isDone", false],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

      // adding to Done Array
      let dataFromServer = [];

      stackedChartDone.forEach((element) => {
        dataFromServer.push({
          done: element.done,
          notDone: element.notDone,
          date: element._id,
        });
      });

      res.send({
        success: true,
        error: null,
        info: dataFromServer,
      });
    }
  } else { //weekly 
    if (startDate == "" && endDate == "") {
      // startDate = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
      startDate = lastMonth(new Date());
      endDate = new Date(dateFormat() + "T23:59:59.59Z");
    } else if (startDate != "" && endDate == "") {
      startDate = new Date(startDate + "T00:00:00.00Z"); //new Date("2020-08-01T00:00:00.00Z");
      endDate = new Date(dateFormat() + "T23:59:59.59Z");

    } else if (startDate == "" && endDate != "") {
      // startDate = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
      startDate = lastMonth(new Date());
      endDate = new Date(endDate + "T23:59:59.59Z");
    } else {
      startDate = new Date(startDate + "T00:00:00.00Z");
      endDate = new Date(endDate + "T23:59:59.0099Z");
    }
    let stackedChartDone = await TaskModel.aggregate([{
        $match: {
          "taskItem.createdTime": {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$taskItem.createdTime",
              format: "%Y-%m-%d",
            },

          },
          count: {
            $sum: 1,
          },
          done: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", true],
                },
                1,
                0,
              ],
            },
          },
          notDone: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", false],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    Date.prototype.getWeek = function () {
      var onejan = new Date(this.getFullYear(), 0, 1);
      return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };

    function getDateRangeOfWeek(weekNo) {
      var d1 = new Date();
      numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
      d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
      var weekNoToday = d1.getWeek();
      var weeksInTheFuture = eval(weekNo - weekNoToday);
      d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));
      let rangeIsFrom, rangeIsTo;
      let tt = eval(d1.getMonth() + 1);
      if (eval(d1.getMonth() + 1).toString().length == 1 && d1.getDate().toString().length == 1) {
        rangeIsFrom = d1.getFullYear() + "-" + "0" + eval(d1.getMonth() + 1) + "-" + "0" + d1.getDate();
      } else if (eval(d1.getMonth() + 1).toString().length == 1 && d1.getDate().toString().length == 2) {
        rangeIsFrom = d1.getFullYear() + "-" + "0" + eval(d1.getMonth() + 1) + "-" + d1.getDate();
      } else if (eval(d1.getMonth() + 1).toString().length == 2 && d1.getDate().toString().length == 1) {
        rangeIsFrom = d1.getFullYear() + "-" + eval(d1.getMonth() + 1) + "-" + "0" + d1.getDate();
      }
      d1.setDate(d1.getDate() + 6);
      if (eval(d1.getMonth() + 1).toString().length == 1 && d1.getDate().toString().length == 1) {
        rangeIsTo = d1.getFullYear() + "-" + "0" + eval(d1.getMonth() + 1) + "-" + "0" + d1.getDate();
      } else if (eval(d1.getMonth() + 1).toString().length == 1 && d1.getDate().toString().length == 2) {
        rangeIsTo = d1.getFullYear() + "-" + "0" + eval(d1.getMonth() + 1) + "-" + d1.getDate();
      } else if (eval(d1.getMonth() + 1).toString().length == 2 && d1.getDate().toString().length == 1) {
        rangeIsTo = d1.getFullYear() + "-" + eval(d1.getMonth() + 1) + "-" + "0" + d1.getDate();
      }
      // let rangeIsTo = d1.getFullYear() + "-" + eval(d1.getMonth() + 1) + "-" + d1.getDate();
      return rangeIsFrom + " to " + rangeIsTo;
    };
    let DateWeek;
    let objIndex, weeknumber;
    let ResultWeeks = [];
    stackedChartDone.forEach(element => {
      weekID = element._id;
      DateWeek = new Date(weekID + "T23:59:59.59Z");
      weeknumber = DateWeek.getWeek();
      objIndex = ResultWeeks.findIndex((obj => obj.weekID == weeknumber));
      if (objIndex > -1) // 
      {
        ResultWeeks[objIndex].data = ({
          "count": ResultWeeks[objIndex].data.count + element.count,
          "done": ResultWeeks[objIndex].data.done + element.done,
          "notDone": ResultWeeks[objIndex].data.notDone + element.notDone
        })
      } else {
        ResultWeeks.push({
          "weekID": weeknumber,
          "DataRange": getDateRangeOfWeek(weeknumber),
          data: {
            "count": element.count,
            "done": element.done,
            "notDone": element.notDone
          }
        })

      }
    });

    let resultWeek = [];
    ResultWeeks.forEach(element => {
      resultWeek.push({
        date: element.DataRange,
        done: element.data.done,
        notDone: element.data.notDone
      })
    });
    console.log("stackedChartDone", stackedChartDone)
    res.send({
      success: true,
      error: null,
      info: resultWeek,
    });
  }
  // res.send({ success: false, error: null, info: null });
});

router.get("/stackedChart", async function (req, res) {
  //default, label daily
  {
    datefrom = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
    dateTo = new Date();
    let stackedChartDone = await TaskModel.aggregate([{
        $match: {
          "diffItem.updatedTime": {
            $gte: datefrom,
            $lte: dateTo,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$diffItem.updatedTime",
              format: "%Y-%m-%d",
            },
          },
          count: {
            $sum: 1,
          },
          done: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", true],
                },
                1,
                0,
              ],
            },
          },
          notDone: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", false],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    // adding to Done Array
    let tempDate = [];
    let tempCountDone = [],
      tempCountNotDone = [];
    let series = {
      series: [],
      options: {
        xaxis: {
          type: "datetime",
          categories: "",
        },
      },
    };
    stackedChartDone.forEach((element) => {
      //load data
      tempCountDone.push(element.done);
      tempCountNotDone.push(element.notDone);
      tempDate.push(element._id);
    });
    series.series.push({
      name: "done",
      data: tempCountDone,
    });
    series.series.push({
      name: "notDone",
      data: tempCountNotDone,
    });
    series.options.xaxis.categories = tempDate;

    res.send({
      success: true,
      error: null,
      info: series,
    });
  }
});
//stackedChart end

// start  type pie fieldPie
router.get("/TypePie", async function (req, res) {
  datefrom = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
  dateTo = new Date();
  let TypePieOb = await TaskModel.aggregate([{
      $match: {
        "diffItem.updatedTime": {
          $gte: datefrom,
          $lte: dateTo,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$diffItem.updatedTime",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $sum: 1,
        },
        done: {
          $sum: {
            $cond: [{
                $eq: ["$taskItem.isDone", true],
              },
              1,
              0,
            ],
          },
        },
        notDone: {
          $sum: {
            $cond: [{
                $eq: ["$taskItem.isDone", false],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);
  // adding to Done Array
  let tempDate = [];
  let tempCountDone = [],
    tempCountNotDone = [];
  let Data = {
    series: [],
    options: {
      chart: {
        type: "donut",
      },
    },
  };
  TypePieOb.forEach((element) => {
    //load data
    tempCountDone.push(element.done);
    tempCountNotDone.push(element.notDone);
    tempDate.push(element._id);
  });
  let sumDoneNotDone = 0;
  tempCountDone.forEach((element) => {
    sumDoneNotDone += element;
  });
  Data.series.push(sumDoneNotDone);
  sumDoneNotDone = 0;
  tempCountNotDone.forEach((element) => {
    sumDoneNotDone += element;
  });
  Data.series.push(sumDoneNotDone);
  //console.log(Data)
  res.send({
    success: true,
    error: null,
    info: Data,
  });
});

router.post("/TypePie", async function (req, res) {
  let TypePieOb;
  let {
    modificationType,
    startDate,
    endDate
  } = req.body;
  let formatLabel = "%Y-%m-%d";
  if (startDate === "" && endDate === "") {
    // startDate = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
    startDate = lastMonth(new Date());
    endDate = new Date();
  } else if (startDate != "" && endDate != "") {
    startDate = new Date(startDate + "T00:00:00.00Z");
    endDate = new Date(endDate + "T23:59:59.0099Z");
  } else if (startDate != "" && endDate === "") {
    startDate = new Date(startDate + "T00:00:00.00Z");
    endDate = new Date();
  } else {
    startDate = lastMonth(new Date());
    endDate = new Date(endDate + "T23:59:59.0099Z");
  }

  if (modificationType != "" && modificationType != "All") {
    TypePieOb = await TaskModel.aggregate([{
        $match: {
          "diffItem.updatedTime": {
            $gte: startDate,
            $lte: endDate,
          },
          "diffItem.type": modificationType,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$diffItem.updatedTime",
              format: formatLabel, //"%Y-%m-%d",
            },
          },
          count: {
            $sum: 1,
          },
          done: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", true],
                },
                1,
                0,
              ],
            },
          },
          notDone: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", false],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  } else {
    TypePieOb = await TaskModel.aggregate([{
        $match: {
          "diffItem.updatedTime": {
            $gte: startDate,
            $lte: endDate,
          },
          // "diffItem.type": modificationType,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$diffItem.updatedTime",
              format: formatLabel, //"%Y-%m-%d",
            },
          },
          count: {
            $sum: 1,
          },
          done: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", true],
                },
                1,
                0,
              ],
            },
          },
          notDone: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", false],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }
  // adding to Done Array
  let tempDate = [];
  let tempCountDone = [],
    tempCountNotDone = [];
  let Data = {
    series: [],
    options: {
      chart: {
        type: "donut",
      },
    },
  };
  TypePieOb.forEach((element) => {
    //load data
    tempCountDone.push(element.done);
    tempCountNotDone.push(element.notDone);
    tempDate.push(element._id);
  });
  let sumDoneNotDone = 0;
  tempCountDone.forEach((element) => {
    sumDoneNotDone += element;
  });
  Data.series.push(sumDoneNotDone);
  sumDoneNotDone = 0;
  tempCountNotDone.forEach((element) => {
    sumDoneNotDone += element;
  });
  Data.series.push(sumDoneNotDone);
  res.send({
    success: true,
    error: null,
    info: Data,
  });
});
//end type pie

// start pie field
router.get("/fieldPie", async function (req, res) {
  datefrom = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
  dateTo = new Date();
  let TypePieOb = await TaskModel.aggregate([{
      $match: {
        "diffItem.updatedTime": {
          $gte: datefrom,
          $lte: dateTo,
        },
        "diffItem.type": "Update",
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$diffItem.updatedTime",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $sum: 1,
        },
        done: {
          $sum: {
            $cond: [{
                $eq: ["$taskItem.isDone", true],
              },
              1,
              0,
            ],
          },
        },
        notDone: {
          $sum: {
            $cond: [{
                $eq: ["$taskItem.isDone", false],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);
  // adding to Done Array
  let tempDate = [];
  let tempCountDone = [],
    tempCountNotDone = [];
  let Data = {
    series: [],
    options: {
      chart: {
        type: "donut",
      },
    },
  };
  TypePieOb.forEach((element) => {
    //load data
    tempCountDone.push(element.done);
    tempCountNotDone.push(element.notDone);
    tempDate.push(element._id);
  });
  let sumDoneNotDone = 0;
  tempCountDone.forEach((element) => {
    sumDoneNotDone += element;
  });
  Data.series.push(sumDoneNotDone);
  sumDoneNotDone = 0;
  tempCountNotDone.forEach((element) => {
    sumDoneNotDone += element;
  });
  Data.series.push(sumDoneNotDone);
  res.send({
    success: true,
    error: null,
    info: Data,
  });
});

router.post("/fieldPie", async function (req, res) {
  let TypePieOb;
  let {
    modificationField,
    startDate,
    endDate
  } = req.body;
  let formatLabel = "%Y-%m-%d";
  if (startDate === "" && endDate === "") {
    // startDate = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
    startDate = lastMonth(new Date());
    endDate = new Date();
  } else if (startDate != "" && endDate != "") {
    startDate = new Date(startDate + "T00:00:00.00Z");
    endDate = new Date(endDate + "T23:59:59.0099Z");
  } else if (startDate != "" && endDate === "") {
    startDate = new Date(startDate + "T00:00:00.00Z");
    endDate = new Date();
  } else {
    // startDate = new Date(0);
    startDate = lastMonth(new Date());
    endDate = new Date();
  }
  if (modificationField != "" && modificationField != "All") {
    TypePieOb = await TaskModel.aggregate([{
        $match: {
          "diffItem.updatedTime": {
            $gte: startDate,
            $lte: endDate,
          },
          "diffItem.updatedField.fieldName": modificationField,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$diffItem.updatedTime",
              format: formatLabel, //"%Y-%m-%d",
            },
          },
          count: {
            $sum: 1,
          },
          done: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", true],
                },
                1,
                0,
              ],
            },
          },
          notDone: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", false],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  } else {
    TypePieOb = await TaskModel.aggregate([{
        $match: {
          "diffItem.updatedTime": {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$diffItem.updatedTime",
              format: formatLabel, //"%Y-%m-%d",
            },
          },
          count: {
            $sum: 1,
          },
          done: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", true],
                },
                1,
                0,
              ],
            },
          },
          notDone: {
            $sum: {
              $cond: [{
                  $eq: ["$taskItem.isDone", false],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }
  //adding to Done Array
  let tempDate = [];
  let tempCountDone = [],
    tempCountNotDone = [];
  let Data = {
    series: [],
    options: {
      chart: {
        type: "donut",
      },
    },
  };
  TypePieOb.forEach((element) => {
    tempCountDone.push(element.done);
    tempCountNotDone.push(element.notDone);
    tempDate.push(element._id);
  });
  let sumDoneNotDone = 0;
  tempCountDone.forEach((element) => {
    sumDoneNotDone += element;
  });
  Data.series.push(sumDoneNotDone);
  sumDoneNotDone = 0;
  tempCountNotDone.forEach((element) => {
    sumDoneNotDone += element;
  });
  Data.series.push(sumDoneNotDone);
  res.send({
    success: true,
    error: null,
    info: Data,
  });
});

//end pie field

// modificationTypeOptions start
router.get("/modificationTypeOptions", async function (req, res) {
  let Data = [{
    value: "All",
    label: "All",
  }, ];
  let obj = {};
  TaskModel.distinct("diffItem.type", function (err, doc) {
    // success:T/F,error:string,info{TaskItem[Task]
    doc.forEach((element) => {
      obj = {
        value: element,
        label: element,
      };
      Data.push(obj);
    });
    res.send({
      success: true,
      error: null,
      info: {
        Data,
      },
    });
  }).then((err) => console.log(err));
});
// modificationTypeOptions end

//modificationFieldOptions start
router.get("/modificationFieldOptions", async function (req, res) {
  let Data = [{
    value: "All",
    label: "All",
  }, ];
  let obj = {};
  TaskModel.find({
      "diffItem.type": "Update",
    })
    .distinct("diffItem.updatedField.fieldName", function (err, doc) {
      // success:T/F,error:string,info{TaskItem[Task]
      doc.forEach((element) => {
        obj = {
          value: element,
          label: element,
        };
        Data.push(obj);
      });
      res.send({
        success: true,
        error: null,
        info: {
          Data,
        },
      });
    })
    .then((err) => console.log(err));
});
//modificationFieldOptions end

// modificationFieldOptions start
router.post("/modificationFieldValueOptions", async function (req, res) {
  let data = req.body;
  let returnData = [{
    value: "All",
    label: "All",
  }, ];

  TaskModel.find({
    "diffItem.type": data[0].value,
    "diffItem.updatedField.fieldName": data[1].value,
  }).distinct("diffItem.updatedField.newValue", function (err, doc) {
    doc.forEach((element) => {
      if (element != null && element != "") {
        obj = {
          value: element,
          label: element,
        };
        returnData.push(obj);
      }
    });

    res.send({
      success: true,
      error: null,
      info: returnData,
    });
  });
  // end
});
// modificationFieldOptions end

//  start
router.post("/filltersAllSubmit", async function (req, res) {
  let data = req.body;

  if (
    data[0].value === "Update" &&
    data[1].value != null &&
    data[2].value != null &&
    data[2].value != "All" &&
    data[1].value != "All"
  ) {
    TaskModel.find({
        "diffItem.type": data[0].value,
        "diffItem.updatedField.fieldName": data[1].value,
        "diffItem.updatedField.newValue": data[2].value,
      },
      function (err, doc) {
        res.send({
          success: true,
          error: null,
          info: {
            doc,
          },
        });
      }
    ).then((err) => console.log(err));
  } else if (
    data[0].value === "Update" &&
    data[1].value != null &&
    data[2].value == null &&
    data[1].value != "All"
  ) {
    TaskModel.find({
        "diffItem.type": data[0].value,
        "diffItem.updatedField.fieldName": data[1].value,
      },
      function (err, doc) {
        res.send({
          success: true,
          error: null,
          info: {
            doc,
          },
        });
      }
    ).then((err) => console.log(err));
  } else if (
    data[0].value === "Update" &&
    data[1].value != null &&
    data[2].value === "All" &&
    data[1].value != "All"
  ) {
    //************************ */
    TaskModel.find({
        "diffItem.type": data[0].value,
        "diffItem.updatedField.fieldName": data[1].value,
      },
      function (err, doc) {
        res.send({
          success: true,
          error: null,
          info: {
            doc,
          },
        });
      }
    ).then((err) => console.log(err));

    //*&********
  } else if (
    (data[0].value === "Update" && data[1].value === "All") ||
    (data[0].value === "Update" &&
      data[1].value === "All" &&
      data[2].value === "All")
  ) {
    //************************ */
    TaskModel.find({
        "diffItem.type": data[0].value,
      },
      function (err, doc) {
        res.send({
          success: true,
          error: null,
          info: {
            doc,
          },
        });
      }
    ).then((err) => console.log(err));

    //*&********
  } else if (data[0].value === "All" || data[0].value === "all") {
    TaskModel.find({}, function (err, doc) {
      res.send({
        success: true,
        error: null,
        info: {
          doc,
        },
      });
    }).then((err) => console.log(err));
  } else {
    {
      TaskModel.find({
          "diffItem.type": data[0].value,
        },
        function (err, doc) {
          res.send({
            success: true,
            error: null,
            info: {
              doc,
            },
          });
        }
      ).then((err) => console.log(err));
    }
  }
});
//  end

//start segmentData
router.post("/segmentData", async function (req, res) {
  let {
    date,
    status
  } = req.body; // 4 , 7,10 ,weekly 
  console.log("date,status", date, status)
  let formatLabel;
  let startNewDate = date,
    endNewDate = date;
  if (date.length == 4) {
    formatLabel = "%Y"
    startNewDate = date + "-01-01"
    endNewDate = date + "-12-31"

  } else if (date.length == 7) {
    formatLabel = "%Y-%m"
    startNewDate = date + "-01"
    endNewDate = date + "-31"
  } else if (date.length == 10) {
    startDate = new Date(startNewDate + "T00:00:00.00Z");
    endDate = new Date(endNewDate + "T23:59:59.0099Z");
  } else {
    let n = date.indexOf("to");
    let fromDate = date.substr(0, n - 1).split(" ");;
    let toDate = date.substr(n + 3).split(" ");;
    console.log("fromDatefromDate", fromDate.length, "  ", fromDate)
    startDate = new Date(fromDate + "T00:00:00.00Z");
    endDate = new Date(toDate + "T23:59:59.0099Z");
    console.log("startDate", startDate, "endDate", endDate);
  }

  if (status === "Done") {
    status = true;
  } else if (status === "NotDone") {
    status = false;
  }
  console.log("startDate", startDate, "endDate", endDate);
  let stackedChartDone = await TaskModel.aggregate([{
    $match: {
      "taskItem.createdTime": {
        $gte: startDate,
        $lte: endDate,
      },
      "taskItem.isDone": status,
    },
  }]);

  console.log("stackedChartDone123", stackedChartDone)
  res.send({
    success: true,
    error: null,
    info: stackedChartDone,
  });
});

//end segmentData

//test function for open task with filter
function openTasksWithFilter(type, fieldName) {
  if (type === "Update" && fieldName != "") {
    TaskModel.find({
        "diffItem.type": type,
        "diffItem.updatedField.fieldName": fieldName,
        "taskItem.isDone": false,
      },
      function (err, doc) {
        //console.log(doc);
      }
    );
  } else {
    TaskModel.find({
        "diffItem.type": type,
        "taskItem.isDone": false,
      },
      function (err, doc) {
        //console.log(doc);
      }
    );
  }
}
// openTasksWithFilter("Update", "qaRepresentative1");
//fieldName start
router.get("/getFieldName", async function (req, res) {
  let Data = [{
    value: "All",
    label: "All",
  }, ];
  TaskModel.distinct("diffItem.updatedField.fieldName", function (err, doc) {
    // success:T/F,error:string,info{TaskItem[Task]
    doc.forEach((element) => {
      obj = {
        value: element,
        label: element,
      };
      Data.push(obj);
    });
    res.send({
      success: true,
      error: null,
      info: {
        Data,
      },
    });
  }).then((err) => console.log(err));
});
//fieldName end

//getType start
router.get("/getType", async function (req, res) {
  TaskModel.distinct("diffItem.type", function (err, doc) {
    // success:T/F,error:string,info{TaskItem[Task]
    res.send({
      success: true,
      error: null,
      info: {
        doc,
      },
    });
  }).then((err) => console.log(err));
});
//getType end



router.get("/test122", async function (req, res) {
  let startDate = new Date(0); //new Date("2020-08-01T00:00:00.00Z");
  let endDate = new Date(dateFormat() + "T23:59:59.59Z");
  //weekly
  let stackedChartDone = await TaskModel.aggregate([{
      $match: {
        "taskItem.createdTime": {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$taskItem.createdTime",
            format: "%Y-%m-%d",
          },

        },
        count: {
          $sum: 1,
        },
        done: {
          $sum: {
            $cond: [{
                $eq: ["$taskItem.isDone", true],
              },
              1,
              0,
            ],
          },
        },
        notDone: {
          $sum: {
            $cond: [{
                $eq: ["$taskItem.isDone", false],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  };

  function getDateRangeOfWeek(weekNo) {
    var d1 = new Date();
    numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    var weekNoToday = d1.getWeek();
    var weeksInTheFuture = eval(weekNo - weekNoToday);
    d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));
    var rangeIsFrom = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
    d1.setDate(d1.getDate() + 6);
    var rangeIsTo = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
    return rangeIsFrom + " to " + rangeIsTo;
  };
  let DateWeek;
  let objIndex, weeknumber;
  let ResultWeeks = [];
  stackedChartDone.forEach(element => {
    weekID = element._id;
    DateWeek = new Date(weekID + "T23:59:59.59Z");
    weeknumber = DateWeek.getWeek();
    objIndex = ResultWeeks.findIndex((obj => obj.weekID == weeknumber));
    if (objIndex > -1) // 
    {
      ResultWeeks[objIndex].data = ({
        "count": ResultWeeks[objIndex].data.count + element.count,
        "done": ResultWeeks[objIndex].data.done + element.done,
        "notDone": ResultWeeks[objIndex].data.notDone + element.notDone
      })
    } else {
      ResultWeeks.push({
        "weekID": weeknumber,
        "DataRange": getDateRangeOfWeek(weeknumber),
        data: {
          "count": element.count,
          "done": element.done,
          "notDone": element.notDone
        }
      })

    }
  });

  let resultWeek = [];
  ResultWeeks.forEach(element => {
    resultWeek.push({
      _id: element.DataRange,
      count: element.data.count,
      done: element.data.done,
      notDone: element.data.notDone
    })
  });
  console.log("stackedChartDone", stackedChartDone)
  res.send({
    success: true,
    error: null,
    info: resultWeek,
  });
})




module.exports = router;