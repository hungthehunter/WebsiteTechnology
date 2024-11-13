import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedOrderId } from "../../../../services/redux/slices/orderSlice";
import { orderThunk } from "../../../../services/redux/thunks/thunk";
function AdminEditOrder({ id, setActiveComponent, showAlert }) {
  const isLoading = useSelector((state) => state.order.isLoading);
  const dispatch = useDispatch();
  const [order, setOrder] = useState({
    order_date: "",
    total_price: "",
    note: "",
    order_status: "",
    address: { id: "" },
    user: { id: "" },
    payment: { id: "" },
  });

  useEffect(() => {
    const fetchOrder = async () => {
    await dispatch(orderThunk.getOrderById(id));
    };

    fetchOrder();
  }, [dispatch, id]);

  const selectedOrder = useSelector((state) => state.order.selectedOrder);
  const listAddress = useSelector((state) => state.address.listAddress);

  // Cập nhật trạng thái order khi selectedOrder thay đổi
  useEffect(() => {
    if (selectedOrder) {
      setOrder({
        order_date: selectedOrder.order_date || "",
        total_price: selectedOrder.total_price || "",
        note: selectedOrder.note || "",
        order_status: selectedOrder.order_status || "Pending",
        address: { id: selectedOrder.address.id || "" },
        user: { id: selectedOrder.user.id || "" },
        payment: { id: selectedOrder.payment.id || "" },
      });
    }
  }, [selectedOrder]);

  const handleUpdate = async (id) => {
      // Chuẩn bị dữ liệu cập nhật
      const updatedOrder = {
        order_date: order.order_date,
        total_price: order.total_price,
        note: order.note,
        order_status: order.order_status,
        address: { id: order.address.id },
      };

      // Tạo FormData để gửi đến server
      const formData = new FormData();
      formData.append(
        "order",
        new Blob([JSON.stringify(updatedOrder)], { type: "application/json" })
      );
      try {
        await dispatch(orderThunk.updateOrder({id:id,orderData:formData})); 
        toast.success("Update order successfully!");
        await dispatch(clearSelectedOrderId());
        setActiveComponent({name: "AdminOrder"});
    } catch (error) {
        console.error("Error update order:", error);
        toast.error("Failed to update order. Please try again.");
    }

  };

  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'black',
        zIndex: 9999
      }}>
        <CircularProgress size={60} thickness={4}  sx={{ color: '#4CAF50' }}  />
        <Typography variant="h6" sx={{ mt: 2, color: '#4CAF50' }}>
          PLEASE WAIT...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Edit Order
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Order Date"
                type="datetime-local"
                value={order.order_date}
                onChange={(e) =>
                  setOrder({ ...order, order_date: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Total Price"
                type="number"
                value={order.total_price}
                onChange={(e) =>
                  setOrder({ ...order, total_price: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Note"
                value={order.note}
                onChange={(e) => setOrder({ ...order, note: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="order-status-select-label">Order Status</InputLabel>
                <Select
                  labelId="order-status-select-label"
                  value={order.order_status}
                  onChange={(e) =>
                    setOrder({ ...order, order_status: e.target.value })
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Return">Return</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="address-select-label">Address</InputLabel>
                <Select
                  value={order.address.id}
                  onChange={(e) =>
                    setOrder({ ...order, address: { id: e.target.value } })
                  }
                  fullWidth
                  inputProps={{ style: { fontSize: "16px" } }}
                >
                  {listAddress.length > 0 ? (
                    listAddress.map((address) => (
                      <MenuItem key={address.id} value={address.id}>
                        {`${address.houseNumber || ""} - ${
                          address.street || ""
                        } - ${address.ward || ""} - ${
                          address.district || ""
                        } - ${address.city || ""} - ${address.country || ""}`}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No addresses available</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={()=>handleUpdate(id)}
                sx={{ marginTop: 2 }}
              >
                Update Order
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setActiveComponent({ name: "AdminOrder" })}
                sx={{ marginTop: 2, marginLeft: 2 }}
              >
                Return to Order
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminEditOrder;
