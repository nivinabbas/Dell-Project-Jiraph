import React from "react";
import "./DatePicker.css";

export default function DatePicker({ onDateClick, name, label }) {
  return (
    <div className="datePicker">
      <label htmlFor={name} className="datePicker__label">
        {label}
      </label>
      <input
        type="date"
        name={name}
        onChange={(e) => onDateClick(e.currentTarget)}
        className="datePicker__input"
      />
    </div>
  );
}
