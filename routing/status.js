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
        name: "totalTasks",
        number: 0,
      },
      {
        name: "NotDone",
        number:0,
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
      {
        name: "NotDone",
        number: DailyAlerts[0].NotDone,
      },
    ];
  }
  // console.log("DailyAlertsStart");
  // console.log(DailyAlerts);
  // console.log("DailyAlertsFinal");
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
          error: "This task has already been completed",
          info: { doc },
        });
      res.send({ success: true, error: null, info: { doc } });
    }
  );
});
// end update task

// start PieChart
router.post("/PieChart", (req, res) => {
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
  if (datefrom == null && dateTo == null)//default, label daily 
  {
    DailyAlerts = await TaskModel.aggregate([
      {
        $match: {
          $expr: {
            $gte: [
              datefrom,
              {
                $dateToString: {
                  date: "$diffItem.updatedTime",
                  format: "%Y-%m-%d",
                },
              },
            ],
          },
          $lte: {
            $gte: [
              dateTo,
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
          totalTasks: {
            $sum: 1,
          },
        },
      },
    ]);
  }

  res.send({ success: true, error: null, info: null });

});


// async function test123test() {
//   datefrom = new Date("2020-08-01T00:00:00.00Z");
//   dateTo = new Date();
//   let DailyAlerts = await TaskModel.aggregate([
//     {
//       $match: {
//         "taskItem.updatedTime": { $gte: datefrom, $lte: dateTo },
//       }
//     },

//     {
//       $group: {
//         _id: {
//           $dateToString: {
//             format: "%d-%m-%Y",
//             date: "$taskItem.updatedTime"
//           }  }
        
        
//         }
//   ]);

// console.log("DailyAlertsDailyAlertsDailyAlerts")
// console.log(DailyAlerts)
// }

//test123test();
//stackedChart end 
module.exports = router;







  // $expr:
        // {
        //   $and: [
        //     {
        //       $gte: [
        //         dateTo,
        //         {
        //           $dateToString: {
        //             date: "$taskItem.updatedTime",
        //             format: "%Y-%m-%d",
        //           },
        //         },
        //       ],
        //     },
        //     {
        //       "$lte": [
        //         datefrom,
        //         {
        //           $dateToString: {
        //             date: "$taskItem.updatedTime",
        //             format: "%Y-%m-%d",
        //           },
        //         },
        //       ],
        //     }
        //   ]
        // },