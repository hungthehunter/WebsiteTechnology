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
import {
    importThunk,
    productThunk,
} from "../../../../services/redux/thunks/thunk";
// import { getAllProductByManufacturerId } from "../../../Serivce/ApiService";

function AdminAddImport({ setActiveComponent, showAlert }) {
  //#region logic
  const manufacturers = useSelector(
    (state) => state.manufacturer.listManufacturer
  );
  const products = useSelector((state) => state.product.listProductByManufacturer);
  let dispatch = useDispatch();

  const defaultImport = {
    importItems: [],
    total: "0",
  };

  const [formData, setFormData] = useState({
    dateImport: "",
    manufacturer: {
      id: "",
    },
    importItems: [],
    total: "0",
  });

  useEffect(() => {
    if (formData.manufacturer?.id === "" || formData.manufacturer?.id === null)
      return;
    loadProducts(formData.manufacturer.id);
  }, [formData.manufacturer.id]);

  const loadProducts = (id) => {
    dispatch(productThunk.getAllProductByManufacturerId(id));
  };

  const handleChangeManufacturer = (value) => {
    if (formData.manufacturer.id === value) return;

    setFormData((prevFormData) => ({
      ...prevFormData,
      manufacturer: {
        id: value,
      },
      ...defaultImport,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "dateImport":
        setFormData({ ...formData, dateImport: value });
        break;

      case "manufacturer":
        handleChangeManufacturer(value);
        break;

      default:
        break;
    }
  };

  const handleAddImportItems = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      importItems: [
        ...prevFormData.importItems,
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
    const newImportItems = [...formData.importItems];
    newImportItems[index] = {
      ...newImportItems[index],
      product: {
        id: value,
      },
    };

    return newImportItems;
  };

  const handleImportItemsPropertyChange = (index, field, value) => {
    const newImportItems = [...formData.importItems];
    newImportItems[index] = {
      ...newImportItems[index],
      [field]: value,
    };

    return newImportItems;
  };

  const handleImportItemsChange = (index, field, value) => {
    let newImportItems;
    if (field === "product") {
      let isContain = formData.importItems.find(
        (model) => model.product.id === value
      );
      if (isContain !== undefined) {
        toast.error("Product already added");
        return;
      }

      newImportItems = handleChooseProduct(index, value);
    } else
      newImportItems = handleImportItemsPropertyChange(index, field, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      importItems: newImportItems,
    }));
  };

  const removeImportItems = (index) => {
    const newImportItems = formData.importItems.filter((_, i) => i !== index);
    const importTotal = calImportTotal(newImportItems);

    setFormData((prevFormData) => ({
      ...prevFormData,
      importItems: newImportItems,
      total: importTotal,
    }));
  };

  const calItemTotal = (index) => {
    let importItems = formData.importItems[index];

    let itemTotal;
    if (importItems.price === "" || importItems.quantity === "") {
      itemTotal = 0;
    } else
      itemTotal =
        parseFloat(importItems.price) * parseFloat(importItems.quantity);

    let newImportItems = handleImportItemsPropertyChange(
      index,
      "total",
      itemTotal.toString()
    );

    let importTotal = calImportTotal(newImportItems);

    setFormData((prevFormData) => ({
      ...prevFormData,
      importItems: newImportItems,
      total: importTotal,
    }));
  };

  const calImportTotal = (importItems) => {
    const sum = importItems.reduce((accumulator, currentValue) => {
      if (currentValue.total === "") return accumulator;

      accumulator += parseFloat(currentValue.total);
      return accumulator;
    }, 0);
    return sum.toString();
  };

  const handleCreateImport = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append(
      "import",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    console.log(JSON.stringify(formData));

    try {
      dispatch(importThunk.createImport(data));
      showAlert("Create Import successfully.", "success");
      setTimeout(() => setActiveComponent({ name: "AdminImport" }), 1000);
    } 
    catch (error) {
      console.error("There was an error creating the import!", error);
      showAlert("Failed to create import.", "error");
    }
  };

  //#endregion

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box component="form" onSubmit={handleCreateImport} noValidate>
              <Typography variant="h5" gutterBottom>
                Add New Import
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Import Date"
                    margin="normal"
                    type="date"
                    name="dateImport"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={formData.dateImport}
                    onChange={handleChange}
                  />
                </Grid>
                {/* Manufacturer */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Manufacturer</InputLabel>
                    <Select
                      name="manufacturer"
                      value={formData.manufacturer.id || ""}
                      onChange={handleChange}
                    >
                      {manufacturers.map((manufacturer) => (
                        <MenuItem key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {/* Import Items */}
              {formData.importItems.map((importItems, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12} md={12}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Product</InputLabel>
                        <Select
                          name="product"
                          value={importItems.product.id || ""}
                          onChange={(e) => {
                            handleImportItemsChange(
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
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Import Price"
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: 1 } }}
                      value={importItems.price}
                      disabled={importItems.product.id === "" ? true : false}
                      onBlur={() => calItemTotal(index)}
                      onChange={(e) =>
                        handleImportItemsChange(index, "price", e.target.value)
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: 1 } }}
                      value={importItems.quantity}
                      onBlur={() => calItemTotal(index)}
                      disabled={importItems.product.id === "" ? true : false}
                      onChange={(e) =>
                        handleImportItemsChange(
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
                        importItems.total === ""
                          ? "$0"
                          : `$${importItems.total}`
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
                      onClick={() => removeImportItems(index)}
                      style={{ marginTop: 10 }}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid
                visibility={
                  formData.manufacturer.id === "" ? "collapse" : "visible"
                }
                item
                xs={12}
              >
                <Button variant="outlined" onClick={handleAddImportItems}>
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
                    Create Import
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
export default AdminAddImport;
