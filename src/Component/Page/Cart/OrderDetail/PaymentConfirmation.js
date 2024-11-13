// PaymentConfirmation.js
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addressThunk,
  cartThunk,
  orderThunk,
} from "../../../../services/redux/thunks/thunk";
import PICTURE from "../../../Assests/PICTURE";

const PaymentConfirmation = ({ open, handleClose, note }) => {
  // Payment Information
  const userCurrentLogged = useSelector(
    (state) => state.user.userCurrentLogged
  );
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const listCartItems = useSelector((state) => state.cart.listCartItems);
  const totalPrice = listCartItems?.reduce((sum, item) => {
    return sum + (item?.totalPrice || 0);
  }, 0);
  const listAddress = useSelector((state) =>
    state?.address?.listAddress?.filter(
      (addr) => addr.user?.id === userCurrentLogged?.id && addr?.status
    )
  );

  // Address
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewAddress({
      houseNumber: "",
      street: "",
      ward: "",
      district: "",
      city: "",
      country: "",
      status: true,
      user: { id: userCurrentLogged?.id },
    });
  };
  const [openAdd, setOpenAdd] = useState(false);
  const handleClickOpenAdd = () => setOpenAdd(true);
  const [newAddress, setNewAddress] = useState({
    houseNumber: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    country: "",
    status: true,
    user: { id: null },
  });

  const handleAddAddress = async () => {
    try {
      await dispatch(addressThunk.createAddress(newAddress)).unwrap();
      dispatch(addressThunk.getAllAddresses());
      toast.success(
        "Địa chỉ đã được thêm thành công . Vui lòng chọn Address để tiếp tục"
      );
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  // User Information
  const dispatch = useDispatch();

  // Address Information
  const [selectedAddress, setSelectedAddress] = useState("");

  // Xóa cart sau khi submit Order thành công
  const handleRemoveAllFromCart = async () => {
    // Lặp qua từng sản phẩm trong giỏ hàng và xóa
    for (const item of listCartItems) {
      await dispatch(cartThunk.removeFromCart(item.id)).unwrap();
    }
    // Sau khi xóa hết sản phẩm, cập nhật lại giỏ hàng
    dispatch(cartThunk.getUserCart(userCurrentLogged.id));
  };

  const handleSubmitOrder = async () => {
    // Kiểm tra thông tin thanh toán
    if (
      !selectedAddress ||
      !cardHolderName ||
      !cardNumber ||
      !expiryMonth ||
      !expiryYear ||
      !cvv
    ) {
      toast.error("Please complete all payment details.");
      return;
    }

    // Tạo thông tin thanh toán
    const paymentInfo = {
      payment_method: "CREDIT_CARD",
      creditCardPayment: {
        cardHolderName,
        cardNumber,
        cardExpiryDate: `${expiryMonth}-${expiryYear}`,
        cvv,
      },
    };

    // Tạo dữ liệu đơn hàng
    const orderData = {
      total_price: totalPrice,
      address: { id: selectedAddress },
      note: note,
      payment: paymentInfo,
      user: { id: userCurrentLogged.id }, // Lấy thông tin user từ userCurrentLogged
      order_date: new Date().toISOString(),
      order_status: "Pending",
    };

    // Tạo dữ liệu giỏ hàng từ listCartItems
    const cartData = listCartItems.map((item) => ({
      user: { id: userCurrentLogged.id }, // Sử dụng thông tin user
      product: { id: item.product.id },
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      status: item.status,
    }));

    // Tạo FormData
    const formData = new FormData();
    formData.append(
      "order",
      new Blob([JSON.stringify(orderData)], { type: "application/json" })
    );
    formData.append(
      "cart",
      new Blob([JSON.stringify(cartData)], { type: "application/json" })
    );

    try {
      await dispatch(orderThunk.createOrder(formData));
      toast.success("Order placed successfully!");
      await handleRemoveAllFromCart();
      handleClose();
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle fontSize={20}>CONFIRM PAYMENT</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom fontSize={15}>
          Please check your payment Information before continuing.
        </Typography>
        <Grid container spacing={2}>
          {/* Phần địa chỉ thanh toán */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom fontSize={14}>
              Địa chỉ thanh toán
            </Typography>

            <TextField
              disabled
              label="Họ và tên"
              margin="dense"
              style={{ marginBottom: "20px" }}
              InputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              fullWidth
              value={userCurrentLogged?.fullname}
            />
            <TextField
              disabled
              label="Email"
              margin="dense"
              style={{ marginBottom: "20px" }}
              InputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              fullWidth
              value={userCurrentLogged?.email}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpenAdd}
              fullWidth
              style={{ marginBottom: "20px" }}
            >
              Thêm địa chỉ mới
            </Button>

            {/* Phần chọn địa chỉ */}
            <FormControl
              fullWidth
              margin="dense"
              style={{ marginBottom: "20px" }}
            >
              {listAddress.length > 0 ? (
                <>
                  <InputLabel style={{ fontSize: "16px" }}>
                    Select Address
                  </InputLabel>
                  <Select
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    fullWidth
                    inputProps={{ style: { fontSize: "16px" } }}
                  >
                    {listAddress.map((address) => (
                      <MenuItem key={address.id} value={address.id}>
                        {address.street}, {address.city}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Không có địa chỉ nào được tìm thấy. Vui lòng thêm địa chỉ mới.
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Phần thông tin thanh toán */}
          <Dialog open={openAdd} onClose={handleCloseAdd}>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogContent>
              {[
                "houseNumber",
                "street",
                "ward",
                "district",
                "city",
                "country",
              ].map((field) => (
                <TextField
                  key={field}
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  fullWidth
                  value={newAddress[field]}
                  onChange={handleInputChange}
                />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAdd}>Cancel</Button>
              <Button onClick={handleAddAddress}>Add</Button>
            </DialogActions>
          </Dialog>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom fontSize={14}>
              Thông tin thanh toán
            </Typography>
            <Box
              margin="dense"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mb: 2,
                marginBottom: "34px",
              }}
            >
              <Typography variant="body1" sx={{ mr: 2 }}>
                Thẻ được chấp nhận:
              </Typography>
              <img src={PICTURE.cards_accepted} alt="Cards" height="34" />
            </Box>
            <TextField
              label="Card Holder Name"
              margin="dense"
              InputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              fullWidth
              style={{ marginBottom: "20px" }}
              onChange={(e) => setCardHolderName(e.target.value)}
            />
            <TextField
              label="Card Number"
              InputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              margin="dense"
              fullWidth
              style={{ marginBottom: "20px" }}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <TextField
              label="Tháng hết hạn"
              InputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              margin="dense"
              fullWidth
              style={{ marginBottom: "20px" }}
              onChange={(e) => setExpiryMonth(e.target.value)}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Năm hết hạn"
                  margin="dense"
                  InputProps={{ style: { fontSize: "16px" } }}
                  InputLabelProps={{ style: { fontSize: "16px" } }}
                  fullWidth
                  onChange={(e) => setExpiryYear(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  InputProps={{ style: { fontSize: "16px" } }}
                  InputLabelProps={{ style: { fontSize: "16px" } }}
                  margin="dense"
                  fullWidth
                  onChange={(e) => setCvv(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Hủy
        </Button>
        <Button
          onClick={() => handleSubmitOrder()}
          variant="contained"
          color="primary"
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentConfirmation;
