import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedImportId } from "../../../../services/redux/slices/importSlice";
import { importThunk } from "../../../../services/redux/thunks/thunk";
  
  function AdminEditImport({ id, setActiveComponent, showAlert }) {
    //#region logic
  
    const dispatch = useDispatch();
  
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
          setFormData({ ...formData, dateImport: e.target.value });
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
  
    const handleEditImport = (e) => {
      e.preventDefault();
  
      const data = new FormData();
  
      data.append(
        "import",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );
  
      console.log(JSON.stringify(formData));
  
      try {
        dispatch(importThunk.updateImport({id: id, importData: data}));
        showAlert("Update Import successfully.", "success");
        dispatch(clearSelectedImportId())
        setTimeout(() => setActiveComponent({ name: "AdminImport" }), 1000);
      } 
      catch (error) {
        console.error("There was an error updating the import!", error);
        showAlert("Failed to update import.", "error");
      }
    };
  
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
                </Grid>
                {/* Import Items */}
                {formData.importItems.map((importItems, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={12} md={12}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Product"
                          InputLabelProps={{ shrink: true }}
                          value={importItems.product.productName}
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
                        value={importItems.quantity}
                        disabled={true}
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
                  </Grid>
                ))}
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
                      Edit Import
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
  export default AdminEditImport;
  