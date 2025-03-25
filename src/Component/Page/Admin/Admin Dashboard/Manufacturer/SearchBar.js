import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
function SearchBar({ value, onChange }) {
    return (
      <TextField
        placeholder="Search by manufacturer name"
        variant="outlined"
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: "1.8rem", color: "#757575" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          width: "300px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            paddingRight: "10px",
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 10px 12px 0",
            fontSize: "1rem",
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "1rem",
          },
        }}
      />
    );
  }
  export default SearchBar;