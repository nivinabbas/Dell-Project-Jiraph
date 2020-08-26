import React from "react";
import { PieChart } from "react-minimal-pie-chart";

import "./Pie";

const Pie = () => {
  const data = [
    { title: "One", value: 60, color: "#dc3545" },
    { title: "Two", value: 40, color: "#28a745" },
  ];

  const defaultLabelStyle = { fontSize: "10px", fill: "white" };
  return (
    <PieChart
      data={data}
      label={({ dataEntry }) => dataEntry.value}
      labelStyle={defaultLabelStyle}
      border-radius={75}
    />
  );
};

export default Pie;
