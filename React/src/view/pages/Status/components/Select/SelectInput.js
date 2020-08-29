import React from "react";
import Select from "react-select";
import "./style.css";

const SelectInput = ({ options, isMulti, onSelect, dataKey }) => {
  //let data = {};

  return (
    <Select
      isMulti={isMulti}
      options={options}
      // onChange={(e) => {
      //   if (!e) return;
      //   if (isMulti) data[dataKey] = e.map((option) => option.value);
      //   else data[dataKey] = e.value;

      //   onSelect(data);
      // }}
      className="filterSelect"
    />
  );
};

export default SelectInput;
