import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { Avatar, Box, IconButton, InputAdornment, TextField } from "@mui/material";
import icon from "../../Assests/ICON";
import "./css/style.scss";

const AccountHeader = ({ toggleMenu, MenuActive }) => {
  return (
    <Box
      className="topbar"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2
      }}
    >
      {/* Toggle Button */}
      <IconButton 
        onClick={toggleMenu}
        size="large"
        sx={{ color: 'text.secondary' }}
      >
        <MenuIcon sx={{ fontSize: "2rem" }} /> {/* Tăng kích thước biểu tượng Menu */}
      </IconButton>

      {/* Search Field */}
      <Box className="search" sx={{ flexGrow: 1 }}>
        <TextField
          placeholder="Search here"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: "1.8rem", color: "#757575" }} /> {/* Tăng kích thước biểu tượng Search */}
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              paddingRight: "10px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "12px 10px 12px 0", // Tăng padding cho vùng nhập liệu
              fontSize: "1rem", // Tăng kích thước chữ trong vùng nhập liệu
            },
            "& .MuiInputBase-input::placeholder": {
              fontSize: "1rem", // Tăng kích thước chữ cho placeholder
            },
          }}
        />
      </Box>

      {/* User Avatar */}
      <Avatar
        alt="User Icon"
        src={icon.nvidia_notext}
        sx={{
          width: 48, // Tăng kích thước avatar
          height: 48,
          cursor: 'pointer',
          ml: 'auto'
        }}
      />
    </Box>
  );
};

export default AccountHeader;
