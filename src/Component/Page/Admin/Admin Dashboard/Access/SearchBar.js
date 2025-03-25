import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";

function SearchBar({ searchValue, onSearchChange, placeholder }) {
  return (
    <TextField
      placeholder={placeholder}
      variant="outlined"
      value={searchValue}
      onChange={(e) => onSearchChange(e.target.value)}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
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
