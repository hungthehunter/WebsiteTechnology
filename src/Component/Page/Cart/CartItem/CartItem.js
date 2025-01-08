import { keyframes } from "@emotion/react";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartThunk } from "../../../../services/redux/thunks/thunk";
import "../CartItem/CartItem.scss";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export default function CartItem({ cart }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const userCurrentLogged = useSelector(
    (state) => state.user.userCurrentLogged
  );
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      toast.error("Lỗi: Dữ liệu sản phẩm không hợp lệ.");
      return;
    } else if (!item?.product) {
      console.error("Invalid item.product data:", item?.product);
      toast.error("Lỗi: Dữ liệu sản phẩm không hợp lệ.");
      return;
    }

    const newQuantity = item.quantity - 1;
    const discountedPrice = item?.discountedPrice;
    const totalPrice = newQuantity * item?.discountedPrice;

    if (newQuantity <= 0) {
      // If quantity <= 0, remove the item from the cart
      handleRemoveFromCart(item.id);
    } else {
      // Update product quantity
      const updatedCartData = {
        quantity: newQuantity,
        status: true,
        discountedPrice: discountedPrice,
        totalPrice: totalPrice,
        user: { id: userCurrentLogged.id },
        product: { id: item.product.id, promotion: item.product.promotion },
      };

      dispatch(
        cartThunk.updateCartItem({ id: item.id, cartData: updatedCartData })
      )
        .then(() => {
          dispatch(cartThunk.getUserCart(userCurrentLogged.id));
          toast.success("Cập nhật số lượng thành công.");
        })
        .catch((error) => {
          console.error("Failed to update item quantity:", error);
          toast.error("Không thể cập nhật số lượng sản phẩm.");
        });
    }
  };

  const handleIncreaseQuantity = (item) => {
    if (!item) {
      console.error("Invalid item data:", item.user);
      toast.error("Lỗi: Dữ liệu sản phẩm không hợp lệ.");
      return;
    } else if (!item?.product) {
      console.error("Invalid item.product data:", item?.product);
      toast.error("Lỗi: Dữ liệu sản phẩm không hợp lệ.");
      return;
    }

    const newQuantity = item.quantity + 1;
    const discountedPrice = item?.discountedPrice;
    const totalPrice = newQuantity * discountedPrice; // Format to 2 decimal places

    const updatedCartData = {
      quantity: newQuantity,
      status: true,
      discountedPrice: discountedPrice,
      totalPrice: totalPrice,
      user: { id: userCurrentLogged.id },
      product: { id: item.product.id, promotion: item.product.promotion },
    };

    dispatch(
      cartThunk.updateCartItem({ id: item.id, cartData: updatedCartData })
    )
      .then(() => {
        dispatch(cartThunk.getUserCart(userCurrentLogged.id));
        toast.success("Cập nhật số lượng thành công.");
      })
      .catch((error) => {
        console.error("Failed to update item quantity:", error);
        toast.error("Không thể cập nhật số lượng sản phẩm.");
      });
  };

  const handleQuantityChange = async (item, increase = true) => {
    const newQuantity = item.quantity + (increase ? 1 : -1);

    if (newQuantity <= 0) {
      setOpen(true);
      return;
    }

    const discountedPrice = item?.discountedPrice; // Ensure discounted price is used

    // Update totalPrice calculation based on discountedPrice
    const totalPrice = (discountedPrice * newQuantity).toFixed(2); // Calculate total price using discountedPrice and newQuantity

    const updatedCartData = {
      quantity: newQuantity,
      status: true,
      discountedPrice: discountedPrice,
      user: { id: userCurrentLogged.id },
      totalPrice: totalPrice, // Correct totalPrice calculation
      product: { id: item.product.id },
    };

    try {
      await dispatch(
        cartThunk.updateCartItem({ id: item.id, cartData: updatedCartData })
      ).unwrap();
      dispatch(cartThunk.getUserCart(userCurrentLogged.id));
    } catch (error) {
      console.error("Failed to update item quantity:", error);
      toast.error("Có lỗi xảy ra khi cập nhật số lượng sản phẩm.");
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await dispatch(cartThunk.removeFromCart(itemId)).unwrap();
      dispatch(cartThunk.getUserCart(userCurrentLogged.id));
      toast.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.");
    }
  };

  const handleConfirmDelete = () => {
    handleRemoveFromCart(cart.id);
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box
      className="wrapper"
      sx={{
        backgroundColor: "#0F0F0F",
        p: 3,
        borderRadius: 2,
        mb: 2,
        position: "relative",
        animation: `${fadeIn} 0.5s ease-in`,
      }}
    >
      <Tooltip title="Delete item" placement="left">
        <IconButton
          size="medium"
          className="deleteBtn"
          onClick={() => setOpen(true)}
          sx={{
            color: "#FF5252",
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            transition: "color 0.3s",
            "&:hover": {
              color: "#FFA500",
            },
          }}
        >
          <AiFillDelete fontSize={20} />
        </IconButton>
      </Tooltip>

      <Grid container spacing={2} alignItems="center">
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to={`/detail/${cart.id}`} style={{ textDecoration: "none" }}>
            <Box
              component="img"
              src={cart.product.product_image.find((img) => img.mainImage)?.url}
              sx={{
                width: isMobile ? "90px" : "150px",
                height: isMobile ? "90px" : "150px",
                objectFit: "cover",
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05) rotate(2deg)",
                },
              }}
            />
          </Link>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Stack spacing={1}>
            <Typography
              variant={isMobile ? "body1" : "h5"}
              color="#76B900"
              sx={{ textTransform: "uppercase", fontWeight: "bold" }}
            >
              {cart?.product?.productName}
            </Typography>
            <Typography variant="h6" color="grey">
            <strong>Price:</strong> $
            {cart?.product?.unitPrice?.toFixed(2)}
            </Typography>
            <Typography variant="h6" color="red">
            <strong>Price After Discount:</strong> $
            {cart?.discountedPrice}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <ButtonGroup variant="outlined" size="medium">
              <Button
                onClick={() => handleDecreaseQuantity(cart)}
                // onClick={() => handleQuantityChange(cart, false)}
                sx={{
                  backgroundColor: "#76B900",
                  color: "#000",
                  "&:hover": { backgroundColor: "#A4D17A" },
                  transition: "transform 0.2s",
                  "&:hover": {
                    backgroundColor: "#A4D17A",
                    transform: "scale(1.05)",
                  },
                }}
              >
                -
              </Button>
              <Button
                disabled
                sx={{
                  backgroundColor: "#E1E1E1",
                  color: "#000 !important",
                  minWidth: 40,
                }}
              >
                {cart.quantity}
              </Button>
              <Button
                onClick={() => handleIncreaseQuantity(cart)}
                // onClick={() => handleQuantityChange(cart)}
                sx={{
                  backgroundColor: "#76B900",
                  color: "#000",
                  "&:hover": { backgroundColor: "#A4D17A" },
                  transition: "transform 0.2s",
                  "&:hover": {
                    backgroundColor: "#A4D17A",
                    transform: "scale(1.05)",
                  },
                }}
              >
                +
              </Button>
            </ButtonGroup>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              fontWeight="bold"
              color="#FFD700"
            >
              <strong>Total Price:</strong> $
              {(cart?.quantity * calculateDiscountedPrice(cart)).toFixed(2)}
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "#76B900" }}>
          Xác nhận xóa
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#76B900" }}>
            Hủy bỏ
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{ color: "#FF5252" }}
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
