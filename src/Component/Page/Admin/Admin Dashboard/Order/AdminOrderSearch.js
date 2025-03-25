import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, MenuItem, Popover, TextField } from "@mui/material";
import React from "react";

function AdminOrderSearch({ searchQuery, setSearchQuery, anchorEl, setAnchorEl, sortOption, setSortOption }) {
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        placeholder="Search by customer name"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: "1.8rem", color: "#757575" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            paddingRight: "10px",
          },
        }}
      />
      <Button variant="contained" onClick={handleClick} sx={{ marginLeft: 2 }}>
        Sort By
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={() => setSortOption("productName")}>Product Name</MenuItem>
        <MenuItem onClick={() => setSortOption("deliveryAddress")}>Delivery Address</MenuItem>
        <MenuItem onClick={() => setSortOption("orderDate")}>Order Date</MenuItem>
      </Popover>
    </Box>
  );
}

export default AdminOrderSearch;
