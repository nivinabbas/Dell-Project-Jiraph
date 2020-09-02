import React from "react";
import "./StatusPage.css";
import { useState, useEffect } from "react";
import DashBoard from "../DashBoard/DashBoard";
import Table from "../Table/Table";
import StackedChart from "../Chart/StackedChart";
import PieChart from "../Chart/PieChart";
import DateFilter from "../DateFilter/DateFilter";

const StatusPage = (props) => {
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
  const [barChart, setBarChart] = useState({});
  const [stackedChart, setStackedChart] = useState({});
  const [typePieChart, setTypePieChart] = useState({});
  const [fieldPieChart, setFieldPieChart] = useState({});
  const [modificationTypeOptions, setModificationTypeOptions] = useState({});
  const [modificationFieldOptions, setModificationFieldOptions] = useState({});
  const [
    modificationFieldValueOptions,
    setModificationFieldValueOptions,
  ] = useState({});

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
    console.log(filters[0].name);
    if (
      filters[0].name === "modificationType" &&
      filters[0].value === "Update"
    ) {
      console.log("check");
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
  }, [filters]);

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
  const handleDateClick = async (CurrentstartDate, CurrentEndtDate) => {
    //typechart
    await fetch("/api/status/typePieChartFilter", {
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
    console.log("eheheheheh");
    setFilters(newFilters);
    console.log(...filters);
    fetch("/api/status/modificationFieldValueOptions", {
      method: "POST",
      body: JSON.stringify({ ...filters }),
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
      body: JSON.stringify({ ...filters }),
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

    console.log(filters);
  };

  // const handelTableFilterClick = () => {
  //   const newFilters =
  //     filters[0].value === "Update" ? [...filters] : [{ ...filters[0] }];

  //   //fetch
  // };

  return (
    <div className="statusPageContainer">
      <div className="statuspage__dashboard">
        <DashBoard cardsContent={cardsContent} />
      </div>

      <div className="statuspage__table">
        <Table
          modificationFieldValueOptions={modificationFieldValueOptions}
          modificationFieldOptions={modificationFieldOptions}
          modificationTypeOptions={modificationTypeOptions}
          openTasks={openTasks}
          onDoneClick={handleDoneClick}
          onSelect={handleSelect}
          //onTableFilterClick={handelTableFilterClick}
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
            dataPieChart={typePieChart}
            // selectOptions={}
            name="pie1"
            onmodificationTypePieSelect={handlemodificationTypePieSelect}
          />
          <PieChart
            dataPieChart={fieldPieChart}
            // selectOptions={optionFunctional}
            name="pie2"
            onmodificationTypePieSelect={handlemodificationTypePieSelect}
          />
        </div>
      </div>
    </div>
  );
};
export default StatusPage;
