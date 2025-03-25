import { MenuItem, Popover } from "@mui/material";
import React from "react";

function SortPopover({ anchorEl, open, onClose, onSortChange }) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <MenuItem onClick={() => onSortChange("fullname")}>Full Name</MenuItem>
      <MenuItem onClick={() => onSortChange("email")}>Email</MenuItem>
      <MenuItem onClick={() => onSortChange("mobile")}>Mobile</MenuItem>
      <MenuItem onClick={() => onSortChange("")}>Clear Filter</MenuItem>
    </Popover>
  );
}

export default SortPopover;
