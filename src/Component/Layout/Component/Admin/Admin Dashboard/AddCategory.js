import {
  Box,
  Button,
  TextField
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "./assets/css/style.scss";
  
  function AdminAddCategory({ setActiveComponent , showAlert }) {
    const [categoryName, setCategoryName] = useState("");
  
    const handleManufacturerChange = (e) => {
      setCategoryName(e.target.value);
    };
  
    const handleAdd = async () => {
      const updatedOrder = {
        categoryName: categoryName,
      };
  
      try {
        const response = await axios.post(
          `http://localhost:8080/api/categories`,
          updatedOrder
        );
        if (response.status === 200) {
         showAlert("Add category successfully.","success");
          setActiveComponent({ name: "AdminCategory" });
        }
      } catch (error) {
        console.error("Error add new manufacturer:", error);
        showAlert("Failed to add category.","error");
      }
    };
  
    return (
      <Box sx={{ padding: 4 }}>
        <h2 >Information of New Category</h2>
        <form id="editForm">
        <TextField
          fullWidth
          margin="normal"
          label="Category Name"
          name="categoryName"
          value={categoryName}
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
  
  export default AdminAddCategory;
  