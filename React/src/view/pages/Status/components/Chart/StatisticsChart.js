import { Button, ClickAwayListener, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./StackedChart.css";

const options = {
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
    toolbar: {
      show: false,
    },
    // yaxis: {
    //   axisBorder: {
    //     show: true,
    //   },
    //   title: {
    //     text: "Days to task completion ",
    //     align: "center",
    //     margin: 10,
    //     offsetX: 0,
    //     offsetY: 0,
    //   },
    // },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },

  title: {
    text: "Days to task completion ",
    align: "center",
    margin: 10,
    offsetX: -10,
    offsetY: 425,
  },

  yaxis: {
    show: true,

    title: {
      text: "Number of tasks completed",
      style: {
        fontSize: "14px",
      },
    },
  },
  // xaxis: {
  //   show: true,
  //   title: { text: "Days to task completion " },
  // },

  fill: {
    opacity: 1,
    colors: ["#388E3C"],
  },
  colors: ["#388E3C"],
  // yaxis: {
  //   labels: {
  //     show: true,
  //     text: "N",
  //     align: "left",
  //   },
  // },
};
export default function StatisticsChart({ data = [], onDataSelected }) {
  const series = [
    {
      name: "Number of tasks",
      data: data.map((d) => d.Done),
      tasks: data.map((d) => d.tasks),
    },
  ];

  const categories = data.map((d) => d.date);

  const xaxis = {
    categories: categories,
  };

  options.chart.events = {
    dataPointSelection: function (
      event,
      chartContext,
      { dataPointIndex, seriesIndex }
    ) {
      console.log(seriesIndex);
      let tasks = series[seriesIndex].tasks[dataPointIndex];
      let date = categories[dataPointIndex];

      return onDataSelected(date, tasks);
    },
  };

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <div id="daily_chart" style={{ width: "100%" }}>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            style={{ fontSize: 8 }}
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="how long does it take to complete a task in the selected period 0=same day,1=one day,2=two daysclick on the segment to see the task in the tableclick on the segment to see the task/s in the table"
          >
            <Button onClick={handleTooltipOpen}>Details</Button>
          </Tooltip>
        </div>
      </ClickAwayListener>
      <Chart
        options={{ ...options, xaxis }}
        height="450"
        series={series}
        type="bar"
      />
    </div>
  );
}
