import { IonIcon } from "@ionic/react";
import { Alert, Snackbar } from "@mui/material";
import { menuOutline, searchOutline } from "ionicons/icons";
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
    <div className="topbar">
      <div className="toggle" onClick={toggleMenu}>
        <IonIcon icon={menuOutline} style={{ fontSize: "3.5rem" }} />
      </div>
      <div className="search">
        <label>
          <input type="text" placeholder="Search here" />
          <IonIcon
            icon={searchOutline}
            style={{
              position: "absolute",
              top: 9,
              bottom: 0,
              left: 10,
              fontSize: "2rem",
            }}
          />
        </label>
      </div>
      <div className="user">
        {/* User-related logic */}
      </div>

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
    </div>
  );
};

export default AdminHeader;
