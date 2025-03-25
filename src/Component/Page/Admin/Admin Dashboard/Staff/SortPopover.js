// SortPopover.js
import { MenuItem, Popover } from "@mui/material";
import React from "react";

function SortPopover({ anchorEl, open, onClose, onSortChange, onRoleFilterChange }) {
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <MenuItem onClick={() => onSortChange("fullname")}>Full Name</MenuItem>
      <MenuItem onClick={() => onSortChange("email")}>Email</MenuItem>
      <MenuItem onClick={() => onRoleFilterChange("User")}>User</MenuItem>
      <MenuItem onClick={() => onRoleFilterChange("Employee")}>Employee</MenuItem>
      <MenuItem onClick={() => onRoleFilterChange("")}>Clear Role Filter</MenuItem>
    </Popover>
  );
}

export default SortPopover;
