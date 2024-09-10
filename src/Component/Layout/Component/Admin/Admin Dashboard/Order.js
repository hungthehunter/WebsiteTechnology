import { Button, MenuItem, Popover } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './../Admin Dashboard/assets/js/main';
import './assets/css/style.scss';

function AdminOrder({ setActiveComponent ,showAlert }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userId, setUserId] = useState(null);
  const [purchaseHistories, setPurchaseHistories] = useState([]);
  const [sortOption, setSortOption] = useState('productName'); // Default sorting option

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  const formatOrderStatus = (status) => {
    return (status ?? '').replace(/([a-z])([A-Z])/g, '$1 $2');
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
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found. User must be logged in.");
      return;
    }

    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      fetchData();
    }
  }, [userId, sortOption]);

  const fetchData = async () => {
    try {
      const ordersResult = await axios.get(`http://localhost:8080/api/purchaseHistories/user/${userId}`);
      console.log('API Response:', ordersResult.data);

      const groupedHistories = ordersResult.data.map(purchaseHistory => {
        const productGroups = {};

        purchaseHistory.carts.forEach(cart => {
          cart.products.forEach(product => {
            const key = `${product.id}-${purchaseHistory.orders.order_date}-${purchaseHistory.orders.deliveryAddress}`;
            if (!productGroups[key]) {
              productGroups[key] = {
                ...product,
                totalQuantity: 0,
                totalPrice: 0,
                orderDate: purchaseHistory.orders.order_date,
                deliveryAddress: purchaseHistory.orders.deliveryAddress,
                order_status: purchaseHistory.orders.order_status
              };
            }

            productGroups[key].totalQuantity += 1; // Hoặc số lượng thực tế nếu có
            productGroups[key].totalPrice += product.unitPrice;
          });
        });

        const products = Object.values(productGroups).sort((a, b) => {
          if (sortOption === 'productName') {
            return a.productName.localeCompare(b.productName);
          } else if (sortOption === 'deliveryAddress') {
            return a.deliveryAddress.localeCompare(b.deliveryAddress);
          } else if (sortOption === 'orderDate') {
            return new Date(a.orderDate) - new Date(b.orderDate);
          }
          return 0;
        });

        return {
          ...purchaseHistory,
          products
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
        showAlert("Delete order successfully","success");
      } catch (error) {
        showAlert("Delete order successfully","error");
        console.error("Error deleting order:", error);
      }
    }
  };

  return (
    <div>
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <h2>Recent Orders</h2>
            <Button
              variant="contained"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={() => handleSortChange('productName')}>Product Name</MenuItem>
              <MenuItem onClick={() => handleSortChange('deliveryAddress')}>Delivery Address</MenuItem>
              <MenuItem onClick={() => handleSortChange('orderDate')}>Order Date</MenuItem>
            </Popover>
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "start" }}>Id</th>
                <th scope="col" style={{ textAlign: "start" }}>Name</th>
                <th scope="col" style={{ textAlign: "end" }}>Price</th>
                <th scope="col" style={{ textAlign: "end" }}>Date</th>
                <th scope="col" style={{ textAlign: "end" }}>Address</th>
                <th scope="col" style={{ textAlign: "end" }}>Payment</th>
                <th scope="col" style={{ textAlign: "end" }}>order_status</th>
                <th scope="col" style={{ textAlign: "end" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistories.map((purchaseHistory, purchaseIndex) =>
                purchaseHistory.products.map((product, productIndex) => (
                  <tr key={`${productIndex}`}>
                    <td style={{ textAlign: "start" }}>{purchaseHistory.orders.id}</td>
                    <td style={{ textAlign: "start" }}>{product.productName}</td>
                    <td style={{ textAlign: "end" }}>${product.totalPrice.toFixed(2)}</td>
                    <td style={{ textAlign: "end" }}>{product.orderDate}</td>
                    <td style={{ textAlign: "end" }}>{product.deliveryAddress}</td>
                    <td style={{ textAlign: "end" }}>
                      {purchaseHistory.orders.order_status === "Shipped" ? "Due" : "Pay"}
                    </td>
                    <td style={{ textAlign: "end" }}>
                      <span className={`status ${purchaseHistory.orders.order_status.toLowerCase()}`}>
                        {formatOrderStatus(purchaseHistory.orders.order_status)}
                      </span>
                    </td>
                    <td style={{ textAlign: "end" }}>
                      <button
                        className="status editing mx-2"
                        onClick={() =>
                          setActiveComponent({
                            name: "AdminEditOrder",
                            props: { id: purchaseHistory.orders.id},
                          })
                        }
                      >
                        Edit
                      </button>
                      {/* <button
                        className="status deleting mx-2"
                        onClick={() => handleDelete(purchaseHistory.id)}
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrder;
