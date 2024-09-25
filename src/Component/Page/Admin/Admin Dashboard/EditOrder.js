import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { updateOrderById } from "../../../Serivce/ApiService";

function AdminEditOrder({ id, setActiveComponent, showAlert }) {
  const [orderStatus, setOrderStatus] = useState("");

  const handleOrderStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleUpdate = async () => {
    if (!id || isNaN(id)) {
      showAlert("Invalid order ID. Please try again.", "error");
      return;
    }

    const updatedOrder = {
      order_status: orderStatus,
    };

    try {
      const response = await updateOrderById(id,updatedOrder);

      if (response.status === 200) {
        showAlert("Order updated successfully.", "success");
        setTimeout(() => setActiveComponent({ name: "AdminOrder" }), 1000);
      } else {
        showAlert("Failed to update the order. Please try again.", "error");
      }
    } catch (error) {
      showAlert("Failed to update the order. Please try again.", "error");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <h2>Edit Order</h2>
      <form id="editForm">
        <FormControl fullWidth margin="normal">
          <InputLabel>Order Status</InputLabel>
          <Select value={orderStatus} onChange={handleOrderStatusChange}>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="Return">Return</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
          </Select>
        </FormControl>

        <Button fullWidth variant="contained" color="primary" onClick={handleUpdate}>
          Update Order
        </Button>
      </form>
    </Box>
  );
}

export default AdminEditOrder;
