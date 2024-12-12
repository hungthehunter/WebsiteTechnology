import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminOrder({ setActiveComponent, showAlert }) {
  const listOrder = useSelector((state) => state.order.listOrder);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [sortOption, setSortOption] = useState("productName"); // Default sorting option
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  const formatOrderStatus = (status) => {
    return (status ?? "").replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    handleClose(); // Close the menu after selection
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDelete = async () => {
      try {
        await dispatch(orderThunk.deleteOrder(selectedId));
        await dispatch(orderThunk.getAllOrders());
        showAlert("Delete order successfully", "success");
      } catch (error) {
        showAlert("Delete order successfully", "error");
        console.error("Error deleting order:", error);
      }
      setOpenDialog(false);
      setSelectedId(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  // Filter orders based on user fullname and sort option
  const filteredOrders = listOrder.filter((order) => {
    const matchesSearch = order.user?.fullname.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          overflowY: "auto",
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          backgroundColor: "white",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontSize: "2.5rem" }}>
            Recent Orders
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Search Field */}
            <TextField
              placeholder="Search by customer name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
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
                "& .MuiOutlinedInput-input": {
                  padding: "12px 10px 12px 0",
                  fontSize: "1rem",
                },
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "1rem",
                },
              }}
            />
            <Button
              variant="contained"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ marginLeft: 2 }}
            >
              Sort By
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={() => handleSortChange("productName")}>
                Product Name
              </MenuItem>
              <MenuItem onClick={() => handleSortChange("deliveryAddress")}>
                Delivery Address
              </MenuItem>
              <MenuItem onClick={() => handleSortChange("orderDate")}>
                Order Date
              </MenuItem>
            </Popover>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Id
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Name
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Total Price
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Date
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Address
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Status
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {order?.id}
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {order?.user?.fullname}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    ${order?.total_price?.toFixed(2)}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    {order?.order_date}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    {`${order?.address?.houseNumber || ""} / ${
                      order?.address?.street || ""
                    } / ${order?.address?.ward || ""} / ${
                      order?.address?.district || ""
                    } / ${order?.address?.city || ""} / ${
                      order?.address?.country || ""
                    }`}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    <span
                      className={`status ${order.order_status.toLowerCase()}`}
                    >
                      {formatOrderStatus(order.order_status)}
                    </span>
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminViewOrder",
                          props: { id: order.id },
                        })
                      }
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditOrder",
                          props: { id: order.id },
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpenDialog(order.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

        {/* Dialog for confirming delete */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminOrder;
