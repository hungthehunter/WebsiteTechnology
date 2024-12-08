import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  exportThunk,
  orderThunk,
} from "../../../../services/redux/thunks/thunk";

function AdminAddExport({ setActiveComponent, showAlert }) {
  //#region logic
  const [formData, setFormData] = useState({
    dateExport: "",
    order: {
      id: "",
    },
  });

  const orders = useSelector((state) => state.order.listOrder);
  const products = useSelector((state) => state.product.listProduct);
  const [stocks, setStocks] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    loadStocks(products);
  }, [products]);

  useEffect(() => {
    dispatch(orderThunk.getOrderById(formData.order.id));
  }, [formData.order.id]);

  const selectedOrder = useSelector((state) => state.order.selectedOrder);

  const loadStocks = (productList) => {
    const mp = productList.reduce((accumulator, current) => {
      accumulator[current.id] = current.unitInStock;
      return accumulator;
    }, {});

    setStocks(mp);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "dateExport":
        setFormData({ ...formData, dateExport: value });
        break;

      case "order":
        setFormData({ ...formData, order: { id: value } });

      default:
        break;
    }
  };

  const isEnoughStock = () => {
    let orderItems = selectedOrder.orderItem;
    for (var item of orderItems){
      let stock = stocks[item.product.id];
      if (item.quanitty > stock){
        return {
          product: item.product.productName,
          result: false
        };
      }
    }

    return {
      result: true
    };
  }

  const handleCreateExport = (e) => {
    e.preventDefault();

    var check = isEnoughStock();
    if (!check.result){
      toast.error(`${check.product} is out of stock`);
      return;
    }

    const data = new FormData();

    data.append(
      "export",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    console.log(JSON.stringify(formData));

    try {
      dispatch(exportThunk.createExport(data));
      showAlert("Create Export successfully.", "success");
      setTimeout(() => setActiveComponent({ name: "AdminExport" }), 1000);
    } catch (error) {
      console.error("There was an error creating the export!", error);
      showAlert("Failed to create export.", "error");
    }
  };

  const getAddressText = (address) => {
    if (address === undefined) return "";
    return `${address.houseNumber} ${address.district} ${address.country} ${address.city}`;
  };

  const getImage = (product) => {
    if (product === undefined || product.product_image === undefined) return "";
    for (var image of product.product_image) {
      if (image.mainImage) return image.url;
    }

    return "";
  };

  //#endregion

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box component="form" onSubmit={handleCreateExport} noValidate>
              <Typography variant="h5" gutterBottom>
                Add New Export
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Export Date"
                    margin="normal"
                    type="date"
                    name="dateExport"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={formData.dateExport}
                    onChange={handleChange}
                  />
                </Grid>
                {/* Order */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Order Id</InputLabel>
                    <Select
                      name="order"
                      value={formData.order.id || ""}
                      onChange={handleChange}
                    >
                      {orders.map((order) => (
                        <MenuItem key={order.id} value={order.id}>
                          {order.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  display={selectedOrder?.user ? "block" : "none"}
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Customer"
                    InputLabelProps={{ shrink: true }}
                    value={selectedOrder?.user?.fullname}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        color: "black !important",
                        "-webkit-text-fill-color": "black !important",
                      },
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid
                  display={selectedOrder?.user ? "block" : "none"}
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Phone"
                    InputLabelProps={{ shrink: true }}
                    value={selectedOrder?.user?.mobile}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        color: "black !important",
                        "-webkit-text-fill-color": "black !important",
                      },
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid
                  display={selectedOrder?.user ? "block" : "none"}
                  item
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Address"
                    InputLabelProps={{ shrink: true }}
                    value={getAddressText(selectedOrder?.address)}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        color: "black !important",
                        "-webkit-text-fill-color": "black !important",
                      },
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Divider sx={{ bgcolor: "black" }}></Divider>
                </Grid>
              </Grid>
              {/* Export Items */}
              {selectedOrder?.orderItem?.map((item, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  sx={{ marginTop: "10px !important" }}
                >
                  <Grid
                    container
                    item
                    xs={12}
                    md={12}
                  >
                    <Box component={"img"} src={getImage(item.product)}></Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Product"
                      InputLabelProps={{ shrink: true }}
                      value={item.product.productName}
                      disabled={true}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          color: "black !important",
                          "-webkit-text-fill-color": "black !important",
                        },
                      }}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Unit in Stock"
                      value={stocks[item.product.id]}
                      disabled={true}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          color: "black !important",
                          "-webkit-text-fill-color": "black !important",
                        },
                      }}
                      InputLabelProps={{ shrink: true }}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Export Price"
                      value={
                        item?.product?.unitPrice
                          ? `$${item.product.unitPrice}`
                          : "$0"
                      }
                      InputLabelProps={{ shrink: true }}
                      disabled={true}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          color: "black !important",
                          "-webkit-text-fill-color": "black !important",
                        },
                      }}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          color: "black !important",
                          "-webkit-text-fill-color": "black !important",
                        },
                      }}
                      value={item.quanitty}
                      disabled={true}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Divider sx={{ bgcolor: "black" }}></Divider>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} md={12}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ margin: "10px 0px 0px 0px !important" }}
                >
                  Total
                </Typography>
                <TextField
                  fullWidth
                  value={
                    selectedOrder?.total_price
                      ? `$${selectedOrder?.total_price}`
                      : "$0"
                  }
                  disabled={true}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important",
                      "-webkit-text-fill-color": "black !important",
                    },
                  }}
                  margin="normal"
                />
                <Grid container item xs={12} md={12} spacing={2}>
                  <Grid
                    container
                    item
                    xs={12}
                    md={6}
                    justifyContent={"flex-end"}
                  >
                    <Button type="submit" variant="contained" color="primary">
                      Create Export
                    </Button>
                  </Grid>
                  <Grid container item xs={12} md={6}>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setActiveComponent({ name: "AdminExport" });
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
export default AdminAddExport;
