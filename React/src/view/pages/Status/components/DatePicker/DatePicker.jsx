import React from "react";
import "./DatePicker.css";
import { isEmpty } from "../../../../../service/utils";

export default function DatePicker({ onDateClick, name, label, value }) {
  return (
    <div className="datePicker">
      <label htmlFor={name} className="datePicker__label">
        {label}
      </label>
      {!isEmpty(value) && (
        <input
          type="date"
          name={name}
          onChange={(e) => onDateClick(e.currentTarget)}
          className="datePicker__input"
          value={value}
        />
      )}
    </div>
  );
}
