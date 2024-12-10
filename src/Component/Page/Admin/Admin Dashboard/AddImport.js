import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  importThunk,
  productThunk,
} from "../../../../services/redux/thunks/thunk";
import { importValidationSchema } from "../../../../services/yup/Admin/Import/importValidation";

function AdminAddImport({ setActiveComponent, showAlert }) {
  //#region logic
  const [errors, setErrors] = useState({});
  const alert = useCallback(
    debounce((value) => toast.error(value), 500),
    []
  );

  const manufacturers = useSelector(
    (state) => state.manufacturer.listManufacturer
  );
  const products = useSelector(
    (state) => state.product.listProductByManufacturer
  );

  const [blockAdd, setBlockAdd] = useState(true);

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
    setFormData((prev) => ({
      ...prev,
      importItems: [],
      total: "0",
    }));
  }, [products]);

  useEffect(() => {
    if (formData.manufacturer?.id === "" || formData.manufacturer?.id === null)
      return;

    loadProducts(formData.manufacturer.id);
    setBlockAdd(true);
    setTimeout(() => setBlockAdd(false), 1800);
  }, [formData.manufacturer.id]);

  const loadProducts = (id) => {
    dispatch(productThunk.getAllProductByManufacturerId(id));
  };

  const getImportItemProduct = (id) => {
    return products.find((item) => item.id === id);
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
          price: "0",
          quantity: "0",
          product: {
            id: "",
          },
          total: "0",
        },
      ],
    }));
  };

  const handleChooseProduct = (index, value) => {
    const newImportItems = [...formData.importItems];
    newImportItems[index] = {
      ...newImportItems[index],
      product: getImportItemProduct(value),
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

  const handlePriceCondition = (e, max) => {
    let min = 0;
    let value = e.target.value;

    if (parseFloat(value) < min) e.target.value = min;
    if (parseFloat(value) >= max) {
      e.target.value = max - 1;
      alert("Import price cant be lower than Product price");
    }
  };

  const calImportTotal = (importItems) => {
    const sum = importItems.reduce((accumulator, currentValue) => {
      if (currentValue.total === "") return accumulator;

      accumulator += parseFloat(currentValue.total);
      return accumulator;
    }, 0);
    return sum.toString();
  };

  const handleCreateImport = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append(
      "import",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    try {
      await importValidationSchema.validate(formData, { abortEarly: false });

      dispatch(importThunk.createImport(data));
      showAlert("Create Import successfully.", "success");
      setTimeout(() => setActiveComponent({ name: "AdminImport" }), 1000);

      setErrors({});
    } catch (error) {
      if (error.name === "ValidationError") {
        alertValidationError(error);
      } else {
        showAlert("Failed to add import", "error");
      }
    }
  };

  const alertValidationError = (error) => {
    const validationErrors = error.inner.reduce((acc, err) => {
      acc[err.path] = err.message;
      return acc;
    }, {});
    setErrors(validationErrors);
    showAlert("Failed to add import. Check the information again", "error");
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
                    error={errors.dateImport}
                    helperText={errors.dateImport}
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
                      error={errors["manufacturer.id"]}
                    >
                      {manufacturers.map((manufacturer) => (
                        <MenuItem key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={errors["manufacturer.id"]}>
                      {errors["manufacturer.id"]}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Divider sx={{ bgcolor: "black" }}></Divider>
                </Grid>
              </Grid>
              {/* Import Items */}
              {formData.importItems.map((importItem, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid container item xs={12} md={12}>
                    <Box
                      component={"img"}
                      src={getImage(importItem.product)}
                    ></Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Product</InputLabel>
                        <Select
                          name="product"
                          value={importItem.product.id || ""}
                          onChange={(e) => {
                            handleImportItemsChange(
                              index,
                              "product",
                              e.target.value
                            );
                          }}
                          error={errors[`importItems[${index}].product.id`]}
                        >
                          {products.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.productName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText
                          error={errors[`importItems[${index}].product.id`]}
                        >
                          {errors[`importItems[${index}].product.id`]}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Import Price"
                      type="number"
                      InputProps={{
                        inputProps: {
                          min: 0,
                          step: 1,
                          max: importItem.product.unitPrice - 1 || 0,
                        },
                      }}
                      value={importItem.price}
                      disabled={importItem.product.id === "" ? true : false}
                      onBlur={() => calItemTotal(index)}
                      onChange={(e) => {
                        handlePriceCondition(e, importItem.product.unitPrice);
                        handleImportItemsChange(index, "price", e.target.value);
                      }}
                      error={errors[`importItems[${index}].price`]}
                      helperText={errors[`importItems[${index}].price`]}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Product Price"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      disabled
                      value={importItem.product.unitPrice}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: 1 } }}
                      value={importItem.quantity}
                      onBlur={() => calItemTotal(index)}
                      disabled={importItem.product.id === "" ? true : false}
                      onChange={(e) =>
                        handleImportItemsChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                      error={errors[`importItems[${index}].quantity`]}
                      helperText={errors[`importItems[${index}].quantity`]}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Unit in Stock"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      disabled
                      value={importItem.product.unitInStock}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="Total"
                      value={
                        importItem.total === "" ? "$0" : `$${importItem.total}`
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
                  <Grid item xs={12} md={12}>
                    <Divider sx={{ bgcolor: "black" }}></Divider>
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Button
                    sx={{ marginTop: "10px" }}
                    variant="outlined"
                    disabled={blockAdd}
                    onClick={handleAddImportItems}
                  >
                    Add Product
                  </Button>
                  <Typography
                    fontSize={"13px"}
                    height={"10px"}
                    sx={{
                      display: blockAdd ? "block" : "none",
                    }}
                  >
                    Loading products...
                  </Typography>
                </Box>
              </Grid>
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
                <Grid container item xs={12} md={12} spacing={2}>
                  <Grid
                    container
                    item
                    xs={12}
                    md={6}
                    justifyContent={"flex-end"}
                  >
                    <Button
                      // disabled={
                      //   !formData.manufacturer.id ||
                      //   formData.importItems.length == 0 ||
                      //   // formData.importItems.some(item => !item.id)
                      //   formData.importItems.some((item) => !item.product.id)
                      // }
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Create Import
                    </Button>
                  </Grid>
                  <Grid container item xs={12} md={6}>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setActiveComponent({ name: "AdminImport" });
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
export default AdminAddImport;
