import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exportThunk } from "../../../../services/redux/thunks/thunk";

function AdminEditExport({ id, setActiveComponent, showAlert }) {
  //#region logic
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    dateExport: "",
    order: {
      id: "",
    },
  });

  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    dispatch(exportThunk.getExportById(id));
  }, [dispatch, id]);

  const model = useSelector((state) => state.export.selectedExport);

  useEffect(() => {
    if (!model) return;
    setFormData(model);
  }, [model]);

  useEffect(() => {
    setSelectedOrder(formData.order);
  }, [formData.order]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "dateExport":
        setFormData({ ...formData, dateExport: e.target.value });
        break;

      default:
        break;
    }
  };

  const handleExportItemsPropertyChange = (index, field, value) => {
    const newExportItems = [...formData.exportItems];
    newExportItems[index] = {
      ...newExportItems[index],
      [field]: value,
    };

    return newExportItems;
  };

  const handleExportItemsChange = (index, field, value) => {
    const newExportItems = handleExportItemsPropertyChange(index, field, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      exportItems: newExportItems,
    }));
  };

  const handleEditExport = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append(
      "export",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    console.log(JSON.stringify(formData));

    try {
      dispatch(exportThunk.updateExport({ id: id, exportData: data }));
      showAlert("Update Export successfully.", "success");
      setTimeout(() => setActiveComponent({ name: "AdminExport" }), 1000);
    } catch (error) {
      console.error("There was an error updating the export!", error);
      showAlert("Failed to update export.", "error");
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

  console.log(formData);

  //#endregion

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box component="form" onSubmit={handleEditExport} noValidate>
              <Typography variant="h5" gutterBottom>
                Edit Export
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
                    value={formData.dateExport.split("T")[0]}
                    onChange={handleChange}
                  />
                </Grid>
                {/* Order */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Order Id"
                    InputLabelProps={{ shrink: true }}
                    value={selectedOrder?.id}
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
                    <Box
                      component={"img"}
                      src={getImage(item.product)}
                    ></Box>
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
                      Update Export
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
export default AdminEditExport;
