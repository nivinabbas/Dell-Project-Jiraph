import React from "react";
import { useState, useEffect } from "react";
import DashBoard from "../DashBoard/DashBoard";
import Table from "../Table/Table.jsx";
import StackedChart from "../Chart/StackedChart";
import PieChart from "../Chart/PieChart";
import DatePicker from "../DatePicker/DatePicker";
import Select from "react-select";
import "./StatusPage.css";

const timeLabelOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];
const StatusPage = (props) => {
  const [cardsContent, setCardsContent] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [filterTypePie, setFilterTypePie] = useState("all");
  const [filterFieldPie, setFilterFieldPie] = useState("all");
  const [barChart, setBarChart] = useState({});
  const [stackedChart, setStackedChart] = useState({});
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
  const [chartFilters, setChartFilters] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeLabel, setTimeLabel] = useState("");
  const [tableFilters, setTableFilters] = useState([
    { name: "modificationType", value: "" },
    { name: "modificationField", value: "" },
    { name: "modificationValue", value: "" },
  ]);

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
  }, []);

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
  //firstchart
  useEffect(() => {
    fetch("/api/status/stackedChart")
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          setStackedChart(info);
        } else {
          alert(error);
        }
      });
  }, []);

  useEffect(() => {
    fetch("/api/status/TypePie")
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          setTypePieChart(info);
        } else {
          alert(error);
        }
      });
  }, []);
  useEffect(() => {
    fetch("/api/status/fieldPie")
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          setFieldPieChart(info);
        } else {
          alert(error);
        }
      });
  }, []);

  useEffect(() => {
    // const newFilters =
    //   filters[0].value === "Update" ? [...filters] : [{ ...filters[0] }];
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

  // setFieldPieChart(pieTypeDummyData);
  const handleDoneClick = async (jiraId) => {
    try {
      const userId = null;
      const result = openTasks.filter(
        (openTask) => openTask.jiraItem.jiraId !== jiraId
      );
      setOpenTasks(result);

      await fetch("/api/status/updateTasks", {
        method: "POST",
        body: JSON.stringify({ jiraId, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {}
  };
  const handlemodificationTypePieSelect = (filter, name) => {
    if (name === "pie1") setFilterTypePie(filter.value);
    if (name === "pie2") setFilterFieldPie(filter.value);
  };
  //date
  const handleDateClick = (date) => {
    const { name, value } = date;
    name === "startDate" ? setStartDate(value) : setEndDate(value);
    //typechart ---> RAWAD
    // await fetch("/api/status/typePieChartFilter", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     filterTypePie,
    //     CurrentstartDate,
    //     CurrentEndtDate,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     let { success, error, info } = data;
    //     if (success) {
    //       setBarChart(info);
    //     } else {
    //       alert(error);
    //     }
    //   });
    // // fieldpiechart
    // await fetch("/api/status/fieldPieChart", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     filterFieldPie,
    //     CurrentstartDate,
    //     CurrentEndtDate,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     let { success, error, info } = data;
    //     if (success) {
    //       setBarChart(info);
    //     } else {
    //       alert(error);
    //     }
    //   });
    // //first barchart
    // await fetch("/api/status/filterStackedChart", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     label: "daily",
    //     datefrom: CurrentstartDate,
    //     dateTo: CurrentEndtDate,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     let { success, error, info } = data;
    //     if (success) {
    //       // setStackedChart(info);
    //     } else {
    //       alert(error);
    //     }
    //   });
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

  // const handelTableFilterClick = () => {
  //   const newFilters =
  //     filters[0].value === "Update" ? [...filters] : [{ ...filters[0] }];

  //   //fetch
  // };

  return (
    <div className="statusPageContainer">
      <div className="statusPage__dashboard">
        <DashBoard cardsContent={cardsContent} />
      </div>
      <div className="statusPage__charts">
        <div className="statusPage__barChart">
          <div className="statusPage__barChart__filters">
            <Select
              options={timeLabelOptions}
              onChange={(filter) => setTimeLabel(filter)}
              className="filterSelect"
            />
            <DatePicker
              onDateClick={handleDateClick}
              name="startDate"
              label="From:"
              placeholder="Select End Date"
            />
            <DatePicker
              onDateClick={handleDateClick}
              name="endDate"
              label="To:"
              placeholder="Select End Date"
            />
          </div>
          <StackedChart stackedChart={stackedChart} />
        </div>

        <div className="statusPage__pieCharts">
          <div className="statusPage__pieChart">
            <Select
              options={modificationTypeOptions}
              onChange={(filter) => setChartFilters(filter)}
              className="filterSelect filterSelect-pie"
            />
            <PieChart dataPieChart={typePieChart} name="pie1" />
          </div>
          <div className="statusPage__pieChart">
            <Select
              options={modificationNamePieOptions}
              onChange={(filter) => setChartFilters(filter)}
              className="filterSelect filterSelect-pie"
            />
            <PieChart dataPieChart={fieldPieChart} name="pie2" />
          </div>
        </div>
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
  );
};
export default StatusPage;
