import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

const SearchBar = React.memo(({ searchQuery, onSearchChange }) => {
  return (
    <TextField
      placeholder="Search by name"
      variant="outlined"
      value={searchQuery}
      onChange={onSearchChange}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ fontSize: '1.8rem', color: '#757575' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '30px',
          paddingRight: '10px',
        },
        '& .MuiOutlinedInput-input': {
          padding: '12px 10px 12px 0',
          fontSize: '1rem',
        },
        '& .MuiInputBase-input::placeholder': {
          fontSize: '1rem',
        },
        marginRight: 2,
      }}
    />
  );
});

export default SearchBar;
