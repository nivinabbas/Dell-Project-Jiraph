import React from "react";
import { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Table from "../Table/Table.jsx";
import StackedChart from "../Chart/StackedChart";
import StatisticsChart from "../Chart/StatisticsChart";
import PieChart from "../Chart/PieChart.js";
import DatePicker from "../DatePicker/DatePicker";
import DailyAlerts from "../DailyAlerts/index";
import Select from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  initialTableFilters,
  initialPieChartsFilters,
  tasksNames,
} from "../../../../../service/statusService";
import "./StatusPage.css";
import { datesFormat } from "../../../../../service/utils";

const timeLabelOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];
const statusOptions = [
  { value: "all", label: "All" },
  { value: "done", label: "Done" },
  { value: "notDone", label: "NotDone" },
];
const StatusPage = () => {
  const [cardsContent, setCardsContent] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [stackedChart, setStackedChart] = useState([]);
  const [statisticsChart, setStatisticsChart] = useState([]);
  const [typePieChart, setTypePieChart] = useState({});
  const [fieldPieChart, setFieldPieChart] = useState({});
  const [modificationTypeOptions, setModificationTypeOptions] = useState({});
  const [modificationFieldOptions, setModificationFieldOptions] = useState({});
  const [modificationNamePieOptions, setModificationNamePieOptions] = useState(
    {}
  );
  const [
    modificationFieldValueOptions,
    setModificationFieldValueOptions,
  ] = useState({});
  const [startDate, setStartDate] = useState(datesFormat()[0]);
  const [endDate, setEndDate] = useState(datesFormat()[1]);
  const [timeLabel, setTimeLabel] = useState("");
  const [pieChartsFilters, setPieChartsFilters] = useState(
    initialPieChartsFilters
  );
  const [tableFilters, setTableFilters] = useState(initialTableFilters);
  const [tasksId, setTasksId] = useState([]);

  //statistics
  useEffect(() => {
    const filters = {
      startDate,
      endDate,
    };
    fetch("/api/statistics/getStatistics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          setStatisticsChart(info);
        } else {
          alert(error);
        }
      });
  }, [startDate, endDate, openTasks]);

  //statistics
  useEffect(() => {
    fetch("/api/status/dailyalerts")
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          setCardsContent(info);
        } else {
          alert(error);
        }
      });
  }, [openTasks]);

  /** Load open tasks */
  useEffect(() => {
    fetch("/api/status/openTasks")
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          setOpenTasks(info.doc);
        } else {
          alert(error);
        }
      });
  }, []);

  /** Main bar chart */
  useEffect(() => {
    const filters = {
      startDate,
      endDate,
      label: timeLabel.value,
    };

    fetch("/api/status/stackedChart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;

        if (success) {
          setStackedChart(info);
        } else {
          alert(error);
        }
      });
  }, [startDate, endDate, timeLabel, openTasks]);

  /** type pie  */
  useEffect(() => {
    const filters = {
      startDate,
      endDate,
      modificationType: pieChartsFilters[0].value,
    };
    fetch("/api/status/TypePie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        console.log("type Pie info: ", info);
        if (success) {
          setTypePieChart(info);
        } else {
          alert(error);
        }
      });
  }, [startDate, endDate, pieChartsFilters, openTasks]);

  /** Right Pie */
  useEffect(() => {
    const filters = {
      startDate,
      endDate,
      modificationField: pieChartsFilters[1].value,
    };
    fetch("/api/status/fieldPie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          setFieldPieChart(info);
        } else {
          alert(error);
        }
      });
  }, [startDate, endDate, pieChartsFilters, openTasks]);

  /** table select option ==> based on "update" select */
  useEffect(() => {
    fetch("/api/status/modificationTypeOptions")
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          setModificationTypeOptions(info.Data);
        } else {
          alert(error);
        }
      });
  }, []);

  //pie option filters
  useEffect(() => {
    if (
      tableFilters[0].name === "modificationType" &&
      tableFilters[0].value === "Update"
    ) {
      fetch("/api/status/modificationFieldOptions")
        .then((res) => res.json())
        .then((data) => {
          let { success, error, info } = data;
          if (success) {
            setModificationFieldOptions(info.Data);
          } else {
            alert(error);
          }
        });
    }
  }, [tableFilters]);

  useEffect(() => {
    fetch("/api/status/getFieldName")
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        setModificationNamePieOptions(info.Data);
      });
  }, []);

  const handleDoneClick = (jiraId) => {
    console.log(jiraId);
    const cloned = [...tasksId];
    const index = tasksId.indexOf(jiraId);
    index != -1 ? cloned.splice(index, 1) : cloned.push(jiraId);

    setTasksId(cloned);
  };
  console.log("tttt", tableFilters[3]);
  const handleUpdateClick = () => {
    const names = tasksNames(tasksId, openTasks);

    confirmAlert({
      title: `Confirm`,
      message: (
        <ol>
          {names.map((name, index) => (
            <li key={index}>
              <span>{++index}.</span>
              {name}
            </li>
          ))}
        </ol>
      ),
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const originalTasksID = [...openTasks];
            try {
              const userId = null;
              if (tableFilters[3].value !== "all") {
                const tasks = openTasks.filter(
                  (task) => tasksId.indexOf(task._id) === -1
                );
                setOpenTasks(tasks);
              }

              fetch("/api/status/updateTasks", {
                method: "POST",
                body: JSON.stringify({ tasksId, userId }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((res) => {
                  let { success, error, info } = res;
                  if (success) {
                  } else {
                    alert(error);
                  }
                });
            } catch (error) {
              setOpenTasks(originalTasksID);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  ////////////////////////////
  const handlePieChartsFilters = (filter, name) => {
    const newPieFilters = [...pieChartsFilters].map((f) => {
      if (f.name === name) {
        f.value = filter.value;
      }
      return f;
    });
    setPieChartsFilters(newPieFilters);
  };
  //date
  const handleDateClick = (date) => {
    const { name, value } = date;
    name === "startDate"
      ? setStartDate(value.trim())
      : setEndDate(value.trim());
  };

  const handleSelect = (filter, name) => {
    const newFilters = [...tableFilters].map((f) => {
      if (f.name === name) {
        f.value = filter.value;
      }
      return f;
    });
    if (name === "modificationField") {
      newFilters[2].value = null;
    }
    if (name === "modificationType") {
      newFilters[1].value = null;
      newFilters[2].value = null;
    }
    setTableFilters(newFilters);
    fetch("/api/status/modificationFieldValueOptions", {
      method: "POST",
      body: JSON.stringify({ ...tableFilters }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let { success, error, info } = res;
        if (success) {
          setModificationFieldValueOptions(info);
        } else {
          alert(error);
        }
      });

    fetch("/api/status/filltersAllSubmit", {
      method: "POST",
      body: JSON.stringify({ ...tableFilters }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let { success, error, info } = res;
        if (success) {
          console.log(info.doc);
          setOpenTasks(info.doc);
        } else {
          alert(error);
        }
      });
  };

  const handleSegmentClick = (date, status) => {
    console.log("s:", status);
    fetch("/api/status/segmentData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          setOpenTasks(info);
        } else {
          alert(error);
        }
      });
    const newFilters = [...tableFilters];
    newFilters[3].value = status;
    setTableFilters(newFilters);
  };

  const handleStaticsClick = (date, tasks) => {
    setOpenTasks(tasks);
  };

  return (
    <div>
      <div className="status__header">Status</div>
      <div className="statusPageContainer">
        <div className="statusPage__dashboard">
          <h3>Daily Alerts</h3>
          <DailyAlerts cardsContent={cardsContent} />
        </div>

        <div className="statusPage__barChart__filters">
          <DatePicker
            onDateClick={handleDateClick}
            name="startDate"
            label="From:"
            value={startDate}
          />
          <DatePicker
            onDateClick={handleDateClick}
            name="endDate"
            label="To:"
            value={endDate}
          />
        </div>

        <div className="statusPage__barChart">
          <h2 className="statusPage__headerTitles">Tasks Statistics</h2>
          {StatisticsChart.length != 0 && (
            <StatisticsChart
              data={statisticsChart}
              onDataSelected={handleStaticsClick}
            />
          )}
        </div>

        <div className="statusPage__divAllcharts">
          <h2 className="statusPage__headerTitles">Task History</h2>
          <div className="statusPage__charts">
            <div className="statusPage__barChart2">
              <h3 style={{ margin: "4px" }}>Period: </h3>
              <Select
                options={timeLabelOptions}
                onChange={(filter) => setTimeLabel(filter)}
                className="filterSelect"
                placeholder="Daily"
              />
              {stackedChart.length === 0 && (
                <div className="statupPage__circularProgress">
                  <CircularProgress disableShrink />
                </div>
              )}
              {stackedChart.length != 0 && (
                <StackedChart
                  data={stackedChart}
                  onDataSelected={handleSegmentClick}
                />
              )}
            </div>

            <div className="statusPage__pieCharts">
              <div className="statusPage__pieChart">
                <h3>Type:</h3>
                <Select
                  options={modificationTypeOptions}
                  onChange={(filter, name) =>
                    handlePieChartsFilters(filter, "pieChartModificationType")
                  }
                  className="filterSelect filterSelect-pie"
                  placeholder="All"
                />
                <PieChart dataPieChart={typePieChart} name="pie1" />
              </div>
            </div>
            <div className="statusPage__pieCharts">
              <div className="statusPage__pieChart">
                <h3>Field:</h3>
                <Select
                  options={modificationNamePieOptions}
                  onChange={(filter, name) =>
                    handlePieChartsFilters(filter, "pieChartModificationField")
                  }
                  className="filterSelect filterSelect-pie"
                  placeholder="All"
                />
                <PieChart dataPieChart={fieldPieChart} name="pie2" />
              </div>
            </div>
          </div>
        </div>

        <div className="statusPage__table">
          <Table
            modificationFieldValueOptions={modificationFieldValueOptions}
            modificationFieldOptions={modificationFieldOptions}
            modificationTypeOptions={modificationTypeOptions}
            statusOptions={statusOptions}
            openTasks={openTasks}
            onDoneClick={handleDoneClick}
            onSelect={handleSelect}
            tableFilters={tableFilters}
            onUpdateClick={handleUpdateClick}
          />
        </div>
      </div>
    </div>
  );
};
export default StatusPage;
