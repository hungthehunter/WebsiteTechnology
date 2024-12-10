import { IonIcon } from "@ionic/react";
import { Alert, Box, Snackbar } from "@mui/material";
import { menuOutline } from "ionicons/icons";
import React from "react";
import "./assets/css/style.scss";

const AdminHeader = ({
  toggleMenu,
  menuActive,
  openSnackbar,
  alertMessage,
  alertType,
  handleCloseSnackbar,
}) => {
  return (
    <Box className="topbar" sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
      <Box className="toggle" onClick={toggleMenu} sx={{ cursor: 'pointer', fontSize: '3rem' }}>
        <IonIcon icon={menuOutline} size={30}/>
      </Box>
      {/* <Box className="search" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', marginLeft: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search here..."
          fullWidth
          InputProps={{
            startAdornment: (
              <IonIcon
                icon={searchOutline}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 10,
                  transform: "translateY(-50%)", // Căn giữa theo chiều dọc
                  fontSize: "1.5rem",
                }}
              />
            ),
          }}
          sx={{
            borderRadius: '20px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
            width: '800px', // Đặt chiều rộng cho thanh tìm kiếm
            height: '40px', // Đặt chiều cao cho thanh tìm kiếm
            '& input': {
              textAlign: 'center', // Căn giữa chữ "Search"
            },
          }}
        />
      </Box> */}
      <Box className="user">
        {/* User-related logic */}
      </Box>

      {/* Snackbar for Alerts */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertType} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminHeader;
