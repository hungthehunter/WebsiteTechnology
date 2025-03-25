// SearchBar.js
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <TextField
      placeholder="Search by name"
      variant="outlined"
      value={value}
      onChange={onChange}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "30px",
          paddingRight: "10px",
        },
        "& .MuiOutlinedInput-input": {
          padding: "12px 10px",
        },
        "& .MuiInputBase-input::placeholder": {
          fontSize: "1rem",
        },
      }}
    />
  );
}

export default SearchBar;
