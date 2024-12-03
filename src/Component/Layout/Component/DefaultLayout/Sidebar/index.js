import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { cartThunk } from "../../../../../services/redux/thunks/thunk";
import icon from "../../../../Assests/ICON";

function Sidebar({ show, onClose }) {
  const [toggle, setToggle] = useState(true);
  const [color, setColor] = useState(false);
  const dispatch = useDispatch();
  const sidebarColor = useRef(null);
  const userCurrentLogged = useSelector(
    (state) => state.user.userCurrentLogged
  );
  const cartItems = useSelector((state) => state.cart.listCartItems || []);

  useEffect(() => {
    if (sidebarColor.current) {
      sidebarColor.current.style.backgroundColor = color
        ? "#fff"
        : "var(--sidebar-color)";
    }
  }, [color]);

  const handleDecreaseQuantity = (item) => {
    if (!item) {
      console.error("Invalid item data:", item.user);
      return;
    } else if (!item.product) {
      console.error("Invalid item.product data:", item.product);
      return;
    }

    const newQuantity = item.quantity - 1;
    const totalPrice = newQuantity * item.product.unitPrice;
    if (newQuantity <= 0) {
      // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
      handleRemoveFromCart(item.id);
    } else {
      // Cập nhật số lượng sản phẩm
      const updatedCartData = {
        quantity: newQuantity,
        status: true,
        totalPrice: totalPrice, // ở đây là tính totalPrice
        user: {
          id: userCurrentLogged.id,
        },
        product: {
          id: item.product.id,
        },
      };

      dispatch(
        cartThunk.updateCartItem({ id: item.id, cartData: updatedCartData })
      )
        .then(() => {
          dispatch(cartThunk.getUserCart(userCurrentLogged.id));
        })
        .catch((error) => {
          console.error("Failed to update item quantity:", error);
        });
    }
  };

  const handleIncreaseQuantity = (item) => {
    if (!item) {
      console.error("Invalid item data:", item.user);
      return;
    } else if (!item.product) {
      console.error("Invalid item.product data:", item.product);
      return;
    }

    const newQuantity = item.quantity + 1;
    const totalPrice = newQuantity * item.product.unitPrice;

    const updatedCartData = {
      quantity: newQuantity,
      status: true,
      totalPrice: totalPrice, // ở đây là tính totalPrice
      user: {
        id: userCurrentLogged.id,
      },
      product: {
        id: item.product.id,
      },
    };

    dispatch(
      cartThunk.updateCartItem({ id: item.id, cartData: updatedCartData })
    );
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(cartThunk.removeFromCart(itemId))
      .unwrap()
      .then(() => {
        dispatch(cartThunk.getUserCart(userCurrentLogged.id));
      })
      .catch((error) => {
        console.error("Failed to remove item from cart:", error);
      });
  };

  return (
    <>
      {show && (
        <Box
          onClick={onClose}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        />
      )}

      <Box
        component="aside"
        ref={sidebarColor}
        sx={{
          width: "300px",
          backgroundColor: "var(--sidebar-color)",
          position: "fixed",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0 10px",
          paddingBottom: "40px",
          right: show ? 0 : "-100%",
          transition: "var(--tran-010)",
          borderLeft: "1px solid lightgrey",
          zIndex: 1000,
        }}
      >
        <List sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <ListItem>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <img
                src={icon.nvidia_notext}
                alt="logo"
                style={{
                  width: "60px",
                  borderRadius: "6px",
                  marginRight: "10px",
                }}
              />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Nvidia
                </Typography>
                <Typography sx={{ color: "white" }}>
                  The way it mean to play
                </Typography>
              </Box>
            </Box>
          </ListItem>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ListItem key={item.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <img
                    src={
                      item?.product?.product_image?.find((img) => img.mainImage)
                        ?.url || ""
                    }
                    alt={item?.product?.productName}
                    style={{
                      width: "60px",
                      borderRadius: "6px",
                      marginRight: "10px",
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ color: "white" }}>
                      {item?.product?.productName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      ${item?.product?.unitPrice?.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      ${item?.quantity * item?.product?.unitPrice}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button
                        onClick={() => handleDecreaseQuantity(item)}
                        sx={{
                          color: "white",
                          minWidth: "20px",
                          padding: 0,
                          marginRight: "5px",
                        }}
                      >
                        -
                      </Button>
                      <Typography variant="body2" sx={{ color: "white" }}>
                        Quantity: {item.quantity}
                      </Typography>
                      <Button
                        onClick={() => handleIncreaseQuantity(item)}
                        sx={{ color: "white", marginLeft: "5px" }}
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => handleRemoveFromCart(item.id)}
                        sx={{ color: "white", marginLeft: "10px" }}
                      >
                        X
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            ))
          ) : (
            <Typography sx={{ color: "white" }}>No items in cart</Typography>
          )}
        </List>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <ListItem component={RouterLink} to="/websiteDoAn/CartPage">
            <ListItemIcon>
              <BiLogOut size={45} style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Cart Page" sx={{ color: "white" }} />
          </ListItem>
        </List>
      </Box>
    </>
  );
}

export default Sidebar;
