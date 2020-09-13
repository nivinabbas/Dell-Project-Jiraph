import React from "react";
import { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import AddTask from "../../img/add.png";
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
} from "../../../../../service/statusService";
import "./StatusPage.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";

const timeLabelOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];
const StatusPage = () => {
  let history = useHistory();
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeLabel, setTimeLabel] = useState("");
  const [pieChartsFilters, setPieChartsFilters] = useState(
    initialPieChartsFilters
  );
  const [tableFilters, setTableFilters] = useState(initialTableFilters);
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
        console.log("info ",info)
        if (success) {
          setStatisticsChart(info);
        } else {
          alert(error);
        }
      });
  }, [startDate, endDate]);

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
        console.log("128 :", info)
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

  const handleDoneClick = async (jiraId, isDone) => {
    console.log(isDone);
    confirmAlert({
      title: "Confirm to done",
      message: "Are you sure to go this task to done?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            try {
              const userId = null;
              const result = openTasks.filter(
                (openTask) => openTask._id !== jiraId
              );
              setOpenTasks(result);
              fetch("/api/status/updateTasks", {
                method: "POST",
                body: JSON.stringify({ jiraId, userId, isDone }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
            } catch (error) { }
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };
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
    name === "startDate" ? setStartDate(value) : setEndDate(value);
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
          setOpenTasks(info.doc);
        } else {
          alert(error);
        }
      });
  };
  const handleSegmentClick = (date, status) => {
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
  };

  const handleAddTaskClick = () => {
    history.push("/NewTask");
  };

  return (
    <div>
      <div className="status__header">Status</div>
      <div className="statusPageContainer">
        <div className="statusPage__dashboard">
          <h3>Daily Alerts</h3>
          <DailyAlerts cardsContent={cardsContent} />
        </div>
        <div className="statusPage__AddNewTask">
          <h3>New Task</h3>
          <img
            src={AddTask}
            alt="AddTask"
            onClick={handleAddTaskClick}
            id="NewTaskLogo"
          />
        </div>
        <h3>Task History</h3>
        <div className="statusPage__charts">
          <div className="statusPage__barChart">
            <div className="statusPage__barChart__filters">
              <DatePicker
                onDateClick={handleDateClick}
                name="startDate"
                label="From:"
              />
              <DatePicker
                onDateClick={handleDateClick}
                name="endDate"
                label="To:"
              />
              <Select
                options={timeLabelOptions}
                onChange={(filter) => setTimeLabel(filter)}
                className="filterSelect"
                placeholder="Time Label"
                isDisabled={!startDate || !endDate}
              />
            </div>
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
              <Select
                options={modificationTypeOptions}
                onChange={(filter, name) =>
                  handlePieChartsFilters(filter, "pieChartModificationType")
                }
                className="filterSelect filterSelect-pie"
                placeholder="Type"
              />
              <PieChart dataPieChart={typePieChart} name="pie1" />
            </div>
            <div className="statusPage__pieChart">
              <Select
                options={modificationNamePieOptions}
                onChange={(filter, name) =>
                  handlePieChartsFilters(filter, "pieChartModificationField")
                }
                className="filterSelect filterSelect-pie"
                placeholder="Field"
              />
              <PieChart dataPieChart={fieldPieChart} name="pie2" />
            </div>
          </div>
        </div>
        <div>
          <h3>Tasks statistics</h3>
          {StatisticsChart.length != 0 && 
          <StatisticsChart data={statisticsChart} onDataSelected={handleSegmentClick} />}
        </div>
        <div className="statusPage__table">
          <Table
            modificationFieldValueOptions={modificationFieldValueOptions}
            modificationFieldOptions={modificationFieldOptions}
            modificationTypeOptions={modificationTypeOptions}
            openTasks={openTasks}
            onDoneClick={handleDoneClick}
            onSelect={handleSelect}
            tableFilters={tableFilters}
          />
        </div>
      </div>
    </div>
  );
};
export default StatusPage;
