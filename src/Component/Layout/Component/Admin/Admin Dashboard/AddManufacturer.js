import {
  Box,
  Button,
  TextField
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "./assets/css/style.scss";
  
  function AdminAddManufacturer({ setActiveComponent , showAlert}) {
    const [manufacturerName, setManufacturer] = useState("");
  
    const handleManufacturerChange = (e) => {
      setManufacturer(e.target.value);
    };
  
    const handleAdd = async () => {
      const updatedOrder = {
        manufacturerName: manufacturerName,
      };
  
      try {
        const response = await axios.post(
          `http://localhost:8080/api/manufacturers`,
          updatedOrder
        );
        if (response.status === 200) {
          showAlert("Add new manufacturer successfully","success");
          setActiveComponent({ name: "AdminManufacturer" });
        }
      } catch (error) {
        console.error("Error add new manufacturer:", error);
        showAlert("Failed to add manufacturer.","error");
      }
    };
  
    return (
      <Box sx={{ padding: 4 }}>
        <h2 >Edit Product</h2>
        <form id="editForm">
        <TextField
          fullWidth
          margin="normal"
          label="Manufacturer Name"
          name="manufacturerName"
          value={manufacturerName}
          onChange={handleManufacturerChange}
        />
         
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAdd}
          >
            Add Manufacturer
          </Button>
        </form>
      </Box>
    );
  }
  
  export default AdminAddManufacturer;
  