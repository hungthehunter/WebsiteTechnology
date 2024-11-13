import { Delete } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { exportThunk } from "../../../../services/redux/thunks/thunk";

function AdminAddExport({ setActiveComponent, showAlert }) {
  //#region logic
  const [formData, setFormData] = useState({
    dateExport: "",
    customer: {
      id: "",
    },
    exportItems: [],
    total: "0",
  });

  const customers = useSelector((state) => state.user.listUser);
  const products = useSelector((state) => state.product.listProduct);
  const [stocks, setStocks] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    loadStocks(products);
  }, [products]);

  const loadStocks = (productList) => {
    const mp = productList.reduce((accumulator, current) => {
      accumulator[current.id] = current.unitInStock;
      return accumulator;
    }, {});

    setStocks(mp);
  };

  const getProduct = (id) => {
    return products.find((product) => product.id === id);
  };

  const setQuantityLimit = (tf) => {
    if (parseInt(tf.value) < parseInt(tf.min)) {
      tf.value = tf.min;
    }
    if (parseInt(tf.value) > parseInt(tf.max)) {
      tf.value = tf.max;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "dateExport":
        setFormData({ ...formData, dateExport: value });
        break;

      case "customer":
        setFormData({ ...formData, customer: { id: value } });

      default:
        break;
    }
  };

  const handleAddExportItems = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      exportItems: [
        ...prevFormData.exportItems,
        {
          price: "",
          quantity: "",
          product: {
            id: "",
          },
          total: "",
        },
      ],
    }));
  };

  const handleChooseProduct = (index, value) => {
    const _product = getProduct(value);

    let newExportItems = [...formData.exportItems];
    newExportItems[index] = {
      ...newExportItems[index],
      product: {
        id: value,
      },
      quantity: 0,
      price: _product.unitPrice.toString(),
      total: 0,
    };

    return newExportItems;
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
    let newExportItems;
    let exportTotal = "";
    if (field === "product") {
      let isContain = formData.exportItems.find(
        (model) => model.product.id === value
      );
      if (isContain !== undefined) {
        toast.error("Product already added");
        return;
      }

      newExportItems = handleChooseProduct(index, value);
      exportTotal = calExportTotal(newExportItems);
    } 
    else
      newExportItems = handleExportItemsPropertyChange(index, field, value);

    setFormData((prevFormData) => {
      let total = exportTotal === "" ? prevFormData.total : exportTotal;

      return ({
        ...prevFormData,
        exportItems: newExportItems,
        total: total
      })
    });
  };

  const removeExportItems = (index) => {
    const newExportItems = formData.exportItems.filter((_, i) => i !== index);
    const exportTotal = calExportTotal(newExportItems);

    setFormData((prevFormData) => ({
      ...prevFormData,
      exportItems: newExportItems,
      total: exportTotal,
    }));
  };

  const calItemTotal = (index) => {
    let exportItems = formData.exportItems[index];

    let itemTotal;
    if (exportItems.price === "" || exportItems.quantity === "") {
      itemTotal = 0;
    } else
      itemTotal =
        parseFloat(exportItems.price) * parseFloat(exportItems.quantity);

    let newExportItems = handleExportItemsPropertyChange(
      index,
      "total",
      itemTotal.toString()
    );

    let exportTotal = calExportTotal(newExportItems);

    setFormData((prevFormData) => ({
      ...prevFormData,
      exportItems: newExportItems,
      total: exportTotal,
    }));
  };

  const calExportTotal = (exportItems) => {
    const sum = exportItems.reduce((accumulator, currentValue) => {
      if (currentValue.total === "") return accumulator;

      accumulator += parseFloat(currentValue.total);
      return accumulator;
    }, 0);
    return sum.toString();
  };

  const handleCreateExport = (e) => {
    e.preventDefault();

    if (formData.customer.id === "") {
      showAlert("No customer is selected", "error");
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
                {/* Manufacturer */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Customer</InputLabel>
                    <Select
                      name="customer"
                      value={formData.customer.id || ""}
                      onChange={handleChange}
                    >
                      {customers.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.fullname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {/* Export Items */}
              {formData.exportItems.map((exportItem, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Product</InputLabel>
                      <Select
                        name="product"
                        value={exportItem.product.id || ""}
                        onChange={(e) => {
                          handleExportItemsChange(
                            index,
                            "product",
                            e.target.value
                          );
                        }}
                      >
                        {products.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.productName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Unit in Stock"
                      value={stocks[exportItem.product.id]}
                      disabled={true}
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          color: "black !exportant",
                          "-webkit-text-fill-color": "black !exportant",
                        },
                      }}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Export Price"
                      value={exportItem.price}
                      disabled={true}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          color: "black !exportant",
                          "-webkit-text-fill-color": "black !exportant",
                        },
                      }}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      type="number"
                      InputProps={{
                        inputProps: {
                          min: 0,
                          step: 1,
                          max: stocks[exportItem.product.id],
                        },
                      }}
                      onKeyUp={(e) => setQuantityLimit(e.target)}
                      value={exportItem.quantity}
                      onBlur={() => calItemTotal(index)}
                      disabled={exportItem.product.id === "" ? true : false}
                      onChange={(e) =>
                        handleExportItemsChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="Total"
                      value={
                        exportItem.total === "" ? "$0" : `$${exportItem.total}`
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
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <IconButton
                      color="error"
                      onClick={() => removeExportItems(index)}
                      style={{ marginTop: 10 }}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant="outlined" onClick={handleAddExportItems}>
                  Add Product
                </Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h5" gutterBottom>
                  Total
                </Typography>
                <TextField
                  fullWidth
                  value={formData.total === "" ? "$0" : `$${formData.total}`}
                  disabled={true}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important",
                      "-webkit-text-fill-color": "black !important",
                    },
                  }}
                  margin="normal"
                />
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Create Export
                  </Button>
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
