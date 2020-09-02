import React, { useState } from "react";
import "./DateFilter.css";

export default function DateFilter({ onDateFilterClick }) {
  return (
    <div className="Date-Filter">
      <input type="date" name="startDate" onChange={null} />
      <input type="date" name="endDate" onChange={null} />
    </div>
  );
}
