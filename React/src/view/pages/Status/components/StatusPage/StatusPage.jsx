import React from "react";
import { useState, useEffect } from "react";
import DashBoard from "../DashBoard/DashBoard";
import Table from "../Table/Table.jsx";
import StackedChart from "../Chart/StackedChart";
import PieChart from "../Chart/PieChart.js";
import DatePicker from "../DatePicker/DatePicker";
import Select from "react-select";
import {
  initialTableFilters,
  initialPieChartsFilters,
} from "../../../../../service/statusService";
import "./StatusPage.css";

const timeLabelOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];
const StatusPage = (props) => {
  const [cardsContent, setCardsContent] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
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
  const [startDate, setStartDate] = useState(""); // choose the default value, with marshood
  const [endDate, setEndDate] = useState("");
  const [timeLabel, setTimeLabel] = useState("");
  const [pieChartsFilters, setPieChartsFilters] = useState(
    initialPieChartsFilters
  );
  const [tableFilters, setTableFilters] = useState(initialTableFilters);

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

  //main bar chart convert to post method and pass in the body startDate, timeLabel
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
          console.log("info", info);
          setStackedChart(info);
        } else {
          alert(error);
        }
      });
  }, [startDate, endDate, timeLabel]);
  //left pie ==> convert to post method and pass in the body startDate, endDate,pieChartsFilters[0]
  // add conditions to the array startDate, endDate, pieChartsFilters[0]
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
          console.log("ss", info);
          setTypePieChart(info);
        } else {
          alert(error);
        }
      });
  }, [startDate, endDate, pieChartsFilters]);

  //right pie ==> convert to post method and pass in the body startDate, endDate,pieChartsFilters[1]
  // add conditions to the array startDate, endDate, pieChartsFilters[1]
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
  }, [startDate, endDate, pieChartsFilters]);

  // table select option ==> based on "update" select
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
    // console.log("label",tableFilters);
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
            />
            <DatePicker
              onDateClick={handleDateClick}
              name="endDate"
              label="To:"
            />
          </div>
          <StackedChart stackedChart={stackedChart} />
        </div>

        <div className="statusPage__pieCharts">
          <div className="statusPage__pieChart">
            <Select
              options={modificationTypeOptions}
              onChange={(filter, name) =>
                handlePieChartsFilters(filter, "pieChartModificationType")
              }
              className="filterSelect filterSelect-pie"
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
