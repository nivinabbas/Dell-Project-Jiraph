import React from "react";
import "./StatusPage.css";
import { useState, useEffect } from "react";
import DashBoard from "../DashBoard/DashBoard";

import Table from "../Table/Table";
import StackedChart from "../Chart/StackedChart";
import PieChart from "../Chart/PieChart";
import DateFilter from "../DateFilter/DateFilter";

const dummyData = {
  series: [
    {
      name: "Done",
      data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43],
    },
    {
      name: "Not Done",
      data: [13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43],
    },
  ],
  options: {
    // chart: {
    //   type: "bar",
    //   height: 350,
    //   stacked: true,
    // },
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       legend: {
    //         position: "bottom",
    //         offsetX: -10,
    //         offsetY: 0,
    //       },
    //     },
    //   },
    // ],
    // plotOptions: {
    //   bar: {
    //     horizontal: false,
    //   },
    // },
    xaxis: {
      type: "datetime",
      categories: [
        "01/01/2011 GMT",
        "01/02/2011 GMT",
        "01/03/2011 GMT",
        "01/04/2011 GMT",
        "01/05/2011 GMT",
        "01/06/2011 GMT",
        "01/07/2011 GMT",
        "01/08/2011 GMT",
      ],
    },
    // legend: {
    //   position: "bottom",
    //   offsetY: 40,
    // },
    // fill: {
    //   opacity: 1,
    // },
  },
};

const optionSprint = [
  { value: "all", label: "All" },
  { value: "create", label: "Create" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
];

const optionFunctional = [
  { value: "all", label: "All" },
  { value: "status", label: "Status" },
  { value: "priority", label: "Priority" },
  { value: "qaRepresentitive", label: "QA representitive" },
];

const StatusPage = (props) => {
  // *********** pie chart 1 :
  const [FunctionalPieContent, setFunctionalPieContent] = useState([]);
  const [cardsContent, setCardsContent] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [filterTypePie, setFilterTypePie] = useState("all");
  const [filterFieldPie, setFilterFieldPie] = useState("all");
  const [filters, setFilters] = useState([
    { name: "modificationType", value: "" },
    { name: "modificationField", value: "" },
    { name: "modificationValue", value: "" },
  ]);
  const [modificationType, setModificationType] = useState({});
  const [barChart, setBarChart] = useState({});
  const [stackedChart, setStackedChart] = useState(dummyData);

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
          console.log("first", info);
          setStackedChart(info);
        } else {
          alert(error);
        }
      });
  }, []);

  const handleDoneClick = async (jiraId) => {
    try {
      const userId = null;
      const result = openTasks.filter(
        (openTask) => openTask.jiraItem.jiraId !== jiraId
      );
      setOpenTasks(result);
      console.log(jiraId);
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
  const handleDateClick = async (CurrentstartDate, CurrentEndtDate) => {
    //typechart
    await fetch("/api/status/typePieChart", {
      method: "POST",
      body: JSON.stringify({
        filterTypePie,
        CurrentstartDate,
        CurrentEndtDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          setBarChart(info);
        } else {
          alert(error);
        }
      });
    // fieldpiechart
    await fetch("/api/status/fieldPieChart", {
      method: "POST",
      body: JSON.stringify({
        filterFieldPie,
        CurrentstartDate,
        CurrentEndtDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          setBarChart(info);
        } else {
          alert(error);
        }
      });
    //first barchart
    await fetch("/api/status/filterStackedChart", {
      method: "POST",
      body: JSON.stringify({
        label: "daily",
        datefrom: CurrentstartDate,
        dateTo: CurrentEndtDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let { success, error, info } = data;
        if (success) {
          // setStackedChart(info);
        } else {
          alert(error);
        }
      });
  };

  const handleSelect = (filter, name) => {
    const newFilters = [...filters].map((f) => {
      if (f.name === name) f.value = filter.value;
      return f;
    });
    setFilters(newFilters);
  };

  const handelTableFilterClick = () => {
    const newFilters =
      filters[0].value === "update" ? [...filters] : [{ ...filters[0] }];

    //fetch
  };

  return (
    <div className="statusPageContainer">
      <div className="statuspage__dashboard">
        <DashBoard cardsContent={cardsContent} />
      </div>

      <div className="statuspage__table">
        <Table
          openTasks={openTasks}
          onDoneClick={handleDoneClick}
          onSelect={handleSelect}
          onChange={setModificationType}
          onTableFilterClick={handelTableFilterClick}
          filters={filters}
        />
      </div>
      <div className="statuspage__filters">
        <DateFilter onDateFilterClick={handleDateClick} />
      </div>
      <div className="statusPageContainerTableColumn">
        <div className="statuspage__chart">
          <StackedChart stackedChart={stackedChart} />
        </div>

        <div className="statuspage__chartpie">
          <PieChart
            selectOptions={optionSprint}
            name="pie1"
            onmodificationTypePieSelect={handlemodificationTypePieSelect}
          />
          <PieChart
            selectOptions={optionFunctional}
            name="pie2"
            onmodificationTypePieSelect={handlemodificationTypePieSelect}
          />
        </div>
      </div>
    </div>
  );
};
export default StatusPage;
