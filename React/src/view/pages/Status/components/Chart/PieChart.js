import React from "react";
import Chart from "react-apexcharts";
import Select from "react-select";
import { isEmpty } from "../../../../../service/utils";


const PieChart = ({
  onmodificationTypePieSelect,
  name,
  selectOptions,
  dataPieChart,
}) => {

  let selectName = name;

  return (
    <div id="chart">
      <Select
        options={selectOptions}
        onChange={(filter, name) =>
          onmodificationTypePieSelect(filter, selectName)
        }
      />
      {!isEmpty(dataPieChart) && (
        <Chart
          options={dataPieChart.options}
          series={dataPieChart.series}
          type="donut"
          style={{ marginLeft: -30 }}
          width="380"
        />
      )}
    </div>
  );
};

export default PieChart;
