import { ShoppingCart } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { cartThunk } from "../../../../../services/redux/thunks/thunk";
import icon from "../../../../Assests/ICON";
function Sidebar({ show, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  const calculateDiscountedPrice = (item) => {
    if (item?.product?.promotion && item?.product?.promotion?.active) {
      return (
        item?.product?.unitPrice -
        (item?.product?.unitPrice *
          (item?.product?.promotion?.discountPercentage || 0)) /
          100
      ).toFixed(2);
    }
    return item?.product?.unitPrice?.toFixed(2);
  };

  const handleDecreaseQuantity = (item) => {
    if (!item) {
      console.error("Invalid item data:", item.user);
      return;
    } else if (!item.product) {
      console.error("Invalid item.product data:", item.product);
      return;
    }

    const newQuantity = item.quantity - 1;
    const discountedPrice = item?.discountedPrice;
    const totalPrice = newQuantity * item?.discountedPrice;
    if (newQuantity <= 0) {
      // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
      handleRemoveFromCart(item.id);
    } else {
      // Cập nhật số lượng sản phẩm
      const updatedCartData = {
        quantity: newQuantity,
        status: true,
        discountedPrice: discountedPrice,
        totalPrice: totalPrice,
        user: {
          id: userCurrentLogged.id,
        },
        product: {
          id: item.product.id,
          promotion: item.product.promotion,
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
    const discountedPrice = item?.discountedPrice;
    const totalPrice = newQuantity * discountedPrice;

    const updatedCartData = {
      quantity: newQuantity,
      status: true,
      discountedPrice: discountedPrice,
      totalPrice: totalPrice,
      user: {
        id: userCurrentLogged.id,
      },
      product: {
        id: item.product.id,
        promotion: item.product.promotion,
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
          width: "350px",
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
                      width: "70px",
                      height: "50px",
                      borderRadius: "6px",
                      marginRight: "10px",
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    {/* Product Name */}
                    <Typography
                      variant="body1"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {item?.product?.productName}
                    </Typography>

                    {/* Original Price */}
                    <Typography variant="body2" sx={{ color: "grey" }}>
                      <strong>Price:</strong> $
                      {item?.product?.unitPrice?.toFixed(2)}
                    </Typography>

                    {/* Discounted Price */}
                    <Typography variant="body2" sx={{ color: "red" }}>
                      <strong>Price After Discount:</strong> $
                      {item?.discountedPrice}
                    </Typography>

                    {/* Total Price */}
                    <Typography variant="body2" sx={{ color: "yellow" }}>
                      <strong>Total Price:</strong> $
                      {(
                        item?.quantity * calculateDiscountedPrice(item)
                      ).toFixed(2)}
                    </Typography>

                    {/* Quantity Controls */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      {/* Decrease Quantity */}
                      <Button
                        onClick={() => handleDecreaseQuantity(item)}
                        sx={{
                          color: "white",
                          minHeight: "30px",
                          minWidth: "35px",
                          padding: 0,
                          marginRight: "5px",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                          },
                        }}
                      >
                        -
                      </Button>

                      {/* Quantity Display */}
                      <Typography
                        variant="body2"
                        sx={{ color: "white", marginX: "5px" }}
                      >
                        <strong>Quantity:</strong> {item.quantity}
                      </Typography>

                      {/* Increase Quantity */}
                      <Button
                        onClick={() => handleIncreaseQuantity(item)}
                        sx={{
                          minWidth: "35px",
                          minHeight: "30px",
                          color: "white",
                          marginLeft: "5px",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                          },
                        }}
                      >
                        +
                      </Button>

                      {/* Remove Item */}
                      <Button
                        onClick={() => handleRemoveFromCart(item.id)}
                        sx={{
                          color: "white",
                          marginLeft: "10px",
                          backgroundColor: "rgba(255, 0, 0, 0.1)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                          },
                        }}
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              component={RouterLink}
              to="/websiteDoAn/CartPage"
              variant="contained"
              startIcon={<ShoppingCart />}
              sx={{
                width: 300,
                textTransform: "uppercase",
                backgroundColor: "#663399",
                color: "#FFF",
                fontSize: isMobile ? "1.1rem" : "1.3rem",
                padding: "12px 24px",
                margin: "auto",
                borderRadius: 2,
                transition:
                  "background-color 0.3s, box-shadow 0.3s, transform 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  backgroundColor: "#76B900",
                  boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  backgroundColor: "#76B900",
                  boxShadow: "0 2px 8px rgba(255, 255, 255, 0.1)",
                  transform: "translateY(0)",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  transform: "rotate(45deg)",
                  transition: "all 0.3s linear",
                },
                "&:hover::after": {
                  left: "100%",
                  top: "100%",
                },
              }}
            >
              <Typography
                variant="button"
                sx={{
                  color: "#FFF",
                  fontWeight: "bold",
                  textAlign: "center",
                  letterSpacing: "1px",
                }}
              >
                Cart Page
              </Typography>
            </Button>
          </motion.div>
        </List>
      </Box>
    </>
  );
}

export default Sidebar;
