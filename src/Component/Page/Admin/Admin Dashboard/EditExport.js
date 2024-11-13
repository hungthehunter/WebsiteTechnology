import {
    Box,
    Button,
    Card,
    CardContent,
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
      customer: {
        id: "",
      },
      exportItems: [],
      total: "0",
    });
  
    useEffect(() => {
      dispatch(exportThunk.getExportById(id));
    }, [dispatch, id]);
  
    const model = useSelector((state) => state.export.selectedExport);
  
    useEffect(() => {
      if (!model) return;
      setFormData(model);
    }, [model]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      switch (name) {
        case "dateExport":
          setFormData({ ...formData, dateExport: value });
          break;
  
        //   case "customer":
        //     setFormData({ ...formData, customer: { id: value } });
  
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
        dispatch(exportThunk.updateExport({ id: id, exportData: data }));
        showAlert("Update Export successfully.", "success");
        setTimeout(() => setActiveComponent({ name: "AdminExport" }), 1000);
      } 
      catch (error) {
        console.error("There was an error updating the export!", error);
        showAlert("Failed to update export.", "error");
      }
    };
  
    //#endregion
  
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box component="form" onSubmit={handleEditExport} noValidate>
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
                    <TextField
                      fullWidth
                      label="Customer"
                      InputLabelProps={{ shrink: true }}
                      value={formData.customer.fullname}
                      disabled={true}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                {/* Export Items */}
                {formData.exportItems.map((exportItem, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Product"
                        InputLabelProps={{ shrink: true }}
                        value={exportItem.product.productName}
                        disabled={true}
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
                        value={exportItem.quantity}
                        disabled={true}
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
                      Edit Export
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
  export default AdminEditExport;
  