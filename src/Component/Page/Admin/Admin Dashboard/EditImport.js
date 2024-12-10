import {
  Box,
  Button,
  Card,
  CardContent,
  debounce,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedImportId } from "../../../../services/redux/slices/importSlice";
import { importThunk } from "../../../../services/redux/thunks/thunk";
import { importValidationSchema } from "../../../../services/yup/Admin/Import/importValidation";

function AdminEditImport({ id, setActiveComponent, showAlert }) {
  //#region logic
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const alert = useCallback(
    debounce((value) => toast.error(value), 500)
  , [])

  const [formData, setFormData] = useState({
    dateImport: "",
    manufacturer: {
      id: "",
    },
    importItems: [],
    total: "0",
  });

  useEffect(() => {
    dispatch(importThunk.getImportById(id));
  }, [dispatch, id]);

  const model = useSelector((state) => state.import.selectedImport);

  useEffect(() => {
    if (!model) return;
    setFormData(model);
  }, [model]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "dateImport":
        setFormData({ ...formData, dateImport: value });
        break;

      default:
        break;
    }
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
    const newImportItems = handleImportItemsPropertyChange(index, field, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      importItems: newImportItems,
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
    const sum = importItems.reduce(
      (accumulator, currentValue) =>
        accumulator + parseFloat(currentValue.total),
      0
    );
    return sum.toString();
  };

  const handleEditImport = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append(
      "import",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    console.log(JSON.stringify(formData));

    try {
      await importValidationSchema.validate(formData, { abortEarly: false })

      dispatch(importThunk.updateImport({ id: id, importData: data }));
      showAlert("Update Import successfully.", "success");
      dispatch(clearSelectedImportId());
      setTimeout(() => setActiveComponent({ name: "AdminImport" }), 1000);
    } 
    catch (error) {
      if (error.name === "ValidationError") {
        alertValidationError(error);
      } 
      else {
        showAlert("Failed to update import", "error");
      }
    }
  };

  const alertValidationError = (error) => {
    const validationErrors = error.inner.reduce((acc, err) => {
      acc[err.path] = err.message;
      return acc;
    }, {});
    setErrors(validationErrors);
    showAlert("Failed to update import. Check the information again", "error");
  }

  const getImage = (product) => {
    if (product === undefined || product.product_image === undefined) return "";
    for (var image of product.product_image) {
      if (image.mainImage) return image.url;
    }

    return "";
  }

  //#endregion

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box component="form" onSubmit={handleEditImport} noValidate>
              <Typography variant="h5" gutterBottom>
                Edit Import With Id: {id}
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
                    value={formData.dateImport.split("T")[0]}
                    onChange={handleChange}
                    error={errors.dateImport}
                    helperText={errors.dateImport}
                  />
                </Grid>
                {/* Manufacturer */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Manufacturer"
                    InputLabelProps={{ shrink: true }}
                    value={formData.manufacturer.name}
                    disabled={true}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Divider sx={{ bgcolor: "black" }}></Divider>
                </Grid>
              </Grid>
              {/* Import Items */}
              {formData.importItems.map((importItem, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid container item xs={12} md={12}>
                    <Box component={"img"} src={getImage(importItem.product)}></Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Product"
                        InputLabelProps={{ shrink: true }}
                        value={importItem.product.productName}
                        disabled={true}
                        margin="normal"
                      />
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
                      margin="normal"
                      error={errors[`importItems[${index}].price`]}
                      helperText={errors[`importItems[${index}].price`]}
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
                      value={importItem.quantity}
                      disabled={true}
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
                    <Button type="submit" variant="contained" color="primary">
                      Edit Import
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
export default AdminEditImport;
