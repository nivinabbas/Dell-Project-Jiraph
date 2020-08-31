import React from "react";
import "./StatusPage.css";
import { useState, useEffect } from "react";
import DashBoard from "../DashBoard/DashBoard";

import Table from "../Table/Table";
import StackedChart from "../Chart/StackedChart";
import PieChart from "../Chart/PieChart";
import DateFilter from "../DateFilter/DateFilter";

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
  /*********TABLEEEEEEE 
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    oldnewvalue: "oldValue",
    statusField: "Backlog",
  });

  const fetchData = () => {
    fetch("http://localhost:5000/Tickets")
      .then((res) => res.json())
      .then((res) => {
        console.log(normalizeData(res));

        setData(normalizeData(res));
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onFilterChange = (data) => {
    console.log({ ...filters, ...data });
    return setFilters((f) => {
      return { ...f, ...data };
    });
  };

  const fetchFilteredData = () => {
    console.log("fetch");
    fetch("http://localhost:5000/getUpdatedByStatus", {
      method: "POST",
      body: JSON.stringify({ ...filters }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log(normalizeFilteredData(res, filters));
        setData(normalizeFilteredData(res, filters));
      });
  };
*/

  // *********** pie chart 1 :
  const [FunctionalPieContent, setFunctionalPieContent] = useState([]);
  const [cardsContent, setCardsContent] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [BarChart, setBarChart] = useState([]);
  const [filterTypePie, setFilterTypePie] = useState("");
  const [filterFieldPie, setFilterFieldPie] = useState("");
  const [filters, setFilters] = useState([
    { name: "modificationType", value: "" },
    { name: "modificationField", value: "" },
    { name: "modificationValue", value: "" },
  ]);
  const [modificationType, setModificationType] = useState({});

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

  const handleDoneClick = async (jiraId) => {
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
  };
  const handlemodificationTypePieSelect = (filter, name) => {
    if (name === "pie1") setFilterTypePie(filter.value);
    if (name === "pie2") setFilterFieldPie(filter.value);
  };
  //date
  const handleDateClick = async (CurrentstartDate, CurrentEndtDate) => {
    if (filterTypePie !== "") {
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
    }

    if (filterFieldPie !== "") {
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
    }
    await fetch("/api/status/stackedChart", {
      method: "POST",
      body: JSON.stringify({
        label: null,
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
          console.log(info);
          //setBarChart(info);
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
          <StackedChart />
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

  // fetch("/api/Functionalpiechart", {
  // method: "POST",
  // body: JSON.stringify({}),
  // headers: {
  //     "Content-Type": "application/json",
  // },
  // })
  // .then((res) => res.json())
  // .then((data) => {
  //     let { success, error, info } = data;
  //     if (success) {
  //       setFunctionalPieContent(info);
  //     } else {
  //       alert(error);
  //     }
  // });
};
export default StatusPage;
