import React, { useState } from "react";

import { DateRange } from "react-date-range";
import { formatDate, prepareDateForRequest } from "../../helpers/utils";
const DatePicker = ({ onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  return (
    <div className="dateRangeContainer">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dateRangeTrigger"
      >{`${formatDate(state[0].startDate)} - ${formatDate(
        state[0].endDate
      )}`}</button>
      {isOpen && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => {
            setState([item.selection]);
            const { startDate, endDate } = item.selection;
            onDateChange({
              startdateToSend: new Date(
                ...prepareDateForRequest(startDate)
              ).getTime(),
              enddateToSend: new Date(
                ...prepareDateForRequest(endDate)
              ).getTime(),
            });
          }}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      )}
    </div>
  );
};

export default DatePicker;
