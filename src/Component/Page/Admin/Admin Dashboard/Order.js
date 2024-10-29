import {
  Box,
  Button,
  MenuItem,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPurchaseHistories,
  getUserLogged,
} from "../../../Serivce/ApiService";
import "./assets/css/style.scss";

function AdminOrder({ setActiveComponent, showAlert }) {
  const listOrder = useSelector((state) => state.order.listOrder);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userId, setUserId] = useState(null);
  const [purchaseHistories, setPurchaseHistories] = useState([]);
  const [sortOption, setSortOption] = useState("productName"); // Default sorting option
  console.log("list order:", listOrder);
  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found. User must be logged in.");
      return;
    }

    const fetchUserId = async (token) => {
      try {
        const response = await getUserLogged(token);
        setUserId(response.data.id);
        console.log("User ID:", response.data.id);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchData(userId);
    }
  }, [userId, sortOption]);

  const fetchData = async (userId) => {
    try {
      const ordersResult = await getPurchaseHistories(userId);
      console.log("API Response:", ordersResult.data);

      const groupedHistories = ordersResult.data.map((purchaseHistory) => {
        const productGroups = {};

        purchaseHistory.carts.forEach((cart) => {
          cart.products.forEach((product) => {
            const key = `${product.id}-${purchaseHistory.orders.order_date}-${purchaseHistory.orders.deliveryAddress}`;
            if (!productGroups[key]) {
              productGroups[key] = {
                ...product,
                totalQuantity: 0,
                totalPrice: 0,
                orderDate: purchaseHistory.orders.order_date,
                deliveryAddress: purchaseHistory.orders.deliveryAddress,
                order_status: purchaseHistory.orders.order_status,
              };
            }

            productGroups[key].totalQuantity += 1; // Hoặc số lượng thực tế nếu có
            productGroups[key].totalPrice += product.unitPrice;
          });
        });

        const products = Object.values(productGroups).sort((a, b) => {
          if (sortOption === "productName") {
            return a.productName.localeCompare(b.productName);
          } else if (sortOption === "deliveryAddress") {
            return a.deliveryAddress.localeCompare(b.deliveryAddress);
          } else if (sortOption === "orderDate") {
            return new Date(a.orderDate) - new Date(b.orderDate);
          }
          return 0;
        });

        return {
          ...purchaseHistory,
          products,
        };
      });

      setPurchaseHistories(groupedHistories);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:8080/api/purchaseHistories/${id}`);
        fetchData();
        showAlert("Delete order successfully", "success");
      } catch (error) {
        showAlert("Delete order successfully", "error");
        console.error("Error deleting order:", error);
      }
    }
  };

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
          <Button
            variant="contained"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Id
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Email
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
              {listOrder.map((order) => (
                <TableRow key={order.id}>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {order?.id}
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {order?.user?.email}
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
                      onClick={() => handleDelete(order.id)}
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
    </Box>
  );
}

export default AdminOrder;
