import React, { useState } from "react";
import { Button, ClickAwayListener, Tooltip } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const Tooltips = () => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
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
        <Button>
          <HelpOutlineIcon onClick={handleTooltipOpen} />
        </Button>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default Tooltips;
